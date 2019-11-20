<template>
  <section class="container">
    <div class="md-layout md-alignment-top-center">
      <div class="md-layout-item">
        <div class="content_kelas">
          <md-field style="width: 500px; margin-left: 40px;">
            <label>Pilih Tahun</label>
            <md-select v-model="selectedTahunAjaran" name="pilih_tahun" id="pilih_tahun" md-dense  @md-selected="monitoringSiswaJSON(selectedTahunAjaran)">
              <md-option disabled>Select tahun ajaran</md-option>
              <md-option  v-for="hasil in dataTahunAjaran" :value="hasil" :key="hasil._id">{{ hasil }}</md-option>
            </md-select>
          </md-field>
          <md-table  md-sort="nama_lengkap" v-model="monitoringSiswaData" md-sort-order="asc" md-card md-fixed-header md-height= "400px">
            <md-table-toolbar>
              <h1 class="md-title">Monitoring Personil Tidak Hadir</h1>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Nama" md-sort-by="nama_lengkap">{{ item.nama_lengkap }}</md-table-cell>
              <md-table-cell type="number" md-sort-by="kelas" md-label="Bagian">{{ item.kelas }}</md-table-cell>
              <md-table-cell type="number" md-sort-by="rfid" md-label="Rfid">{{ item.rfid }}</md-table-cell>
              <md-table-cell>
                  <md-button class="md-primary md-raised" v-on:click.prevent="editHadir(item.rfid,'hadir')">Hadir</md-button>
                  <md-button class="md-default md-raised" v-on:click.prevent="editHadir(item.rfid,'sakit')">Sakit</md-button>
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

export default {
  layout: 'default', // layouts used,
  data () {
    return {
      selectedTahunAjaran: null,
      dataTahunAjaran: [],
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
    this.pilihtahunajaran()
  },
  methods: {
    pilihtahunajaran: async function (param) {
      var dataParamSend =
      {
        'sekolah': this.$session.get('auth').sekolah
      }
      const response = await api.requestJsonPengguna(dataParamSend, 'getFilterTahun')
      this.dataTahunAjaran = response.data.data
    },
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
          status: 'hadir',
          tahun: this.selectedTahunAjaran,
          sekolah: this.namaSekolahLocal
        }
      } else if (statusHadir === 'sakit') {
        dataEdit = {
          created_at: tgl,
          mac_address: this.mac_address[0].address,
          rfid: rfidSiswa,
          status: 'sakit',
          tahun: this.selectedTahunAjaran,
          sekolah: this.namaSekolahLocal
        }
      } else if (statusHadir === 'izin') {
        dataEdit = {
          created_at: tgl,
          mac_address: this.mac_address[0].address,
          rfid: rfidSiswa,
          status: 'izin',
          tahun: this.selectedTahunAjaran,
          sekolah: this.namaSekolahLocal
        }
      }
      this.$swal({
        title: 'Konfirmasi',
        text: 'Yakin akan mengubah status?',
        type: 'warning',
        buttons: true,
        confirmButtonText: 'Yes',
        showLoaderOnConfirm: true
      }).then((result) => {
        if (result) {
          api.requestMonitoring(dataEdit).then(response => {
            if (response.data.success === true) {
              this.$swal('Berhasil Mengubah status personil!', {
                type: 'success'
              })
              window.location.reload()
            } else {
              this.$swal('Gagal!', {
                title: 'Gagal',
                text: 'Gagal Mengubah Status',
                type: 'error',
                confirmButtonText: 'Yes',
                showLoaderOnConfirm: true
              }).then((result) => {
                window.location.reload()
              })
            }
          })
        } else {
          this.$swal('Batal mengubah status!')
        }
      })
    },
    setItemAuth: async function (param) {
      if (!this.$session.exists()) {
        this.$router.push('/')
      }
      var dataAuth = JSON.parse(localStorage.getItem('auth'))
      this.namaSekolahLocal = dataAuth.sekolah
      this.usernameLocal = dataAuth.username
      this.sekolah_id = dataAuth._id
      this.mac_address = dataAuth.mac_address
    },
    monitoringSiswaJSON: async function (param) {
      // console.log((new Date().getFullYear() - 1) + '/' + new Date().getFullYear())
      var date = new Date()
      var dataParamSend = {
        sekolah: this.namaSekolahLocal,
        tahun: param,
        jam_awal: date
      }
      const response = await api.requestJsonPengguna(dataParamSend, 'monitoring')
      this.monitoringSiswaData = response.data.data
    }
  }
}
</script>