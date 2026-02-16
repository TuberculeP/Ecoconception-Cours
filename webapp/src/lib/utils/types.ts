export interface Foo {
  id: number;
  bar: string;
}

export type Note = {
  frequency: number;
  key: string;
  color: string;
  scale: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  role: string;
  following: User[];
  followers: Record<string, any>[];
  posts: Record<string, any>[];
  likedPosts: Record<string, any>[];
  subscription: Record<string, any>;
  sentMessages: Record<string, any>[];
  receivedMessages: Record<string, any>[];
  createdAt: Date;
};

export type ArticleStatus = "draft" | "published";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: number;
  views: number;
  status: ArticleStatus;
  featured: boolean;
  publishedAt: Date | null;
  author: Pick<User, "id" | "firstName" | "lastName"> | null;
  authorId: string | null;
  category: Category | null;
  categoryId: string | null;
  coverImage: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ArticleInput = {
  title: string;
  content: string;
  excerpt?: string;
  categoryId?: string;
  tags?: string[];
  status?: ArticleStatus;
  featured?: boolean;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};
