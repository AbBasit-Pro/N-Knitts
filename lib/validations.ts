import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username or email must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().optional().or(z.literal("")),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const portfolioSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z.string().min(1, "Image URL or uploaded image is required"),
  category: z.string().min(2, "Category is required"),
  client: z.string().optional(),
  completionDate: z.string().optional(),
  dimensions: z.string().optional(),
  materials: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export const serviceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().min(10, "Description is required"),
  price: z.string().min(1, "Price or starting rate is required"),
  icon: z.string().default("Hammer"),
  category: z.string().min(2, "Category is required"),
  features: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const reviewSchema = z.object({
  customerName: z.string().min(2, "Your name is required"),
  rating: z.number().min(1).max(5),
  review: z.string().min(10, "Review must be at least 10 characters"),
  role: z.string().optional(),
  image: z.string().optional(),
  isApproved: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

export const settingsSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  tagline: z.string().min(2, "Tagline is required"),
  email: z.string().email("Valid business email is required"),
  phone: z.string().min(5, "Phone is required"),
  address: z.string().min(5, "Address is required"),
  operatingHours: z.string().min(5, "Operating hours are required"),
  aboutText: z.string().min(10, "About text must be comprehensive"),
});
