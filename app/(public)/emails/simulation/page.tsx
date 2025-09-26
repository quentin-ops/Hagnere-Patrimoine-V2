import * as React from 'react'
import { render } from '@react-email/render'
import CompoundSimulationEmail from '@/emails/CompoundSimulationEmail'

const euro = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

export default async function Page() {
  const simulatorUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/ressources/simulateurs/calculatrice-interets-composes`
    : 'http://localhost:3030/ressources/simulateurs/calculatrice-interets-composes'

  const props = {
    params: {
      initialInvestment: 15000,
      periodicContribution: 400,
      contributionFrequency: 'monthly',
      annualRate: 6,
      years: 20,
    },
    kpis: {
      finalBalance: 234469,
      realFinalBalance: 200000,
      totalContributions: 111000,
      totalInterest: 123469,
      averageAnnualReturn: 0.065,
    },
    rows: [
      { year: 1, startingBalance: 15000, contributions: 4800, interest: 924, endingBalance: 20724, realEndingBalance: 20724 },
      { year: 2, startingBalance: 20724, contributions: 4800, interest: 1259, endingBalance: 26783, realEndingBalance: 26257 },
      { year: 3, startingBalance: 26783, contributions: 4800, interest: 1627, endingBalance: 33210, realEndingBalance: 32369 },
      { year: 4, startingBalance: 33210, contributions: 4800, interest: 2032, endingBalance: 40042, realEndingBalance: 38200 },
      { year: 5, startingBalance: 40042, contributions: 4800, interest: 2478, endingBalance: 47320, realEndingBalance: 44600 },
    ],
    simulatorUrl
  }

  const html = await render(React.createElement(CompoundSimulationEmail, props), { pretty: true })

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Prévisualisation de l’email – Simulation d’intérêts composés</h1>
        <p className="text-sm text-gray-600">Lien de la calculatrice: <a className="underline" href={simulatorUrl}>{simulatorUrl}</a></p>
      </div>
      <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
        <iframe title="email-preview" className="w-full h-[900px]" srcDoc={html} />
      </div>
    </div>
  )
}


