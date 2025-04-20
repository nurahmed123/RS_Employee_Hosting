/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://robosuperior.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',
          '/admin/*',
          '/dashboard/*',
          '/forgot-password',
        ],
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL}/sitemap.xml`,
    ],
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/api/*',
    '/admin/*',
    '/dashboard/*',
    '/forgot-password',
    '/server-sitemap.xml'
  ],
  generateIndexSitemap: true,
  outDir: 'public',
} 