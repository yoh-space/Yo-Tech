import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export default query(async ({ db }) => {
  return await db.query("blogs").collect();
});