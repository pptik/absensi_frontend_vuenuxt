<template>
  <section class="container">
    <div class="md-title">Sekolah Assalam</div>
    <div class="md-body-1">Jl.Pelajar Pejuang</div>
    <div class="md-layout">
      <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-card>
        <md-card-header>
          <div class="md-title md-alignment-top-center">Hadir</div>
        </md-card-header>
        <md-card-content class="md-content">
          150
        </md-card-content>
      </md-card>
      </div>
      <div class="md-layout-item">
        <md-card>
        <md-card-header>
          <div class="md-title">Sakit</div>
        </md-card-header>
        <md-card-content class="md-content">
          5
        </md-card-content>
      </md-card>
      </div>
      <div class="md-layout-item">
        <md-card>
        <md-card-header>
          <div class="md-title">Izin</div>
        </md-card-header>
        <md-card-content class="md-content">
          2
        </md-card-content>
      </md-card>
      </div>
      <div class="md-layout-item">
         <md-card>
        <md-card-header>
          <div class="md-title">Alfa</div>
        </md-card-header>
        <md-card-content class="md-content"> 
          1
        </md-card-content>
      </md-card>
      </div>
    </div>
    </div>
    <div class="content_kelas">
      <form novalidate class="md-layout">
        <md-table v-model="tbl_DataSiswaTidakMasuk" md-card class="md-alignment-top-center">
          <md-table-toolbar>
            <h1 class="md-title">Monitoring Siswa Tidak Hadir</h1>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Name">{{ item.nama_siswa }}</md-table-cell>
            <md-table-cell type="number" md-label="Tingkat">{{ item.kelas }}</md-table-cell>
            <md-table-cell type="number" md-label="Tingkat">{{ item.status }}</md-table-cell>
          </md-table-row>
        </md-table>
      </form>
    </div>
    <div md-card class="md-layout-item">
      <div class="bar-chart">
        <h3>Data Bulan Ini</h3>
        <BarChart :data="barcollection"/>
      </div>
    </div>
  </section>
</template>

<script>
import BarChart from '@/components/charts/BarChart'

export default {
  layout: 'default', // layouts used
  components: {
    BarChart
  },
  data () {
    return {
      barcollection: {
        labels: ['Sakit', 'Izin', 'Alfa'],
        datasets: [
          {
            label: 'Data One',
            borderColor: 'rgba(50, 115, 220, 1)',
            backgroundColor: 'rgba(50, 115, 220, 1)',
            data: [2, 6, 1]
          }
        ]
      },
      tbl_DataSiswaTidakMasuk: [
        {
          nama_siswa: 'Dani Irawan Dani', kelas: '7A', status: 'Sakit'
        },
        {
          nama_siswa: 'Dani Irawan Dani', kelas: '7A', status: 'Izin'
        },
        {
          nama_siswa: 'Irawan Dani', kelas: '7A', status: 'Sakit'
        },
        {
          nama_siswa: 'Dani', kelas: '7A', status: 'Izin'
        }
      ],
      status_sakit: 2,
      status_izin: 6,
      status_alfa: 0
    }
  }
}
</script>

<style scoped>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
  .md-body-1 {
    padding-bottom: 20px;
  }
  .bar-chart {
    width: 500px;
    height: 100px;
  }
   .content_kelas{
    padding-top: 50px;
  }
</style>