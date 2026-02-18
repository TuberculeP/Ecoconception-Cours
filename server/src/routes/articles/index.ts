import { Router } from "express";
import pg from "../../config/db.config";
import { Article } from "../../config/entities/Article";
import { Category } from "../../config/entities/Category";
import redisCacheMiddleware from "../../middleware/redisCache";

const router = Router();
router.use(redisCacheMiddleware);

const articleRepo = () => pg.getRepository(Article);
const categoryRepo = () => pg.getRepository(Category);

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function extractFirstImage(content: string): string | null {
  const match = content.match(/!\[[^\]]*\]\(([^)]+)\)/);
  return match ? match[1] : null;
}

function enrichArticleWithCover<T extends { content: string }>(
  article: T,
): T & { coverImage: string | null } {
  return {
    ...article,
    coverImage: extractFirstImage(article.content),
  };
}

// GET /api/articles - Liste des articles publiés (public)
router.get("/", async (req, res) => {
  console.log("Fetching articles with query:", req.query);
  const page = parseInt(req.query.page as string) || 1;
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
  const offset = (page - 1) * limit;

  const [articles, total] = await articleRepo().findAndCount({
    where: { status: "published" },
    relations: ["author", "category"],
    order: { publishedAt: "DESC" },
    skip: offset,
    take: limit,
    select: {
      author: {
        id: true,
        firstName: true,
        lastName: true,
      },
    },
  });

  const totalPages = Math.ceil(total / limit);

  res.json({
    data: articles.map(enrichArticleWithCover),
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
});

// GET /api/articles/admin - Liste admin de tous les articles (authentifié)
router.get("/admin", async (req, res): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Non authentifié" });
    return;
  }

  const page = parseInt(req.query.page as string) || 1;
  const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
  const offset = (page - 1) * limit;

  const [articles, total] = await articleRepo().findAndCount({
    relations: ["author", "category"],
    order: { createdAt: "DESC" },
    skip: offset,
    take: limit,
    select: {
      author: {
        id: true,
        firstName: true,
        lastName: true,
      },
    },
  });

  const totalPages = Math.ceil(total / limit);

  res.json({
    data: articles.map(enrichArticleWithCover),
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
});

// GET /api/articles/categories - Liste des catégories
router.get("/categories", async (_req, res) => {
  const categories = await categoryRepo().find({
    order: { name: "ASC" },
  });
  res.json({ data: categories });
});

// POST /api/articles/categories - Créer une catégorie (authentifié)
router.post("/categories", async (req, res): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Non authentifié" });
    return;
  }

  const { name, description, color } = req.body;

  if (!name) {
    res.status(400).json({ error: "Le nom est requis" });
    return;
  }

  const slug = generateSlug(name);

  const existing = await categoryRepo().findOne({ where: { slug } });
  if (existing) {
    res.status(400).json({ error: "Une catégorie avec ce nom existe déjà" });
    return;
  }

  const category = categoryRepo().create({
    name,
    slug,
    description,
    color: color || "#3B82F6",
  });

  await categoryRepo().save(category);
  res.status(201).json({ data: category });
});

// Helper pour valider un UUID
const isUUID = (str: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

// GET /api/articles/:idOrSlug - Détail d'un article
router.get("/:idOrSlug", async (req, res): Promise<void> => {
  const { idOrSlug } = req.params;

  // Construire la condition de recherche selon le format du paramètre
  const whereCondition = isUUID(idOrSlug)
    ? [{ id: idOrSlug }, { slug: idOrSlug }]
    : [{ slug: idOrSlug }];

  const article = await articleRepo().findOne({
    where: whereCondition,
    relations: ["author", "category"],
  });

  if (!article) {
    res.status(404).json({ error: "Article non trouvé" });
    return;
  }

  // Incrémenter les vues pour les articles publiés
  if (article.status === "published") {
    await articleRepo().increment({ id: article.id }, "views", 1);
    article.views += 1;
  }

  res.json({ data: enrichArticleWithCover(article) });
});

// POST /api/articles - Créer un article (authentifié)
router.post("/", async (req, res): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Non authentifié" });
    return;
  }

  const { title, content, excerpt, categoryId, tags, status, featured } =
    req.body;

  if (!title || !content) {
    res.status(400).json({ error: "Le titre et le contenu sont requis" });
    return;
  }

  let slug = generateSlug(title);

  // Vérifier l'unicité du slug
  const existing = await articleRepo().findOne({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  const article = articleRepo().create({
    title,
    slug,
    content,
    excerpt: excerpt || content.substring(0, 200) + "...",
    categoryId,
    tags: tags || [],
    readTime: calculateReadTime(content),
    status: status || "draft",
    featured: featured || false,
    authorId: (req.user as any).id,
    publishedAt: status === "published" ? new Date() : undefined,
  });

  await articleRepo().save(article);

  const savedArticle = await articleRepo().findOne({
    where: { id: article.id },
    relations: ["author", "category"],
  });

  res
    .status(201)
    .json({ data: savedArticle ? enrichArticleWithCover(savedArticle) : null });
});

// PUT /api/articles/:id - Modifier un article (authentifié)
router.put("/:id", async (req, res): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Non authentifié" });
    return;
  }

  const article = await articleRepo().findOne({
    where: { id: req.params.id },
  });

  if (!article) {
    res.status(404).json({ error: "Article non trouvé" });
    return;
  }

  const { title, content, excerpt, categoryId, tags, status, featured } =
    req.body;

  // Mettre à jour le slug si le titre change
  if (title && title !== article.title) {
    let newSlug = generateSlug(title);
    const existing = await articleRepo().findOne({
      where: { slug: newSlug },
    });
    if (existing && existing.id !== article.id) {
      newSlug = `${newSlug}-${Date.now()}`;
    }
    article.slug = newSlug;
  }

  if (title) article.title = title;
  if (content) {
    article.content = content;
    article.readTime = calculateReadTime(content);
  }
  if (excerpt !== undefined) article.excerpt = excerpt;
  if (categoryId !== undefined) article.categoryId = categoryId;
  if (tags !== undefined) article.tags = tags;
  if (featured !== undefined) article.featured = featured;

  // Gérer le changement de status
  if (status && status !== article.status) {
    article.status = status;
    if (status === "published" && !article.publishedAt) {
      article.publishedAt = new Date();
    }
  }

  await articleRepo().save(article);

  const updatedArticle = await articleRepo().findOne({
    where: { id: article.id },
    relations: ["author", "category"],
  });

  res.json({
    data: updatedArticle ? enrichArticleWithCover(updatedArticle) : null,
  });
});

// DELETE /api/articles/:id - Supprimer un article (authentifié)
router.delete("/:id", async (req, res): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Non authentifié" });
    return;
  }

  const article = await articleRepo().findOne({
    where: { id: req.params.id },
  });

  if (!article) {
    res.status(404).json({ error: "Article non trouvé" });
    return;
  }

  await articleRepo().remove(article);
  res.json({ message: "Article supprimé" });
});

export default router;
