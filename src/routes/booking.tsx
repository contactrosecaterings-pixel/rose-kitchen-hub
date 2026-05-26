import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { submitBooking } from "@/lib/bookings.functions";
import { MENU } from "@/lib/menu-data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book Inquiry — Rose Caterings" },
      {
        name: "description",
        content:
          "Request a catering quote from Rose Caterings. Authentic Pakistani home-cooked food for weddings, aqeeqahs, Eid events, and more.",
      },
    ],
  }),
  component: BookingPage,
});

type FormState = {
  full_name: string;
  email: string;
  phone: string;
  event_date: string;
  guest_count: "" | number;
  event_type:
    | ""
    | "Wedding"
    | "Aqeeqah"
    | "Family Gathering"
    | "Eid Event"
    | "Corporate"
    | "Other";
  service_type: "" | "Drop-off Delivery" | "Pickup" | "Full-Service Catering";
  preferred_dishes: string[];
  allergies: string;
  preferred_call_time:
    | ""
    | "Morning (9 AM – 12 PM)"
    | "Afternoon (12 PM – 5 PM)"
    | "Evening (5 PM – 8 PM)";
};

const STEPS = ["Contact", "Event", "Logistics", "Follow-up"] as const;

function BookingPage() {
  const submit = useServerFn(submitBooking);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<FormState>({
    full_name: "",
    email: "",
    phone: "",
    event_date: "",
    guest_count: "",
    event_type: "",
    service_type: "",
    preferred_dishes: [],
    allergies: "",
    preferred_call_time: "",
  });

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleDish = (dish: string) =>
    setForm((f) => ({
      ...f,
      preferred_dishes: f.preferred_dishes.includes(dish)
        ? f.preferred_dishes.filter((d) => d !== dish)
        : [...f.preferred_dishes, dish],
    }));

  const canAdvance = () => {
    if (step === 0)
      return form.full_name.trim() && /.+@.+\..+/.test(form.email) && form.phone.trim().length >= 5;
    if (step === 1)
      return (
        form.event_date &&
        typeof form.guest_count === "number" &&
        form.guest_count >= 10 &&
        form.guest_count <= 100 &&
        form.event_type
      );
    if (step === 2) return form.service_type;
    if (step === 3) return !!form.preferred_call_time;
    return false;
  };

  const handleSubmit = async () => {
    if (!canAdvance()) return;
    setSubmitting(true);
    try {
      await submit({
        data: {
          full_name: form.full_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          event_date: form.event_date,
          guest_count: form.guest_count as number,
          event_type: form.event_type as Exclude<FormState["event_type"], "">,
          service_type: form.service_type as Exclude<FormState["service_type"], "">,
          preferred_dishes: form.preferred_dishes,
          allergies: form.allergies.trim(),
          preferred_call_time: form.preferred_call_time as Exclude<
            FormState["preferred_call_time"],
            ""
          >,
        },
      });
      setDone(true);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong submitting your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <Check className="h-10 w-10" />
        </motion.div>
        <h1 className="mt-8 font-display text-4xl text-foreground">
          Thank you for your request!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We've received your details and will personally call you within{" "}
          <span className="font-semibold text-foreground">24–48 hours</span> to confirm your menu,
          pricing, and logistics.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          From our kitchen to your celebration — we can't wait.
        </p>
        <Link
          to="/"
          className="mt-10 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-105"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Booking</p>
      <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
        Request your catering quote.
      </h1>
      <p className="mt-3 text-muted-foreground">
        Tell us about your event — we'll call you within 24–48 hours.
      </p>

      {/* Progress */}
      <div className="mt-10 flex items-center gap-3">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                i <= step
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={`hidden text-xs font-medium uppercase tracking-[0.18em] sm:inline ${
                i <= step ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={`h-px flex-1 ${i < step ? "bg-primary" : "bg-border"}`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-border/70 bg-card p-8 shadow-sm sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl text-foreground">Your contact info</h2>
                <div>
                  <Label htmlFor="full_name">Full name</Label>
                  <Input
                    id="full_name"
                    value={form.full_name}
                    onChange={(e) => update("full_name", e.target.value)}
                    placeholder="First Last"
                    className="mt-1.5"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="Phone number"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl text-foreground">Event details</h2>
                <div>
                  <Label htmlFor="event_date">Event date</Label>
                  <Input
                    id="event_date"
                    type="date"
                    value={form.event_date}
                    onChange={(e) => update("event_date", e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label>Guest count</Label>
                  <Input
                    id="guest_count"
                    type="number"
                    min={10}
                    max={100}
                    inputMode="numeric"
                    placeholder="Minimum 10 guests"
                    value={form.guest_count === "" ? "" : form.guest_count}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === "") return update("guest_count", "");
                      const n = Math.min(100, Math.max(0, parseInt(raw, 10) || 0));
                      update("guest_count", n);
                    }}
                    className="mt-1.5"
                  />
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Minimum 10, maximum 100 guests.
                  </p>
                </div>
                <div>
                  <Label>Event type</Label>
                  <PillGroup
                    options={[
                      "Wedding",
                      "Aqeeqah",
                      "Family Gathering",
                      "Eid Event",
                      "Corporate",
                      "Other",
                    ]}
                    value={form.event_type}
                    onChange={(v) => update("event_type", v as FormState["event_type"])}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl text-foreground">Logistics & menu</h2>
                <div>
                  <Label>Service type</Label>
                  <PillGroup
                    options={["Drop-off Delivery", "Pickup", "Full-Service Catering"]}
                    value={form.service_type}
                    onChange={(v) => update("service_type", v as FormState["service_type"])}
                  />
                </div>
                <div>
                  <Label className="mb-2 inline-block">Preferred dishes (optional)</Label>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Pick anything you're already craving — we'll finalize the menu on our call.
                  </p>
                  <div className="space-y-5">
                    {MENU.map((group) => (
                      <div key={group.group}>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                          {group.group}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {group.sections.flatMap((s) =>
                            s.items.map((dish) => {
                              const active = form.preferred_dishes.includes(dish);
                              return (
                                <button
                                  type="button"
                                  key={dish}
                                  onClick={() => toggleDish(dish)}
                                  className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                                    active
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-border bg-background text-foreground hover:border-primary/40"
                                  }`}
                                >
                                  {dish}
                                </button>
                              );
                            }),
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="allergies">Allergies or dietary notes (optional)</Label>
                  <Textarea
                    id="allergies"
                    value={form.allergies}
                    onChange={(e) => update("allergies", e.target.value)}
                    rows={3}
                    placeholder="Anything we should know — nut allergies, dietary restrictions, etc."
                    className="mt-1.5"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl text-foreground">When should we call?</h2>
                <p className="text-sm text-muted-foreground">
                  We'll personally call you within 24–48 hours to walk through your menu and quote.
                </p>
                <div>
                  <Label>Preferred call time</Label>
                  <PillGroup
                    options={[
                      "Morning (9 AM – 12 PM)",
                      "Afternoon (12 PM – 5 PM)",
                      "Evening (5 PM – 8 PM)",
                    ]}
                    value={form.preferred_call_time}
                    onChange={(v) =>
                      update("preferred_call_time", v as FormState["preferred_call_time"])
                    }
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0 || submitting}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance()}
              className="rounded-full px-6"
            >
              Continue <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canAdvance() || submitting}
              className="rounded-full px-6"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function PillGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onChange(opt)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:border-primary/40"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}