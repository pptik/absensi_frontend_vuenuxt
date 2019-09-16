<template>
  <section class="container">
    <div class="md-title">{{namaSekolahLocal}}</div>
    <br><br>
    <DashboardTable></DashboardTable>
    <div class="md-layout md-gutter">
    </div>
  </section>
</template>

<script>
import BarChart from '@/components/charts/BarChart'
import api from '../middleware/routes_api/routes'
import momentTimeZone from 'moment-timezone'
import mesin from '../middleware/rmq/mqtt'
import DashboardTable from '~/components/TableDashboard.vue' // Load Navigation Menu Components

export default {
  layout: 'default', // layouts used
  components: {
    BarChart,
    DashboardTable
  },
  beforeCreate: function () {
    mesin.on('connect', function () {
      mesin.subscribe('absensi.webservice', function (err) {
        if (!err) {
          // console.log('Subscribe to RMQ PPTIK Success')
        } else if (err) {
          console.log(err)
        }
      })
    })
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
      datamesin: null,
      barcollection: {
        labels: ['Hadir', 'Sakit', 'Izin', 'Alfa'],
        datasets: [
          {
            label: 'April',
            borderColor: '#00796B',
            backgroundColor: '#00796B',
            data: [3, 0, 0, 0, 0, 30]
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
      ],

      arrayStatusSiswa: [this.statusHadir, this.statusSakit, this.statusIzin, this.statusAlfa],
      dataAbsen: [],
      // status_sakit: 2,
      status_izin: 6,
      status_alfa: 0,
      namaSekolahLocal: null,
      usernameLocal: null,
      sekolah_id: null
    }
  },
  mounted () {
    this.setItemAuth()
    this.dashboardJSON()
    this.monitoringSiswaJSON()
    this.dataSiswaHarianJSON()
    this.filldata()
  },
  methods: {
    filldata: async function () {
      let ini = this
      mesin.on('message', function (topic, message) {
        let mesinRFID = JSON.parse(message.toString())
        if (ini.$session.get('auth').sekolah === mesinRFID.sekolah) {
          ini.datamesin = mesinRFID.nama_lengkap + ' ' + mesinRFID.jam
          ini.dataAbsen.unshift({'nama_pengguna': mesinRFID.nama_lengkap, 'mac': mesinRFID.mac, 'rfid': mesinRFID.rfid, 'created_at': momentTimeZone.tz(Date.now(), 'Asia/Jakarta').format('MMMM Do, h:mm z')})
        }
      })
    },
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
      if (!this.$session.exists()) {
        this.$router.push('/')
      }
      var dataAuth = JSON.parse(localStorage.getItem('auth'))
      this.namaSekolahLocal = dataAuth.sekolah
      this.usernameLocal = dataAuth.username
      this.sekolah_id = dataAuth._id
      // console.log(momentTimeZone.tz(new Date(), 'Asia/Jakarta'))
    },
    dashboardJSON: async function (param) {
      try {
        const responses = await api.JSON_Sekolah(this.namaSekolahLocal)
        const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mai', 'Juni',
          'Juli', 'Augustus', 'September', 'October', 'November', 'December'
        ]
        const d = new Date()
        const getYear = d.getFullYear()
        this.statusHadir = responses.data[0].ABSENSI[`_${getYear}`][`${monthNames[d.getMonth()]}`].rekap_hadir
        this.statusSakit = responses.data[0].ABSENSI[`_${getYear}`][`${monthNames[d.getMonth()]}`].rekap_sakit
        this.statusIzin = responses.data[0].ABSENSI[`_${getYear}`][`${monthNames[d.getMonth()]}`].rekap_izin
        this.statusAlfa = responses.data[0].ABSENSI[`_${getYear}`][`${monthNames[d.getMonth()]}`].rekap_alfa
        if (typeof this.statusHadir === 'undefined') {
          this.statusHadir = 0
        }
        if (typeof this.statusSakit === 'undefined') {
          this.statusSakit = 0
        }
        if (typeof this.statusIzin === 'undefined') {
          this.statusIzin = 0
        }
        if (typeof this.statusAlfa === 'undefined') {
          this.statusAlfa = 0
        }
      } catch (error) {
        // console.log(error)
      }
    },
    monitoringSiswaJSON: async function (param) {
      var date = new Date()
      var dataParamSend = {
        sekolah: this.namaSekolahLocal,
        tahun: new Date().getFullYear().toString(),
        jam_awal: date
      }
      const response = await api.requestJsonPengguna(dataParamSend, 'monitoring')
      this.monitoringSiswaData = response.data.data
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
      var arrayKosong = []
      for (let i = 0; i < response.data.data.length; i++) {
        const elementResult = response.data.data[i]
        var dataArrayResult = {
          'nama_lengkap': elementResult.nama_lengkap,
          'kelas': elementResult.kelas,
          'created_at': elementResult.created_at,
          'created_ed': elementResult.created_ed
        }
        arrayKosong.push(dataArrayResult)
      }
      this.dataHarianSiswa = arrayKosong
      this.dataHarianSiswa.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
      })
      return this.dataHarianSiswa
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
    padding-bottom: 50px;
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