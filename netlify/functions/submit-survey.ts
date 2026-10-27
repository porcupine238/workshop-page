import type { Config, Context } from "@netlify/functions";
import { db } from "../../db";
import {
  chualanhResponses,
  dayconDoThaiResponses,
  docsachResponses,
  lehoivanhoaResponses,
  luaChonDungResponses,
  tuongLaiResponses,
} from "../../db/schema";

const TABLES = {
  chualanh: chualanhResponses,
  daycon_do_thai: dayconDoThaiResponses,
  docsach: docsachResponses,
  lehoivanhoa: lehoivanhoaResponses,
  lua_chon_dung: luaChonDungResponses,
  tuong_lai: tuongLaiResponses,
} as const;

type SurveyKey = keyof typeof TABLES;

const ALLOWED_ANSWER_COLS: Record<SurveyKey, Set<string>> = {
  chualanh: new Set([
    "q1", "q2", "q3", "q4", "q4Other",
    "q5", "q6", "q7", "q8", "q9",
    "q10", "q10Other", "q11",
  ]),
  docsach: new Set([
    "q1", "q2", "q2Other", "q3", "q4", "q5", "q6",
    "q7", "q8", "q9", "q10",
    "q12", "q13", "q14", "q15",
    "interestedBooks", "interested", "format",
  ]),
  lehoivanhoa: new Set([
    "q1", "q2", "q3", "q4", "q5", "q6",
    "q7", "q8", "q9", "q10", "q11",
    "format", "interested",
  ]),
  daycon_do_thai: new Set([
    "q1", "q2", "q3", "q4", "q5", "q6",
    "q7", "q8", "q9", "q10",
    "format", "interested",
  ]),
  lua_chon_dung: new Set([
    "q1", "q2", "q3", "q4", "q5", "q6",
    "q7", "q8", "q9", "q10",
    "format", "interested",
  ]),
  tuong_lai: new Set([
    "q1", "q2", "q3", "q4", "q5", "q6",
    "q7", "q8", "q9", "q10",
    "format", "interested",
  ]),
};

function clipString(v: unknown, max: number): string | null {
  return typeof v === "string" ? v.slice(0, max) : null;
}

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const survey = payload?.survey as SurveyKey;
  if (!survey || !(survey in TABLES)) {
    return Response.json({ error: "unknown_survey" }, { status: 400 });
  }

  const table = TABLES[survey];
  const allowed = ALLOWED_ANSWER_COLS[survey];

  const row: Record<string, unknown> = {
    name: clipString(payload.name, 200),
    contact: clipString(payload.contact, 200),
    surveyor: clipString(payload.surveyor, 200),
    submitterIp: context.ip ?? null,
    userAgent: req.headers.get("user-agent")?.slice(0, 500) ?? null,
  };

  const answers = (payload.answers && typeof payload.answers === "object") ? payload.answers : {};
  for (const [k, v] of Object.entries(answers)) {
    if (allowed.has(k)) row[k] = v;
  }

  try {
    const [inserted] = await db
      .insert(table as any)
      .values(row)
      .returning({ id: (table as any).id });
    return Response.json({ ok: true, id: inserted.id }, { status: 201 });
  } catch (err: any) {
    console.error("submit-survey insert error", err);
    return Response.json({ error: "db_insert_failed" }, { status: 500 });
  }
};

export const config: Config = {
  path: "/api/submit-survey",
};
