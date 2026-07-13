import { promises as fs } from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

export type WaitlistData = {
  count: number;
  emails: string[];
  applications: WaitlistApplication[];
};

export type WaitlistApplication = {
  fullName: string;
  email: string;
  country: string;
  skillInterest: string;
  skillLevel: string;
  commitmentPeriod: string;
  projectIdea?: string;
  createdAt: string;
};

const WAITLIST_PATH = path.join(process.cwd(), "data", "waitlist.json");
const WAITLIST_SEED_PATH = path.join(process.cwd(), "data", "waitlist.example.json");

const globalStore = globalThis as typeof globalThis & {
  __guildWaitlist?: WaitlistData;
};

const defaultData: WaitlistData = { count: 0, emails: [], applications: [] };

function normalize(data: Partial<WaitlistData> | null | undefined): WaitlistData {
  const emails = Array.isArray(data?.emails)
    ? data.emails.filter((email): email is string => typeof email === "string")
    : [];
  const applications = Array.isArray(data?.applications)
    ? data.applications.filter(
        (application): application is WaitlistApplication =>
          typeof application === "object" &&
          application !== null &&
          typeof application.email === "string" &&
          typeof application.fullName === "string",
      )
    : [];

  return {
    count: typeof data?.count === "number" ? data.count : emails.length,
    emails,
    applications: applications.map(app => ({
      ...app,
      projectIdea: typeof app.projectIdea === "string" ? app.projectIdea : undefined,
    })),
  };
}

async function readFromDisk(): Promise<WaitlistData | null> {
  for (const filePath of [WAITLIST_PATH, WAITLIST_SEED_PATH]) {
    try {
      const raw = await fs.readFile(filePath, "utf8");
      return normalize(JSON.parse(raw) as Partial<WaitlistData>);
    } catch {
      continue;
    }
  }

  return null;
}

async function writeToDisk(data: WaitlistData): Promise<boolean> {
  try {
    await fs.mkdir(path.dirname(WAITLIST_PATH), { recursive: true });
    await fs.writeFile(WAITLIST_PATH, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch {
    return false;
  }
}

export async function getWaitlist(): Promise<WaitlistData> {
  const fromDisk = await readFromDisk();
  if (fromDisk) {
    globalStore.__guildWaitlist = fromDisk;
    return fromDisk;
  }

  if (globalStore.__guildWaitlist) {
    return globalStore.__guildWaitlist;
  }

  return defaultData;
}

export async function addToWaitlist(
  application: Omit<WaitlistApplication, "createdAt">,
): Promise<WaitlistData> {
  const normalizedEmail = application.email.trim().toLowerCase();

  // 1. Primary DB insert to Supabase if client is active
  if (supabase) {
    try {
      const { error } = await supabase.from("waitlist").insert({
        full_name: application.fullName,
        email: normalizedEmail,
        country: application.country,
        skill_interest: application.skillInterest,
        skill_level: application.skillLevel,
        commitment_period: application.commitmentPeriod,
        project_idea: application.projectIdea || null,
      });
      if (error) {
        console.error("Supabase error during insert:", error);
      }
    } catch (e) {
      console.error("Failed to insert waitlist application to Supabase:", e);
    }
  }

  // 2. Local fallback JSON backup
  const current = await getWaitlist();

  if (current.emails.includes(normalizedEmail)) {
    return current;
  }

  const normalizedApplication: WaitlistApplication = {
    ...application,
    email: normalizedEmail,
    createdAt: new Date().toISOString(),
  };

  const next: WaitlistData = {
    count: current.count + 1,
    emails: [...current.emails, normalizedEmail],
    applications: [...current.applications, normalizedApplication],
  };

  const persisted = await writeToDisk(next);
  globalStore.__guildWaitlist = next;

  return next;
}
