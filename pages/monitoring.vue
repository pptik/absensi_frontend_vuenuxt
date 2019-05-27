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
              <md-table-cell type="number" md-label="Status">{{ item.created_at }}</md-table-cell>
              <md-table-cell>
                  <md-button class="md-primary md-raised" v-on:click.prevent="editHadir()" >Hadir</md-button>
                  <md-button class="md-accent">Delete</md-button>            
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
      listKehadiran: []
    }
  },
  mounted () {
    this.setItemAuth()
    this.monitoringSiswaJSON()
  },
  methods: {
    editHadir: async function(){
      var dataEdit = {
        nama
      }
    },
    setItemAuth: async function (param) {
      var dataAuth = JSON.parse(localStorage.getItem('auth'))
      this.namaSekolahLocal = dataAuth.sekolah
      this.usernameLocal = dataAuth.username
      this.sekolah_id = dataAuth._id
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