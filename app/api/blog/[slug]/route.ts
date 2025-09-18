import { NextResponse } from "next/server"

import { getArticleBySlug } from "@/lib/articles"
import { parseIncludeParam, serializeArticle } from "../_serializer"

export async function GET(
  request: Request,
  { params }: { params: { slug?: string } }
) {
  const slug = params.slug?.trim()
  if (!slug) {
    return NextResponse.json({ error: "Slug manquant" }, { status: 400 })
  }

  const { searchParams } = new URL(request.url)
  const includeSet = parseIncludeParam(searchParams.get("include"))
  const includeAll = includeSet.has("all")

  const article = await getArticleBySlug(slug)

  if (!article) {
    return NextResponse.json({ error: "Article introuvable" }, { status: 404 })
  }

  const payload = serializeArticle(article, {
    includeContent: includeAll || includeSet.size === 0 || includeSet.has("content"),
    includeFaq: includeAll || includeSet.has("faq"),
    includeMetadata: includeAll || includeSet.has("metadata"),
    includeAuthor: includeAll || includeSet.has("author"),
    includeTags: includeAll || includeSet.has("tags"),
  })

  return NextResponse.json({ article: payload })
}

