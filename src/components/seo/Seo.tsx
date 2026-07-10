import { Helmet } from "react-helmet-async";

const SITE_URL = "https://an3s.info";
const DEFAULT_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/ctbaYOudDvNTfrKMncA18y3ZXDZ2/social-images/social-1767581646029-Share image.png";

interface SeoProps {
  title: string;
  description: string;
  /** Route path beginning with "/" (e.g. "/about"). */
  path: string;
  ogType?: "website" | "profile" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Per-route head tags: unique title, description, canonical, and Open Graph
 * data. Mutates document.head after hydration for JS-executing crawlers.
 */
export const Seo = ({ title, description, path, ogType = "website", jsonLd }: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={DEFAULT_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
};
