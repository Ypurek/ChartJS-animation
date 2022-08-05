//  https://www.chartjs.org/docs/latest/getting-started/
// https://www.chartjs.org/docs/latest/samples/animations/progressive-line.html

const ctx = document.getElementById('myChart');
const dataLength = 31;

const totalDuration = 10000;
const delayBetweenPoints = 50;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
};


const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array(500).fill().map((x,i)=>i), // array 0 - 500
        datasets: [{
            label: 'Load, rps',
            data: Array(500).fill().map((x,i)=>i),
            borderColor: 'red',
            borderWidth: 4,
            tension: 0.4,
            fill: false,
            pointRadius: 0,
            order: 0
        },
        {
            label: 'Response time, sec',
            data: Array(250).fill().map((x,i)=>5).concat(Array(250).fill().map((x,i)=>5 + i*i/100)),
            borderColor: 'blue',
            borderWidth: 4,
            tension: 0.2,
            fill: false,
            pointRadius: 0,
            order: 1
        },
        {
            label: 'Throughput, rps',
            data: [0, 0, 0, 0, 0].concat(Array(245).fill().map((x,i)=>i)).concat(Array(250).fill().map((x,i)=>245)),
            borderColor: 'green',
            borderWidth: 4,
            tension: 0.2,
            fill: false,
            pointRadius: 0,
            order: 2
        }]
    },
    options: {
        animation,
        aspectRatio: 2,
        interaction: {
          intersect: false
        },
        plugins: {
          legend: false
        },
        scales: {
          x: {
            type: 'linear'
          }
        }
      }
});