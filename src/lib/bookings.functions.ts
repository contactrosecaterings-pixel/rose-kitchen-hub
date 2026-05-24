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

    try {
      await sendNewBookingAlert(emailPayload);
    } catch (err) {
      console.error("[new-booking-alert] mock send failed", err);
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

/**
 * Mock email sender for the `new-booking-alert` template.
 *
 * Replace the body of this function with a real provider call (Resend,
 * SendGrid, Postmark, AWS SES, etc.) once the production domain is verified
 * on the permanent hosting environment. The shape of `payload` already
 * matches a typical transactional email request.
 */
async function sendNewBookingAlert(payload: NewBookingAlertPayload) {
  const lines = [
    `From: ${payload.from}`,
    `To: ${payload.to}`,
    `Subject: ${payload.subject}`,
    "",
    `New catering request received${payload.bookingId ? ` (id: ${payload.bookingId})` : ""}.`,
    "",
    `Name:               ${payload.body.name}`,
    `Phone:              ${payload.body.phone}`,
    `Email:              ${payload.body.email}`,
    `Event Date:         ${payload.body.eventDate}`,
    `Guest Count:        ${payload.body.guestCount}`,
    `Event Type:         ${payload.body.eventType}`,
    `Service Type:       ${payload.body.serviceType}`,
    `Preferred Call Time:${payload.body.preferredCallTime}`,
    `Preferred Dishes:   ${payload.body.preferredDishes.join(", ") || "—"}`,
    `Allergies / Notes:  ${payload.body.allergies ?? "—"}`,
    "",
    `View in dashboard: /admin`,
  ];
  console.log("[new-booking-alert]\n" + lines.join("\n"));
  return { ok: true as const, mocked: true };
}