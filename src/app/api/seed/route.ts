import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function POST() {
  // Check if the table already has data 
  try {
    // When DATABASE_URL is not set, `db` exports a stub object. Cast to any
    // so we can perform runtime checks without TypeScript errors.
    const realDb = db as any;

    if (typeof realDb.select !== "function") {
      // DB not configured; return an informative response
      return new Response(JSON.stringify({ error: "DATABASE_URL not configured" }), { status: 500 });
    }

    const existing = await realDb.select().from(advocates).limit(1);
    if (existing && existing.length > 0) {
      // Return existing rows, don't insert duplicates
      const rows = await db.select().from(advocates);
      return Response.json({ advocates: rows, message: "seed already applied" });
    }

    const records = await db.insert(advocates).values(advocateData).returning();

    return Response.json({ advocates: records, message: "seed applied" });
  } catch (err) {
    console.error("Seed failed:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
