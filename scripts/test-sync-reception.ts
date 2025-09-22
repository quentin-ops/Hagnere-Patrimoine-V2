#!/usr/bin/env ts-node
/**
 * Script de test pour vérifier que l'endpoint de synchronisation fonctionne
 * Usage: npm run test:sync-reception
 */

// Exemple de payload que recevrait Patrimoine depuis Investissement
const testPayload = {
  source: "investissement-test",
  generatedAt: new Date().toISOString(),
  payload: {
    article: {
      slug: "test-article-sync-" + Date.now(),
      title: "Article de Test - Synchronisation",
      excerpt: "Ceci est un article de test pour vérifier la synchronisation",
      content: {
        type: "html",
        value: "<h2>Test de synchronisation</h2><p>Contenu HTML de l'article de test.</p>"
      },
      status: "DRAFT",
      publishedAt: null,
      coverImage: {
        url: "https://example.com/image.jpg",
        alt: "Image de test"
      },
      category: {
        slug: "test-category",
        name: "Catégorie Test",
        description: "Catégorie pour les tests"
      },
      tags: [
        { slug: "test", name: "Test" },
        { slug: "sync", name: "Synchronisation" }
      ],
      faq: [
        {
          question: "Est-ce un test ?",
          answer: "Oui, c'est un test de synchronisation."
        }
      ],
      readingTime: 5,
      seo: {
        title: "Test SEO Title",
        description: "Test SEO Description"
      },
      metadata: {
        testKey: "testValue"
      },
      featured: false
    }
  }
}

async function testSyncEndpoint() {
  const PORT = process.env.PORT || 3003
  const SECRET = process.env.PATRIMOINE_SYNC_SECRET || "dev-secret-local-123"
  const URL = `http://localhost:${PORT}/api/import/article`

  console.log("🧪 Test de l'endpoint de synchronisation")
  console.log("=" .repeat(60))
  console.log(`📍 URL: ${URL}`)
  console.log(`🔑 Secret: ${SECRET}`)
  console.log("")

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sync-secret": SECRET
      },
      body: JSON.stringify(testPayload)
    })

    const result = await response.json()

    if (response.ok) {
      console.log("✅ SUCCÈS !")
      console.log("Réponse:", JSON.stringify(result, null, 2))
      console.log("")
      console.log("L'article a été importé avec succès.")
      console.log(`ID: ${result.article?.id}`)
      console.log(`Slug: ${result.article?.slug}`)
      console.log(`Titre: ${result.article?.title}`)
    } else {
      console.error("❌ ERREUR", response.status)
      console.error("Réponse:", result)
    }
  } catch (error) {
    console.error("❌ Erreur de connexion:", error)
    console.error("")
    console.error("Vérifiez que :")
    console.error("1. Le serveur Next.js est lancé (npm run dev)")
    console.error(`2. Il tourne bien sur le port ${PORT}`)
    console.error("3. L'endpoint /api/import/article existe")
  }
}

// Exécuter le test
testSyncEndpoint()
