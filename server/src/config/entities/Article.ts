import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

export type ArticleStatus = "draft" | "published";

@Entity()
export class Article {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: "text", nullable: true })
  excerpt: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "simple-array", nullable: true })
  tags: string[];

  @Column({ default: 0 })
  readTime: number;

  @Column({ default: 0 })
  views: number;

  @Column({ default: "draft" })
  status: ArticleStatus;

  @Column({ default: false })
  featured: boolean;

  @Column({ nullable: true })
  publishedAt: Date;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "authorId" })
  author: User;

  @Column({ nullable: true })
  authorId: string;

  @ManyToOne(() => Category, (category) => category.articles, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @Column({ nullable: true })
  categoryId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
