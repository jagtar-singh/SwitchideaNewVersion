class Stats {
  constructor({ title, tooltip }) {
    this._title = title
    this._titleViewsLast90Days = this._title.querySelector('.chart-title-number')
    this._titleViewsCompareLastWeek = this._title.querySelector('.chart-title-persent')
    this._titleViewsCompareLastWeekText = this._title.querySelector('.chart-title-persent-text')
    this._tooltip = tooltip
    this._tooltipDate = this._tooltip.querySelector('.chart-pop-up-date')
    this._tooltipViews = this._tooltip.querySelector('.chart-pop-up-views')
    this._tooltipImprovement = this._tooltip.querySelector('.chart-pop-up-improvement')

    this.data = null
  }

  async load(path) {
    const response = await fetch(path)

    this.data = await response.json()
  }

  updateStatistics (shift = 0) {
    const last90Days = this.getViewsLastDays({ days: 90, shift })
    this._titleViewsLast90Days.innerHTML = `${Math.round(last90Days)}`

    const persent = this.compareViewsDaysRanges({ days: 7, shift }, { days: 7, shift: 7 + shift })
    let compareLastWeekHTML = `${persent > 0 ? '+' : ''}${Math.round(persent)}%`
    compareLastWeekHTML = `<span class="chart-${persent >= 0 ? 'green' : 'red'}">${compareLastWeekHTML}</span>`
    this._titleViewsCompareLastWeek.innerHTML = compareLastWeekHTML
    this._titleViewsCompareLastWeekText.innerHTML = `<span class="chart-${persent >= 0 ? 'green' : 'red'}">since last week</span>`
  }

  updateTooltip(views, date) {
    const shift = moment().diff(date, 'days')
    const persent = this.compareViewsDaysRanges({ days: 7, shift }, { days: 7, shift: 7 + shift })

    let improvementHTML = `${persent > 0 ? '+' : ''}${Math.round(persent)}%`
    improvementHTML += ' from last week'
    improvementHTML = `<span class="chart-${persent >= 0 ? 'green' : 'red'}">${improvementHTML}</span>`

    this._tooltipImprovement.innerHTML = improvementHTML

    this._tooltipViews.innerHTML = `${views} views`;
    this._tooltipDate.innerHTML = moment(date).format('MMM DD');
  }

  getViewsLastDays({ days, shift = 0 }) {
    const data = this.getLastDays({ days, shift })

    return data.reduce((acc, { y: views }) => acc + views, 0)
  }

  compareViewsDaysRanges(range1, range2) {
    const views1 = this.getViewsLastDays(range1)
    const views2 = this.getViewsLastDays(range2)

    const diff = views1 - views2

    const result = 100 * (diff / views2)

    return Number.isNaN(result) || views2 === 0 ? 0 : result
  }

  getRange(from, to) {
    if (!this.data) return []

    return this.data.datasets.filter(({ x }) => {
      const date = +moment(x)

      return date >= +from && date <= +to
    })
  }

  getLastDays({ days, shift = 0 }) {
    const date = moment().subtract(shift, 'days')

    const now = +date
    const from = +date.subtract(days, 'days')
    return this.getRange(from, now)
  }
}
