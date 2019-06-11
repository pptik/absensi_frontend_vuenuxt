<template>
  <section class="container">
    <div class="md-layout md-alignment-top-center">
      <div class="md-layout-item">
        <div class="content_kelas">
          <md-table md-card v-model="monitoringSiswaData" class="md-alignment-top-center">
            <md-table-toolbar>
              <h1 class="md-title">Monitoring Siswa Tidak Hadir</h1>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Name">{{ item.nama_lengkap }}</md-table-cell>
              <md-table-cell type="number" md-label="Kelas">{{ item.kelas }}</md-table-cell>
              <md-table-cell type="number" md-label="Status">{{ item.rfid }}</md-table-cell>
              <md-table-cell>
                  <md-button class="md-primary md-raised" v-on:click.prevent="editHadir(item.rfid,'hadir')">Hadir</md-button><br>
                  <md-button class="md-default md-raised" v-on:click.prevent="editHadir(item.rfid,'sakit')">Sakit</md-button><br>
                  <md-button class="md-primary" v-on:click.prevent="editHadir(item.rfid,'izin')">Izin</md-button>
                </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '../middleware/routes_api/routes'
export default {
  layout: 'default', // layouts used,
  data () {
    return {
      monitoringSiswaData: [],
      namaSekolahLocal: null,
      usernameLocal: null,
      sekolah_id: null,
      listKehadiran: [],
      mac_address: []
    }
  },
  mounted () {
    this.setItemAuth()
    this.monitoringSiswaJSON()
  },
  methods: {
    editHadir: async function (rfidSiswa, statusHadir) {
      var dt = new Date()
      var tgl = dt.setHours(dt.getHours() + 7)
      console.log('local ' + rfidSiswa)

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
            text: 'Berhasil Merubah menjadi ' + statusHadir,
            icon: 'success',
            confirmButtonText: 'Yes',
            showLoaderOnConfirm: true
          }).then((result) => {
            window.location.reload()
          })
        } else {
          this.$swal('Gagal!', {
            title: 'Gagal',
            text: 'Gagal Mengubah Status',
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
      console.log()
      var dataParamSend = {
        sekolah: this.namaSekolahLocal,
        tahun: (new Date().getFullYear() - 1) + '/' + new Date().getFullYear(),
        jam_awal: date
      }
      const response = await api.requestJsonPengguna(dataParamSend, 'monitoring')
      this.monitoringSiswaData = response.data.data
      console.log('Data Monitoring')
      console.log(response.data)
    }
  }
}
</script>