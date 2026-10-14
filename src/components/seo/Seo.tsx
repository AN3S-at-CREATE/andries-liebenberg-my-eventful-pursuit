import { Helmet } from "react-helmet-async";

const SITE_URL = "https://an3s.info";
// The design system's share image, copied into public/ by `npm run ds:sync`.
const DEFAULT_IMAGE = `${SITE_URL}/an3s-share.png`;
const DEFAULT_IMAGE_ALT = "Andries Liebenberg, AN3S: Strategic Development & Growth Advisor for Intelligent Businesses";

interface SeoProps {
  title: string;
  description: string;
  /** Route path beginning with "/" (e.g. "/about"). */
  path: string;
  ogType?: "website" | "profile" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Per-route head tags: unique title, description, canonical, and Open Graph
 * data. Mutates document.head after hydration for JS-executing crawlers.
 */
export const Seo = ({ title, description, path, ogType = "website", jsonLd, noindex = false }: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      {noindex && <meta name="robots" content="noindex"/>}
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={DEFAULT_IMAGE_ALT} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
      <meta name="twitter:image:alt" content={DEFAULT_IMAGE_ALT} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
};
