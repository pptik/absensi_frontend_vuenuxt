<template>
  <section class="container">
    <div class="md-layout md-alignment-top-center">
      <div class="md-layout-item">
        <div class="content_kelas">         
          
            <!-- <md-field md-clearable class="md-toolbar-section-end">
              <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
            </md-field> -->
          <md-table  md-sort="nama_lengkap" v-model="monitoringSiswaData" md-sort-order="asc" md-card md-fixed-header md-height= "550px">
            <md-table-toolbar>
              <h1 class="md-title">Monitoring Siswa Tidak Hadir</h1>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Nama" md-sort-by="nama_lengkap">{{ item.nama_lengkap }}</md-table-cell>
              <md-table-cell type="number" md-sort-by="kelas" md-label="Kelas">{{ item.kelas }}</md-table-cell>
              <md-table-cell type="number" md-sort-by="rfid" md-label="Rfid">{{ item.rfid }}</md-table-cell>
              <md-table-cell>
                  <md-button class="md-primary md-raised" v-on:click.prevent="editHadir(item.rfid,'hadir')">Hadir</md-button><br>
                  <md-button class="md-default md-raised" v-on:click.prevent="editHadir(item.rfid,'sakit')">Sakit</md-button><br>
                  <md-button class="md-primary" v-on:click.prevent="editHadir(item.rfid,'izin')">Izin</md-button>
                </md-table-cell>
            </md-table-row>
             <md-table-empty-state
              md-label="User Tidak Ditemukan"
              :md-description="`Tidak Ditemukan Data Untuk Monitoring.`">
            </md-table-empty-state>
          </md-table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '../middleware/routes_api/routes'
import moment from 'moment'
// const toLower = text => {
//   return text.toString().toLowerCase()
// }
// const searchByName = (items, term) => {
//   if (term) {
//     return items.filter(item => toLower(item.nama_lengkap).includes(toLower(term)))
//   }
//   return items
// }

export default {
  layout: 'default', // layouts used,
  data () {
    return {
      monitoringSiswaData: [],
      namaSekolahLocal: null,
      usernameLocal: null,
      sekolah_id: null,
      listKehadiran: [],
      mac_address: [],
      search: null,
      searched: []
    }
  },
  mounted () {
    this.setItemAuth()
    this.monitoringSiswaJSON()
  },
  methods: {
    editHadir: async function (rfidSiswa, statusHadir) {
      var dt = new Date()
      var tglZONEID = dt.setHours(dt.getHours())
      var tgl = moment(tglZONEID).utcOffset('+07:00')
      var dataEdit = {}
      if (statusHadir === 'hadir') {
        dataEdit = {
          created_at: tgl,
          mac_address: this.mac_address[0].address,
          rfid: rfidSiswa,
          status: 'hadir'
        }
      } else if (statusHadir === 'sakit') {
        dataEdit = {
          created_at: tgl,
          mac_address: this.mac_address[0].address,
          rfid: rfidSiswa,
          status: 'sakit'
        }
      } else if (statusHadir === 'izin') {
        dataEdit = {
          created_at: tgl,
          mac_address: this.mac_address[0].address,
          rfid: rfidSiswa,
          status: 'izin'
        }
      }
      await api.requestMonitoring(dataEdit).then(response => {
        if (response.data.success === true) {
          this.$swal({
            title: 'Berhasil!',
<<<<<<< HEAD
            text: 'Berhasil!',
=======
            text: 'Berhasil',
>>>>>>> 92ab2637d228afad6f937baae9982790158bb6a6
            icon: 'success',
            confirmButtonText: 'Yes',
            showLoaderOnConfirm: true
          }).then((result) => {
            window.location.reload()
          })
        } else {
          this.$swal('Gagal!', {
            title: 'Gagal',
<<<<<<< HEAD
            text: 'Gagal Mengubah Status!',
=======
            text: 'Gagal Mengubah Status',
>>>>>>> 92ab2637d228afad6f937baae9982790158bb6a6
            icon: 'error',
            confirmButtonText: 'Yes',
            showLoaderOnConfirm: true
          }).then((result) => {
            window.location.reload()
          })
        }
      })
    },
    setItemAuth: async function (param) {
      var dataAuth = JSON.parse(localStorage.getItem('auth'))
      this.namaSekolahLocal = dataAuth.sekolah
      this.usernameLocal = dataAuth.username
      this.sekolah_id = dataAuth._id
      this.mac_address = dataAuth.mac_address
    },
    monitoringSiswaJSON: async function (param) {
      var date = new Date()
      var dataParamSend = {
        sekolah: this.namaSekolahLocal,
        tahun: (new Date().getFullYear() - 1) + '/' + new Date().getFullYear(),
        jam_awal: date
      }
      const response = await api.requestJsonPengguna(dataParamSend, 'monitoring')
      this.monitoringSiswaData = response.data.data
      // this.searched = this.monitoringSiswaData
    }
    // searchOnTable () {
    //   this.searched = searchByName(this.monitoringSiswaData, this.search)
    // }
  }
}
</script>