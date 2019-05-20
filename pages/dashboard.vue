<template>
  <section class="container">
    <div class="md-title">Sekolah {{namaSekolahLocal}}</div>
    <div class="md-body-1">Jl.Pelajar Pejuang</div>
    <div class="md-layout">
      <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-card>
        <md-card-header>
          <div class="md-title md-alignment-top-center">Hadir</div>
        </md-card-header>
        <md-card-content class="md-content">
          {{statusHadir}}
        </md-card-content>
      </md-card>
      </div>
      <div class="md-layout-item">
        <md-card>
        <md-card-header>
          <div class="md-title">Sakit</div>
        </md-card-header>
        <md-card-content class="md-content">
          {{statusSakit}}
        </md-card-content>
      </md-card>
      </div>
      <div class="md-layout-item">
        <md-card>
        <md-card-header>
          <div class="md-title">Izin</div>
        </md-card-header>
        <md-card-content class="md-content">
          {{statusIzin}}
        </md-card-content>
      </md-card>
      </div>
      <div class="md-layout-item">
         <md-card>
        <md-card-header>
          <div class="md-title">Alfa</div>
        </md-card-header>
        <md-card-content class="md-content"> 
          {{statusAlfa}}
        </md-card-content>
      </md-card>
      </div>
    </div>
    </div>
    <div class="md-layout md-gutter">
      
      <div class="md-layout-item">
        <div class="content_kelas">
          <md-table md-card v-model="dataHarianSiswa" class="md-alignment-top-center">
            <md-table-toolbar>
              <h1 class="md-title">Data Harian Siswa</h1>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Name">{{ item.nama_lengkap }}</md-table-cell>
              <md-table-cell type="number" md-label="Kelas">{{ item.kelas }}</md-table-cell>
              <md-table-cell type="number" md-label="Total">{{ item.created_at }}</md-table-cell>
               <md-table-cell>
              <!-- <md-button v-on:click.prevent="">Edit</md-button>
              <md-button v-on:click.prevent="" class="md-accent">Delete</md-button>             -->
            </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>
    </div>
     <div class="md-layout md-gutter">
      
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
      statusHadir: null,
      statusSakit: null,
      statusIzin: null,
      statusAlfa: null,
      idsekolah: 'SMP Assalam',
      monitoringSiswaData: [],
      dataHarianSiswa: [],
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
        // {
        //   nama_siswa: 'Dani Irawan Dani', kelas: '7A', jumlah: 15
        // },
        // {
        //   nama_siswa: 'Dani Irawan Dani', kelas: '7A', jumlah: 7
        // },
        // {
        //   nama_siswa: 'Irawan Dani', kelas: '7A', jumlah: 6
        // },
        // {
        //   nama_siswa: 'Dani', kelas: '7A', jumlah: 4
        // }
      ],
      // status_sakit: 2,
      status_izin: 6,
      status_alfa: 0,
      namaSekolahLocal: null,
      usernameLocal: null,
      sekolah_id: null
    }
  },
  mounted () {
    this.dashboardJSON()
    this.setItemAuth()
    this.monitoringSiswaJSON()
    this.dataSiswaHarianJSON()
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
    setItemAuth: async function (param) {
      var dataAuth = JSON.parse(localStorage.getItem('auth'))
      this.namaSekolahLocal = dataAuth.sekolah
      this.usernameLocal = dataAuth.username
      this.sekolah_id = dataAuth._id
    },
    dashboardJSON: async function (param) {
      const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Maret', 'Juni',
        'Juli', 'Augustus', 'September', 'October', 'November', 'December'
      ]

      const d = new Date()
      const year = d.getFullYear().toString()
      const dateDay = d.getDate()
      var inputHadir = {
        tahun: year,
        bulan: monthNames[d.getMonth()],
        tanggal: dateDay,
        status: 'hadir'
      }
      var inputSakit = {
        tahun: year,
        bulan: monthNames[d.getMonth()],
        tanggal: dateDay,
        status: 'sakit'
      }
      var inputIzin = {
        tahun: year,
        bulan: monthNames[d.getMonth()],
        tanggal: dateDay,
        status: 'izin'
      }
      var inputAlfa = {
        tahun: year,
        bulan: monthNames[d.getMonth()],
        tanggal: dateDay,
        status: 'alfa'
      }
      const responseHadir = await api.requestJsonPengguna(inputHadir, 'status_harian')
      const responseSakit = await api.requestJsonPengguna(inputSakit, 'status_harian')
      const responseIzin = await api.requestJsonPengguna(inputIzin, 'status_harian')
      const responseAlpha = await api.requestJsonPengguna(inputAlfa, 'status_harian')

      this.statusHadir = responseHadir.data.data
      this.statusSakit = responseSakit.data.data
      this.statusIzin = responseIzin.data.data
      this.statusAlfa = responseAlpha.data.data
    },
    monitoringSiswaJSON: async function (param) {
      var date = new Date()
      console.log()
      var dataParamSend = {
        sekolah: this.namaSekolahLocal,
        tahun: new Date().getFullYear().toString(),
        jam_awal: date
      }
      const response = await api.requestJsonPengguna(dataParamSend, 'monitoring')
      this.monitoringSiswaData = response.data.data
      console.log(response)
    },
    dataSiswaHarianJSON: async function (param) {
      var date = new Date()
      var tahunAjaran = (new Date().getFullYear().toString() - 1) + '/' + new Date().getFullYear().toString()
      var dataParamSend = {
        sekolah: this.namaSekolahLocal,
        tahun: tahunAjaran,
        jam_awal: date
      }
      const response = await api.requestJsonPengguna(dataParamSend, 'dataharian')
      this.dataHarianSiswa = response.data.data
      console.log(JSON.stringify(response.data.data) + 'mp')
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