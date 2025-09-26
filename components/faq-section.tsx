import { MessageCircleQuestion } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqItems = [
  {
    question: "Quels sont les frais liés à votre service de gestion patrimoniale ?",
    answer: "Nos frais sont transparents dès le départ. Nous travaillons sur honoraires clairs pour le conseil, sans frais cachés, et avec possibilité de commission selon les solutions de placement. Vous recevez un devis précis avant toute mission."
  },
  {
    question: "À partir de quel montant de patrimoine peut-on bénéficier de vos services Elite / 360° ?",
    answer: "Nos services 360° s'adressent à tous dès 150 000 € de patrimoine. Le service Élite est réservé aux patrimoines plus élevés (supérieurs à 1-2 M€ selon la situation), avec un accompagnement ultra-personnalisé."
  },
  {
    question: "Que comprend exactement le bilan patrimonial gratuit que vous proposez ?",
    answer: "Ce bilan inclut une analyse complète de votre situation actuelle (fiscalité, immobilier, placements, retraite, transmission), l'identification de forces/faiblesses, et une proposition de pistes d'optimisation adaptées à vos objectifs."
  },
  {
    question: "Est-ce que je perds le contrôle de mes investissements si vous prenez en charge la gestion ?",
    answer: "Pas du tout. Nous élaborons avec vous une stratégie personnalisée. Chaque décision d'investissement est validée ensemble. Notre rôle est de vous conseiller, de vous proposer les meilleures options, mais la décision finale vous appartient."
  },
  {
    question: "Que se passe-t-il si la situation fiscale ou économique change (lois, marchés, épargne retraite…) ?",
    answer: "Nous assurons un suivi régulier et des revues de stratégie pour adapter votre plan patrimonial. Nous anticipons les réformes, surveillons les marchés, et ajustons les recommandations lorsque nécessaire."
  },
  {
    question: "Comment êtes-vous rémunérés ? Est-ce uniquement via honoraires ou aussi par rétrocessions ?",
    answer: "Notre rémunération est mixte, comprenant honoraires de conseil clairement définis dans la lettre de mission, et, lorsque cela est pertinent, des rétrocessions de partenaires. L'ensemble est transparent pour vous."
  },
  {
    question: "Est-ce que vos services conviennent si j'ai un patrimoine \"modeste\" ou si je débute dans l'investissement ?",
    answer: "Absolument. Bien que certains services premium soient destinés aux patrimoines élevés, nous proposons aussi des solutions adaptées aux personnes avec des actifs moins conséquents, pour les aider à construire et optimiser leur patrimoine dès aujourd'hui."
  },
  {
    question: "Quels sont les risques associés à vos recommandations / aux placements que vous proposez ?",
    answer: "Tous les investissements comportent un certain niveau de risque. Nous vous informons toujours des risques potentiels (volatilité, liquidité, fiscalité), et les stratégies que nous proposons sont calibrées selon votre tolérance au risque. Notre approche est prudente et diversifiée."
  },
  {
    question: "Comment se déroule la transmission de patrimoine, et quelles solutions sont possibles pour limiter les droits de succession ?",
    answer: "Nous identifions les dispositifs légaux adaptés (donation, démembrement, assurance-vie, pacte Dutreil, etc.) pour optimiser la transmission. Tout est fait dans le respect des obligations fiscales, pour protéger vos proches tout en limitant les charges."
  },
  {
    question: "Puis-je coupler des services professionnels et personnels dans votre accompagnement (entreprise, retraite, immobilier, etc.) ?",
    answer: "Oui. Nous travaillons de façon globale : vos actifs personnels et professionnels sont pris en compte pour construire une stratégie complète qui englobe fiscalité, retraite, immobilier, transmission, etc. Cela permet d'éviter les incohérences entre les différents volets de votre patrimoine."
  }
];

export function FAQSection() {
  return (
    <section className="py-32">
      <div className="border-y">
        <div className="container flex flex-col items-center gap-6 border-x py-4 max-lg:border-x lg:py-8 text-center">
          <Badge
            variant="outline"
            className="w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
          >
            <MessageCircleQuestion className="size-4" />
            <span>FAQ</span>
          </Badge>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            Tout ce que vous devez savoir
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            Vous cherchez des réponses rapides ? Consultez notre{" "}
            <span className="underline">section FAQ</span>.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="mx-auto max-w-3xl pt-8 pb-4 md:pb-8 lg:pt-[3.75rem] lg:pb-[50px]">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-[7px] border px-6 data-[state=open]:pb-2"
              >
                <AccordionTrigger className="py-5 text-start text-base tracking-[-0.32px] text-black dark:text-white">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base tracking-[-0.32px] text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
}