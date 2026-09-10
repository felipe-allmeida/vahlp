import { chromium } from 'playwright-core'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const out = '/tmp/claude-0/-home-user-pampadevs-client/a1a43a31-f206-5d8e-9819-5bdca29b97db/scratchpad'
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:4193/', { waitUntil: 'load' })
await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' })
const marcos = await page.$$('.historia__marco')
console.log('capítulos na página:', marcos.length)
await marcos[2].scrollIntoViewIfNeeded()
await page.waitForTimeout(600)
await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))))
await page.waitForTimeout(1400)
await marcos[2].screenshot({ path: `${out}/t-primeira.jpg`, quality: 84, type: 'jpeg' })
console.log('quebradas:', await page.evaluate(() =>
  [...document.images].filter((i) => !(i.complete && i.naturalWidth > 0)).length))
await browser.close()
