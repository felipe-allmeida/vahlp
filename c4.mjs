import sharp from 'sharp'
const U = '/root/.claude/uploads/a1a43a31-f206-5d8e-9819-5bdca29b97db/'
const jobs = [
  ['3b7a4b30-image.jpg', 'portaria.webp'],
  ['ba0e1f9c-image.jpg', 'mercado.webp'],
  ['c4a2e0d1-image.jpg', 'luzinhas.webp'],
  ['1f0e2a3b-image.jpg', 'cozinha.webp'],
  ['9d8c7b6a-image.jpg', 'brinde.webp'],
]
for (const [src, out] of jobs) {
  try {
    const i = await sharp(U + src).rotate()
      .resize({ width: 1400, height: 1750, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 }).toFile('public/fotos/' + out)
    console.log(out, i.width + 'x' + i.height)
  } catch (e) { console.log('FALHOU', src, e.message.slice(0, 60)) }
}
