import AbstractView from './abstract-view';
import {sumTypesPrices, countTypes, sumTimeSpend, findDuration, makeRange} from '../utils/common.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {BAR_HEIGHT, DATA_LABELS_FONT_SIZE, TITLE_FONT_SIZE, BAR_THICKNESS, MIN_BAR_LENGTH, MIN_BAR_LENGTH_TIMES, PADDING, HEIGHT_MULTIPLIER} from '../constants.js'

const renderMoneyChart = (moneyCtx, labelsArr, pricesArr) => {
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: labelsArr,
      datasets: [{
        data: pricesArr,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: DATA_LABELS_FONT_SIZE,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: TITLE_FONT_SIZE,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: PADDING,
            fontSize: DATA_LABELS_FONT_SIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: BAR_THICKNESS,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: MIN_BAR_LENGTH,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChart = (typeCtx, labelsArr, typeCountArr) => {
  return new Chart(typeCtx,  {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: labelsArr,
      datasets: [{
        data: typeCountArr,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: DATA_LABELS_FONT_SIZE,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: TITLE_FONT_SIZE,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: PADDING,
            fontSize: DATA_LABELS_FONT_SIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: BAR_THICKNESS,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: MIN_BAR_LENGTH,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeSpendChart = (typeCtx, labelsArr, typeCountArr) => {
  return new Chart(typeCtx,  {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: labelsArr,
      datasets: [{
        data: typeCountArr,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: DATA_LABELS_FONT_SIZE,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => {return findDuration(val);},
        },
      },
      title: {
        display: true,
        text: 'TIME - SPEND',
        fontColor: '#000000',
        fontSize: TITLE_FONT_SIZE,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: PADDING,
            fontSize: DATA_LABELS_FONT_SIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: BAR_THICKNESS,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: MIN_BAR_LENGTH_TIMES,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const creatStatsTemplate = () => {
  return `<section class="statistics visually-hidden">
          <h2 class="visually-hidden">Trip statistics</h2>

          <div class="statistics__item statistics__item--money">
            <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--transport">
            <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--time-spend">
            <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
          </div>
        </section>`;
};

export default class StatsView extends AbstractView {
  constructor (pointModel) {
    super();
    this._pointModel = pointModel;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  getTemplate() {
    return creatStatsTemplate();
  }

  _getPoints() {
    return this._pointModel.getPoints();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const typesArr = Array.from(new Set(this._getPoints().slice().map(({pointType})=>{return pointType.toUpperCase();})));

    const moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    const typeCtx = this.getElement().querySelector('.statistics__chart--transport');
    const timeCtx = this.getElement().querySelector('.statistics__chart--time');


    moneyCtx.height = BAR_HEIGHT * HEIGHT_MULTIPLIER;
    typeCtx.height = BAR_HEIGHT * HEIGHT_MULTIPLIER;
    timeCtx.height = BAR_HEIGHT * HEIGHT_MULTIPLIER;

    const pricesSumArr = makeRange(typesArr, sumTypesPrices(typesArr, this._getPoints()));
    const typesSumArr =  makeRange(typesArr, countTypes(typesArr, this._getPoints()));
    const timesSumArr = makeRange(typesArr, sumTimeSpend(typesArr, this._getPoints()));

    this._moneyChart = renderMoneyChart(moneyCtx, pricesSumArr.types, pricesSumArr.numbers);
    this._typeChart = renderTypeChart(typeCtx, typesSumArr.types, typesSumArr.numbers);
    this._timeChart = renderTimeSpendChart(timeCtx, timesSumArr.types, timesSumArr.numbers);
  }
}
