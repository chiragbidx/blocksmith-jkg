"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getAuthSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { contacts, teamMembers } from "@/lib/db/schema";

// Helper to redirect with query status/message
function redirectWithMessage(status: "success" | "error", message: string): never {
  const query = new URLSearchParams({ status, message });
  redirect(`/dashboard/contacts?${query.toString()}`);
}

// Team membership and permission helpers
async function requireTeamMembership(userId: string) {
  const [membership] = await db
    .select({
      teamId: teamMembers.teamId,
      role: teamMembers.role,
    })
    .from(teamMembers)
    .where(eq(teamMembers.userId, userId))
    .limit(1);

  if (!membership) {
    redirectWithMessage("error", "You must belong to a team to manage contacts.");
  }

  return membership;
}

async function requireManageRole(userId: string) {
  const membership = await requireTeamMembership(userId);
  if (!["owner", "admin"].includes(membership.role)) {
    redirectWithMessage("error", "Only owner or admin may modify contacts.");
  }
  return membership;
}

// Zod schemas
const createContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(80, "Name is too long."),
  company: z.string().trim().max(100, "Company name too long.").optional().nullable(),
  email: z.string().trim().email("Invalid email.").max(100, "Email too long.").optional().or(z.literal("")).nullable(),
  phone: z.string().trim().max(24, "Phone too long.").optional().or(z.literal("")).nullable(),
  notes: z.string().trim().max(500, "Notes too long.").optional().or(z.literal("")).nullable(),
  tags: z.string().trim().max(80, "Tags too long.").optional().or(z.literal("")).nullable(),
});

const updateContactSchema = createContactSchema.extend({
  id: z.string().trim().min(1, "Contact id is required."),
});

const deleteContactSchema = z.object({
  id: z.string().trim().min(1, "Contact id is required."),
});

// CREATE
export async function createContactAction(formData: FormData) {
  const parsed = createContactSchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company") || null,
    email: formData.get("email") || null,
    phone: formData.get("phone") || null,
    notes: formData.get("notes") || null,
    tags: formData.get("tags") || null,
  });

  if (!parsed.success) {
    redirectWithMessage(
      "error",
      parsed.error.issues[0]?.message ?? "Invalid create request."
    );
  }

  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  const membership = await requireManageRole(session.userId);

  await db.insert(contacts).values({
    teamId: membership.teamId,
    name: parsed.data.name,
    company: parsed.data.company,
    email: parsed.data.email,
    phone: parsed.data.phone,
    notes: parsed.data.notes,
    tags: parsed.data.tags,
    updatedAt: new Date(),
  });

  redirectWithMessage("success", "Contact created.");
}

// UPDATE
export async function updateContactAction(formData: FormData) {
  const parsed = updateContactSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    company: formData.get("company") || null,
    email: formData.get("email") || null,
    phone: formData.get("phone") || null,
    notes: formData.get("notes") || null,
    tags: formData.get("tags") || null,
  });

  if (!parsed.success) {
    redirectWithMessage(
      "error",
      parsed.error.issues[0]?.message ?? "Invalid update request."
    );
  }

  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  const membership = await requireManageRole(session.userId);

  await db
    .update(contacts)
    .set({
      name: parsed.data.name,
      company: parsed.data.company,
      email: parsed.data.email,
      phone: parsed.data.phone,
      notes: parsed.data.notes,
      tags: parsed.data.tags,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(contacts.id, parsed.data.id),
        eq(contacts.teamId, membership.teamId)
      )
    );

  redirectWithMessage("success", "Contact updated.");
}

// DELETE
export async function deleteContactAction(formData: FormData) {
  const parsed = deleteContactSchema.safeParse({
    id: formData.get("id"),
  });

  if (!parsed.success) {
    redirectWithMessage(
      "error",
      parsed.error.issues[0]?.message ?? "Invalid delete request."
    );
  }

  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  const membership = await requireManageRole(session.userId);

  await db
    .delete(contacts)
    .where(
      and(
        eq(contacts.id, parsed.data.id),
        eq(contacts.teamId, membership.teamId)
      )
    );

  redirectWithMessage("success", "Contact deleted.");
}