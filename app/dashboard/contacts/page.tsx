import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import Client from "@/app/dashboard/contacts/client";
import { getAuthSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { contacts, teamMembers } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

type ContactsPageProps = {
  searchParams?: Promise<{
    status?: string;
    message?: string;
  }>;
};

export default async function ContactsPage({
  searchParams,
}: ContactsPageProps) {
  // Step 1: require authenticated session
  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  // Step 2: resolve tenant membership
  const [membership] = await db
    .select({
      teamId: teamMembers.teamId,
      role: teamMembers.role,
    })
    .from(teamMembers)
    .where(eq(teamMembers.userId, session.userId))
    .limit(1);

  // Step 3: parse query params for status/message
  const params = (await searchParams) ?? {};
  const status =
    params.status === "success" || params.status === "error"
      ? params.status
      : null;
  const message = typeof params.message === "string" ? params.message : null;

  if (!membership) {
    // No membership: make page read only/empty.
    return (
      <Client
        status={status}
        message={message}
        canManage={false}
        items={[]}
      />
    );
  }

  // Step 4: read all contacts for the team
  const items = await db
    .select({
      id: contacts.id,
      name: contacts.name,
      company: contacts.company,
      email: contacts.email,
      phone: contacts.phone,
      notes: contacts.notes,
      tags: contacts.tags,
      updatedAt: contacts.updatedAt,
    })
    .from(contacts)
    .where(eq(contacts.teamId, membership.teamId))
    .orderBy(desc(contacts.updatedAt));

  return (
    <Client
      status={status}
      message={message}
      canManage={membership.role === "owner" || membership.role === "admin"}
      items={items.map((item) => ({
        ...item,
        updatedAt: item.updatedAt.toISOString(),
      }))}
    />
  );
}