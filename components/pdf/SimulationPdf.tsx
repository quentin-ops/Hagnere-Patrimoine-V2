import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";

// Enregistrer les polices Helvetica (intégrées par défaut)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'Helvetica' },
    { src: 'Helvetica-Bold', fontWeight: 700 },
  ]
});

const styles = StyleSheet.create({
  page: { 
    padding: 35,
    fontSize: 10,
    color: "#1f2937",
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff'
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#000000"
  },
  logo: {
    height: 30,
    width: 100
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "#000000",
    marginBottom: 4,
    fontFamily: 'Helvetica-Bold'
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#000000",
    marginTop: 15,
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold'
  },
  paramsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20
  },
  paramBox: {
    width: "48%",
    marginRight: "2%",
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb"
  },
  paramLabel: {
    fontSize: 9,
    color: "#6b7280",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  paramValue: {
    fontSize: 14,
    fontWeight: 700,
    color: "#111827",
    fontFamily: 'Helvetica-Bold'
  },
  kpiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15
  },
  kpiBox: {
    width: "23%",
    marginRight: "2%",
    padding: 10,
    backgroundColor: "#000000",
    borderRadius: 8,
    marginBottom: 10
  },
  kpiLabel: {
    fontSize: 8,
    color: "#ffffff",
    marginBottom: 4,
    opacity: 0.8
  },
  kpiValue: {
    fontSize: 16,
    fontWeight: 700,
    color: "#ffffff",
    fontFamily: 'Helvetica-Bold'
  },
  kpiSubtext: {
    fontSize: 7,
    color: "#ffffff",
    marginTop: 2,
    opacity: 0.7
  },
  chartContainer: {
    marginTop: 15,
    marginBottom: 15,
    padding: 12,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center"
  },
  chart: {
    width: 480,
    height: 180,
    borderRadius: 6
  },
  noChartText: {
    fontSize: 11,
    color: "#6b7280",
    fontStyle: "italic",
    textAlign: "center" as const
  },
  table: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    overflow: "hidden"
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#000000",
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 9,
    fontWeight: 700,
    color: "#ffffff",
    fontFamily: 'Helvetica-Bold'
  },
  tableHeaderCellNum: {
    flex: 1,
    fontSize: 9,
    fontWeight: 700,
    color: "#ffffff",
    textAlign: "right" as const,
    fontFamily: 'Helvetica-Bold'
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  tableRowAlt: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9fafb"
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
    color: "#374151"
  },
  tableCellNum: {
    flex: 1,
    fontSize: 9,
    color: "#374151",
    textAlign: "right" as const
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  footerText: {
    fontSize: 8,
    color: "#9ca3af"
  },
  pageNumber: {
    fontSize: 8,
    color: "#9ca3af"
  }
});

export type YearRow = {
  year: number;
  startingBalance: number;
  contributions: number;
  interest: number;
  endingBalance: number;
  realEndingBalance: number;
};

export type SimulationPdfProps = {
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
  chartImage?: string; // data URL png
  rows: YearRow[];
  logoUrl?: string;
};

// Formatters personnalisés pour React PDF (Intl n'est pas supporté)
const formatEuro = (value: number): string => {
  const rounded = Math.round(value);
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${formatted} €`;
};

const formatPercent = (value: number): string => {
  const percentage = (value * 100).toFixed(2).replace('.', ',');
  return `${percentage} %`;
};

export function SimulationPdf({ params, kpis, chartImage, rows, logoUrl }: SimulationPdfProps) {
  // Traduire la fréquence de contribution
  const getFrequencyLabel = (freq: string) => {
    switch(freq) {
      case 'monthly': return 'Mensuel';
      case 'quarterly': return 'Trimestriel';
      case 'annually': return 'Annuel';
      default: return freq;
    }
  };

  return (
    <Document>
      {/* Page 1 - Résumé et graphique */}
      <Page size="A4" style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Simulation d'intérêts composés</Text>
            <Text style={styles.subtitle}>Projection de votre patrimoine sur {params.years} ans</Text>
          </View>
          {logoUrl && <Image src={logoUrl} style={styles.logo} />}
        </View>

        {/* Paramètres de simulation */}
        <Text style={styles.sectionTitle}>Paramètres de simulation</Text>
        <View style={styles.paramsGrid}>
          <View style={styles.paramBox}>
            <Text style={styles.paramLabel}>Capital initial</Text>
            <Text style={styles.paramValue}>{formatEuro(params.initialInvestment)}</Text>
          </View>
          <View style={styles.paramBox}>
            <Text style={styles.paramLabel}>Versement {getFrequencyLabel(params.contributionFrequency).toLowerCase()}</Text>
            <Text style={styles.paramValue}>{formatEuro(params.periodicContribution)}</Text>
          </View>
          <View style={styles.paramBox}>
            <Text style={styles.paramLabel}>Taux de rendement annuel</Text>
            <Text style={styles.paramValue}>{params.annualRate.toFixed(2)} %</Text>
          </View>
          <View style={styles.paramBox}>
            <Text style={styles.paramLabel}>Durée d'investissement</Text>
            <Text style={styles.paramValue}>{params.years} ans</Text>
          </View>
        </View>

        {/* Résultats clés */}
        <Text style={styles.sectionTitle}>Résultats de la simulation</Text>
        <View style={styles.kpiGrid}>
          <View style={styles.kpiBox}>
            <Text style={styles.kpiLabel}>CAPITAL FINAL</Text>
            <Text style={styles.kpiValue}>{formatEuro(kpis.finalBalance)}</Text>
            <Text style={styles.kpiSubtext}>Euros constants: {formatEuro(kpis.realFinalBalance)}</Text>
          </View>
          <View style={styles.kpiBox}>
            <Text style={styles.kpiLabel}>INTÉRÊTS CUMULÉS</Text>
            <Text style={styles.kpiValue}>{formatEuro(kpis.totalInterest)}</Text>
            <Text style={styles.kpiSubtext}>+{formatPercent(kpis.totalInterest / Math.max(kpis.totalContributions, 1))}</Text>
          </View>
          <View style={styles.kpiBox}>
            <Text style={styles.kpiLabel}>VERSEMENTS TOTAUX</Text>
            <Text style={styles.kpiValue}>{formatEuro(kpis.totalContributions)}</Text>
            <Text style={styles.kpiSubtext}>Capital + versements</Text>
          </View>
          <View style={styles.kpiBox}>
            <Text style={styles.kpiLabel}>RENDEMENT MOYEN</Text>
            <Text style={styles.kpiValue}>{formatPercent(Math.max(kpis.averageAnnualReturn, 0))}</Text>
            <Text style={styles.kpiSubtext}>Annualisé</Text>
          </View>
        </View>

        {/* Graphique */}
        {chartImage ? (
          <>
            <Text style={styles.sectionTitle}>Projection graphique</Text>
            <View style={styles.chartContainer}>
              <Image src={chartImage} style={styles.chart} />
            </View>
          </>
        ) : null}

        {/* Pied de page */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© Hagnéré Patrimoine - Document généré le {new Date().toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          <Text style={styles.pageNumber}>Page 1/2</Text>
        </View>
      </Page>

      {/* Page 2 - Tableau détaillé */}
      <Page size="A4" style={styles.page}>
        {/* En-tête de la page 2 */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Détail année par année</Text>
            <Text style={styles.subtitle}>Évolution détaillée sur {params.years} ans</Text>
          </View>
          {logoUrl && <Image src={logoUrl} style={styles.logo} />}
        </View>

        {/* Tableau complet */}
        <View style={[styles.table, { marginTop: 20 }]}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 0.5 }]}>Année</Text>
            <Text style={styles.tableHeaderCellNum}>Capital début</Text>
            <Text style={styles.tableHeaderCellNum}>Versements</Text>
            <Text style={styles.tableHeaderCellNum}>Intérêts</Text>
            <Text style={styles.tableHeaderCellNum}>Capital fin</Text>
            <Text style={styles.tableHeaderCellNum}>Euros constants</Text>
          </View>
          {rows.map((r, index) => (
            <View key={r.year} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
              <Text style={[styles.tableCell, { flex: 0.5 }]}>{String(r.year)}</Text>
              <Text style={styles.tableCellNum}>{formatEuro(r.startingBalance)}</Text>
              <Text style={styles.tableCellNum}>{formatEuro(r.contributions)}</Text>
              <Text style={styles.tableCellNum}>{formatEuro(r.interest)}</Text>
              <Text style={styles.tableCellNum}>{formatEuro(r.endingBalance)}</Text>
              <Text style={styles.tableCellNum}>{formatEuro(r.realEndingBalance)}</Text>
            </View>
          ))}
        </View>

        {/* Résumé en bas du tableau */}
        <View style={{ marginTop: 20, padding: 12, backgroundColor: '#f9fafb', borderRadius: 8 }}>
          <Text style={{ fontSize: 10, color: '#374151', textAlign: 'center' }}>
            Avec un capital initial de {formatEuro(params.initialInvestment)} et des versements {getFrequencyLabel(params.contributionFrequency).toLowerCase()}s de {formatEuro(params.periodicContribution)}
          </Text>
          <Text style={{ fontSize: 10, color: '#374151', textAlign: 'center', marginTop: 4 }}>
            pendant {params.years} ans à {params.annualRate}%, vous obtenez un capital final de {formatEuro(kpis.finalBalance)}
          </Text>
        </View>

        {/* Pied de page */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© Hagnéré Patrimoine - Document généré le {new Date().toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          <Text style={styles.pageNumber}>Page 2/2</Text>
        </View>
      </Page>
    </Document>
  );
}

export default SimulationPdf;
