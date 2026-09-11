/**
 * Quanto a pessoa já mergulhou: 0 na praia, 1 debaixo d'água.
 *
 * O valor sai em `--profundidade`, no `<html>`, e o CSS de cada peça do cenário
 * lê de lá — é o que faz o céu virar água, a superfície subir e o cardume
 * aparecer só depois que você afunda.
 *
 * A conta roda dentro de um requestAnimationFrame porque `scroll` dispara
 * muitas vezes por quadro e aqui a gente só precisa do último valor.
 */
export function observarProfundidade(): () => void {
  const html = document.documentElement
  let agendado = false

  const medir = () => {
    agendado = false
    // a travessia da superfície acontece ao longo da primeira tela
    const mergulho = Math.max(1, window.innerHeight * 0.9)
    const p = Math.min(1, Math.max(0, window.scrollY / mergulho))
    html.style.setProperty('--profundidade', p.toFixed(4))
  }

  const aoRolar = () => {
    if (agendado) return
    agendado = true
    requestAnimationFrame(medir)
  }

  medir()
  window.addEventListener('scroll', aoRolar, { passive: true })
  window.addEventListener('resize', aoRolar, { passive: true })

  return () => {
    window.removeEventListener('scroll', aoRolar)
    window.removeEventListener('resize', aoRolar)
  }
}
