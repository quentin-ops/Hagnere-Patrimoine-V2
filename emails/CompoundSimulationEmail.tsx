import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Button
} from "@react-email/components";

type YearRow = {
  year: number;
  startingBalance: number;
  contributions: number;
  interest: number;
  endingBalance: number;
  realEndingBalance: number;
};

export type CompoundSimulationEmailProps = {
  toName?: string;
  params: {
    initialInvestment: number;
    periodicContribution: number;
    contributionFrequency: string;
    annualRate: number;
    years: number;
  };
  kpis: {
    finalBalance: number;
    realFinalBalance: number;
    totalContributions: number;
    totalInterest: number;
    averageAnnualReturn: number;
  };
  rows: YearRow[];
  simulatorUrl?: string;
  bookingUrl?: string;
};

const euro = (value: number) => {
  const rounded = Math.round(value);
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formatted} €`;
};

const percent = (value: number) => `${(value * 100).toFixed(2).replace(".", ",")} %`;

export default function CompoundSimulationEmail({
  toName,
  params,
  kpis,
  rows,
  simulatorUrl = "https://www.hagnere-patrimoine.fr/ressources/simulateurs/calculatrice-interets-composes",
  bookingUrl = "https://hagnere-patrimoine.fr/calendly"
}: CompoundSimulationEmailProps) {
  const preview = "Votre simulation d'intérêts composés — PDF en pièce jointe";

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header card with text logo */}
          <Section style={styles.headerCard}>
            <Heading as="h1" style={styles.textLogo}>Hagnéré Patrimoine</Heading>
            <Text style={styles.headerTagline}>Gestion de Patrimoine & Fortune à 360°</Text>
          </Section>

          {/* Title and subtitle left-aligned */}
          <Section>
            <Heading style={styles.title}>Simulation d'intérêts composés</Heading>
            <Text style={styles.subtitle}>Résumé de votre projection financière</Text>
          </Section>

          <Section>
            <Text style={styles.hello}>Bonjour,</Text>
            <Text style={styles.paragraph}>
              Vous trouverez en pièce jointe le PDF contenant le détail de votre
              simulation. Voici un aperçu des principaux résultats.
            </Text>
          </Section>

          <Section style={styles.card}>
            <Heading as="h2" style={styles.cardTitle}>Paramètres choisis</Heading>
            <Hr style={styles.hr} />
            <div style={styles.paramsGrid}>
              <div style={styles.paramItem}>
                <Text style={styles.paramLabel}>Capital initial</Text>
                <Text style={styles.paramValue}>{euro(params.initialInvestment)}</Text>
              </div>
              <div style={styles.paramItem}>
                <Text style={styles.paramLabel}>Versement périodique</Text>
                <Text style={styles.paramValue}>{euro(params.periodicContribution)} ({params.contributionFrequency})</Text>
              </div>
              <div style={styles.paramItem}>
                <Text style={styles.paramLabel}>Taux annuel</Text>
                <Text style={styles.paramValue}>{params.annualRate.toFixed(2)} %</Text>
              </div>
              <div style={styles.paramItem}>
                <Text style={styles.paramLabel}>Durée</Text>
                <Text style={styles.paramValue}>{params.years} ans</Text>
              </div>
            </div>
          </Section>


          <Section>
            <table style={styles.kpisTable} cellPadding={0} cellSpacing={0} width="100%">
              <tbody>
                <tr>
                  <td style={styles.kpiCell}>
                    <div style={styles.kpiBoxDark}>
                      <Text style={styles.kpiLabel}>Capital final</Text>
                      <Text style={styles.kpiValue}>{euro(kpis.finalBalance)}</Text>
                      <Text style={styles.kpiSub}>Pouvoir d'achat: {euro(kpis.realFinalBalance)}</Text>
                    </div>
                  </td>
                  <td style={styles.kpiCell}>
                    <div style={styles.kpiBoxDark}>
                      <Text style={styles.kpiLabel}>Intérêts cumulés</Text>
                      <Text style={styles.kpiValue}>{euro(kpis.totalInterest)}</Text>
                      <Text style={styles.kpiSub}>+{percent(kpis.totalInterest / Math.max(kpis.totalContributions, 1))}</Text>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={styles.kpiCell}>
                    <div style={styles.kpiBoxDark}>
                      <Text style={styles.kpiLabel}>Versements totaux</Text>
                      <Text style={styles.kpiValue}>{euro(kpis.totalContributions)}</Text>
                      <Text style={styles.kpiSub}>Capital + versements</Text>
                    </div>
                  </td>
                  <td style={styles.kpiCell}>
                    <div style={styles.kpiBoxDark}>
                      <Text style={styles.kpiLabel}>Rendement moyen</Text>
                      <Text style={styles.kpiValue}>{percent(Math.max(kpis.averageAnnualReturn, 0))}</Text>
                      <Text style={styles.kpiSub}>Annualisé</Text>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Section style={{ textAlign: "center", marginTop: 12 }}>
            <table role="presentation" cellPadding={0} cellSpacing={0} style={{ margin: '0 auto', borderCollapse: 'separate', borderSpacing: 6 }}>
              <tbody>
                <tr>
                  <td>
                    <Button href={simulatorUrl} style={styles.buttonSecondary}>
                      <span style={styles.btnIcon}>🔁</span> Refaire une simulation
                    </Button>
                  </td>
                  <td>
                    <Button href={bookingUrl} style={styles.button}>
                      <span style={styles.btnIcon}>📅</span> Réserver un Bilan Patrimonial 360° Gratuit
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
            <Text style={styles.smallMuted}>Le PDF est joint à cet e-mail. Conservez-le pour vos dossiers.</Text>
          </Section>

          <Hr style={styles.hr} />
          <Section style={{ textAlign: "center" }}>
            <Text style={styles.footerText}>
              Cet e-mail vous a été envoyé par Hagnéré Patrimoine. Pour toute question,
              répondez directement à ce message.
            </Text>
            <Text style={styles.footerText}>
              © Hagnéré Patrimoine • 2025 • <Link href="https://www.hagnere-patrimoine.fr" style={styles.link}>hagnere-patrimoine.fr</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    backgroundColor: "#ffffff",
    margin: 0,
    padding: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    color: "#0a0a0a"
  },
  container: {
    width: "100%",
    maxWidth: 640,
    margin: "0 auto",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
  },
  header: {
    display: "block",
    marginBottom: 16
  },
  headerLeft: {
    display: "flex",
    flexDirection: "column"
  },
  headerCard: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    padding: 16,
    textAlign: 'center',
    marginBottom: 16
  },
  textLogo: {
    margin: '0 0 8px 0',
    fontSize: 24,
    fontWeight: 700,
    color: '#000000',
    textAlign: 'center' as const,
    letterSpacing: '-0.5px'
  },
  headerTagline: {
    margin: 0,
    fontSize: 12,
    color: '#6b7280'
  },
  title: {
    margin: 0,
    fontSize: 24,
    lineHeight: "28px",
    fontWeight: 700
  },
  subtitle: {
    margin: "6px 0 0",
    color: "#6b7280",
    fontSize: 14
  },
  hello: {
    fontSize: 14,
    margin: "8px 0 4px"
  },
  paragraph: {
    fontSize: 14,
    color: "#374151",
    lineHeight: "22px",
    margin: "8px 0 0"
  },
  kpis: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12,
    marginTop: 16,
    marginBottom: 16
  },
  kpiBoxDark: {
    backgroundColor: "#0a0a0a",
    color: "#ffffff",
    padding: 12,
    borderRadius: 10
  },
  kpiLabel: {
    fontSize: 10,
    opacity: 0.8,
    margin: 0,
    textTransform: "uppercase"
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: 700,
    margin: "2px 0 0"
  },
  kpiSub: {
    fontSize: 10,
    opacity: 0.75,
    marginTop: 2
  },
  card: {
    marginTop: 8,
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: 16
  },
  cardTitle: {
    fontSize: 16,
    margin: 0
  },
  hr: {
    borderColor: "#e5e7eb",
    margin: "12px 0"
  },
  paramsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12
  },
  paramItem: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: 10
  },
  paramLabel: {
    fontSize: 10,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.3,
    margin: 0
  },
  paramValue: {
    fontSize: 14,
    fontWeight: 700,
    margin: "4px 0 0"
  },
  button: {
    display: "inline-block",
    backgroundColor: "#000000",
    color: "#ffffff",
    padding: "8px 12px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 13
  },
  buttonSecondary: {
    display: "inline-block",
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: "8px 12px",
    border: '1px solid #000',
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 13
  },
  btnIcon: {
    marginRight: 6
  },
  smallMuted: {
    marginTop: 10,
    fontSize: 12,
    color: "#6b7280"
  },
  link: {
    color: "#0a0a0a",
    textDecoration: "underline"
  },
  footerText: {
    fontSize: 12,
    color: "#6b7280",
    margin: "4px 0"
  }
};

// Table layout helpers for email clients
styles.kpisTable = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 12 as unknown as string, // React CSS typing workaround for spacing
};
styles.kpiCell = {
  verticalAlign: 'top',
  width: '50%'
};


