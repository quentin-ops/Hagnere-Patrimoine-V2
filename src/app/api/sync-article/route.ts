import { NextResponse } from "next/server"

export async function POST(req: Request) {
  console.log("🆕 NOUVELLE API sync-article")
  
  try {
    const body = await req.json()
    const article = body?.payload?.article || body?.article || body
    
    console.log("✅ Article reçu sur /api/sync-article:", article?.slug || "pas de slug")
    
    // Toujours retourner succès pour test
    return NextResponse.json({
      success: true,
      message: "Article synchronisé via nouvelle API",
      article: {
        slug: article?.slug || "unknown",
        title: article?.title || "Sans titre"
      }
    })
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 })
  }
}

