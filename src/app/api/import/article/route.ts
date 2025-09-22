import { NextResponse } from "next/server"
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(req: Request) {
  console.log("📨 API Import Article - VERSION SIMPLIFIÉE")
  
  try {
    const body = await req.json()
    
    // Accepter TOUT payload qui contient un article
    const article = body?.payload?.article || body?.article || body
    
    if (!article || !article.slug) {
      return NextResponse.json(
        { error: "Article ou slug manquant" },
        { status: 400 }
      )
    }
    
    console.log("✅ Article reçu:", {
      slug: article.slug,
      title: article.title || "Sans titre"
    })
    
    // Sauvegarder dans un fichier pour debug
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `article-${article.slug}-${timestamp}.json`
    const filepath = join(process.cwd(), 'received-articles', filename)
    
    await mkdir(join(process.cwd(), 'received-articles'), { recursive: true })
    await writeFile(filepath, JSON.stringify(body, null, 2))
    
    console.log("💾 Sauvegardé:", filename)
    
    // TOUJOURS retourner succès pour débugger
    return NextResponse.json({
      success: true,
      message: `Article ${article.slug} reçu avec succès`,
      article: {
        id: article.id || "generated-id",
        slug: article.slug,
        title: article.title || "Sans titre",
        status: article.status || "DRAFT"
      },
      savedTo: filename
    }, { status: 200 })
    
  } catch (error) {
    console.error("❌ Erreur:", error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Erreur lors de l'import",
        debug: "Version simplifiée - accepte tout"
      },
      { status: 500 }
    )
  }
}