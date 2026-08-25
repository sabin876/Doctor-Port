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
  const contactPhone = import.meta.env.VITE_CONTACT_PHONE || "+91 90492 00041";
  const siteName = 'Dr. Ulhas | Expert Orthopedic Surgeon';
  const domain = 'drulhasorthopedic.com';
  const baseUrl = `https://${domain}`;
  const safeUrl = url || '';
  let fullUrl = safeUrl ? (safeUrl.startsWith('https') ? safeUrl : `${baseUrl}${safeUrl}`) : baseUrl;
  
  // Ensure image is an absolute URL for social scrapers
  let safeImage = image || 'https://drulhasorthopedic.com/images/articles/article_pillar_guide.png';
  if (typeof safeImage === 'string' && safeImage.includes('localhost')) {
    safeImage = safeImage.replace(/http:\/\/localhost(:\d+)?/g, 'https://drulhasorthopedic.com');
  }
  const absoluteImage = (typeof safeImage === 'string' && safeImage.startsWith('http')) 
    ? safeImage 
    : `${baseUrl}${typeof safeImage === 'string' && safeImage.startsWith('/') ? '' : '/'}${safeImage}`;

  // Ensure the URL does NOT end with a trailing slash for consistency (unless it's exactly the base URL)
  if (fullUrl.endsWith('/') && fullUrl !== baseUrl && fullUrl !== baseUrl + '/') {
    fullUrl = fullUrl.slice(0, -1);
  } else if (fullUrl === baseUrl + '/') {
    fullUrl = baseUrl;
  }

  const formattedTitle = title ? (title.includes('Dr. Ulhas') ? title : `${title} | Dr. Ulhas`) : siteName;
  const defaultDesc = "Expert orthopedic care specializing in joint replacement, sports injuries, and comprehensive rehabilitation with Dr. Ulhas.";

  return (
    <Helmet>
      {/* 1. Title tags */}
      <title>{formattedTitle}</title>

      {/* 2. Meta Description */}
      <meta name="description" content={description || defaultDesc} />

      {/* 3. Canonical Tag */}
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
      <meta property="og:image" content={absoluteImage} />

      {/* 25. og:site_name */}
      <meta property="og:site_name" content={siteName} />

      {/* 24. og:locale */}
      <meta property="og:locale" content="en_US" />

      {/* 26. og:secure_url */}
      <meta property="og:image:secure_url" content={absoluteImage} />

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
      <meta name="twitter:image" content={absoluteImage} />

      {/* 31. twitter:site */}
      <meta name="twitter:site" content="@DrUlhasOrtho" />

      {/* 30. Twitter:label1 / data1 / label2 / data2 */}
      {twitterLabel1 && <meta name="twitter:label1" content={twitterLabel1} />}
      {twitterData1 && <meta name="twitter:data1" content={twitterData1} />}
      {twitterLabel2 && <meta name="twitter:label2" content={twitterLabel2} />}
      {twitterData2 && <meta name="twitter:data2" content={twitterData2} />}

      {/* 9. Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Physician",
          "name": "Dr. Ulhas Sonar",
          "image": absoluteImage,
          "@id": baseUrl,
          "url": baseUrl,
          "telephone": contactPhone,
          "medicalSpecialty": "Orthopedic",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Canadian Specialist Hospital",
            "addressLocality": "Dubai",
            "addressCountry": "AE"
          }
        })}
      </script>
      {schemaList && schemaList.length > 0 && schemaList.map((schema, idx) => {
        if (!schema) return null;
        if (typeof schema === 'string') {
          const trimmed = schema.trim();
          if (trimmed.startsWith('<script') && trimmed.includes('</script>')) {
            return <div key={idx} dangerouslySetInnerHTML={{ __html: trimmed }} />;
          }
          return (
            <script key={idx} type="application/ld+json">
              {trimmed}
            </script>
          );
        }
        return (
          <script key={idx} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        );
      })}
    </Helmet>
  );
};

export default SEO;
