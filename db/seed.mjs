/**
 * Seed script: Populates the Neon PostgreSQL database with initial realistic data.
 * Run with: node --env-file=.env.local db/seed.mjs
 */

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log("🌱 Starting database seed...\n");

  // --- Site Settings ---
  console.log("→ Seeding site_settings...");
  await sql`
    INSERT INTO site_settings (
      business_name, tagline, email, phone, address, operating_hours, about_text
    ) VALUES (
      'Crafted Creations',
      'Bespoke Woodworking & Heirloom Artisan Furniture',
      'contact@craftedcreations.com',
      '+1 (503) 892-4410',
      '148 Artisan Way, Millwood District, Portland, OR 97201',
      'Monday – Friday: 8:00 AM – 6:00 PM | Saturday: 10:00 AM – 4:00 PM (By Appointment)',
      'Crafted Creations represents the pinnacle of modern heirloom carpentry. Combining generational woodcraft methods with sustainable domestic hardwoods and minimalist contemporary design, we engineer timeless spaces and handcrafted pieces tailored to your life.'
    )
    ON CONFLICT DO NOTHING
  `;

  // --- Social Links ---
  console.log("→ Seeding social_links...");
  await sql`
    INSERT INTO social_links (platform, url, is_enabled) VALUES
      ('Instagram', 'https://instagram.com/craftedcreations', true),
      ('Pinterest',  'https://pinterest.com/craftedcreations',  true),
      ('LinkedIn',  'https://linkedin.com/company/craftedcreations', true),
      ('Facebook',  'https://facebook.com/craftedcreations', true)
    ON CONFLICT DO NOTHING
  `;

  // --- Services ---
  console.log("→ Seeding services...");
  const services = [
    {
    {
      title: "Handmade Clothing",
      slug: "handmade-clothing",
      description: "Custom-fitted, beautifully styled handmade clothing tailored with premium wool, cotton, and organic yarns for cozy everyday elegance.",
      price: "Custom Estimate",
      icon: "Shirt",
      category: "Clothing",
      features: JSON.stringify(["Custom body measurements & sizing", "Choice of premium natural yarns & blends", "Hand-stitched detailing & soft seamless finish", "Care instructions & extra matching yarn included"]),
    },
    {
      title: "Personalized Gifts",
      slug: "personalized-gifts",
      description: "Heartwarming bespoke gifts made for birthdays, anniversaries, weddings, and holidays with custom names, initials, and themes.",
      price: "Starting at $35",
      icon: "Gift",
      category: "Gifts",
      features: JSON.stringify(["Personalized initials or embroidered names", "Custom gift wrapping & note card available", "Special seasonal & milestone themes", "Quick turnaround on select gift items"]),
    },
    {
      title: "Baby & Kids Collection",
      slug: "baby-kids-collection",
      description: "Ultra-soft, gentle, hypoallergenic knitwear designed specifically for babies, toddlers, and growing little ones.",
      price: "Starting at $45",
      icon: "Baby",
      category: "Kids & Baby",
      features: JSON.stringify(["100% skin-safe, hypoallergenic baby-soft yarn", "Baby booties, beanies, sweaters & heirloom blankets", "Durable, easy-wash materials", "Adorable custom animal & pastel patterns"]),
    },
    {
      title: "Matching Family Sets",
      slug: "matching-family-sets",
      description: "Coordinated handmade beanies, sweaters, and scarves for the entire family — ideal for holiday photo sessions and cozy winter outings.",
      price: "Starting at $85",
      icon: "Users",
      category: "Family Sets",
      features: JSON.stringify(["Sized for infants, children, teens, and adults", "Unified color palettes and matching stitch motifs", "Durable comfort designed for active family memories", "Custom pet matching bandanas or sweaters upon request"]),
    },
    {
      title: "Custom Colors & Designs",
      slug: "custom-colors-designs",
      description: "Have a specific color scheme, stitch pattern, or Pinterest reference in mind? We bring your one-of-a-kind vision to life.",
      price: "Custom Estimate",
      icon: "Palette",
      category: "Custom Design",
      features: JSON.stringify(["One-on-one design consultation & palette matching", "Digital swatch & yarn sample approvals", "Complex stitch patterns (cable, lace, colorwork)", "Made to exact size & proportion specifications"]),
    },
    {
      title: "Knitting Repairs & Restoration",
      slug: "knitting-repairs",
      description: "Expert restoration and repair for beloved heirloom knits, snagged garments, unraveling seams, and vintage handmade blankets.",
      price: "Starting at $25",
      icon: "Scissors",
      category: "Repair & Care",
      features: JSON.stringify(["Precise yarn matching and tension replication", "Moth hole repairs, dropped stitch fixes & re-edging", "Preservation of sentimental heirloom garments", "Gentle steam blocking and conditioning finish"]),
    },
    {
      title: "Bulk Orders & Events",
      slug: "bulk-orders",
      description: "Wholesale packages, corporate gifting, bridal party bundles, and boutique event favors crafted with consistent handcrafted quality.",
      price: "Volume Pricing",
      icon: "Package",
      category: "Bulk & Wholesale",
      features: JSON.stringify(["Discounted tiered volume pricing", "Coordinated branding / custom label tags", "Reliable milestone schedules & batch shipping", "Dedicated order coordinator"]),
    },
  ];

  for (const s of services) {
    await sql`
      INSERT INTO services (title, slug, description, price, icon, category, features, is_active)
      VALUES (${s.title}, ${s.slug}, ${s.description}, ${s.price}, ${s.icon}, ${s.category}, ${s.features}, true)
      ON CONFLICT (slug) DO NOTHING
    `;
  }

  // --- Portfolio ---
  console.log("→ Seeding portfolio...");
  const portfolio = [
    {
      title: "The Oregonian Walnut Trestle Table",
      slug: "oregonian-walnut-trestle-table",
      description: "A ten-person communal dining table made from a single fallen Oregon Black Walnut tree, anchored by sculpted trestle legs with pinned mortise-and-tenon joints.",
      image_url: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80",
      category: "Handcrafted Furniture",
      client: "The Vance Family Residence, Lake Oswego",
      completion_date: "October 2025",
      dimensions: '114" L x 42" W x 30" H',
      materials: "Oregon Black Walnut, Hand-forged brass pins, Osmo Polyx-Oil",
      featured: true,
    },
    {
      title: "Minimalist Floating Credenza & Media Unit",
      slug: "minimalist-floating-credenza",
      description: "Clean horizontal lines with continuous waterfall grain wrapping across the mitered corners. Features acoustic slats for concealed audio equipment.",
      image_url: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
      category: "Custom Woodwork",
      client: "Archstone Penthouse, Downtown Portland",
      completion_date: "January 2026",
      dimensions: '84" L x 18" D x 22" H',
      materials: "Quarter-sawn White Oak, Matte Black Aluminum, Push-to-open Blum runners",
      featured: true,
    },
    {
      title: "Bespoke Chef's Kitchen Island & Breakfast Bar",
      slug: "bespoke-chefs-kitchen-island",
      description: "Integrated end-grain hard maple butcher block seamlessly joined with a solid honed quartz cantilevered bar for five casual diners.",
      image_url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      category: "Architectural Pieces",
      client: "Forest Park Modern Estate",
      completion_date: "March 2026",
      dimensions: '120" L x 54" W x 36" H',
      materials: "Rock Maple End Grain, Rift White Oak cabinetry, Calacatta quartz",
      featured: true,
    },
    {
      title: "The Cascade Walnut Executive Desk",
      slug: "cascade-walnut-executive-desk",
      description: "A commanding yet slender desk with suspended drawers, integrated hidden wireless phone charger, and solid brass drawer pulls hand-turned on our metal lathe.",
      image_url: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
      category: "Handcrafted Furniture",
      client: "Silverman Capital Office, Pearl District",
      completion_date: "August 2025",
      dimensions: '72" L x 34" W x 30" H',
      materials: "American Black Walnut, Raw satin brushed brass, Horween leather inlay",
      featured: true,
    },
    {
      title: "Hand-Turned Spalted Maple Centerpiece Bowls",
      slug: "spalted-maple-centerpiece-bowls",
      description: "Limited series of wide, sculptural bowls turned from spalted big-leaf maple salvaged from the Columbia River Gorge windstorms.",
      image_url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
      category: "Home Decor",
      client: "Gallery Exhibition & Collector Edition",
      completion_date: "November 2025",
      dimensions: '18" Diameter x 5" H',
      materials: "Wild Spalted Bigleaf Maple, Certified organic beeswax finish",
      featured: false,
    },
    {
      title: "Geometric Slatted Cedar Pergola & Louver Wall",
      slug: "geometric-slatted-cedar-pergola",
      description: "Outdoor architectural shading installation designed to withstand Pacific Northwest winters while filtering optimal natural sunlight onto the patio.",
      image_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      category: "Architectural Pieces",
      client: "West Hills Retreat",
      completion_date: "May 2026",
      dimensions: "16' L x 12' W x 10' H",
      materials: "Clear Western Red Cedar, Stainless steel hidden fastening brackets",
      featured: false,
    },
  ];

  for (const p of portfolio) {
    await sql`
      INSERT INTO portfolio (title, slug, description, image_url, category, client, completion_date, dimensions, materials, featured, published)
      VALUES (${p.title}, ${p.slug}, ${p.description}, ${p.image_url}, ${p.category}, ${p.client}, ${p.completion_date}, ${p.dimensions}, ${p.materials}, ${p.featured}, true)
      ON CONFLICT (slug) DO NOTHING
    `;
  }

  // --- Reviews ---
  console.log("→ Seeding reviews...");
  const reviews = [
    {
      customer_name: "Eleanor & Marcus Vance",
      rating: 5,
      review: "Our custom dining table from Crafted Creations is the soul of our home. The joinery is exquisite, and you can feel the master craftsman's touch in every single curve and satin bevel. Visitors gasp the moment they walk in.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "Homeowner, Lake Oswego",
      is_approved: true,
      is_featured: true,
    },
    {
      customer_name: "David Sterling, AIA",
      rating: 5,
      review: "As an architect, I hold millwork subcontractors to uncompromising standards. Crafted Creations delivered our penthouse cabinetry with surgical precision, dead-on tolerances, and remarkable communication.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      role: "Principal Architect, Sterling & Partners",
      is_approved: true,
      is_featured: true,
    },
    {
      customer_name: "Sarah Lindqvist",
      rating: 5,
      review: "The executive desk completely elevated my productivity. The concealed wire management and leather inlay are works of art. Working from home now feels like an absolute privilege.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      role: "Managing Director, Tech Ventures",
      is_approved: true,
      is_featured: true,
    },
    {
      customer_name: "Michael Chang",
      rating: 5,
      review: "Ordered a custom live edge coffee table. The team sent photos of the slab selection and in-progress milling. That level of hospitality and artisan pride is exceedingly rare today.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      role: "Interior Designer",
      is_approved: true,
      is_featured: false,
    },
  ];

  for (const r of reviews) {
    await sql`
      INSERT INTO reviews (customer_name, rating, review, image, role, is_approved, is_featured)
      VALUES (${r.customer_name}, ${r.rating}, ${r.review}, ${r.image}, ${r.role}, ${r.is_approved}, ${r.is_featured})
    `;
  }

  // --- Sample Messages ---
  console.log("→ Seeding sample messages...");
  await sql`
    INSERT INTO messages (name, email, phone, subject, message, is_read) VALUES
    (
      'Arthur Pendelton',
      'arthur.pendelton@gmail.com',
      '+1 (503) 774-9021',
      'Custom 14-seater conference table inquiry',
      'Hello Crafted Creations, we are furnishing our law office in downtown and would love to commission a 14ft conference table with brass inlays and integrated power pods. Could you share current lead times and a ballpark estimate?',
      false
    ),
    (
      'Clara Morales',
      'clara@moralesdesign.co',
      '+1 (415) 320-8819',
      'Bespoke kitchen island millwork quote',
      'Hi! I am working on a residential renovation in Hood River and have architectural drawings ready for a custom white oak island and breakfast banquette. When is a good time for a call?',
      true
    )
  `;

  console.log("\n✅ Database seeded successfully!");
  console.log("   • Site settings populated");
  console.log("   • Social links configured");
  console.log("   • 6 services created");
  console.log("   • 6 portfolio items created");
  console.log("   • 4 customer reviews created");
  console.log("   • 2 sample messages created");
}

seed().catch((err) => {
  console.error("\n❌ Seed failed:", err.message);
  process.exit(1);
});
