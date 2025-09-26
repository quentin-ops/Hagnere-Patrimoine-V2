import { NextRequest } from "next/server";
import { pdf } from "@react-pdf/renderer";
import SimulationPdf, { SimulationPdfProps } from "@/components/pdf/SimulationPdf";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SimulationPdfProps;
    
    // Validation des données
    if (!body.params || !body.kpis || !body.rows) {
      return new Response(
        JSON.stringify({ error: 'Données manquantes: params, kpis ou rows' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    const element = SimulationPdf(body);
    const buffer = await pdf(element as any).toBuffer();
    
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="simulation-interets-composes.pdf"`,
      },
    });
  } catch (error) {
    const message = (error as Error)?.message || 'Erreur inconnue'
    return new Response(message, { status: 500, headers: { 'Content-Type': 'text/plain' } })
  }
}
