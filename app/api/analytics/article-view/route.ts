import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { articleId } = await request.json()

    if (!articleId) {
      return NextResponse.json(
        { error: 'Article ID required' },
        { status: 400 }
      )
    }

    // Incrémenter le compteur de vues (si vous avez un champ viewCount)
    // await prisma.article.update({
    //   where: { id: articleId },
    //   data: {
    //     viewCount: { increment: 1 }
    //   }
    // })

    // Ou créer un log de vue
    // await prisma.articleView.create({
    //   data: {
    //     articleId,
    //     viewedAt: new Date(),
    //     ip: request.headers.get('x-forwarded-for') || 'unknown'
    //   }
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to track view:', error)
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    )
  }
}
