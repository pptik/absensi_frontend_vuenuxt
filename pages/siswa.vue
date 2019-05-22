<template>
  <section class="container">
  <div class="mt-5">
    <md-tabs  md-active-tab>
      <md-tab id="tab-pages" md-label="List Siswa">
      <md-field>
        <label>Pilih kelas</label>
        <md-select v-model="selectedKelas" @md-selected="tampilsiswaperkelas(selectedKelas)">
          <md-option v-for="hasil in dataJSONTampilKelas" :value="hasil.NAMA_KELAS" :key="hasil._id">{{ hasil.NAMA_KELAS }}</md-option>
        </md-select>
      </md-field>
      <div>
        <md-table v-model="dataHasilTampilSiswa" md-card>
          <md-table-toolbar>
            <h1 class="md-title">Siswa</h1>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Name">{{ item.nama_lengkap }}</md-table-cell>
            <md-table-cell md-label="RFID">{{ item.RFID }}</md-table-cell>
            <md-table-cell md-label="Jenis Kelamin">{{ item.jenis_kelamin }}</md-table-cell>
            <md-table-cell md-label="Kelas">{{ item.Kelas }}</md-table-cell>
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
                <md-field class="md-layout-item">
                  <label>Tahun Ajaran</label>
                  <md-input type="text" class="md-layout-item md-size-100" v-model="inputTahunAjaran" placeholder="ex: 2018/2019"  maxlength="9"></md-input>
                </md-field>
                <md-card-actions>
                  <md-button type="submit" class="md-primary" v-on:click.prevent="simpanDataSiswa()" >Tambah Siswa</md-button>
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
import load from 'lodash'
export default {
  layout: 'default', // layouts used
  data () {
    return {
      model: {
        selectedGroup: null
      },
      dataArrayNamaKelas: [],
      allPost: [],
      post: [],
      dataKelas: [],
      selectedKelas: null,
      dataHasilTampilSiswa: [],
      date_time: Date.now(),
      idSekolah: 'SMP Assalam',
      tahun_ini: (new Date().getFullYear().toString() - 1) + '/' + new Date().getFullYear().toString(),
      // Kelas
      inputEmail: null,
      inputUsername: null,
      inputNamaLengkap: null,
      inputJenisKelamin: null,
      inputKelaminConvert: null,
      inputSandi: null,
      inputKodeRFID: null,
      inputKelas: null,
      inputTahunAjaran: null,
      // TAMPIL SISWA JSON
      dataJsonTampilSiswa: [],
      dataJSONTampilKelas: [],
      // Local Data
      namaSekolahLocal: null,
      usernameLocal: null,
      sekolah_id: null
    }
  },
  mounted () {
    // this.tampilsemuakelas({'sekolah': this.idSekolah})
    this.setItemAuth()
    this.listKelasJSON()
  },
  methods: {
    setItemAuth: async function (param) {
      var dataAuth = JSON.parse(localStorage.getItem('auth'))
      this.namaSekolahLocal = dataAuth.sekolah
      this.usernameLocal = dataAuth.username
      this.sekolah_id = dataAuth._id
    },
    tampilsiswaperkelas: async function (param) {
      var arrayHasil = []
      const responTwo = await api.getJSONSiswa(this.namaSekolahLocal)
      var result = load.filter(responTwo.data, { Kelas: [{ tahun_ajaran: this.tahun_ini, nama_kelas: this.selectedKelas }] })
      for (let x = 0; x < result.length; x++) {
        for (let i = 0; i < result[x].Kelas.length; i++) {
          var kelasTahunAjaran = result[x].Kelas[i]
          if (kelasTahunAjaran.tahun_ajaran === this.tahun_ini) {
            var hasilArrayAkhir = {
              'nama_lengkap': result[x].profil.nama_lengkap,
              'RFID': result[x].RFID.serial_number,
              'jenis_kelamin': result[x].profil.jenis_kelamin,
              'Kelas': kelasTahunAjaran.nama_kelas
            }
            arrayHasil.push(hasilArrayAkhir)
          }
        }
      }
      this.dataHasilTampilSiswa = arrayHasil
    },
    tampilsemuakelas: async function (param) {
      const response = await api.getKelas(param)
      this.dataKelas = response.data.data

      console.log(this.dataKelas)
      for (let i = 0; i < this.dataKelas.length; i++) {
        const element = this.dataKelas[i].nama_kelas
        this.dataArrayNamaKelas.push(element)
      }
      this.selectedKelas = response.data.data[0].nama_kelas
      this.tampilsiswaperkelas(this.selectedKelas)
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
        'jenis_kelamin': this.inputJenisKelamin,
        'tahun_ajaran': this.inputTahunAjaran
      }
      await api.requestSiswa(dataSiswa, 'tambah')
    },
    DeleteSiswa: async function (params) {
      var dataSiswaDelete = {
        'nama_lengkap': params
      }
      await api.requestJsonPengguna(dataSiswaDelete, 'delete')
    },
    tampilSiswaJSON: async function (param) {
      const response = await api.getJSONHttp(param)
      console.log(response.data + 'awoekoawe')
    },

    // TAHAP PENGGUNAAN JSON
    listKelasJSON: async function (param) {
      const response = await api.getJSONKelas(this.namaSekolahLocal)
      // var dataParseJson = JSON.parse(JSON.stringify(response.data))
      this.dataJSONTampilKelas = response.data
      var arrayHasil = []
      for (let i = 0; i < this.dataJSONTampilKelas.length; i++) {
        const element = this.dataJSONTampilKelas[i].NAMA_KELAS
        this.dataArrayNamaKelas.push(element)
      }
      console.log(this.namaSekolahLocal)
      this.selectedKelas = this.dataArrayNamaKelas[0]
      const responTwo = await api.getJSONSiswa(this.namaSekolahLocal)
      console.log(responTwo.data)
      var result = load.filter(responTwo.data, { Kelas: [{ tahun_ajaran: '2018/2019', nama_kelas: this.selectedKelas }] })
      for (let x = 0; x < result.length; x++) {
        for (let i = 0; i < result[x].Kelas.length; i++) {
          var kelasTahunAjaran = result[x].Kelas[i]
          if (kelasTahunAjaran.tahun_ajaran === '2018/2019') {
            var hasilArrayAkhir = {
              'nama_lengkap': result[x].profil.nama_lengkap,
              'RFID': result[x].RFID.serial_number,
              'jenis_kelamin': result[x].profil.jenis_kelamin,
              'Kelas': kelasTahunAjaran.nama_kelas
            }
            arrayHasil.push(hasilArrayAkhir)
          }
        }
      }
      this.dataHasilTampilSiswa = arrayHasil
    },
    simpanDataSiswa: async function (param) {
      if (this.jenis_kelamin === 'Laki-Laki') {
        this.inputKelaminConvert = 'L'
      } else {
        this.inputJenisKelamin = 'P'
      }
      var dataInputSimpanSiswa = {
        email: this.inputEmail,
        sandi: this.inputSandi,
        rfid: this.inputKodeRFID,
        nama_kelas: this.inputKelas,
        tahun_Ajaran: this.inputTahunAjaran,
        sekolah: this.namaSekolahLocal,
        username: this.inputUsername,
        nama_lengkap: this.inputNamaLengkap,
        jenis_kelamin: this.inputJenisKelamin
      }
      const response = await api.requestJsonPengguna(dataInputSimpanSiswa, 'tambah')
      if (response.data.success === true) {
        this.$swal({
          title: 'Berhasil!',
          text: 'Berhasil Membuat Pengguna baru!',
          icon: 'success'
        })
      } else {
        this.$swal('Gagal!', {
          title: 'Gagal',
          text: 'Gagal Membuat Pengguna baru!',
          icon: 'error'
        })
      }
    },
    editDataSiswa: async function (param) {
      var dataInputEditSiswa = {
        email: this.inputEmail,
        sandi: this.inputSandi,
        rfid: this.inputKodeRFID,
        nama_kelas: this.inputKelas,
        tahun_Ajaran: this.inputTahunAjaran,
        sekolah: this.idSekolah,
        username: this.inputUsername,
        nama_lengkap: this.inputNamaLengkap,
        jenis_kelamin: this.inputJenisKelamin
      }
      // const response = await api.requestJsonPengguna('edit', param)
      console.log(dataInputEditSiswa)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>