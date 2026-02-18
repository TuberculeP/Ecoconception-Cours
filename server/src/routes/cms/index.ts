import { Router } from "express";
import {
  articles,
  authors,
  categories,
  testimonials,
  statistics,
  getArticleBySlug,
  getArticleById,
  getAuthorById,
  getCategoryById,
  getArticlesByCategory,
  getArticlesByAuthor,
  getFeaturedArticles,
  getRecentArticles,
  searchArticles,
  getFeaturedTestimonials,
} from "../../data/cms.mock";

import buildRedisCacheMiddleware from "../../middleware/redisCache";
import buildCacheMiddleware from "../../middleware/cache";

const isProd = process.env.NODE_ENV === "production";
const selectedCache = isProd
  ? buildRedisCacheMiddleware()
  : buildCacheMiddleware();

const router = Router();
router.use(selectedCache);

// GET /api/cms/articles - Liste paginée des articles
router.get("/articles", async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
  const categoryId = req.query.category as string;
  const authorId = req.query.author as string;
  const featured = req.query.featured === "true";
  const search = req.query.search as string;

  let filteredArticles = articles.filter((a) => a.status === "published");

  if (categoryId) {
    filteredArticles = filteredArticles.filter(
      (a) => a.categoryId === categoryId,
    );
  }

  if (authorId) {
    filteredArticles = filteredArticles.filter((a) => a.authorId === authorId);
  }

  if (featured) {
    filteredArticles = filteredArticles.filter((a) => a.featured);
  }

  if (search) {
    const lowerSearch = search.toLowerCase();
    filteredArticles = filteredArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(lowerSearch) ||
        a.excerpt.toLowerCase().includes(lowerSearch) ||
        a.tags.some((t) => t.toLowerCase().includes(lowerSearch)),
    );
  }

  // Tri par date de publication
  filteredArticles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const total = filteredArticles.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const paginatedArticles = filteredArticles.slice(offset, offset + limit);

  // Enrichir avec auteur et catégorie
  const enrichedArticles = paginatedArticles.map((article) => ({
    ...article,
    author: getAuthorById(article.authorId),
    category: getCategoryById(article.categoryId),
  }));

  res.json({
    data: enrichedArticles,
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

// GET /api/cms/articles/featured - Articles mis en avant
router.get("/articles/featured", async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit as string) || 3, 10);
  const featuredArticles = getFeaturedArticles().slice(0, limit);

  const enrichedArticles = featuredArticles.map((article) => ({
    ...article,
    author: getAuthorById(article.authorId),
    category: getCategoryById(article.categoryId),
  }));

  res.json({ data: enrichedArticles });
});

// GET /api/cms/articles/recent - Articles récents
router.get("/articles/recent", async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit as string) || 5, 20);
  const recentArticles = getRecentArticles(limit);

  const enrichedArticles = recentArticles.map((article) => ({
    ...article,
    author: getAuthorById(article.authorId),
    category: getCategoryById(article.categoryId),
  }));

  res.json({ data: enrichedArticles });
});

// GET /api/cms/articles/search - Recherche d'articles
router.get("/articles/search", async (req, res): Promise<void> => {
  const query = req.query.q as string;
  if (!query || query.length < 2) {
    res.status(400).json({ error: "Query must be at least 2 characters" });
    return;
  }

  const results = searchArticles(query);
  const enrichedResults = results.map((article) => ({
    ...article,
    author: getAuthorById(article.authorId),
    category: getCategoryById(article.categoryId),
  }));

  res.json({ data: enrichedResults, query, count: enrichedResults.length });
});

// GET /api/cms/articles/:idOrSlug - Détail d'un article
router.get("/articles/:idOrSlug", async (req, res): Promise<void> => {
  const { idOrSlug } = req.params;
  let article = getArticleById(idOrSlug) || getArticleBySlug(idOrSlug);

  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }

  // Simuler l'incrément de vues
  article = { ...article, views: article.views + 1 };

  const author = getAuthorById(article.authorId);
  const category = getCategoryById(article.categoryId);

  // Articles similaires (même catégorie)
  const relatedArticles = getArticlesByCategory(article.categoryId)
    .filter((a) => a.id !== article!.id)
    .slice(0, 3)
    .map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      coverImage: a.coverImage,
      readTime: a.readTime,
      publishedAt: a.publishedAt,
    }));

  res.json({
    data: {
      ...article,
      author,
      category,
      relatedArticles,
    },
  });
});

// GET /api/cms/categories - Liste des catégories
router.get("/categories", async (_req, res) => {
  // Recalculer le nombre d'articles par catégorie
  const enrichedCategories = categories.map((cat) => ({
    ...cat,
    articleCount: articles.filter(
      (a) => a.categoryId === cat.id && a.status === "published",
    ).length,
  }));

  res.json({ data: enrichedCategories });
});

// GET /api/cms/categories/:idOrSlug - Détail d'une catégorie avec ses articles
router.get("/categories/:idOrSlug", async (req, res): Promise<void> => {
  const { idOrSlug } = req.params;
  const category = categories.find(
    (c) => c.id === idOrSlug || c.slug === idOrSlug,
  );

  if (!category) {
    res.status(404).json({ error: "Category not found" });
    return;
  }

  const categoryArticles = getArticlesByCategory(category.id).map(
    (article) => ({
      ...article,
      author: getAuthorById(article.authorId),
    }),
  );

  res.json({
    data: {
      ...category,
      articles: categoryArticles,
    },
  });
});

// GET /api/cms/authors - Liste des auteurs
router.get("/authors", async (_req, res) => {
  const enrichedAuthors = authors.map((author) => ({
    ...author,
    articleCount: articles.filter(
      (a) => a.authorId === author.id && a.status === "published",
    ).length,
  }));

  res.json({ data: enrichedAuthors });
});

// GET /api/cms/authors/:id - Détail d'un auteur avec ses articles
router.get("/authors/:id", async (req, res): Promise<void> => {
  const author = getAuthorById(req.params.id);

  if (!author) {
    res.status(404).json({ error: "Author not found" });
    return;
  }

  const authorArticles = getArticlesByAuthor(author.id).map((article) => ({
    ...article,
    category: getCategoryById(article.categoryId),
  }));

  res.json({
    data: {
      ...author,
      articles: authorArticles,
    },
  });
});

// GET /api/cms/testimonials - Témoignages
router.get("/testimonials", async (req, res) => {
  const featured = req.query.featured === "true";
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 20);

  let result = featured ? getFeaturedTestimonials() : testimonials;
  result = result.slice(0, limit);

  res.json({ data: result });
});

// GET /api/cms/statistics - Statistiques
router.get("/statistics", async (_req, res) => {
  res.json({ data: statistics });
});

// GET /api/cms/tags - Liste des tags avec leur fréquence
router.get("/tags", async (_req, res) => {
  const tagCounts: Record<string, number> = {};

  articles
    .filter((a) => a.status === "published")
    .forEach((article) => {
      article.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

  const tags = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  res.json({ data: tags });
});

// GET /api/cms/homepage - Données agrégées pour la page d'accueil
router.get("/homepage", async (_req, res) => {
  const featuredArticles = getFeaturedArticles()
    .slice(0, 3)
    .map((article) => ({
      ...article,
      author: getAuthorById(article.authorId),
      category: getCategoryById(article.categoryId),
    }));

  const recentArticles = getRecentArticles(6).map((article) => ({
    ...article,
    author: getAuthorById(article.authorId),
    category: getCategoryById(article.categoryId),
  }));

  const featuredTestimonials = getFeaturedTestimonials().slice(0, 6);

  res.json({
    data: {
      featuredArticles,
      recentArticles,
      categories: categories.slice(0, 6),
      testimonials: featuredTestimonials,
      statistics,
    },
  });
});

export default router;
