import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";

const newServices = [
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  }
];

async function update() {
  console.log("Updating services...");

  // 1. Update Neon PostgreSQL if DATABASE_URL is available
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      console.log("Connected to Neon DB. Clearing existing services...");
      await sql`DELETE FROM services;`;
      console.log("Cleared old services from Neon DB.");

      for (const s of newServices) {
        await sql`
          INSERT INTO services (title, slug, description, price, icon, category, features, is_active)
          VALUES (
            ${s.title},
            ${s.slug},
            ${s.description},
            ${s.price},
            ${s.icon},
            ${s.category},
            ${JSON.stringify(s.features)},
            true
          );
        `;
      }
      console.log("Inserted new services into Neon DB.");
    } catch (err) {
      console.error("Neon DB error:", err.message);
    }
  }

  // 2. Update local-storage.json
  const localStorePath = path.join(process.cwd(), "db", "local-storage.json");
  if (fs.existsSync(localStorePath)) {
    const raw = fs.readFileSync(localStorePath, "utf-8");
    const data = JSON.parse(raw);
    data.services = newServices.map((s, index) => ({
      id: index + 1,
      ...s,
      isActive: true,
      createdAt: new Date().toISOString()
    }));
    fs.writeFileSync(localStorePath, JSON.stringify(data, null, 2), "utf-8");
    console.log("Updated local-storage.json with new services.");
  }

  console.log("Services successfully replaced!");
}

update();
