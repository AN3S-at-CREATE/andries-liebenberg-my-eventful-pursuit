-- Allow the service role to insert contact submissions
-- The send-contact-email edge function uses the service role key
CREATE POLICY "Service role can insert contact submissions"
ON public.contact_submissions
FOR INSERT
TO service_role
WITH CHECK (true);