
-- Bookings will only be created via the server function using the admin client (service role bypasses RLS)
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;

-- Lock down the security definer helper function
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
