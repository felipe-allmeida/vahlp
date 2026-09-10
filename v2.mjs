import { chromium } from 'playwright-core'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const out = '/tmp/claude-0/-home-user-pampadevs-client/a1a43a31-f206-5d8e-9819-5bdca29b97db/scratchpad'
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
const erros = []
page.on('pageerror', (e) => erros.push(e.message))
await page.goto('http://localhost:4194/', { waitUntil: 'load' })
await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' })
await page.evaluate(() => document.querySelector('#galeria')?.scrollIntoView({ block: 'start' }))
await page.waitForTimeout(800)
await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))))
await page.waitForTimeout(1200)
await page.evaluate(() => window.scrollBy(0, 300))
await page.waitForTimeout(800)
await page.screenshot({ path: `${out}/flex.jpg`, quality: 74, type: 'jpeg' })
console.log('capítulos:', await page.evaluate(() => document.querySelectorAll('.historia__marco').length))
console.log('fotos galeria:', await page.evaluate(() => document.querySelectorAll('.galeria__item').length))
console.log('erros:', erros.length ? erros : 'nenhum')
await browser.close()
