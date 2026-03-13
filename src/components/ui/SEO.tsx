import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEO = ({ 
  title = "Yatin San | Senior Flutter Developer | Expert Mobile Solutions",
  description = "Senior Flutter Developer with 4+ years of experience. Expert in cross-platform mobile apps, advanced animations, and high-performance UI.",
  keywords = "Yatin San, Flutter Developer, Senior Flutter Developer, Mobile App Developer, Portfolio, Dart, iOS, Android, React",
  image = "https://portfolio.yatin.live/og-image.png",
  url = "https://portfolio.yatin.live/"
}: SEOProps) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
