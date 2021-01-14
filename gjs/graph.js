class Graph {
  constructor ({ canvas, tooltip, stats, startPeriod, startShift }) {
    const ctx = canvas.getContext("2d");

    this._tooltip = tooltip
    this._stats = stats
    this._data = null

    this.lineStyle = {
      backgroundColor: this._generateGradientLineBackground(ctx, canvas), // Put the gradient here as a fill color
      borderColor : "#456FB6",
      pointBorderColor : "#CADAF0",
      pointBackgroundColor : "#456FB6",
      borderWidth: 3,
      pointRadius: 7,
      pointBorderWidth: 4,
    }

    this.barStyle = {
      backgroundColor: this._generateGradientBar(ctx, canvas), // Put the gradient here as a fill color
      borderWidth: 0,
      // barPercentage: 0.7,
      barThickness: 9,
      pointRadius: 5,
      pointBorderWidth: 3,
    }

    this.graphOptions = {
      tooltips: {
        enabled: false,
        custom: this._customTooltip.bind(this),
      },
      legend: {
        display: false,
      },
      responsive: false,
      scales: {
        xAxes: [{
          type: 'time',
          gridLines: {
            drawOnChartArea: false,
            lineWidth: 2,
            zeroLineWidth: 2,
            zeroLineColor: '#E0E0E07D',
            color: '#E0E0E07D',
          },
          ticks: {
            fontColor: '#AAC2CE',
            fontStyle: 'bold'
          },
          time: {
            parser: (a) => +moment(a),
            // round: 'day'
            stepSize: 4,
            unit: 'day'
          }
        }],
        yAxes: [{
          type: 'linear',
          gridLines: {
            lineWidth: 2,
            color: '#E0E0E07D',
            color: '#E0E0E07D',
            borderDash: [8],
            borderDashOffset: 6
          },
          offset: true,
          ticks: {
            fontColor: '#AAC2CE',
            fontStyle: 'bold',
            suggestedMin: 0,
            suggestedMax: 90
          }
        }]
      }
    }

    this.chart = this._generateChart(canvas, startPeriod, startShift)
  }

  update(period, shift) {
    this._data = this._stats.getLastDays({ days: period, shift })

    this.chart.data.datasets[0].data = this._data
    this.chart.data.datasets[1].data = this._generateRandomBars(
      moment(this._data[0].x),
      moment(this._data[this._data.length - 1].x),
      period
    )
   this.chart.update()
  }

  _generateChart(canvas, period, shift) {
    this._data = this._stats.getLastDays({ days: period, shift })

    const lineDataset = {
      ...this.lineStyle,
      type: 'scatter',
      showLine: true,
      data: this._data,
    }

    const barDataset = {
      ...this.barStyle,
      type: 'bar',
      data: this._generateRandomBars(
        moment(this._data[0].x),
        moment(this._data[this._data.length - 1].x),
        period
      ),
    }

    return new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [lineDataset, barDataset]
      },
      options: this.graphOptions
    });
  }

  _generateRandomBars(start, end, period) {
    const step = 5 * (period / 15) * 60 * 60 * 1000
    const steps = Math.round((end - start) / step)
    return Array(steps).fill().map((_, index) => {
      const time = step * (steps - index)
      const date = moment(end - time);
      const lowerDataset = this._data.find(({ x }) => {
        return +moment(x) > date
      })
      const higherDataset = this._data[this._data.findIndex(d => d === lowerDataset) - 1]

      if (!higherDataset || !lowerDataset) return { x: date, y: Math.random() * 10 }

      const dateToViews = (lowerDataset.y - higherDataset.y) / (+moment(lowerDataset.x) - +moment(higherDataset.x))

      const value = lowerDataset.y + (date - +moment(lowerDataset.x)) * dateToViews - 20.001

      return {
        x: date,
        y: value < 0 ? 0 : value
      }
    })
  }

  _generateGradientLineBackground(ctx, canvas) {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height  * 0.88);
    gradient.addColorStop(0, 'rgba(36, 132, 198, 0.3)');
    gradient.addColorStop(1, 'rgba(36, 132, 198, 0)');

    return gradient
  }

  _generateGradientBar(ctx, canvas) {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    // gradient.addColorStop(0, 'rgba(36, 132, 198, 0)');
    gradient.addColorStop(0.7, 'rgba(46, 75, 100, 0)');
    gradient.addColorStop(1, 'rgba(46, 75, 100, 0.4)');

    return gradient
  }

  _customTooltip(tooltipModel) {
    if (tooltipModel.opacity === 0) {
        this._tooltip.style.opacity = 0;
        return;
    }

    // Set Text
    if (tooltipModel.body) {
      const bodyLine = tooltipModel.body.map(b => b.lines)[0][0].slice(1, -1);

      const chunks = bodyLine.split(', ')
      const views = parseFloat(chunks.pop())
      const date = chunks.join(', ')
      const element = this._data.find(point => point.y === views)
      const momentDate = moment(date)

      if (!momentDate.isValid() || !element) return

      this._stats.updateTooltip(Math.round(views), moment(date))
    }

    // `this` will be the overall tooltip
    const position = this.chart.canvas.getBoundingClientRect();

    // Display, position, and set styles for font
    const width = 150;
    const height = width * 0.75
    this._tooltip.style.opacity = 1;
    this._tooltip.style.width = width + 'px';
    this._tooltip.style.height = height + 'px';
    this._tooltip.style.position = 'absolute';
    this._tooltip.style.left = position.left + window.pageXOffset - (width / 2 + 5) + tooltipModel.caretX + 'px';
    this._tooltip.style.top = position.top + window.pageYOffset - (height + 20) + tooltipModel.caretY + 'px';
    this._tooltip.style.fontFamily = tooltipModel._bodyFontFamily;
    this._tooltip.style.fontSize = tooltipModel.bodyFontSize + 'px';
    this._tooltip.style.fontStyle = tooltipModel._bodyFontStyle;
    this._tooltip.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
    this._tooltip.style.pointerEvents = 'none';
  }
}
