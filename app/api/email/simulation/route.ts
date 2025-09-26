import React from "react";
import { NextRequest } from "next/server";
import { pdf } from "@react-pdf/renderer";
import SimulationPdf, { SimulationPdfProps } from "@/components/pdf/SimulationPdf";
import CompoundSimulationEmail from "@/emails/CompoundSimulationEmail";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { syncBrevoContact } from "@/lib/brevo";

export const runtime = "nodejs";

type RequestBody = SimulationPdfProps & {
  to: string | string[];
  toName?: string;
  consents?: {
    acceptPrivacy?: boolean;
    newsletter?: boolean;
    partners?: boolean;
  };
};

export async function POST(request: NextRequest) {
  let stage = 'parse_request'
  try {
    const body = (await request.json()) as RequestBody;

    if (!body?.to) {
      return new Response(
        JSON.stringify({ error: "Champ 'to' manquant" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!body.params || !body.kpis || !body.rows) {
      return new Response(
        JSON.stringify({ error: "Données manquantes: params, kpis ou rows" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Configuration manquante: RESEND_API_KEY" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 1) Générer le PDF à partir de SimulationPdf
    stage = 'generate_pdf'
    const pdfElement = SimulationPdf({
      params: body.params,
      kpis: body.kpis,
      rows: body.rows,
      chartImage: body.chartImage,
      logoUrl: body.logoUrl,
    });
    
    // Créer le document PDF et obtenir le buffer
    const pdfDoc = pdf(pdfElement as any);
    const pdfBuffer = await pdfDoc.toBuffer();
    const pdfBase64 = pdfBuffer.toString('base64');
    
    // Log pour debug
    console.log('PDF Buffer size:', pdfBuffer.length, 'bytes');
    console.log('PDF Base64 length:', pdfBase64.length, 'chars');

    // 2) Construire l'email HTML (React Email) sans JSX
    stage = 'build_email'
    const emailElement = React.createElement(CompoundSimulationEmail, {
      toName: body.toName,
      params: body.params,
      kpis: body.kpis,
      rows: body.rows,
      simulatorUrl:
        process.env.NEXT_PUBLIC_SITE_URL
          ? `${process.env.NEXT_PUBLIC_SITE_URL}/ressources/simulateurs/calculatrice-interets-composes`
          : "https://www.hagnere-patrimoine.fr/ressources/simulateurs/calculatrice-interets-composes",
    } as React.ComponentProps<typeof CompoundSimulationEmail>);

    // 3) Persister consentements (si fournis)
    stage = 'persist_consents'
    try {
      if (body.consents && body.to && typeof body.to === 'string') {
        const email = body.to.toLowerCase().trim();
        await prisma.marketingContact.upsert({
          where: { email },
          update: {
            newsletterOptIn: Boolean(body.consents.newsletter) || undefined,
            partnersOptIn: Boolean(body.consents.partners) || undefined,
            updatedAt: new Date(),
          },
          create: {
            email,
            newsletterOptIn: Boolean(body.consents.newsletter),
            partnersOptIn: Boolean(body.consents.partners),
            source: 'simulation_compound',
          },
        });
      }
    } catch (e) {
      console.error('Erreur enregistrement consentements:', e);
      // On n'empêche pas l'envoi d'email si la persistance échoue
    }

    // 4) Sync Brevo en temps réel (meilleure fraîcheur)
    stage = 'sync_brevo'
    try {
      if (body.consents && body.to && typeof body.to === 'string') {
        await syncBrevoContact({
          email: body.to,
          newsletterOptIn: Boolean(body.consents.newsletter),
          partnersOptIn: Boolean(body.consents.partners),
        })
      }
    } catch (e) {
      console.error('Erreur sync Brevo:', e)
    }

    // 5) Envoi via Resend
    stage = 'send_email'
    const resend = new Resend(process.env.RESEND_API_KEY);
    const subject = "Votre simulation d'intérêts composés — Hagnéré Patrimoine";
    const from = process.env.EMAIL_FROM || "Hagnéré Patrimoine <no-reply@hagnere-patrimoine.fr>";

    const { data, error } = await resend.emails.send({
      from,
      to: body.to,
      subject,
      replyTo: process.env.REPLY_TO_EMAIL || "contact@hagnere-patrimoine.fr",
      react: emailElement as React.ReactElement,
      attachments: [
        {
          filename: "simulation-interets-composes.pdf",
          content: pdfBase64,
        },
      ],
      // Ajout de tags facultatifs pour tracer les consentements
      tags: [
        { name: 'newsletter', value: String(Boolean(body.consents?.newsletter)) },
        { name: 'partners', value: String(Boolean(body.consents?.partners)) },
      ],
    });

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message || "Erreur d'envoi d'email" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ status: "sent", id: data?.id ?? null }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    const message = (error as Error)?.message || 'Erreur inconnue'
    const stageHeader = (typeof stage === 'string' ? stage : 'unknown')
    return new Response(`Error at stage '${stageHeader}': ${message}`, { status: 500, headers: { 'Content-Type': 'text/plain', 'X-Error-Stage': stageHeader } })
  }
}


