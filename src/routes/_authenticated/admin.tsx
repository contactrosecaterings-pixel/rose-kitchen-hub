import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Search, LogOut, Check } from "lucide-react";
import { toast } from "sonner";

import { listBookings, updateBookingStatus } from "@/lib/admin.functions";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Rose Caterings" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Booking = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  event_date: string;
  guest_count: string;
  event_type: string;
  service_type: string;
  preferred_dishes: string[];
  allergies: string | null;
  preferred_call_time: string;
  status: string;
  created_at: string;
};

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const list = useServerFn(listBookings);
  const updateStatus = useServerFn(updateBookingStatus);
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "bookings"],
    queryFn: () => list(),
  });

  const mutation = useMutation({
    mutationFn: (vars: { id: string; status: "Confirmed" | "Cancelled" | "Pending Phone Call" }) =>
      updateStatus({ data: vars }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "bookings"] });
      toast.success("Status updated");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Update failed"),
  });

  const filtered = useMemo(() => {
    const bookings = (data?.bookings ?? []) as Booking[];
    const q = search.trim().toLowerCase();
    if (!q) return bookings;
    return bookings.filter(
      (b) =>
        b.full_name.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q),
    );
  }, [data, search]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Admin</p>
          <h1 className="mt-2 font-display text-4xl text-foreground">Booking Requests</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Newest requests first. Filter by name, phone, or email.
          </p>
        </div>
        <Button variant="ghost" onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </Button>
      </div>

      <div className="mt-8 flex items-center gap-3 rounded-full border border-border/70 bg-card px-4 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, phone, or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="px-6 py-12 text-center text-sm text-destructive">
            {error instanceof Error ? error.message : "Failed to load bookings"}
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-16 text-center text-sm text-muted-foreground">
            No bookings found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((b) => (
                  <tr key={b.id} className="align-top">
                    <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                      {new Date(b.created_at).toLocaleDateString()}
                      <br />
                      <span className="text-xs">
                        {new Date(b.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-foreground">{b.full_name}</div>
                      <div className="text-xs text-muted-foreground">
                        Call: {b.preferred_call_time}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-foreground">
                      <a href={`tel:${b.phone}`} className="block hover:text-primary">
                        {b.phone}
                      </a>
                      <a
                        href={`mailto:${b.email}`}
                        className="block text-xs text-muted-foreground hover:text-primary"
                      >
                        {b.email}
                      </a>
                    </td>
                    <td className="px-4 py-4 text-foreground">
                      <div>{b.event_type}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(b.event_date).toLocaleDateString()} · {b.guest_count} guests
                      </div>
                      {b.preferred_dishes?.length ? (
                        <div className="mt-1 text-xs text-muted-foreground">
                          {b.preferred_dishes.slice(0, 4).join(", ")}
                          {b.preferred_dishes.length > 4 ? "…" : ""}
                        </div>
                      ) : null}
                      {b.allergies ? (
                        <div className="mt-1 text-xs italic text-muted-foreground">
                          ⚠ {b.allergies}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">{b.service_type}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-4 py-4 text-right">
                      {b.status !== "Confirmed" ? (
                        <Button
                          size="sm"
                          onClick={() =>
                            mutation.mutate({ id: b.id, status: "Confirmed" })
                          }
                          disabled={mutation.isPending}
                          className="rounded-full"
                        >
                          <Check className="mr-1 h-3.5 w-3.5" />
                          Mark Called/Confirmed
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Confirmed"
      ? "bg-green-100 text-green-800 border-green-200"
      : status === "Cancelled"
        ? "bg-red-100 text-red-800 border-red-200"
        : "bg-yellow-100 text-yellow-900 border-yellow-200";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}