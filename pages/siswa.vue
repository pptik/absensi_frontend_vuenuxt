<template>
  <section class="container">
  <div class="mt-5">
    <md-tabs  md-sync-route>
      <md-tab id="tab-pages" md-label="Pages">
        <select v-model="selectedKelas" @change="tampilsiswaperkelas(selectedKelas)">
        <option v-for="hasil in dataKelas" :value="hasil.nama_kelas" :key="hasil._id">
          {{ hasil.nama_kelas }}
        </option>
      </select>
      <div>
        <md-table v-model="dataHasilTampilSiswa" md-card>
          <md-table-toolbar>
            <h1 class="md-title">Siswa</h1>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Name">{{ item.nama_lengkap }}</md-table-cell>
            <md-table-cell md-label="RFID">{{ item.rfid }}</md-table-cell>
            <md-table-cell md-label="Jam Masuk">{{ item.created_at }}</md-table-cell>
            <md-table-cell>
              <md-button v-on:click.prevent="simpansiswa(item.nama_lengkap)">Edit</md-button>
              <md-button v-on:click.prevent="DeleteSiswa(item.nama_lengkap)" class="md-accent">Delete</md-button>            
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>       
      </md-tab>
      
      <md-tab id="tab-posts" md-label="Tambah Siswa">
        <form novalidate class="md-layout" >
          <md-card class="md-layout-item md-size-50 md-small-size-50">
            <md-card-header>
              <div class="md-title">Tambah Siswa</div>
                </md-card-header>
                <div style="padding:25px;">
                <md-field>
                  <label>Email</label>
                  <md-input v-model="inputEmail"></md-input>
                  <span class="md-suffix">@vidyanusa.id</span>
                </md-field>
                <md-field>
                  <label>Username</label>
                  <md-input v-model="inputUsername"></md-input>
                </md-field>
                <md-field>
                <label>Nama Lengkap</label>
                  <md-input v-model="inputNamaLengkap"></md-input>
                </md-field>
                <md-field>
                  <label>Jenis Kelamin</label>
                  <md-select v-model="inputJenisKelamin">
                    <md-option value="P">Laki-Laki</md-option>
                    <md-option value="W">Prempuan</md-option>
                  </md-select>
                </md-field>
                <md-field>
                  <label>Sandi</label>
                  <md-input type="password" v-model="inputSandi" ></md-input>
                </md-field>
                  <md-field class="md-layout-item md-size-35">
                    <label>Kode RFID</label>
                    <md-input class="md-layout-item md-size-100" placeholder="ex: 0x40 0xde 0x68 0x51"  maxlength="19" v-model="inputKodeRFID"></md-input>
                  </md-field>
                <label>Kelas</label>
                <md-autocomplete v-model="inputKelas" :md-options="dataArrayNamaKelas" :md-open-on-focus="false"></md-autocomplete>
                  <md-card-actions>
                    <md-button type="submit" class="md-primary" v-on:click.prevent="simpansiswa()" >Tambah Siswa</md-button>
                  </md-card-actions>
              </div>
             </md-card>
            </form>
          </md-tab>
        </md-tabs>
    </div>
  </section>
</template>

<script>
import api from '../middleware/routes_api/routes'

export default {
  layout: 'default', // layouts used
  data () {
    return {
      dataArrayNamaKelas: [],
      allPost: [],
      post: [],
      dataKelas: [],
      selectedKelas: [],
      dataHasilTampilSiswa: [],
      date_time: Date.now(),
      idSekolah: 'SMP Assalaam',
      // Kelas
      inputEmail: null,
      inputUsername: null,
      inputNamaLengkap: null,
      inputJenisKelamin: null,
      inputSandi: null,
      inputKodeRFID: null,
      inputKelas: null
    }
  },
  mounted () {
    this.tampilsemuakelas({'sekolah': this.idSekolah})
  },
  methods: {
    tampilsiswaperkelas: async function (param) {
      this.dataParams = {
        'sekolah': this.idSekolah,
        'kelas': param,
        'date_time': this.date_time
      }
      const response = await api.getKelasPersekolah(this.dataParams)
      this.dataHasilTampilSiswa = response.data.data
    },
    tampilsemuakelas: async function (param) {
      const response = await api.getKelas(param)
      this.dataKelas = response.data.data
      for (let i = 0; i < this.dataKelas.length; i++) {
        const element = this.dataKelas[i].nama_kelas
        this.dataArrayNamaKelas.push(element)
      }
      this.selectedKelas = response.data.data[0]
    },
    simpansiswa: async function () {
      var dataSiswa = {
        'email': this.inputEmail,
        'sandi': this.inputSandi,
        'serial_number': this.inputKodeRFID,
        'kelas': this.inputKelas,
        'sekolah': this.sekolah,
        'username': this.inputUsername,
        'nama_lengkap': this.inputNamaLengkap,
        'jenis_kelamin': this.inputJenisKelamin
      }
      await api.requestSiswa(dataSiswa, 'tambah')
    },
    DeleteSiswa: async function (params) {
      console.log(params)
    }
  }
}
</script>

<style lang="scss" scoped>
 
</style>