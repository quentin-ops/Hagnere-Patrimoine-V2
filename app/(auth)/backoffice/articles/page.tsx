import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"

import { authOptions } from "@/lib/auth-options"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const DATE_FORMAT = new Intl.DateTimeFormat("fr-FR", {
  year: "numeric",
  month: "long",
  day: "2-digit",
})

const DATE_TIME_FORMAT = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
})

function formatDate(date: Date | null) {
  if (!date) return "Non publié"
  return DATE_FORMAT.format(date)
}

function formatDateTime(date: Date) {
  return DATE_TIME_FORMAT.format(date)
}

const STATUS_LABELS: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  PUBLISHED: { label: "Publié", variant: "default" },
  DRAFT: { label: "Brouillon", variant: "outline" },
  ARCHIVED: { label: "Archivé", variant: "destructive" },
  SCHEDULED: { label: "Programmé", variant: "secondary" },
}

export default async function BackofficeArticlesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/connexion")
  }

  const articles = await prisma.article.findMany({
    orderBy: [
      { publishedAt: "desc" },
      { updatedAt: "desc" },
    ],
    include: {
      category: true,
      tags: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
    take: 250,
  })

  const stats = articles.reduce(
    (acc, article) => {
      acc.total += 1
      switch (article.status) {
        case "PUBLISHED":
          acc.published += 1
          break
        case "DRAFT":
          acc.draft += 1
          break
        case "SCHEDULED":
          acc.scheduled += 1
          break
        default:
          acc.other += 1
          break
      }
      return acc
    },
    { total: 0, published: 0, draft: 0, scheduled: 0, other: 0 }
  )

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Articles</h1>
        <p className="text-muted-foreground">
          Consultation des contenus synchronisés depuis Hagnéré Investissement. Les mises à jour éditoriales restent centralisées sur la plateforme d&apos;origine.
        </p>
      </div>

        <Alert>
          <AlertTitle>Gestion centralisée sur Hagnéré Investissement</AlertTitle>
          <AlertDescription>
            Les textes, images et métadonnées sont importés automatiquement. Pour modifier un article, intervenez depuis le back-office Hagnéré Investissement puis relancez une synchronisation.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Articles totaux</CardTitle>
              <CardDescription>Toutes sources confondues</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{stats.total}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">En ligne</CardTitle>
              <CardDescription>Articles publiés</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-green-600 dark:text-green-400">
              {stats.published}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Brouillons</CardTitle>
              <CardDescription>En attente de publication</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-muted-foreground">
              {stats.draft}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Programmés / autres</CardTitle>
              <CardDescription>Articles programmés ou archivés</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-primary">
              {stats.scheduled + stats.other}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Articles synchronisés</CardTitle>
              <CardDescription>
                Dernières mises à jour classées par date de publication. Cliquez sur « Voir en ligne » pour ouvrir la version publique.
              </CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/api/blog/published" target="_blank" rel="noreferrer">
                Consulter l&apos;API
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Publication</TableHead>
                  <TableHead>Dernière mise à jour</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => {
                  const statusMeta = STATUS_LABELS[article.status] ?? {
                    label: article.status,
                    variant: "secondary" as const,
                  }

                  return (
                    <TableRow key={article.id}>
                      <TableCell className="max-w-[320px]">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-sm sm:text-base leading-snug">
                            {article.title}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant={statusMeta.variant}>{statusMeta.label}</Badge>
                            {article.featured ? (
                              <Badge variant="secondary">Mis en avant</Badge>
                            ) : null}
                            {article.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag.id} variant="outline">
                                #{tag.name}
                              </Badge>
                            ))}
                            {article.tags.length > 2 ? (
                              <Badge variant="outline">+{article.tags.length - 2}</Badge>
                            ) : null}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <span className="text-sm text-muted-foreground">
                          {statusMeta.label}
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                        {article.category?.name ?? "Non catégorisé"}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm">
                        {formatDate(article.publishedAt)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                        {formatDateTime(article.updatedAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button asChild size="sm" variant="outline">
                            <Link
                              href={`/ressources/blog/${article.slug}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Voir en ligne
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            {articles.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                Aucun article n&apos;a encore été synchronisé.
              </p>
            ) : null}
          </CardContent>
        </Card>
    </div>
  )
}
