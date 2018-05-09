import React from 'react'
import { Line, ChartData } from 'react-chartjs-2'
import { reduce, merge, get } from 'lodash'
import classNames from 'classnames'
const timeLineChartClass = require('./style.scss')

export interface DataSet {
  x: object,
  y: number| string
}
export interface LineObject {
  dataset: DataSet[]
  lineColor: string
  datasetLabel: string
  isGradient?: boolean
}

export interface TimelineBasedChartProps {
  labels?: Array<string | string[]>;
  data: LineObject[]
  showXGridLines?: boolean
  showXTicks?: boolean
  showYTicks?: boolean
  minYTick?: number
  maxYTick: number
  yTickStepSize: number
  yTickLabels?: any
  timeToolTipFormat: string
  timeUnit: 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year'
  timeDisplayFormat: string
  dateFormat: string
  getColour: (lineColor: string) => string
  title: string
}

export interface ChartTooltipItem {
  xLabel?: string;
  yLabel?: string;
  datasetIndex?: number;
  index?: number;
}

export class TimelineBasedChart extends React.PureComponent<TimelineBasedChartProps> {
  render() {
    return (<BaseTimelineBasedChart
      showXGridLines={false}
      showXTicks={true}
      showYTicks={true}
      minYTick={0} {...this.props} />)
  }
}


class BaseTimelineBasedChart extends React.PureComponent<TimelineBasedChartProps> {
  get options() {
    const {
      showXGridLines,
      showXTicks,
      showYTicks,
      minYTick,
      maxYTick,
      yTickStepSize,
      yTickLabels,
      timeToolTipFormat,
      timeUnit,
      timeDisplayFormat,
      dateFormat
    } = this.props

    return {
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10
        }
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            parser: dateFormat,
            tooltipFormat: timeToolTipFormat,
            unit: timeUnit,
            displayFormats: {
              [timeUnit]: timeDisplayFormat
            }
          },
          gridLines: {
            display: showXGridLines
          },
          ticks: {
            display: showXTicks
          }
        }],
        yAxes: [{
          gridLines: {
            drawBorder: showYTicks
          },
          ticks: {
            display: showYTicks,
            min: minYTick,
            max: maxYTick,
            stepSize: yTickStepSize,
            callback: (label: any) => {
              if (yTickLabels) {
                let tickLabel = null

                Object.keys(yTickLabels).forEach(function (key) {
                  if (parseInt(key) === parseInt(label)) {
                    tickLabel = yTickLabels[key]
                  }
                })

                return tickLabel
              }

              return label
            }
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem: ChartTooltipItem, data: ChartData<any>) => {

            if (!data.datasets || !tooltipItem.datasetIndex) {
              return ''
            }

            let label = data.datasets[tooltipItem.datasetIndex].label || ''

            if (label) {
              label += ': '
            }
            let valueLabel = tooltipItem.yLabel

            if (yTickLabels) {
              Object.keys(yTickLabels).forEach(function (key) {
                if (parseInt(key) === parseInt(get(tooltipItem, ['yLabel', '']))) {
                  valueLabel = yTickLabels[key]
                }
              })
            }

            return `${label}${valueLabel}`
          }
        }
      }
    }
  }

  lineGradient(lineColor: string) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const gradient = ctx!.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, lineColor.replace(')', ', 0.3)').replace('rgb', 'rgba'))
    gradient.addColorStop(0.9, lineColor.replace(')', ', 0)').replace('rgb', 'rgba'))
    return gradient
  }

  get datasets() {
    const {
      labels,
      data,
      getColour
    } = this.props

    return data.map((dataset: ChartData<any>) => {
      let attributes = {
        label: dataset['datasetLabel'],
        backgroundColor: getColour(dataset['lineColor']),
        borderColor: getColour(dataset['lineColor']),
        borderWidth: 4,
        pointBackgroundColor: getColour(dataset['lineColor']),
        pointBorderColor: getColour(dataset['lineColor']),
        pointBorderWidth: 1,
        pointRadius: 4,
        pointHoverBackgroundColor: getColour(dataset['lineColor']),
        pointHitRadius: 10,
        pointHoverRadius: 5,
        lineTension: 0,
        fill: false,
        data: dataset['dataset']
      }

      if (dataset['isGradient']) {
        attributes = merge(attributes, {
          colour: getColour(dataset['lineColor']),
          backgroundColor: this.lineGradient(getColour(dataset['lineColor'])),
          fill: true,
          fillColor: getColour(dataset['lineColor'])
        })
      }

      return attributes
    })

  }

  render() {
    const { title, labels } = this.props
    return (
      <div className={classNames(timeLineChartClass, 'line-chart')}>
        {title && (<div className='chart-title'>
          {title}
        </div>)}

        <Line
          data={{
            labels: labels,
            datasets: this.datasets
          }}
          options={this.options}
        />
      </div>
    )
  }
}
