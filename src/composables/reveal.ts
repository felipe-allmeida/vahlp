import type { Directive, DirectiveBinding } from 'vue'

/**
 * v-reveal — revela o elemento quando ele entra na viewport.
 * Uso: <div v-reveal>  ou  <div v-reveal="150">  (atraso em ms)
 *
 * O IntersectionObserver sozinho não basta: num scroll muito rápido (ou num
 * salto de âncora) o elemento pode atravessar a viewport entre dois quadros e
 * nunca disparar o callback — ficando invisível pra sempre. Por isso mantemos
 * uma varredura de segurança que revela qualquer pendente que já passou.
 */

const pendentes = new Set<HTMLElement>()
let varreduraAgendada = false

const revelar = (el: HTMLElement) => {
  el.classList.add('reveal--in')
  pendentes.delete(el)
  observer?.unobserve(el)
  if (pendentes.size === 0) {
    window.removeEventListener('scroll', agendarVarredura)
    window.removeEventListener('resize', agendarVarredura)
  }
}

/** Revela todo pendente que já está (ou já passou) pela viewport. */
const varrer = () => {
  varreduraAgendada = false
  const limite = window.innerHeight * 0.92
  for (const el of [...pendentes]) {
    if (el.getBoundingClientRect().top < limite) revelar(el)
  }
}

const agendarVarredura = () => {
  if (varreduraAgendada) return
  varreduraAgendada = true
  requestAnimationFrame(varrer)
}

const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
              revelar(entry.target as HTMLElement)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      )
    : null

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<number | undefined>) {
    el.classList.add('reveal')

    if (binding.value) {
      el.style.transitionDelay = `${binding.value}ms`
    }

    if (!observer) {
      el.classList.add('reveal--in')
      return
    }

    if (pendentes.size === 0) {
      window.addEventListener('scroll', agendarVarredura, { passive: true })
      window.addEventListener('resize', agendarVarredura, { passive: true })
    }

    pendentes.add(el)
    observer.observe(el)
  },

  unmounted(el: HTMLElement) {
    pendentes.delete(el)
    observer?.unobserve(el)
  },
}
