"use client";

import {
  createContactAction,
  deleteContactAction,
  updateContactAction,
} from "@/app/dashboard/contacts/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";

type Contact = {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  notes: string | null;
  tags: string | null;
  updatedAt: string;
};

type ClientProps = {
  status: "success" | "error" | null;
  message: string | null;
  canManage: boolean;
  items: Contact[];
};

function formatTimestamp(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Unknown";
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min} UTC`;
}

export default function Client({ status, message, canManage, items }: ClientProps) {
  const [editing, setEditing] = useState<Contact | null>(null);
  const [addingOpen, setAddingOpen] = useState(false);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Contacts</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            All CRM contacts for your team—manage leads, customers, and partners here.
          </p>
        </header>
        {canManage ? (
          <Dialog open={addingOpen} onOpenChange={setAddingOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setAddingOpen(true)}>Add Contact</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Contact</DialogTitle>
                <DialogDescription>
                  Fill details to add a new contact.
                </DialogDescription>
              </DialogHeader>
              <form action={createContactAction} className="space-y-3">
                <div className="space-y-2">
                  <label htmlFor="new-name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="new-name" name="name" required maxLength={80} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="new-company" className="text-sm font-medium">
                    Company
                  </label>
                  <Input id="new-company" name="company" maxLength={100} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="new-email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="new-email" name="email" type="email" maxLength={100} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="new-phone" className="text-sm font-medium">
                    Phone
                  </label>
                  <Input id="new-phone" name="phone" maxLength={24} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="new-tags" className="text-sm font-medium">
                    Tags (comma-separated)
                  </label>
                  <Input id="new-tags" name="tags" maxLength={80} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="new-notes" className="text-sm font-medium">
                    Notes
                  </label>
                  <Textarea id="new-notes" name="notes" maxLength={500} rows={3} />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Add Contact</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        ) : null}
      </div>

      {status && message ? (
        <p
          className={`rounded-md border px-3 py-2 text-sm ${
            status === "success"
              ? "border-emerald-500/30 text-emerald-600"
              : "border-destructive/30 text-destructive"
          }`}
        >
          {message}
        </p>
      ) : null}

      {!canManage ? (
        <p className="text-sm text-muted-foreground">
          You can view contacts, but only owner/admin can create, edit, or delete.
        </p>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contacts</CardTitle>
          <CardDescription>Team-shared contacts for CRM workflows.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="hidden md:table-cell">Tags</TableHead>
                <TableHead className="hidden md:table-cell">Notes</TableHead>
                <TableHead className="hidden md:table-cell">Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground">
                    No contacts yet. Click "Add Contact" to get started.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.company || ""}</TableCell>
                    <TableCell>
                      {item.email ? (
                        <a
                          href={`mailto:${item.email}`}
                          className="underline underline-offset-2 hover:text-primary"
                        >
                          {item.email}
                        </a>
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell>{item.phone || ""}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.tags || ""}</TableCell>
                    <TableCell className="hidden max-w-[200px] truncate md:table-cell">
                      {item.notes || ""}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatTimestamp(item.updatedAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Dialog
                          open={editing?.id === item.id}
                          onOpenChange={(open) => setEditing(open ? item : null)}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={!canManage}
                              onClick={() => setEditing(item)}
                            >
                              <Pencil width={16} height={16} className="mr-1" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Contact</DialogTitle>
                              <DialogDescription>
                                Update information and save changes.
                              </DialogDescription>
                            </DialogHeader>
                            <form action={updateContactAction} className="space-y-3">
                              <input type="hidden" name="id" value={item.id} />

                              <div className="space-y-2">
                                <label htmlFor={`name-${item.id}`} className="text-sm font-medium">
                                  Name
                                </label>
                                <Input
                                  id={`name-${item.id}`}
                                  name="name"
                                  defaultValue={item.name}
                                  required
                                  maxLength={80}
                                />
                              </div>
                              <div className="space-y-2">
                                <label htmlFor={`company-${item.id}`} className="text-sm font-medium">
                                  Company
                                </label>
                                <Input
                                  id={`company-${item.id}`}
                                  name="company"
                                  defaultValue={item.company || ""}
                                  maxLength={100}
                                />
                              </div>
                              <div className="space-y-2">
                                <label htmlFor={`email-${item.id}`} className="text-sm font-medium">
                                  Email
                                </label>
                                <Input
                                  id={`email-${item.id}`}
                                  name="email"
                                  defaultValue={item.email || ""}
                                  type="email"
                                  maxLength={100}
                                />
                              </div>
                              <div className="space-y-2">
                                <label htmlFor={`phone-${item.id}`} className="text-sm font-medium">
                                  Phone
                                </label>
                                <Input
                                  id={`phone-${item.id}`}
                                  name="phone"
                                  defaultValue={item.phone || ""}
                                  maxLength={24}
                                />
                              </div>
                              <div className="space-y-2">
                                <label htmlFor={`tags-${item.id}`} className="text-sm font-medium">
                                  Tags (comma-separated)
                                </label>
                                <Input
                                  id={`tags-${item.id}`}
                                  name="tags"
                                  defaultValue={item.tags || ""}
                                  maxLength={80}
                                />
                              </div>
                              <div className="space-y-2">
                                <label
                                  htmlFor={`notes-${item.id}`}
                                  className="text-sm font-medium"
                                >
                                  Notes
                                </label>
                                <Textarea
                                  id={`notes-${item.id}`}
                                  name="notes"
                                  defaultValue={item.notes || ""}
                                  maxLength={500}
                                  rows={3}
                                />
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button type="button" variant="outline">
                                    Cancel
                                  </Button>
                                </DialogClose>
                                <Button type="submit">Save Changes</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>

                        <form action={deleteContactAction}>
                          <input type="hidden" name="id" value={item.id} />
                          <Button
                            type="submit"
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            disabled={!canManage}
                          >
                            <Trash2 className="mr-1 size-4" />
                            Delete
                          </Button>
                        </form>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}