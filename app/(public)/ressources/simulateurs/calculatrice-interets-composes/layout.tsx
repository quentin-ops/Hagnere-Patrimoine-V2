import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Calculatrice d'intérêts composés : formule, simulation et conseils",
  description: "Utilisez notre calculatrice d'intérêts composés pour estimer la croissance exponentielle de votre épargne. Indiquez votre capital, vos versements et le taux : l'outil calcule vos intérêts sur intérêts et la valeur finale de votre investissement",
  keywords: "calculatrice intérêts composés, simulateur intérêts composés, calcul intérêts composés, formule intérêts composés, intérêt composé, capitalisation, épargne, placement, investissement, rendement",
  openGraph: {
    title: "Calculatrice d'intérêts composés : formule, simulation et conseils",
    description: "Utilisez notre calculatrice d'intérêts composés pour estimer la croissance exponentielle de votre épargne. Indiquez votre capital, vos versements et le taux : l'outil calcule vos intérêts sur intérêts et la valeur finale de votre investissement",
    type: 'website',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}