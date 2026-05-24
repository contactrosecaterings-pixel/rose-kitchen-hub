import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BookingSchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(40),
  event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guest_count: z.enum(["10-25", "26-50", "51-100", "100+"]),
  event_type: z.enum([
    "Wedding",
    "Aqeeqah",
    "Family Gathering",
    "Eid Event",
    "Corporate",
    "Other",
  ]),
  service_type: z.enum(["Drop-off Delivery", "Pickup", "Full-Service Catering"]),
  preferred_dishes: z.array(z.string().min(1).max(80)).max(60).default([]),
  allergies: z.string().max(2000).optional().default(""),
  preferred_call_time: z.enum(["Morning", "Afternoon", "Evening"]),
});

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => BookingSchema.parse(input))
  .handler(async ({ data }) => {
    const { error, data: inserted } = await supabaseAdmin
      .from("bookings")
      .insert({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        event_date: data.event_date,
        guest_count: data.guest_count,
        event_type: data.event_type,
        service_type: data.service_type,
        preferred_dishes: data.preferred_dishes,
        allergies: data.allergies || null,
        preferred_call_time: data.preferred_call_time,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Booking insert failed", error);
      throw new Error("Could not save your booking. Please try again.");
    }

    // ----- new-booking-alert notification (mock) -----
    // The live email provider will be wired up on the permanent hosting
    // environment. For now we build the full payload and log it so the
    // integration point is fully defined and the admin still sees every
    // booking in the /admin dashboard.
    const emailPayload = {
      to: "contact.rosecaterings@gmail.com",
      from: "noreply@notify.rosecaterings.com",
      subject: `🚨 New Catering Request from ${data.full_name}`,
      template: "new-booking-alert",
      bookingId: inserted?.id,
      body: {
        name: data.full_name,
        phone: data.phone,
        email: data.email,
        eventDate: data.event_date,
        guestCount: data.guest_count,
        eventType: data.event_type,
        serviceType: data.service_type,
        preferredCallTime: data.preferred_call_time,
        preferredDishes: data.preferred_dishes,
        allergies: data.allergies || null,
      },
    };

    // Fire-and-forget so a slow email API can never block the user's
    // success state. Failures are logged but never thrown to the client.
    try {
      await sendNewBookingAlert(emailPayload);
    } catch (err) {
      console.error("[new-booking-alert] send failed", err);
    }

    return { ok: true as const, id: inserted?.id };
  });

type NewBookingAlertPayload = {
  to: string;
  from: string;
  subject: string;
  template: string;
  bookingId?: string;
  body: {
    name: string;
    phone: string;
    email: string;
    eventDate: string;
    guestCount: string;
    eventType: string;
    serviceType: string;
    preferredCallTime: string;
    preferredDishes: string[];
    allergies: string | null;
  };
};

const NOTIFY_RECIPIENT = "contact.rosecaterings@gmail.com";

/**
 * Sends the `new-booking-alert` via Resend. Designed for free-tier use:
 * sends from `onboarding@resend.dev` so no domain verification is required.
 * Set RESEND_API_KEY in Lovable Cloud secrets to enable live delivery.
 */
async function sendNewBookingAlert(payload: NewBookingAlertPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[new-booking-alert] RESEND_API_KEY not set — skipping live send");
    return { ok: false as const, skipped: true };
  }

  const html = renderAlertHtml(payload);
  const text = renderAlertText(payload);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "Rose Caterings <onboarding@resend.dev>",
      to: [NOTIFY_RECIPIENT],
      reply_to: payload.body.email,
      subject: payload.subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${errText}`);
  }
  return { ok: true as const };
}

function esc(input: string | null | undefined): string {
  if (!input) return "";
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderAlertHtml(p: NewBookingAlertPayload): string {
  const b = p.body;
  const dishes =
    b.preferredDishes && b.preferredDishes.length
      ? `<ul style="margin:6px 0 0;padding-left:18px;color:#1f2937;">${b.preferredDishes
          .map((d) => `<li style="margin:2px 0;">${esc(d)}</li>`)
          .join("")}</ul>`
      : `<div style="color:#6b7280;">No specific dishes selected</div>`;

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 10px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;">${label}</td>
      <td style="padding:6px 0;color:#111827;font-size:14px;font-weight:600;">${value}</td>
    </tr>`;

  const section = (icon: string, title: string, inner: string) => `
    <div style="margin:20px 0;padding:18px 20px;background:#fafaf7;border:1px solid #ece9df;border-radius:12px;">
      <div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#a07a2c;margin-bottom:8px;">
        ${icon} ${title}
      </div>
      ${inner}
    </div>`;

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f3ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">
    <div style="background:#1f2937;color:#fff;padding:22px 24px;border-radius:14px 14px 0 0;">
      <div style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#d4b66a;">Rose Caterings</div>
      <div style="margin-top:6px;font-size:22px;font-weight:700;">🚨 New Catering Request</div>
      <div style="margin-top:4px;font-size:14px;color:#d1d5db;">from <strong>${esc(b.name)}</strong></div>
    </div>
    <div style="background:#ffffff;padding:8px 24px 24px;border-radius:0 0 14px 14px;border:1px solid #ece9df;border-top:none;">
      ${section(
        "👤",
        "Client Info",
        `<table style="width:100%;border-collapse:collapse;">
          ${row("Name", esc(b.name))}
          ${row("Email", `<a href="mailto:${esc(b.email)}" style="color:#a07a2c;text-decoration:none;">${esc(b.email)}</a>`)}
          ${row("Phone", `<a href="tel:${esc(b.phone)}" style="color:#a07a2c;text-decoration:none;">${esc(b.phone)}</a>`)}
        </table>`,
      )}
      ${section(
        "📅",
        "Event Details",
        `<table style="width:100%;border-collapse:collapse;">
          ${row("Event Date", esc(b.eventDate))}
          ${row("Guest Count", esc(b.guestCount))}
          ${row("Event Type", esc(b.eventType))}
        </table>`,
      )}
      ${section(
        "🚚",
        "Logistics",
        `<table style="width:100%;border-collapse:collapse;">
          ${row("Service Type", esc(b.serviceType))}
        </table>`,
      )}
      ${section("🍲", "Menu Preferences", dishes)}
      ${section(
        "⚠️",
        "Special Notes",
        `<div style="color:#1f2937;font-size:14px;white-space:pre-wrap;">${
          b.allergies ? esc(b.allergies) : '<span style="color:#6b7280;">None provided</span>'
        }</div>`,
      )}
      ${section(
        "📞",
        "Follow-Up",
        `<table style="width:100%;border-collapse:collapse;">
          ${row("Preferred Call Time", esc(b.preferredCallTime))}
        </table>`,
      )}
      <div style="margin-top:24px;padding-top:18px;border-top:1px solid #ece9df;font-size:12px;color:#6b7280;text-align:center;">
        Booking ID: ${esc(p.bookingId || "—")} · Reply directly to this email to reach the client.
      </div>
    </div>
  </div>
</body></html>`;
}

function renderAlertText(p: NewBookingAlertPayload): string {
  const b = p.body;
  return [
    `🚨 New Catering Request from ${b.name}`,
    ``,
    `👤 CLIENT INFO`,
    `  Name:  ${b.name}`,
    `  Email: ${b.email}`,
    `  Phone: ${b.phone}`,
    ``,
    `📅 EVENT DETAILS`,
    `  Date:   ${b.eventDate}`,
    `  Guests: ${b.guestCount}`,
    `  Type:   ${b.eventType}`,
    ``,
    `🚚 LOGISTICS`,
    `  Service Type: ${b.serviceType}`,
    ``,
    `🍲 MENU PREFERENCES`,
    b.preferredDishes.length
      ? b.preferredDishes.map((d) => `  • ${d}`).join("\n")
      : `  (none selected)`,
    ``,
    `⚠️ SPECIAL NOTES`,
    `  ${b.allergies || "(none)"}`,
    ``,
    `📞 FOLLOW-UP`,
    `  Preferred Call Time: ${b.preferredCallTime}`,
    ``,
    `Booking ID: ${p.bookingId || "—"}`,
  ].join("\n");
}