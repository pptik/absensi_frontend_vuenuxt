<template>
  <section class="container">
    <h1>Example</h1>
    <div class="md-layout">
      <div class="md-layout-item">
        <h3>Line Chart</h3>
        <LineChart  :data="linecollection"/>
      </div>
      <div class="md-layout-item">
        <h3>Bar Chart</h3>
        <BarChart  :data="barcollection"/>
      </div>
      <div class="md-layout-item">
        <h3>Bubble Chart</h3>
        <BubbleChart  :data="bubblecollection"/>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item">
        <h3>Doughtnut Chart</h3>
        <DoughtnutChart  :data="doughtnutcollection"/>
      </div>
      <div class="md-layout-item">
        <h3>Pie Chart</h3>
        <PieChart  :data="piecollection"/>
      </div>
      <div class="md-layout-item">
        <h3>Polar Area Chart</h3>
        <PolarAreaChart  :data="polarcollection"/>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item">
        <h3>Radar Chart</h3>
        <RadarChart  :data="radarcollection"/>
      </div>
      <div class="md-layout-item">
        <h3>Scatter Chart</h3>
        <ScatterChart  :data="scattercollection"/>
      </div>
    </div>
  </section>
</template>

<script>
import BarChart from '@/components/charts/BarChart'
import BubbleChart from '@/components/charts/BubbleChart'
import DoughtnutChart from '@/components/charts/DoughtnutChart'
import LineChart from '@/components/charts/LineChart'
import PieChart from '@/components/charts/PieChart'
import PolarAreaChart from '@/components/charts/PolarAreaChart'
import RadarChart from '@/components/charts/RadarChart'
import ScatterChart from '@/components/charts/ScatterChart'

export default {
  layout: 'default', // layouts used
  components: {
    BarChart,
    BubbleChart,
    DoughtnutChart,
    LineChart,
    PieChart,
    PolarAreaChart,
    RadarChart,
    ScatterChart
  },
  data () {
    return {
      linecollection: {
        labels: ['Label 0', 'Label 1', 'Label 2'],
        datasets: [
          {
            label: 'Data One',
            borderColor: 'rgba(50, 115, 220, 0.5)',
            backgroundColor: 'rgba(50, 115, 220, 0.1)',
            data: [33, 55, 44]
          },
          {
            label: 'Data Two',
            borderColor: 'rgba(220, 55, 115, 0.1)',
            backgroundColor: 'rgba(220, 55, 115, 0.5)',
            data: [44, 33, 55]
          }
        ]
      },
      barcollection: {
        labels: ['Label 0', 'Label 1', 'Label 2'],
        datasets: [
          {
            label: 'Data One',
            borderColor: 'rgba(50, 115, 220, 1)',
            backgroundColor: 'rgba(50, 115, 220, 1)',
            data: [33, 55, 44]
          },
          {
            label: 'Data Two',
            borderColor: 'rgba(220, 55, 115, 0.1)',
            backgroundColor: 'rgba(220, 55, 115, 0.5)',
            data: [44, 33, 55]
          }
        ]
      },
      bubblecollection: {
        labels: ['Label 0', 'Label 1', 'Label 2'],
        datasets: [
          {
            label: 'Data One',
            borderColor: 'rgba(50, 115, 220, 1)',
            backgroundColor: 'rgba(50, 115, 220, 1)',
            data: [
              {
                x: 20,
                y: 25,
                r: 5
              },
              {
                x: 40,
                y: 10,
                r: 10
              },
              {
                x: 30,
                y: 22,
                r: 30
              }
            ]
          },
          {
            label: 'Data Two',
            borderColor: 'rgba(220, 55, 115, 1)',
            backgroundColor: 'rgba(220, 55, 115, 1)',
            data: [
              {
                x: 10,
                y: 30,
                r: 15
              },
              {
                x: 20,
                y: 20,
                r: 10
              },
              {
                x: 15,
                y: 8,
                r: 30
              }
            ]
          }
        ]
      },
      doughtnutcollection: {
        labels: ['Label 0', 'Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            backgroundColor: [
              'rgba(50, 115, 220, 1)',
              'rgba(220, 55, 115, 1)',
              'rgba(22, 33, 220, 1)',
              'rgba(90, 115, 220, 1)'
            ],
            data: [40, 30, 50, 70]
          }
        ]
      },
      piecollection: {
        labels: ['Label 0', 'Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            backgroundColor: [
              'rgba(50, 115, 220, 1)',
              'rgba(220, 55, 115, 1)',
              'rgba(22, 33, 220, 1)',
              'rgba(90, 115, 220, 1)'
            ],
            data: [40, 30, 50, 70]
          }
        ]
      },
      polarcollection: {
        labels: ['Label 0', 'Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgba(179,181,198,0.2)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [65, 59, 90, 81]
          },
          {
            label: 'My Second dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [28, 48, 40, 19]
          }
        ]
      },
      radarcollection: {
        labels: ['Label 0', 'Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgba(179,181,198,0.2)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [65, 59, 90, 81]
          },
          {
            label: 'My Second dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [28, 48, 40, 19]
          }
        ]
      },
      scattercollection: {
        labels: ['Label 0', 'Label 1', 'Label 2'],
        datasets: [
          {
            label: 'Data One',
            fill: false,
            borderColor: 'rgba(50, 115, 220, 1)',
            backgroundColor: 'rgba(50, 115, 220, 1)',
            data: [
              {
                x: 20,
                y: 25
              },
              {
                x: 40,
                y: 10
              },
              {
                x: 30,
                y: 22
              }
            ]
          },
          {
            label: 'Data Two',
            fill: false,
            borderColor: 'rgba(220, 55, 115, 0.5)',
            backgroundColor: 'rgba(220, 55, 115, 0.5)',
            data: [
              {
                x: 10,
                y: 30
              },
              {
                x: 20,
                y: 20
              },
              {
                x: 15,
                y: 8
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>