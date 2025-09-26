import { Ripple } from "@/components/ui/ripple"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTARippleSection() {
  return (
    <section className="relative min-h-[600px] w-full overflow-hidden bg-background py-20">
      <div className="absolute inset-0 flex items-center justify-center">
        <Ripple />
      </div>
      <div className="relative z-10 flex h-full min-h-[500px] flex-col items-center justify-center gap-6 px-4">
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Démarrer immédiatement !
        </h2>
        <p className="text-center text-lg text-muted-foreground md:text-xl max-w-2xl">
          Prenez rendez-vous dès maintenant pour un bilan patrimonial gratuit et personnalisé
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/contact">
              Prendre rendez-vous
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/services">
              Découvrir nos services
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
