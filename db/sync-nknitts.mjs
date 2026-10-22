import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";

const siteSettings = {
  business_name: "N-Knitts",
  tagline: "Handmade with Love, One Stitch at a Time",
  email: "ayshanuml26@gmail.com",
  phone: "+923335484184",
  address: "Toronto, Ontario, Canada",
  operating_hours: "Monday – Friday: 10:00 AM – 6:00 PM | Saturday: 10:00 AM – 4:00 PM (By Appointment)",
  about_text: "We are passionate about turning simple yarn into beautiful, handmade creations. Our mission is to create unique, high-quality knitting and crochet pieces with care, creativity, and love. We believe every stitch tells a story, and our goal is to bring warmth, comfort, and joy to every customer through handmade craftsmanship."
};

const socialLinks = [
  { platform: "Instagram", url: "https://instagram.com/nknitts", is_enabled: true },
  { platform: "Pinterest", url: "https://pinterest.com/nknitts", is_enabled: true },
  { platform: "Facebook", url: "https://facebook.com/nknitts", is_enabled: true },
];

const portfolio = [
  {
    title: "Chunky Cable-Knit Wool Sweater",
    slug: "chunky-cable-knit-sweater",
    description: "An ultra-cozy, handcrafted cable-knit sweater made with 100% natural Peruvian Highland wool. Designed for warmth, relaxed modern drape, and heirloom longevity.",
    image_url: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80",
    category: "Handmade Clothing",
    client: "Bespoke Winter Commission",
    completion_date: "November 2025",
    dimensions: "Size M / Custom Measurements",
    materials: "100% Pure Highland Wool, Natural Oat Shade",
    featured: true,
  },
  {
    title: "Heirloom Pastel Baby Beanie & Booties Set",
    slug: "heirloom-pastel-baby-set",
    description: "A gentle, hypoallergenic crochet gift set including a ribbed pompom beanie, cozy snug booties, and a matching miniature swaddle blanket for newborn photography.",
    image_url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80",
    category: "Baby & Kids",
    client: "Welcome Baby Eleanor Gift Set",
    completion_date: "January 2026",
    dimensions: "Newborn – 6 Months",
    materials: "Organic Bamboo Cotton Blend (Hypoallergenic)",
    featured: true,
  },
  {
    title: "Coordinated Winter Family Beanie Set",
    slug: "coordinated-winter-family-set",
    description: "A matching set of 4 custom beanies for two parents and two toddlers featuring ribbed turn-up brims, removable faux-fur poms, and customized engraved leather tags.",
    image_url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1200&q=80",
    category: "Family Sets",
    client: "The Harrison Family Holiday Photo Shoot",
    completion_date: "December 2025",
    dimensions: "2 Adult (Unisex), 2 Kids (Ages 3 & 5)",
    materials: "Merino Wool Blend, Vegan Leather Tags",
    featured: true,
  },
  {
    title: "Hand-Crocheted Textured Throw Blanket",
    slug: "hand-crocheted-textured-throw-blanket",
    description: "A generous textured waffle-stitch crochet blanket designed to add tactile warmth to any living room sofa or reading nook.",
    image_url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
    category: "Home Decor",
    client: "Modern Living Collection",
    completion_date: "February 2026",
    dimensions: "50\" W x 65\" L",
    materials: "Chunky Chenille & Organic Cotton",
    featured: true,
  },
  {
    title: "Personalized Monogrammed Baby Blanket",
    slug: "personalized-monogrammed-baby-blanket",
    description: "A delicate scalloped crochet blanket with custom hand-embroidered initials in subtle blush rose and ivory accents.",
    image_url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    category: "Gifts & Accessories",
    client: "Bespoke Baby Shower Order",
    completion_date: "March 2026",
    dimensions: "36\" x 42\"",
    materials: "Extra-fine Merino Wool, Silk Ribbon Detailing",
    featured: false,
  },
  {
    title: "Artisan Cable Infinity Scarf & Fingerless Mitts",
    slug: "artisan-cable-infinity-scarf-mitts",
    description: "A rich honey-mustard cable knit infinity loop scarf with matching fingerless texting gloves, knit with seamless hand construction.",
    image_url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80",
    category: "Handmade Clothing",
    client: "Autumn Boutique Capsule",
    completion_date: "October 2025",
    dimensions: "Scarf: 60\" circumference x 12\" width",
    materials: "Superwash Merino Wool & Alpaca Blend",
    featured: false,
  },
];

const reviews = [
  {
    customer_name: "Emily & Daniel Vance",
    rating: 5,
    review: "The matching family beanies we ordered for our winter holiday trip were incredible! You can instantly feel the quality of the yarn and the craftsmanship in every stitch. They kept our little ones so warm and looked gorgeous in photos.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    role: "Mother of Two, Toronto",
    is_approved: true,
    is_featured: true,
  },
  {
    customer_name: "Jessica Morales",
    rating: 5,
    review: "I ordered a personalized baby blanket for my sister’s baby shower. It arrived packaged with so much care and attention to detail. The yarn is cloud-soft and completely hypoallergenic. An heirloom piece we will treasure forever!",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    role: "Gift Giver, Montreal",
    is_approved: true,
    is_featured: true,
  },
  {
    customer_name: "Marcus Sterling",
    rating: 5,
    review: "N-Knitts repaired a sentimental vintage knit sweater my grandmother made decades ago. They matched the color and stitch tension seamlessly. I was honestly stunned by the level of skill and care. Highly recommended!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    role: "Verified Customer",
    is_approved: true,
    is_featured: true,
  },
  {
    customer_name: "Claire Dupont",
    rating: 5,
    review: "The custom oversized wool sweater exceeded every expectation. The measurements were spot on, the color was exactly what I dreamed of, and the customer service was so sweet and responsive.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    role: "Fashion Enthusiast",
    is_approved: true,
    is_featured: false,
  },
];

const sampleMessages = [
  {
    name: "Clara Hughes",
    email: "clara.hughes@gmail.com",
    phone: "+1 (416) 555-0199",
    subject: "Matching baby sweater and mother cardigan inquiry",
    message: "Hi N-Knitts! I saw your baby collection and was wondering if you could make a matching cardigan in size M and baby sweater for 6 months in a dusty rose or sage green color? Would love to know pricing and turnaround time!",
    is_read: false,
  },
  {
    name: "Rachel Green",
    email: "rachel@greendesign.co",
    phone: "+1 (647) 555-8910",
    subject: "Bulk order of 15 handmade knit beanies for bridal party",
    message: "Hello! We are having a winter mountain wedding in Banff and would love to commission 15 coordinated beanies with custom colors for our bridesmaids and groomsmen. When can we chat about details?",
    is_read: true,
  }
];

async function syncAll() {
  console.log("Synchronizing N-Knitts database and local storage...");

  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      console.log("Updating Neon PostgreSQL settings, portfolio, and reviews...");

      // Update Site Settings
      await sql`
        UPDATE site_settings SET
          business_name = ${siteSettings.business_name},
          tagline = ${siteSettings.tagline},
          email = ${siteSettings.email},
          phone = ${siteSettings.phone},
          address = ${siteSettings.address},
          operating_hours = ${siteSettings.operating_hours},
          about_text = ${siteSettings.about_text}
      `;

      // Reset Portfolio
      await sql`DELETE FROM portfolio;`;
      for (const p of portfolio) {
        await sql`
          INSERT INTO portfolio (title, slug, description, image_url, category, client, completion_date, dimensions, materials, featured, published)
          VALUES (${p.title}, ${p.slug}, ${p.description}, ${p.image_url}, ${p.category}, ${p.client}, ${p.completion_date}, ${p.dimensions}, ${p.materials}, ${p.featured}, true)
        `;
      }

      // Reset Reviews
      await sql`DELETE FROM reviews;`;
      for (const r of reviews) {
        await sql`
          INSERT INTO reviews (customer_name, rating, review, image, role, is_approved, is_featured)
          VALUES (${r.customer_name}, ${r.rating}, ${r.review}, ${r.image}, ${r.role}, ${r.is_approved}, ${r.is_featured})
        `;
      }

      // Reset Messages
      await sql`DELETE FROM messages;`;
      for (const m of sampleMessages) {
        await sql`
          INSERT INTO messages (name, email, phone, subject, message, is_read)
          VALUES (${m.name}, ${m.email}, ${m.phone}, ${m.subject}, ${m.message}, ${m.is_read})
        `;
      }

      console.log("✅ Neon DB updated successfully with N-Knitts content!");
    } catch (err) {
      console.error("Neon DB error:", err.message);
    }
  }

  // Update local-storage.json
  const localStorePath = path.join(process.cwd(), "db", "local-storage.json");
  if (fs.existsSync(localStorePath)) {
    const raw = fs.readFileSync(localStorePath, "utf-8");
    const data = JSON.parse(raw);
    data.settings = {
      businessName: siteSettings.business_name,
      tagline: siteSettings.tagline,
      email: siteSettings.email,
      phone: siteSettings.phone,
      address: siteSettings.address,
      operatingHours: siteSettings.operating_hours,
      aboutText: siteSettings.about_text,
      updatedAt: new Date().toISOString(),
    };
    data.portfolio = portfolio.map((p, idx) => ({
      id: idx + 1,
      title: p.title,
      slug: p.slug,
      description: p.description,
      imageUrl: p.image_url,
      category: p.category,
      client: p.client,
      completionDate: p.completion_date,
      dimensions: p.dimensions,
      materials: p.materials,
      featured: p.featured,
      published: true,
      createdAt: new Date().toISOString(),
    }));
    data.reviews = reviews.map((r, idx) => ({
      id: idx + 1,
      customerName: r.customer_name,
      rating: r.rating,
      review: r.review,
      image: r.image,
      role: r.role,
      isApproved: r.is_approved,
      isFeatured: r.is_featured,
      createdAt: new Date().toISOString(),
    }));
    data.messages = sampleMessages.map((m, idx) => ({
      id: idx + 1,
      name: m.name,
      email: m.email,
      phone: m.phone,
      subject: m.subject,
      message: m.message,
      isRead: m.is_read,
      createdAt: new Date().toISOString(),
    }));
    fs.writeFileSync(localStorePath, JSON.stringify(data, null, 2), "utf-8");
    console.log("✅ local-storage.json updated successfully with N-Knitts content!");
  }
}

syncAll();
