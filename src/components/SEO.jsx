import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  url = '',
  image = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200',
  type = 'website',
  schemaList = [],
  twitterLabel1,
  twitterData1,
  twitterLabel2,
  twitterData2
}) => {
  const siteName = 'Dr. Ulhas | Expert Orthopedic Surgeon';
  const domain = 'orthopedic-specialist.com';
  const baseUrl = `https://${domain}`;
  let fullUrl = url ? (url.startsWith('https') ? url : `${baseUrl}${url}`) : baseUrl;
  
  // Ensure the URL ends with a trailing slash for consistency
  if (!fullUrl.endsWith('/')) {
    fullUrl += '/';
  }
  
  const formattedTitle = title ? (title.includes('Dr. Ulhas') ? title : `${title} | Dr. Ulhas`) : siteName;
  const defaultDesc = "Expert orthopedic care specializing in joint replacement, sports injuries, and comprehensive rehabilitation with Dr. Ulhas.";

  return (
    <Helmet>
      {/* 1. Title tags */}
      <title>{formattedTitle}</title>
      
      {/* 2. Meta Description */}
      <meta name="description" content={description || defaultDesc} />
      
      {/* 21. Canonical tag */}
      <link rel="canonical" href={fullUrl} />
      
      {/* 22. Meta Robots Tag */}
      <meta name="robots" content="index, follow" />
      
      {/* 10. Meta- og: type */}
      <meta property="og:type" content={type} />
      
      {/* 11. Meta- og: title */}
      <meta property="og:title" content={formattedTitle} />
      
      {/* 12. Meta- og: description */}
      <meta property="og:description" content={description || defaultDesc} />
      
      {/* 13. Meta- og: url */}
      <meta property="og:url" content={fullUrl} />
      
      {/* 14. Meta- og: image */}
      <meta property="og:image" content={image} />
      
      {/* 25. og:site_name */}
      <meta property="og:site_name" content={siteName} />
      
      {/* 24. og:locale */}
      <meta property="og:locale" content="en_US" />
      
      {/* 26. og:secure_url */}
      <meta property="og:image:secure_url" content={image} />
      
      {/* 27. og:image:width */}
      <meta property="og:image:width" content="1200" />
      {/* 28. og:image:height */}
      <meta property="og:image:height" content="630" />
      {/* 29. og:image:type */}
      <meta property="og:image:type" content="image/jpeg" />
      
      {/* 15. Twitter:card */}
      <meta name="twitter:card" content="summary_large_image" />
      
      {/* 23. twitter:domain */}
      <meta name="twitter:domain" content={domain} />
      
      {/* 19. twitter:url */}
      <meta name="twitter:url" content={fullUrl} />
      
      {/* 16. twitter:title */}
      <meta name="twitter:title" content={formattedTitle} />
      
      {/* 17. twitter:description */}
      <meta name="twitter:description" content={description || defaultDesc} />
      
      {/* 20. twitter:image */}
      <meta name="twitter:image" content={image} />
      
      {/* 31. twitter:site */}
      <meta name="twitter:site" content="@DrUlhasOrtho" />
      
      {/* 30. Twitter:label1 / data1 / label2 / data2 */}
      {twitterLabel1 && <meta name="twitter:label1" content={twitterLabel1} />}
      {twitterData1 && <meta name="twitter:data1" content={twitterData1} />}
      {twitterLabel2 && <meta name="twitter:label2" content={twitterLabel2} />}
      {twitterData2 && <meta name="twitter:data2" content={twitterData2} />}
      
      {/* 9. Schema */}
      {schemaList && schemaList.length > 0 && schemaList.map((schema, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
