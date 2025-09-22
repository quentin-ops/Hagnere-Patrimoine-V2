import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const unreadCount = await prisma.contactMessage.count({
      where: {
        status: 'UNREAD'
      }
    })

    return NextResponse.json({ count: unreadCount })
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre de messages non lus:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
