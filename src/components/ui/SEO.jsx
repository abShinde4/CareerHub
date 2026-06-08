import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, path = '', type = 'website' }) {
  const siteUrl = 'https://careerhub.com';
  const url = `${siteUrl}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="CareerHub" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'CareerHub',
          url: siteUrl,
          description: 'Find jobs, internships, hackathons and career opportunities',
          potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}/?search={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        })}
      </script>
    </Helmet>
  );
}
