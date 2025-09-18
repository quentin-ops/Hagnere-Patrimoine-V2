import { NextResponse } from "next/server"

import { getPublishedArticles } from "@/lib/articles"
import { parseIncludeParam, serializeArticle } from "../_serializer"

const DEFAULT_LIMIT = 20
const MAX_LIMIT = 100

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function parseNumber(param: string | null, fallback: number) {
  if (!param) return fallback
  const value = Number.parseInt(param, 10)
  if (Number.isNaN(value)) return fallback
  return value
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const limitParam = searchParams.get("limit")
  const offsetParam = searchParams.get("offset")
  const pageParam = searchParams.get("page")
  const searchParam = searchParams.get("search") ?? searchParams.get("q")
  const categoryParam = searchParams.get("category") ?? undefined
  const includeSet = parseIncludeParam(searchParams.get("include"))

  let limit = clamp(parseNumber(limitParam, DEFAULT_LIMIT), 1, MAX_LIMIT)
  let offset = clamp(parseNumber(offsetParam, 0), 0, Number.MAX_SAFE_INTEGER)

  if (!offsetParam && pageParam) {
    const page = Math.max(1, parseNumber(pageParam, 1))
    offset = (page - 1) * limit
  }

  const { articles, total } = await getPublishedArticles({
    limit,
    offset,
    search: searchParam ?? undefined,
    categorySlug: categoryParam,
  })

  const payload = articles.map((article) =>
    serializeArticle(article, {
      includeContent: includeSet.has("content"),
      includeFaq: includeSet.has("faq"),
      includeMetadata: includeSet.has("metadata"),
      includeAuthor: includeSet.has("author"),
      includeTags: includeSet.has("tags"),
    })
  )

  return NextResponse.json({
    total,
    count: payload.length,
    limit,
    offset,
    articles: payload,
  })
}
