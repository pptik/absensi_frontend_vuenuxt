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
          {{status_SIA.daftar_hadir}}
        </md-card-content>
      </md-card>
      </div>
      <div class="md-layout-item">
        <md-card>
        <md-card-header>
          <div class="md-title">Sakit</div>
        </md-card-header>
        <md-card-content class="md-content">
          {{status_SIA.daftar_sakit}}
        </md-card-content>
      </md-card>
      </div>
      <div class="md-layout-item">
        <md-card>
        <md-card-header>
          <div class="md-title">Izin</div>
        </md-card-header>
        <md-card-content class="md-content">
          {{status_SIA.daftar_izin}}
        </md-card-content>
      </md-card>
      </div>
      <div class="md-layout-item">
         <md-card>
        <md-card-header>
          <div class="md-title">Alfa</div>
        </md-card-header>
        <md-card-content class="md-content"> 
          {{status_SIA.daftar_alfa}}
        </md-card-content>
      </md-card>
      </div>
    </div>
    </div>
     <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <div class="content_kelas">
          <md-table md-card v-model="tbl_DataSiswaTidakMasuk" class="md-alignment-top-center">
            <md-table-toolbar>
              <h1 class="md-title">Monitoring Siswa Tidak Hadir</h1>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Name">{{ item.nama_siswa }}</md-table-cell>
              <md-table-cell type="number" md-label="Kelas">{{ item.kelas }}</md-table-cell>
              <md-table-cell type="number" md-label="Status">{{ item.status }}</md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>
      <div class="md-layout-item">
        <div class="content_kelas">
          <md-table md-card v-model="tbl_DataSiswaTerbanyak" class="md-alignment-top-center">
            <md-table-toolbar>
              <h1 class="md-title">Siswa Tidak Masuk Terbanyak</h1>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Name">{{ item.nama_siswa }}</md-table-cell>
              <md-table-cell type="number" md-label="Kelas">{{ item.kelas }}</md-table-cell>
              <md-table-cell type="number" md-label="Total">{{ item.jumlah }}</md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>
    </div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <div class="bar-chart grafik">
          <md-card class="innerCard">
          <h4 class="md-title">Data Bulan Ini</h4>
          <BarChart :data="barcollection"/>
          </md-card>
        </div>
      </div>
      <div class="md-layout-item">
        
        <div class="bar-chart grafik">
          <md-card class="innerCard">
            <h4 class="md-title">Data Tahun Ini</h4>
            <BarChart :data="barcollection"/>
           </md-card>
        </div>
       
      </div>
    </div>
  </section>
</template>

<script>
import BarChart from '@/components/charts/BarChart'
import api from '../middleware/routes_api/routes'

export default {
  layout: 'default', // layouts used
  components: {
    BarChart
  },
  data () {
    return {
      statusSakit: 2,
      status_SIA: '',
      barcollection: {
        labels: ['Hadir', 'Sakit', 'Izin', 'Alfa'],
        datasets: [
          {
            label: 'April',
            borderColor: '#00796B',
            backgroundColor: '#00796B',
            data: [5, 6, 3, 1, 0, 30]
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
      tbl_DataSiswaTerbanyak: [
        {
          nama_siswa: 'Dani Irawan Dani', kelas: '7A', jumlah: 15
        },
        {
          nama_siswa: 'Dani Irawan Dani', kelas: '7A', jumlah: 7
        },
        {
          nama_siswa: 'Irawan Dani', kelas: '7A', jumlah: 6
        },
        {
          nama_siswa: 'Dani', kelas: '7A', jumlah: 4
        }
      ],
      // status_sakit: 2,
      status_izin: 6,
      status_alfa: 0
    }
  },
  mounted () {
    // this.dashboardJSON({'sekolah': 'hahaw'})
    this.monitoringSiswaJSON()
  },
  methods: {
    barchartDataKehadiran: function (sakit, izin, alfa, batasbawah) {
      return {
        labels: ['Sakit', 'Izin', 'Alfa'],
        datasets: [
          {
            label: sakit,
            borderColor: 'rgba(50, 115, 220, 1)',
            backgroundColor: 'rgba(50, 115, 220, 1)',
            data: [sakit, izin, alfa, batasbawah]
          }
        ]
      }
    },
    dashboardJSON: async function (param) {
      const response = await api.getJSONDashboard(param)
      var dataParseJson = JSON.parse(JSON.stringify(response.data))
      this.status_SIA = dataParseJson
    },
    monitoringSiswaJSON: async function (param) {
      const response = await api.getJSONSiswa()
      console.log(response.data)
      // console.log(_.filter(response.data, { 'RFID': { 'rekap_rfid': { '2019': {'April': '_23'} } } }))
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
    height: 10px;
    width: 480px;
  }
   .content_kelas{
    padding-top: 50px;
  }
  .judulGrafik{
    padding: 1em 1em 1em 1em
  }
  .grafik {
    padding-top: 3em;
  }
  .innerCard{
    padding: 15px;
  }
</style>