import { computed, onUnmounted, ref } from 'vue'

export interface TempoJuntos {
  anos: number
  meses: number
  dias: number
  horas: number
  minutos: number
  segundos: number
}

/** Relógio reativo que atualiza a cada segundo. */
export function useAgora() {
  const agora = ref(new Date())
  const timer = window.setInterval(() => {
    agora.value = new Date()
  }, 1000)

  onUnmounted(() => window.clearInterval(timer))

  return agora
}

/** Tempo decorrido desde `inicio`, quebrado em anos/meses/dias/horas/min/seg. */
export function useTempoJuntos(inicio: string) {
  const agora = useAgora()

  return computed<TempoJuntos>(() => {
    const de = new Date(`${inicio}T00:00:00`)
    const ate = agora.value

    let anos = ate.getFullYear() - de.getFullYear()
    let meses = ate.getMonth() - de.getMonth()
    let dias = ate.getDate() - de.getDate()
    let horas = ate.getHours() - de.getHours()
    let minutos = ate.getMinutes() - de.getMinutes()
    let segundos = ate.getSeconds() - de.getSeconds()

    if (segundos < 0) {
      segundos += 60
      minutos--
    }
    if (minutos < 0) {
      minutos += 60
      horas--
    }
    if (horas < 0) {
      horas += 24
      dias--
    }
    if (dias < 0) {
      // dias no mês anterior ao de "agora"
      const mesAnterior = new Date(ate.getFullYear(), ate.getMonth(), 0).getDate()
      dias += mesAnterior
      meses--
    }
    if (meses < 0) {
      meses += 12
      anos--
    }

    return { anos, meses, dias, horas, minutos, segundos }
  })
}

/** Dias restantes até o próximo aniversário (0 = é hoje). */
export function useContagemRegressiva(aniversario: string) {
  const agora = useAgora()

  return computed(() => {
    const hoje = new Date(agora.value.getFullYear(), agora.value.getMonth(), agora.value.getDate())
    const partes = aniversario.split('-').map(Number)
    const mes = partes[1] ?? 1
    const dia = partes[2] ?? 1

    let proximo = new Date(hoje.getFullYear(), mes - 1, dia)
    if (proximo < hoje) {
      proximo = new Date(hoje.getFullYear() + 1, mes - 1, dia)
    }

    const dias = Math.round((proximo.getTime() - hoje.getTime()) / 86400000)
    return { dias, ehHoje: dias === 0 }
  })
}
