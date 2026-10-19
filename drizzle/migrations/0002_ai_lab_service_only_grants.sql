REVOKE ALL ON TABLE public.ai_lab_usage FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.ai_lab_usage TO service_role;
REVOKE ALL ON FUNCTION public.increment_ai_lab_usage() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_ai_lab_usage() TO service_role;