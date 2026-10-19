ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS service text;
ALTER TABLE public.contact_submissions ADD CONSTRAINT contact_submissions_service_length CHECK (service IS NULL OR (char_length(service) BETWEEN 1 AND 150));
GRANT ALL ON public.contact_submissions TO service_role;