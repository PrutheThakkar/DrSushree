import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

const absoluteUrl = (siteUrl, value = "") => {
  if (!value) return siteUrl
  if (/^https?:\/\//i.test(value)) return value
  return `${siteUrl.replace(/\/$/, "")}/${value.replace(/^\//, "")}`
}

const Seo = ({
  title,
  description,
  pathname = "/",
  image,
  type = "website",
  keywords = [],
  noIndex = false,
  schema,
  children,
}) => {
  const { site } = useStaticQuery(graphql`
    query SeoSiteMetadata {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `)
  const metadata = site.siteMetadata
  const pageTitle = title || metadata.title
  const metaDescription = description || metadata.description
  const canonicalUrl = absoluteUrl(metadata.siteUrl, pathname)
  const socialImage = image ? absoluteUrl(metadata.siteUrl, image) : null
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : []

  return (
    <>
      <html lang="en-IN" />
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords.length > 0 && (
        <meta
          name="keywords"
          content={Array.isArray(keywords) ? keywords.join(", ") : keywords}
        />
      )}
      <meta
        name="robots"
        content={
          noIndex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={metadata.title} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      {socialImage && <meta property="og:image" content={socialImage} />}
      <meta
        name="twitter:card"
        content={socialImage ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {metadata.author && (
        <meta name="twitter:creator" content={metadata.author} />
      )}
      {socialImage && <meta name="twitter:image" content={socialImage} />}
      {schemas.map((item, index) => (
        <script type="application/ld+json" key={index}>
          {JSON.stringify(item)}
        </script>
      ))}
      {children}
    </>
  )
}

export default Seo
