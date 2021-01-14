window.addEventListener('load', async () => {
  const canvas = document.getElementById("chart")
  const chartTitle = document.getElementById("chart-title")
  const chartTooltip = document.getElementById("chart-pop-up")

  const stats = new Stats({
    tooltip: chartTooltip,
    title: chartTitle,
  })
  await stats.load('./data/graph.json')

  const period = stats.data.period
  // temporary
  let shift = period

  const graph = new Graph({
    canvas,
    stats,
    tooltip: chartTooltip,
    startPeriod: period,
    startShift: shift
  })
  stats.updateStatistics(shift)

  // temporary
  setInterval(() => {
    shift--
    if (shift < 0) return

    graph.update(period, shift)
    stats.updateStatistics(shift)
  }, 3000)
})

