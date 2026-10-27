import { pgTable, serial, text, jsonb, timestamp } from "drizzle-orm/pg-core";

const baseMetaCols = {
  id: serial("id").primaryKey(),
  name: text("name"),
  contact: text("contact"),
  surveyor: text("surveyor"),
  submitterIp: text("submitter_ip"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
};

export const chualanhResponses = pgTable("chualanh_responses", {
  ...baseMetaCols,
  q1: text("q1"),
  q2: text("q2"),
  q3: text("q3"),
  q4: jsonb("q4").$type<string[]>(),
  q4Other: text("q4_other"),
  q5: text("q5"),
  q6: text("q6"),
  q7: text("q7"),
  q8: text("q8"),
  q9: text("q9"),
  q10: jsonb("q10").$type<string[]>(),
  q10Other: text("q10_other"),
  q11: text("q11"),
});

export const docsachResponses = pgTable("docsach_responses", {
  ...baseMetaCols,
  q1: text("q1"),
  q2: jsonb("q2").$type<string[]>(),
  q2Other: text("q2_other"),
  q3: text("q3"),
  q4: text("q4"),
  q5: text("q5"),
  q6: jsonb("q6").$type<string[]>(),
  q7: text("q7"),
  q8: text("q8"),
  q9: text("q9"),
  q10: text("q10"),
  q12: text("q12"),
  q13: text("q13"),
  q14: text("q14"),
  q15: text("q15"),
  interestedBooks: jsonb("interested_books").$type<string[]>(),
  interested: text("interested"),
  format: text("format"),
});

export const lehoivanhoaResponses = pgTable("lehoivanhoa_responses", {
  ...baseMetaCols,
  q1: text("q1"),
  q2: jsonb("q2").$type<string[]>(),
  q3: jsonb("q3").$type<string[]>(),
  q4: text("q4"),
  q5: text("q5"),
  q6: text("q6"),
  q7: text("q7"),
  q8: text("q8"),
  q9: text("q9"),
  q10: text("q10"),
  q11: text("q11"),
  format: text("format"),
  interested: text("interested"),
});

export const dayconDoThaiResponses = pgTable("daycon_do_thai_responses", {
  ...baseMetaCols,
  q1: text("q1"),
  q2: jsonb("q2").$type<string[]>(),
  q3: text("q3"),
  q4: text("q4"),
  q5: jsonb("q5").$type<string[]>(),
  q6: text("q6"),
  q7: text("q7"),
  q8: text("q8"),
  q9: text("q9"),
  q10: text("q10"),
  interested: text("interested"),
  format: text("format"),
});

export const luaChonDungResponses = pgTable("lua_chon_dung_responses", {
  ...baseMetaCols,
  q1: text("q1"),
  q2: text("q2"),
  q3: text("q3"),
  q4: jsonb("q4").$type<string[]>(),
  q5: text("q5"),
  q6: text("q6"),
  q7: text("q7"),
  q8: text("q8"),
  q9: text("q9"),
  q10: text("q10"),
  format: text("format"),
  interested: text("interested"),
});

export const tuongLaiResponses = pgTable("tuong_lai_responses", {
  ...baseMetaCols,
  q1: text("q1"),
  q2: text("q2"),
  q3: text("q3"),
  q4: text("q4"),
  q5: text("q5"),
  q6: jsonb("q6").$type<string[]>(),
  q7: text("q7"),
  q8: text("q8"),
  q9: text("q9"),
  q10: text("q10"),
  format: text("format"),
  interested: text("interested"),
});

export type ChualanhInsert = typeof chualanhResponses.$inferInsert;
export type DocsachInsert = typeof docsachResponses.$inferInsert;
export type LehoivanhoaInsert = typeof lehoivanhoaResponses.$inferInsert;
export type DayconDoThaiInsert = typeof dayconDoThaiResponses.$inferInsert;
export type LuaChonDungInsert = typeof luaChonDungResponses.$inferInsert;
export type TuongLaiInsert = typeof tuongLaiResponses.$inferInsert;
