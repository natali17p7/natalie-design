import {expect, test as it} from '@playwright/test'

it('handles i18n routing', async ({page}) => {
  await page.goto('/')
  await expect(page).toHaveURL('/en')

  // A cookie remembers the last locale
  await page.goto('/de')
  await page.goto('/')
  await expect(page).toHaveURL('/de')
  await page
    .getByRole('combobox', {name: 'Sprache ändern'})
    .selectOption({value: 'en'})

  await expect(page).toHaveURL('/en')
  page.getByRole('heading', {name: 'next-intl example'})
})
it('handles not found pages', async ({page}) => {
  await page.goto('/unknown')
  page.getByRole('heading', {name: 'Page not found'})

  await page.goto('/de/unknown')
  page.getByRole('heading', {name: 'Seite nicht gefunden'})
})
it("handles not found pages for routes that don't match the middleware", async ({
  page
}) => {
  await page.goto('/test.png')
  page.getByRole('heading', {name: 'Page not found'})

  await page.goto('/api/hello')
  page.getByRole('heading', {name: 'Page not found'})
})
it('sets caching headers', async ({request}) => {
  for (const pathname of ['/en', '/en/pathnames', '/de', '/de/pfadnamen']) {
    expect((await request.get(pathname)).headers()['cache-control']).toBe(
      's-maxage=31536000, stale-while-revalidate'
    )
  }
})

it('can be used to configure metadata', async ({page}) => {
  await page.goto('/en')
  await expect(page).toHaveTitle('next-intl example')

  await page.goto('/de')
  await expect(page).toHaveTitle('next-intl Beispiel')
})
it('can be used to localize the page', async ({page}) => {
  await page.goto('/en')
  page.getByRole('heading', {name: 'next-intl example'})

  await page.goto('/de')
  page.getByRole('heading', {name: 'next-intl Beispiel'})
})
it('serves a robots.txt', async ({page}) => {
  const response = await page.goto('/robots.txt')
  const body = response?.body()
  expect((body as Buffer)?.toString('utf-8')).toEqual('User-Agent: *\nAllow: *\n')
})
it('serves a sitemap.xml', async ({page}) => {
  const response = await page.goto('/sitemap.xml')
  const body = (await response!.body())?.toString('utf-8')
  expect(body).toMatchInlineSnapshot(`
    ` + '<?xml version="1.0" encoding="UTF-8"?>\n' + `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
<url>
<loc>http://localhost:3000/en</loc>
<xhtml:link rel="alternate" hreflang="en" href="http://localhost:3000/en" />
<xhtml:link rel="alternate" hreflang="de" href="http://localhost:3000/de" />
</url>
<url>
<loc>http://localhost:3000/de</loc>
<xhtml:link rel="alternate" hreflang="en" href="http://localhost:3000/en" />
<xhtml:link rel="alternate" hreflang="de" href="http://localhost:3000/de" />
</url>
<url>
<loc>http://localhost:3000/en/pathnames</loc>
<xhtml:link rel="alternate" hreflang="en" href="http://localhost:3000/en/pathnames" />
<xhtml:link rel="alternate" hreflang="de" href="http://localhost:3000/de/pfadnamen" />
</url>
<url>
<loc>http://localhost:3000/de/pfadnamen</loc>
<xhtml:link rel="alternate" hreflang="en" href="http://localhost:3000/en/pathnames" />
<xhtml:link rel="alternate" hreflang="de" href="http://localhost:3000/de/pfadnamen" />
</url>
</urlset>
`
  )
})
it('provides a manifest', async ({page}) => {
  const response = await page.goto('/manifest.webmanifest')
type Manifest = {
  name: string
  start_url: string
  theme_color: string
}

  const body = await response!.json() as Manifest
  expect(body).toEqual({
    name: 'next-intl example',
    start_url: '/',
    theme_color: '#101E33'
  })
})
