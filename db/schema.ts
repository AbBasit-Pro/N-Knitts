import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").default("admin").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  icon: text("icon").default("Hammer").notNull(),
  category: text("category").notNull(),
  features: text("features"), // JSON stringified array of feature bullets
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const portfolio = pgTable("portfolio", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  client: text("client"),
  completionDate: text("completion_date"),
  dimensions: text("dimensions"),
  materials: text("materials"),
  featured: boolean("featured").default(false).notNull(),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  rating: integer("rating").notNull().default(5),
  review: text("review").notNull(),
  image: text("image"),
  role: text("role"),
  isApproved: boolean("is_approved").default(true).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull().default("Crafted Creations"),
  tagline: text("tagline").notNull().default("Bespoke Woodworking & Artisan Furniture"),
  email: text("email").notNull().default("hello@craftedcreations.com"),
  phone: text("phone").notNull().default("+1 (555) 349-2810"),
  address: text("address").notNull().default("148 Artisan Way, Millwood Workshop, Portland, OR 97201"),
  operatingHours: text("operating_hours").notNull().default("Monday – Friday: 8:00 AM – 6:00 PM, Saturday: By Appointment"),
  aboutText: text("about_text").notNull().default("Crafted Creations represents the pinnacle of modern heirloom carpentry. Combining generational woodcraft methods with sustainable hardwoods and minimalist contemporary design, we design timeless spaces and furniture tailored to your life."),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  isEnabled: boolean("is_enabled").default(true).notNull(),
});
