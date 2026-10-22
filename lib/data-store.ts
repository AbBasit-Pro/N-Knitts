import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { db, schema } from "@/db";
import { eq, desc } from "drizzle-orm";

export interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  category: string;
  client?: string;
  completionDate?: string;
  dimensions?: string;
  materials?: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  icon: string;
  category: string;
  features: string[]; // parsed array
  isActive: boolean;
  createdAt: string;
}

export interface ReviewItem {
  id: number;
  customerName: string;
  rating: number;
  review: string;
  image?: string;
  role?: string;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface MessageItem {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface SiteSettingsData {
  businessName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  operatingHours: string;
  aboutText: string;
  updatedAt: string;
}

export interface SocialLinkItem {
  id: number;
  platform: string;
  url: string;
  isEnabled: boolean;
}

// Initial realistic seed data
const initialData = {
  settings: {
    businessName: "N-Knitts",
    tagline: "Handmade with Love, One Stitch at a Time",
    email: "ayshanuml26@gmail.com",
    phone: "+923335484184",
    address: "Toronto, Ontario, Canada",
    operatingHours: "Monday – Friday: 10:00 AM – 6:00 PM | Saturday: 10:00 AM – 4:00 PM (By Appointment)",
    aboutText: "We are passionate about turning simple yarn into beautiful, handmade creations. Our mission is to create unique, high-quality knitting and crochet pieces with care, creativity, and love. We believe every stitch tells a story, and our goal is to bring warmth, comfort, and joy to every customer through handmade craftsmanship.",
    updatedAt: new Date().toISOString(),
  },
  socialLinks: [
    { id: 1, platform: "Instagram", url: "https://instagram.com/craftedcreations", isEnabled: true },
    { id: 2, platform: "Pinterest", url: "https://pinterest.com/craftedcreations", isEnabled: true },
    { id: 3, platform: "LinkedIn", url: "https://linkedin.com/company/craftedcreations", isEnabled: true },
    { id: 4, platform: "Facebook", url: "https://facebook.com/craftedcreations", isEnabled: true },
  ],
  services: [
    {
      id: 1,
      title: "Handmade Clothing",
      slug: "handmade-clothing",
      description: "Custom-fitted, beautifully styled handmade clothing tailored with premium wool, cotton, and organic yarns for cozy everyday elegance.",
      price: "Custom Estimate",
      icon: "Shirt",
      category: "Clothing",
      features: [
        "Custom body measurements & sizing",
        "Choice of premium natural yarns & blends",
        "Hand-stitched detailing & soft seamless finish",
        "Care instructions & extra matching yarn included"
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Personalized Gifts",
      slug: "personalized-gifts",
      description: "Heartwarming bespoke gifts made for birthdays, anniversaries, weddings, and holidays with custom names, initials, and themes.",
      price: "Starting at $35",
      icon: "Gift",
      category: "Gifts",
      features: [
        "Personalized initials or embroidered names",
        "Custom gift wrapping & note card available",
        "Special seasonal & milestone themes",
        "Quick turnaround on select gift items"
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Baby & Kids Collection",
      slug: "baby-kids-collection",
      description: "Ultra-soft, gentle, hypoallergenic knitwear designed specifically for babies, toddlers, and growing little ones.",
      price: "Starting at $45",
      icon: "Baby",
      category: "Kids & Baby",
      features: [
        "100% skin-safe, hypoallergenic baby-soft yarn",
        "Baby booties, beanies, sweaters & heirloom blankets",
        "Durable, easy-wash materials",
        "Adorable custom animal & pastel patterns"
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      title: "Matching Family Sets",
      slug: "matching-family-sets",
      description: "Coordinated handmade beanies, sweaters, and scarves for the entire family — ideal for holiday photo sessions and cozy winter outings.",
      price: "Starting at $85",
      icon: "Users",
      category: "Family Sets",
      features: [
        "Sized for infants, children, teens, and adults",
        "Unified color palettes and matching stitch motifs",
        "Durable comfort designed for active family memories",
        "Custom pet matching bandanas or sweaters upon request"
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 5,
      title: "Custom Colors & Designs",
      slug: "custom-colors-designs",
      description: "Have a specific color scheme, stitch pattern, or Pinterest reference in mind? We bring your one-of-a-kind vision to life.",
      price: "Custom Estimate",
      icon: "Palette",
      category: "Custom Design",
      features: [
        "One-on-one design consultation & palette matching",
        "Digital swatch & yarn sample approvals",
        "Complex stitch patterns (cable, lace, colorwork)",
        "Made to exact size & proportion specifications"
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 6,
      title: "Knitting Repairs & Restoration",
      slug: "knitting-repairs",
      description: "Expert restoration and repair for beloved heirloom knits, snagged garments, unraveling seams, and vintage handmade blankets.",
      price: "Starting at $25",
      icon: "Scissors",
      category: "Repair & Care",
      features: [
        "Precise yarn matching and tension replication",
        "Moth hole repairs, dropped stitch fixes & re-edging",
        "Preservation of sentimental heirloom garments",
        "Gentle steam blocking and conditioning finish"
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 7,
      title: "Bulk Orders & Events",
      slug: "bulk-orders",
      description: "Wholesale packages, corporate gifting, bridal party bundles, and boutique event favors crafted with consistent handcrafted quality.",
      price: "Volume Pricing",
      icon: "Package",
      category: "Bulk & Wholesale",
      features: [
        "Discounted tiered volume pricing",
        "Coordinated branding / custom label tags",
        "Reliable milestone schedules & batch shipping",
        "Dedicated order coordinator"
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  ],
  portfolio: [
    {
      id: 1,
      title: "The Oregonian Walnut Trestle Table",
      slug: "oregonian-walnut-trestle-table",
      description: "A ten-person communal dining table made from a single fallen Oregon Black Walnut tree, anchored by sculpted trestle legs with pinned mortise-and-tenon joints.",
      imageUrl: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80",
      category: "Handcrafted Furniture",
      client: "The Vance Family Residence, Lake Oswego",
      completionDate: "October 2025",
      dimensions: "114\" L x 42\" W x 30\" H",
      materials: "Oregon Black Walnut, Hand-forged brass pins, Osmo Polyx-Oil",
      featured: true,
      published: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Minimalist Floating Credenza & Media Unit",
      slug: "minimalist-floating-credenza",
      description: "Clean horizontal lines with continuous waterfall grain wrapping across the mitered corners. Features acoustic slats for concealed audio equipment.",
      imageUrl: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
      category: "Custom Woodwork",
      client: "Archstone Penthouse, Downtown Portland",
      completionDate: "January 2026",
      dimensions: "84\" L x 18\" D x 22\" H",
      materials: "Quarter-sawn White Oak, Matte Black Aluminum, Push-to-open Blum runners",
      featured: true,
      published: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Bespoke Chef's Kitchen Island & Breakfast Bar",
      slug: "bespoke-chefs-kitchen-island",
      description: "Integrated end-grain hard maple butcher block seamlessly joined with a solid honed quartz cantilevered bar for five casual diners.",
      imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      category: "Architectural Pieces",
      client: "Forest Park Modern Estate",
      completionDate: "March 2026",
      dimensions: "120\" L x 54\" W x 36\" H",
      materials: "Rock Maple End Grain, Rift White Oak cabinetry, Calacatta quartz",
      featured: true,
      published: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      title: "The Cascade Walnut Executive Desk",
      slug: "cascade-walnut-executive-desk",
      description: "A commanding yet slender desk with suspended drawers, integrated hidden wireless phone charger, and solid brass drawer pulls hand-turned on our metal lathe.",
      imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
      category: "Handcrafted Furniture",
      client: "Silverman Capital Office, Pearl District",
      completionDate: "August 2025",
      dimensions: "72\" L x 34\" W x 30\" H",
      materials: "American Black Walnut, Raw satin brushed brass, Horween leather inlay",
      featured: true,
      published: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 5,
      title: "Hand-Turned Spalted Maple Centerpiece Bowls",
      slug: "spalted-maple-centerpiece-bowls",
      description: "Limited series of wide, sculptural bowls turned from spalted big-leaf maple salvaged from the Columbia River Gorge windstorms.",
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
      category: "Home Decor",
      client: "Gallery Exhibition & Collector Edition",
      completionDate: "November 2025",
      dimensions: "18\" Diameter x 5\" H",
      materials: "Wild Spalted Bigleaf Maple, Certified organic beeswax finish",
      featured: false,
      published: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 6,
      title: "Geometric Slatted Cedar Pergola & Louver Wall",
      slug: "geometric-slatted-cedar-pergola",
      description: "Outdoor architectural shading installation designed to withstand Pacific Northwest winters while filtering optimal natural sunlight onto the patio.",
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      category: "Architectural Pieces",
      client: "West Hills Retreat",
      completionDate: "May 2026",
      dimensions: "16' L x 12' W x 10' H",
      materials: "Clear Western Red Cedar, Stainless steel hidden fastening brackets",
      featured: false,
      published: true,
      createdAt: new Date().toISOString(),
    },
  ],
  reviews: [
    {
      id: 1,
      customerName: "Eleanor & Marcus Vance",
      rating: 5,
      review: "Our custom dining table from Crafted Creations is the soul of our home. The joinery is exquisite, and you can feel the master craftsman's touch in every single curve and satin bevel. Visitors gasp the moment they walk in.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "Homeowner, Lake Oswego",
      isApproved: true,
      isFeatured: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    },
    {
      id: 2,
      customerName: "David Sterling, AIA",
      rating: 5,
      review: "As an architect, I hold millwork subcontractors to uncompromising standards. Crafted Creations delivered our penthouse cabinetry with surgical precision, dead-on tolerances, and remarkable communication.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      role: "Principal Architect, Sterling & Partners",
      isApproved: true,
      isFeatured: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString(),
    },
    {
      id: 3,
      customerName: "Sarah Lindqvist",
      rating: 5,
      review: "The executive desk completely elevated my productivity. The concealed wire management and leather inlay are works of art. Working from home now feels like an absolute privilege.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      role: "Managing Director, Tech Ventures",
      isApproved: true,
      isFeatured: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    },
    {
      id: 4,
      customerName: "Michael Chang",
      rating: 5,
      review: "Ordered a custom live edge coffee table. The team sent photos of the slab selection and in-progress milling. That level of hospitality and artisan pride is exceedingly rare today.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      role: "Interior Designer",
      isApproved: true,
      isFeatured: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    },
  ],
  messages: [
    {
      id: 1,
      name: "Arthur Pendelton",
      email: "arthur.pendelton@gmail.com",
      phone: "+1 (503) 774-9021",
      subject: "Custom 12-seater conference table inquiry",
      message: "Hello Crafted Creations, we are furnishing our law office in downtown and would love to commission a 14ft conference table with brass inlays and integrated power pods. Could you share current lead times and a ballpark estimate?",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
      id: 2,
      name: "Clara Morales",
      email: "clara@moralesdesign.co",
      phone: "+1 (415) 320-8819",
      subject: "Bespoke kitchen island millwork quote",
      message: "Hi! I am working on a residential renovation in Hood River and have architectural drawings ready for a custom white oak island and breakfast banquette. When is a good time for a call?",
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    },
  ],
};

const DATA_FILE_PATH = path.join(process.cwd(), "db", "local-storage.json");

function readLocalStore() {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      fs.mkdirSync(path.dirname(DATA_FILE_PATH), { recursive: true });
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const raw = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return initialData;
  }
}

function writeLocalStore(data: typeof initialData) {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE_PATH), { recursive: true });
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error persisting data store:", err);
  }
}

// ----------------- Site Settings -----------------
export async function getSiteSettings(): Promise<SiteSettingsData> {
  if (db) {
    try {
      const rows = await db.select().from(schema.siteSettings).limit(1);
      if (rows.length > 0) {
        const r = rows[0];
        return {
          businessName: r.businessName,
          tagline: r.tagline,
          email: r.email,
          phone: r.phone,
          address: r.address,
          operatingHours: r.operatingHours,
          aboutText: r.aboutText,
          updatedAt: r.updatedAt.toISOString(),
        };
      }
    } catch (e) {
      console.warn("DB query failed, fallback to local store", e);
    }
  }
  const store = readLocalStore();
  return store.settings;
}

export async function updateSiteSettings(data: Partial<SiteSettingsData>): Promise<SiteSettingsData> {
  const store = readLocalStore();
  store.settings = { ...store.settings, ...data, updatedAt: new Date().toISOString() };
  writeLocalStore(store);

  if (db) {
    try {
      const existing = await db.select().from(schema.siteSettings).limit(1);
      if (existing.length > 0) {
        await db.update(schema.siteSettings).set({
          businessName: store.settings.businessName,
          tagline: store.settings.tagline,
          email: store.settings.email,
          phone: store.settings.phone,
          address: store.settings.address,
          operatingHours: store.settings.operatingHours,
          aboutText: store.settings.aboutText,
          updatedAt: new Date(),
        }).where(eq(schema.siteSettings.id, existing[0].id));
      } else {
        await db.insert(schema.siteSettings).values({
          businessName: store.settings.businessName,
          tagline: store.settings.tagline,
          email: store.settings.email,
          phone: store.settings.phone,
          address: store.settings.address,
          operatingHours: store.settings.operatingHours,
          aboutText: store.settings.aboutText,
        });
      }
    } catch (e) {
      console.warn("DB update failed, persisted locally", e);
    }
  }

  return store.settings;
}

// ----------------- Social Links -----------------
export async function getSocialLinks(): Promise<SocialLinkItem[]> {
  const store = readLocalStore();
  return store.socialLinks;
}

export async function updateSocialLinks(links: SocialLinkItem[]): Promise<SocialLinkItem[]> {
  const store = readLocalStore();
  store.socialLinks = links;
  writeLocalStore(store);
  return store.socialLinks;
}

// ----------------- Portfolio Items -----------------
export async function getPortfolioItems(filter?: {
  publishedOnly?: boolean;
  featuredOnly?: boolean;
  category?: string;
  search?: string;
}): Promise<PortfolioItem[]> {
  const store = readLocalStore();
  let items = [...store.portfolio];

  if (filter?.publishedOnly) {
    items = items.filter((p: PortfolioItem) => p.published);
  }
  if (filter?.featuredOnly) {
    items = items.filter((p: PortfolioItem) => p.featured);
  }
  if (filter?.category && filter.category !== "All") {
    items = items.filter((p: PortfolioItem) => p.category.toLowerCase() === filter.category!.toLowerCase());
  }
  if (filter?.search) {
    const q = filter.search.toLowerCase();
    items = items.filter((p: PortfolioItem) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }

  return items;
}

export async function getPortfolioItemBySlug(slug: string): Promise<PortfolioItem | null> {
  const store = readLocalStore();
  const item = store.portfolio.find((p: PortfolioItem) => p.slug === slug);
  return item || null;
}

export async function getPortfolioItemById(id: number): Promise<PortfolioItem | null> {
  const store = readLocalStore();
  const item = store.portfolio.find((p: PortfolioItem) => p.id === id);
  return item || null;
}

export async function createPortfolioItem(data: Omit<PortfolioItem, "id" | "createdAt">): Promise<PortfolioItem> {
  const store = readLocalStore();
  const newId = store.portfolio.length > 0 ? Math.max(...store.portfolio.map((p: PortfolioItem) => p.id)) + 1 : 1;
  const newItem: PortfolioItem = {
    ...data,
    id: newId,
    createdAt: new Date().toISOString(),
  };
  store.portfolio.unshift(newItem);
  writeLocalStore(store);

  if (db) {
    try {
      await db.insert(schema.portfolio).values({
        title: newItem.title,
        slug: newItem.slug,
        description: newItem.description,
        imageUrl: newItem.imageUrl,
        category: newItem.category,
        client: newItem.client,
        completionDate: newItem.completionDate,
        dimensions: newItem.dimensions,
        materials: newItem.materials,
        featured: newItem.featured,
        published: newItem.published,
      });
    } catch (e) {
      console.warn("DB insert failed, stored in persistent local file", e);
    }
  }

  return newItem;
}

export async function updatePortfolioItem(id: number, data: Partial<PortfolioItem>): Promise<PortfolioItem | null> {
  const store = readLocalStore();
  const idx = store.portfolio.findIndex((p: PortfolioItem) => p.id === id);
  if (idx === -1) return null;

  store.portfolio[idx] = { ...store.portfolio[idx], ...data };
  writeLocalStore(store);

  if (db) {
    try {
      await db.update(schema.portfolio).set({
        title: store.portfolio[idx].title,
        slug: store.portfolio[idx].slug,
        description: store.portfolio[idx].description,
        imageUrl: store.portfolio[idx].imageUrl,
        category: store.portfolio[idx].category,
        client: store.portfolio[idx].client,
        completionDate: store.portfolio[idx].completionDate,
        dimensions: store.portfolio[idx].dimensions,
        materials: store.portfolio[idx].materials,
        featured: store.portfolio[idx].featured,
        published: store.portfolio[idx].published,
      }).where(eq(schema.portfolio.id, id));
    } catch (e) {
      console.warn("DB update failed, updated in local store", e);
    }
  }

  return store.portfolio[idx];
}

export async function deletePortfolioItem(id: number): Promise<boolean> {
  const store = readLocalStore();
  const beforeLen = store.portfolio.length;
  store.portfolio = store.portfolio.filter((p: PortfolioItem) => p.id !== id);
  writeLocalStore(store);

  if (db) {
    try {
      await db.delete(schema.portfolio).where(eq(schema.portfolio.id, id));
    } catch (e) {
      console.warn("DB delete failed, deleted from local store", e);
    }
  }

  return store.portfolio.length < beforeLen;
}

// ----------------- Services -----------------
export async function getServices(filter?: { activeOnly?: boolean; category?: string }): Promise<ServiceItem[]> {
  const store = readLocalStore();
  let items = [...store.services];
  if (filter?.activeOnly) {
    items = items.filter((s: ServiceItem) => s.isActive);
  }
  if (filter?.category && filter.category !== "All") {
    items = items.filter((s: ServiceItem) => s.category.toLowerCase() === filter.category!.toLowerCase());
  }
  return items;
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const store = readLocalStore();
  const item = store.services.find((s: ServiceItem) => s.slug === slug);
  return item || null;
}

export async function getServiceById(id: number): Promise<ServiceItem | null> {
  const store = readLocalStore();
  const item = store.services.find((s: ServiceItem) => s.id === id);
  return item || null;
}

export async function createService(data: Omit<ServiceItem, "id" | "createdAt">): Promise<ServiceItem> {
  const store = readLocalStore();
  const newId = store.services.length > 0 ? Math.max(...store.services.map((s: ServiceItem) => s.id)) + 1 : 1;
  const newItem: ServiceItem = {
    ...data,
    id: newId,
    createdAt: new Date().toISOString(),
  };
  store.services.push(newItem);
  writeLocalStore(store);

  if (db) {
    try {
      await db.insert(schema.services).values({
        title: newItem.title,
        slug: newItem.slug,
        description: newItem.description,
        price: newItem.price,
        icon: newItem.icon,
        category: newItem.category,
        features: JSON.stringify(newItem.features),
        isActive: newItem.isActive,
      });
    } catch (e) {
      console.warn("DB insert failed", e);
    }
  }

  return newItem;
}

export async function updateService(id: number, data: Partial<ServiceItem>): Promise<ServiceItem | null> {
  const store = readLocalStore();
  const idx = store.services.findIndex((s: ServiceItem) => s.id === id);
  if (idx === -1) return null;

  store.services[idx] = { ...store.services[idx], ...data };
  writeLocalStore(store);

  if (db) {
    try {
      await db.update(schema.services).set({
        title: store.services[idx].title,
        slug: store.services[idx].slug,
        description: store.services[idx].description,
        price: store.services[idx].price,
        icon: store.services[idx].icon,
        category: store.services[idx].category,
        features: JSON.stringify(store.services[idx].features),
        isActive: store.services[idx].isActive,
      }).where(eq(schema.services.id, id));
    } catch (e) {
      console.warn("DB update failed", e);
    }
  }

  return store.services[idx];
}

export async function deleteService(id: number): Promise<boolean> {
  const store = readLocalStore();
  const beforeLen = store.services.length;
  store.services = store.services.filter((s: ServiceItem) => s.id !== id);
  writeLocalStore(store);

  if (db) {
    try {
      await db.delete(schema.services).where(eq(schema.services.id, id));
    } catch (e) {
      console.warn("DB delete failed", e);
    }
  }

  return store.services.length < beforeLen;
}

// ----------------- Reviews -----------------
export async function getReviews(filter?: { approvedOnly?: boolean; featuredOnly?: boolean }): Promise<ReviewItem[]> {
  const store = readLocalStore();
  let items = [...store.reviews];
  if (filter?.approvedOnly) {
    items = items.filter((r: ReviewItem) => r.isApproved);
  }
  if (filter?.featuredOnly) {
    items = items.filter((r: ReviewItem) => r.isFeatured);
  }
  return items;
}

export async function createReview(data: Omit<ReviewItem, "id" | "createdAt">): Promise<ReviewItem> {
  const store = readLocalStore();
  const newId = store.reviews.length > 0 ? Math.max(...store.reviews.map((r: ReviewItem) => r.id)) + 1 : 1;
  const newItem: ReviewItem = {
    ...data,
    id: newId,
    createdAt: new Date().toISOString(),
  };
  store.reviews.unshift(newItem);
  writeLocalStore(store);

  if (db) {
    try {
      await db.insert(schema.reviews).values({
        customerName: newItem.customerName,
        rating: newItem.rating,
        review: newItem.review,
        image: newItem.image,
        role: newItem.role,
        isApproved: newItem.isApproved,
        isFeatured: newItem.isFeatured,
      });
    } catch (e) {
      console.warn("DB insert failed", e);
    }
  }

  return newItem;
}

export async function updateReview(id: number, data: Partial<ReviewItem>): Promise<ReviewItem | null> {
  const store = readLocalStore();
  const idx = store.reviews.findIndex((r: ReviewItem) => r.id === id);
  if (idx === -1) return null;

  store.reviews[idx] = { ...store.reviews[idx], ...data };
  writeLocalStore(store);

  if (db) {
    try {
      await db.update(schema.reviews).set({
        customerName: store.reviews[idx].customerName,
        rating: store.reviews[idx].rating,
        review: store.reviews[idx].review,
        image: store.reviews[idx].image,
        role: store.reviews[idx].role,
        isApproved: store.reviews[idx].isApproved,
        isFeatured: store.reviews[idx].isFeatured,
      }).where(eq(schema.reviews.id, id));
    } catch (e) {
      console.warn("DB update failed", e);
    }
  }

  return store.reviews[idx];
}

export async function deleteReview(id: number): Promise<boolean> {
  const store = readLocalStore();
  const beforeLen = store.reviews.length;
  store.reviews = store.reviews.filter((r: ReviewItem) => r.id !== id);
  writeLocalStore(store);

  if (db) {
    try {
      await db.delete(schema.reviews).where(eq(schema.reviews.id, id));
    } catch (e) {
      console.warn("DB delete failed", e);
    }
  }

  return store.reviews.length < beforeLen;
}

// ----------------- Messages -----------------
export async function getMessages(): Promise<MessageItem[]> {
  const store = readLocalStore();
  return store.messages;
}

export async function createMessage(data: Omit<MessageItem, "id" | "createdAt" | "isRead">): Promise<MessageItem> {
  const store = readLocalStore();
  const newId = store.messages.length > 0 ? Math.max(...store.messages.map((m: MessageItem) => m.id)) + 1 : 1;
  const newItem: MessageItem = {
    ...data,
    id: newId,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  store.messages.unshift(newItem);
  writeLocalStore(store);

  if (db) {
    try {
      await db.insert(schema.messages).values({
        name: newItem.name,
        email: newItem.email,
        phone: newItem.phone,
        subject: newItem.subject,
        message: newItem.message,
        isRead: false,
      });
    } catch (e) {
      console.warn("DB insert failed", e);
    }
  }

  return newItem;
}

export async function updateMessage(id: number, data: Partial<MessageItem>): Promise<MessageItem | null> {
  const store = readLocalStore();
  const idx = store.messages.findIndex((m: MessageItem) => m.id === id);
  if (idx === -1) return null;

  store.messages[idx] = { ...store.messages[idx], ...data };
  writeLocalStore(store);

  if (db) {
    try {
      await db.update(schema.messages).set({
        isRead: store.messages[idx].isRead,
      }).where(eq(schema.messages.id, id));
    } catch (e) {
      console.warn("DB update failed", e);
    }
  }

  return store.messages[idx];
}

export async function deleteMessage(id: number): Promise<boolean> {
  const store = readLocalStore();
  const beforeLen = store.messages.length;
  store.messages = store.messages.filter((m: MessageItem) => m.id !== id);
  writeLocalStore(store);

  if (db) {
    try {
      await db.delete(schema.messages).where(eq(schema.messages.id, id));
    } catch (e) {
      console.warn("DB delete failed", e);
    }
  }

  return store.messages.length < beforeLen;
}

// ----------------- Dashboard Stats -----------------
export async function getDashboardStats() {
  const store = readLocalStore();
  return {
    totalPortfolio: store.portfolio.length,
    publishedPortfolio: store.portfolio.filter((p: PortfolioItem) => p.published).length,
    totalServices: store.services.length,
    activeServices: store.services.filter((s: ServiceItem) => s.isActive).length,
    totalReviews: store.reviews.length,
    pendingReviews: store.reviews.filter((r: ReviewItem) => !r.isApproved).length,
    totalMessages: store.messages.length,
    unreadMessages: store.messages.filter((m: MessageItem) => !m.isRead).length,
  };
}

// ----------------- Admin Auth Verification -----------------
export async function verifyAdminCredentials(usernameOrEmail: string, passwordAttempt: string) {
  // Check if matches environment or default admin credentials
  const defaultAdmin = {
    username: process.env.ADMIN_USERNAME || "admin",
    email: process.env.ADMIN_EMAIL || "admin@craftedcreations.com",
    password: process.env.ADMIN_PASSWORD || "admin123",
  };

  const matchesUsername = usernameOrEmail.toLowerCase() === defaultAdmin.username.toLowerCase();
  const matchesEmail = usernameOrEmail.toLowerCase() === defaultAdmin.email.toLowerCase();

  if ((matchesUsername || matchesEmail) && passwordAttempt === defaultAdmin.password) {
    return {
      id: 1,
      username: defaultAdmin.username,
      email: defaultAdmin.email,
      role: "admin",
    };
  }

  // Also check database if initialized
  if (db) {
    try {
      const users = await db.select().from(schema.users).where(eq(schema.users.username, usernameOrEmail)).limit(1);
      if (users.length > 0) {
        const user = users[0];
        const isValid = await bcrypt.compare(passwordAttempt, user.passwordHash);
        if (isValid) {
          return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
          };
        }
      }
    } catch (e) {
      console.warn("DB user lookup error:", e);
    }
  }

  return null;
}
