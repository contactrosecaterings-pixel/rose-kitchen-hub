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

    // Fire-and-forget notification email (best effort, don't block success).
    try {
      await fetch(
        new URL("/lovable/email/transactional/send", process.env.APP_URL ?? "http://localhost"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            templateName: "new-booking-alert",
            recipientEmail: "contact.rosecaterings@gmail.com",
            idempotencyKey: `booking-${inserted?.id}`,
            templateData: {
              fullName: data.full_name,
              phone: data.phone,
              email: data.email,
              eventDate: data.event_date,
              guestCount: data.guest_count,
              preferredCallTime: data.preferred_call_time,
            },
          }),
        },
      ).catch(() => undefined);
    } catch {
      // ignore — admin can still see the booking in the dashboard
    }

    return { ok: true as const, id: inserted?.id };
  });