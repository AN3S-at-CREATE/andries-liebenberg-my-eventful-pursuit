CREATE TABLE public.ai_lab_usage (
  day date PRIMARY KEY,
  calls integer NOT NULL DEFAULT 0
);
GRANT ALL ON public.ai_lab_usage TO service_role;
ALTER TABLE public.ai_lab_usage ENABLE ROW LEVEL SECURITY;

CREATE FUNCTION public.increment_ai_lab_usage()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count integer;
BEGIN
  INSERT INTO public.ai_lab_usage (day, calls)
  VALUES ((now() AT TIME ZONE 'Africa/Johannesburg')::date, 1)
  ON CONFLICT (day) DO UPDATE SET calls = ai_lab_usage.calls + 1
  RETURNING calls INTO new_count;
  RETURN new_count;
END;
$$;
REVOKE ALL ON FUNCTION public.increment_ai_lab_usage() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_ai_lab_usage() TO service_role;