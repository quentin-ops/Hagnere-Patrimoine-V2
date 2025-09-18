-- Article categories
CREATE TABLE "ArticleCategory" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "description" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ArticleCategory_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ArticleCategory_slug_key" ON "ArticleCategory"("slug");

-- Tags
CREATE TABLE "Tag" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- Articles
CREATE TABLE "Article" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "excerpt" TEXT,
  "content" JSONB NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "readingMinutes" INTEGER,
  "coverImageUrl" TEXT,
  "coverImageAlt" TEXT,
  "seoTitle" TEXT,
  "seoDescription" TEXT,
  "metadata" JSONB,
  "faq" JSONB,
  "categoryId" TEXT,
  "imagePrompt" TEXT,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "currentVersion" INTEGER NOT NULL DEFAULT 1,
  CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
CREATE INDEX "Article_updatedAt_idx" ON "Article"("updatedAt");

-- Sync logs
CREATE TABLE "ArticleSyncLog" (
  "id" TEXT NOT NULL,
  "articleId" TEXT,
  "source" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "error" TEXT,
  "payload" JSONB,
  "response" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ArticleSyncLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ArticleSyncLog_createdAt_idx" ON "ArticleSyncLog"("createdAt");

-- Join table for Article <-> Tag
CREATE TABLE "_ArticleTags" (
  "A" TEXT NOT NULL,
  "B" TEXT NOT NULL
);

CREATE UNIQUE INDEX "_ArticleTags_AB_unique" ON "_ArticleTags"("A", "B");
CREATE INDEX "_ArticleTags_B_index" ON "_ArticleTags"("B");

-- Foreign keys
ALTER TABLE "Article"
  ADD CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ArticleCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ArticleSyncLog"
  ADD CONSTRAINT "ArticleSyncLog_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_ArticleTags"
  ADD CONSTRAINT "_ArticleTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_ArticleTags"
  ADD CONSTRAINT "_ArticleTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

