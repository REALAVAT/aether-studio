import { services, site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/icon.svg`,
        email: site.email,
        description: site.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          addressCountry: site.address.country,
        },
        areaServed: ["AE", "SA", "QA", "Worldwide"],
        knowsAbout: services.map((s) => `${s.title} design`),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#studio`,
        name: site.name,
        url: site.url,
        image: `${site.url}/opengraph-image`,
        parentOrganization: { "@id": `${site.url}/#organization` },
        priceRange: "AED 35,000+",
        currenciesAccepted: "AED, USD",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          addressCountry: site.address.country,
        },
        geo: { "@type": "GeoCoordinates", latitude: 25.1867, longitude: 55.2974 },
        openingHours: "Su-Th 09:00-18:00",
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "en",
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
