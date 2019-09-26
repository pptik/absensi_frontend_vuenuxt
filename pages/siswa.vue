<template>
  <section class="container">
  <div class="mt-5">
    <md-tabs  md-active-tab>
      <md-tab id="tab-pages" md-label="List Personil">
      <div style="padding-top: 20px;padding-left: 20px;">
        <div class="md-layout md-gutter">
        <md-field style="width: 500px;">
          <label>Pilih Bagian</label>   
          <md-select v-model="selectedKelas">
            <md-option disabled>Pilih Bagian</md-option>
            <md-option v-for="hasil in dataJSONTampilKelas" :value="hasil.NAMA_KELAS" :key="hasil._id">{{ hasil.NAMA_KELAS }}</md-option>
          </md-select>
          <md-button class="md-default md-raised" @click="showDate = true;">
            Export to XLS
          </md-button>
        </md-field>
          <md-field style="width: 500px; margin-left: 40px;">
            <label>Pilih Tahun</label>
            <md-select v-model="selectedTahunAjaran" name="pilih_tahun" id="pilih_tahun" md-dense  @md-selected="tampilsiswaperkelas(selectedKelas, selectedTahunAjaran)">
              <md-option disabled>Select tahun ajaran</md-option>
              <md-option  v-for="hasil in dataTahunAjaran" :value="hasil" :key="hasil._id">{{ hasil }}</md-option>
            </md-select>
          </md-field>
        </div>
      </div>
      <div>
        <md-table v-model="dataHasilTampilSiswa" md-sort-order="asc" md-card md-fixed-header md-height= "400px">
          <md-table-toolbar>
            <h1 class="md-title">Personil/Siswa</h1>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Name">{{ item.nama_lengkap }}</md-table-cell>
            <md-table-cell md-label="RFID">{{ item.RFID }}</md-table-cell>
            <md-table-cell md-label="Jenis Kelamin">{{ item.jenis_kelamin }}</md-table-cell>
            <md-table-cell md-label="Bagian">{{ item.Kelas }}</md-table-cell>
            <md-table-cell>
              <!-- <md-button class="md-primary md-raised" @click="showDialogEdit = true; editSiswaFieldTampil(item);">Edit</md-button> -->
              <md-button v-on:click.prevent="DeleteSiswa(item.nama_lengkap)" class="md-accent">Delete</md-button>            
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>       
      </md-tab>
      
      <md-tab id="tab-posts" md-label="Tambah Personil">
        <form novalidate class="md-layout" >
          <md-card class="md-layout-item md-size-50 md-small-size-50">
            <md-card-header>
              <div class="md-title">Tambah Personil</div>
                </md-card-header>
                <div style="padding:25px;">
                <md-switch class="md-primary" v-model="emailSelector">Gunakan Username @vidyanusa.id ?</md-switch>
                <md-field v-if="emailSelector">
                  <label>Email</label>
                  <md-input v-model="inputEmail" required></md-input>
                  <span>@vidyanusa.id</span>
                </md-field>
                <md-field v-else>
                  <label>Email</label>
                  <md-input v-model="inputEmail" required></md-input>
                </md-field>
                
                <md-field>
                  <label>Username</label>
                  <md-input id="username" v-model="inputUsername" required></md-input>
                </md-field>
                  <span class="md-error" style="color:green" v-if="validateBool">Valid</span>
                  <span class="md-error" v-else-if="validateBool == null"></span>
                  <span class="md-error" style="color:red" v-else>Input min 8 huruf, tidak boleh menggunakan spasi, kapital, dan simbol</span>
                <md-field>
                <label>Nama Lengkap</label>
                  <md-input v-model="inputNamaLengkap"></md-input>
                </md-field>
                <span class="md-error" style="color:green" v-if="validateBool">Valid</span>
                <span class="md-error" v-else-if="validateBool == null"></span>
                <span class="md-error" style="color:red" v-else>Input min 8 huruf, tidak boleh menggunakan spasi, kapital, dan simbol</span>
                <md-field>
                  <label>Jenis Kelamin</label>
                  <md-select v-model="inputJenisKelamin" required>
                    <md-option value="P">Laki-Laki</md-option>
                    <md-option value="W">Perempuan</md-option>
                  </md-select>
                </md-field>
                <span class="md-error" style="color:green" v-if="validateBool">Valid</span>
                <span class="md-error" v-else-if="validateBool == null"></span>
                <span class="md-error" style="color:red" v-else>Input min 8 huruf, tidak boleh menggunakan spasi, kapital, dan simbol</span>
                <md-field>
                  <label>Sandi</label>
                  <md-input type="password" v-model="inputSandi" required></md-input>
                </md-field>
                <span class="md-error" style="color:green" v-if="validateBool">Valid</span>
                <span class="md-error" v-else-if="validateBool == null"></span>
                <span class="md-error" style="color:red" v-else>Input min 8 huruf, tidak boleh menggunakan spasi, kapital, dan simbol</span>
                <md-field class="md-layout-item md-size-35">
                  <label>Kode RFID</label>
                  <md-input required class="md-layout-item md-size-120" placeholder="ex: 0x40 0xde 0x68 0x51"  maxlength="19" v-model="inputKodeRFID"></md-input>
                </md-field>
                <span class="md-error" style="color:green" v-if="validateBool">Valid</span>
                <span class="md-error" v-else-if="validateBool == null"></span>
                <span class="md-error" style="color:red" v-else>Input min 8 huruf, tidak boleh menggunakan spasi, kapital, dan simbol</span>
                <label>Bagian</label>
                <md-autocomplete required v-model="inputKelas" :md-options="dataArrayNamaKelas" :md-open-on-focus="false"></md-autocomplete>
                <span class="md-error" style="color:green" v-if="validateBool">Valid</span>
                <span class="md-error" v-else-if="validateBool == null"></span>
                <span class="md-error" style="color:red" v-else>Input min 8 huruf, tidak boleh menggunakan spasi, kapital, dan simbol</span>
                <md-field class="md-layout-item">
                  <label>Tahun Ajaran</label>
                  <md-input type="text" class="md-layout-item md-size-100" v-model="inputTahunAjaran" placeholder="ex: 2018/2019"  maxlength="9"></md-input>
                </md-field>
                <md-card-actions>
                  <md-button type="submit" class="md-primary" v-on:click.prevent="simpanDataSiswa()" >Tambah Personil</md-button>
                </md-card-actions>
              </div>
             </md-card>
            </form>
          </md-tab>
        </md-tabs>
    </div>
    <md-dialog  :md-active.sync="showDate" class="md-layout-item md-size-50 md-small-size-50">
      <md-dialog-title>Rekap Absensi Per Bulan {{this.selectedKelas}}</md-dialog-title>
      <div style="padding:20p">
        <div class="md-layout md-gutter containers">
          <div class="md-layout-item">
            <md-field>
              <label>Tahun</label>
              <md-input v-model="tahunRekap" type="number"></md-input>
            </md-field>
          </div>
        <div class="md-layout-item">
          <md-field>
            <md-select v-model="bulan" name="bulan" id="bulan" placeholder="Bulan">
              <md-option value="Januari">Januari</md-option>
              <md-option value="Februari">Februari</md-option>
              <md-option value="Maret">Maret</md-option>
              <md-option value="April">April</md-option>
              <md-option value="Mei">Mei</md-option>
              <md-option value="Juni">Juni</md-option>
              <md-option value="Juli">Juli</md-option>
              <md-option value="Agustus">Agustus</md-option>
              <md-option value="September">September</md-option>
              <md-option value="Oktober">Oktober</md-option>
              <md-option value="November">November</md-option>
              <md-option value="Desember">Desember</md-option>
            </md-select>
          </md-field>
        </div>
      </div>
          <md-dialog-actions>
              <md-button class="md-primary" @click="exportData()">Export Csv</md-button>
              <div v-if="this.namaSekolahLocal == 'SMP Assalam'">
                <md-button class="md-primary" @click="exportGoogleSpreatSheet()">Export ke GoogleSheet</md-button>
              </div>
            </md-dialog-actions>
      </div>
    </md-dialog>
    <!---DIALOG BOX--->
    <md-dialog :md-active.sync="showDialogEdit" class="md-layout-item md-size-50 md-small-size-70">
      <md-dialog-title>Edit Siswa</md-dialog-title>
      <md-tabs md-dynamic-height>
        <md-tab md-label="Kelas">
          <div style="padding:20px;">
            <md-field>
              <label>Nama</label>
              <md-input v-model="EditNamaLengkap"></md-input>
            </md-field>
             <md-field>
              <label>RFID</label>
              <md-input v-model="EditKodeRFID"></md-input>
            </md-field>
            <md-field>
              <label>Jenis Kelamin</label>
              <md-input v-model="EditJenisKelamin"></md-input>
            </md-field>
            <md-dialog-actions>
              <md-button class="md-primary" @click="editDataSiswa()">Simpan</md-button>
            </md-dialog-actions>
          </div>
        </md-tab>
      </md-tabs>
    </md-dialog>
  </section>
  
</template>

<script>
import api from '../middleware/routes_api/routes'
import load from 'lodash'
import moment from 'moment'
import XLSX from 'xlsx'
// import api_service from '../middleware/api_service'
import apiGetData from '../middleware/routes_api/routes_get_data'
export default {
  layout: 'default', // layouts used
  data () {
    return {
      showDialogEdit: false,
      model: {
        selectedGroup: null
      },
      dataArrayNamaKelas: [],
      allPost: [],
      post: [],
      dataKelas: [],
      selectedKelas: 'Pilih Kelas',
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
      sekolah_id: null,
      // Edit Data
      EditNamaLengkap: null,
      EditKodeRFID: null,
      EditKelas: null,
      EditJenisKelamin: null,
      Datas: {},
      tahunRekap: null,
      bulan: null,
      showDate: false,
      bulanNumber: null,
      validateBool: null,
      emailSelector: true,
      selectedTahun: null,
      dataTahunAjaran: [],
      selectedTahunAjaran: null
      //
    }
  },
  mounted () {
    // this.tampilsemuakelas({'sekolah': this.idSekolah})
    this.setItemAuth()
    this.pilihtahunajaran()
    this.listKelasJSON()
  },
  methods: {
    pilihtahunajaran: async function (param) {
      var dataParamSend =
      {
        'sekolah': this.$session.get('auth').sekolah
      }
      const response = await api.requestJsonPengguna(dataParamSend, 'getFilterTahun')
      // console.log(response)
      this.dataTahunAjaran = response.data.data
    },
    setItemAuth: async function (param) {
      if (!this.$session.exists()) {
        this.$router.push('/')
      }
      var dataAuth = JSON.parse(localStorage.getItem('auth'))
      this.namaSekolahLocal = dataAuth.sekolah
      this.usernameLocal = dataAuth.username
      this.sekolah_id = dataAuth._id
    },
    editSiswaFieldTampil: async function (param) {
      this.EditNamaLengkap = param.nama_lengkap
      this.EditKodeRFID = param.RFID
      this.EditKelas = param.Kelas
      this.EditJenisKelamin = param.jenis_kelamin
    },
    tampilsiswaperkelas: async function (param, paramTahunAjaran) {
      var arrayHasil = []
      try {
        var sendSekolah = {
          sekolah: this.namaSekolahLocal
        }
        const responTwo = await apiGetData.requestListPengguna(sendSekolah)
        // console.log(responTwo)
        var result = load.filter(responTwo.data.data, { Kelas: [{ tahun_ajaran: paramTahunAjaran, nama_kelas: this.selectedKelas }] })
        // console.log(result)
        for (let x = 0; x < result.length; x++) {
          for (let i = 0; i < result[x].Kelas.length; i++) {
            var kelasTahunAjaran = result[x].Kelas[i]
            if (kelasTahunAjaran.tahun_ajaran === paramTahunAjaran) {
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
      } catch (error) {
        console.log(error)
      }
    },
    tampilsemuakelas: async function (param) {
      const response = await api.getKelas(param)
      this.dataKelas = response.data.data

      // console.log(this.dataKelas)
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
      await api.requestSiswa(dataSiswa, 'tambah').then(response => {
        if (response.data.success === true) {
          this.$swal({
            title: 'Berhasil!',
            text: 'Berhasil Mendaftarkan Kelas baru!',
            icon: 'success',
            confirmButtonText: 'Yes',
            showLoaderOnConfirm: true
          }).then((result) => {
            window.location.reload()
          })
        } else {
          this.$swal('Gagal!', {
            title: 'Gagal',
            text: 'Gagal Mendaftarkan!',
            icon: 'error',
            confirmButtonText: 'Yes',
            showLoaderOnConfirm: true
          }).then((result) => {
            window.location.reload()
          })
        }
      })
    },
    testTable: async function (param) {
      try {
        var mdata = {
          tahun: this.tahunRekap,
          bulan: this.bulan,
          kelas: this.selectedKelas,
          sekolah: this.namaSekolahLocal
        }
        switch (this.bulan) {
          case 'Januari':
            this.bulanNumber = 1
            break
          case 'Febuari':
            this.bulanNumber = 2
            break
          case 'Maret':
            this.bulanNumber = 3
            break
          case 'April':
            this.bulanNumber = 4
            break
          case 'Mei':
            this.bulanNumber = 5
            break
          case 'Juni':
            this.bulanNumber = 6
            break
          case 'Juli':
            this.bulanNumber = 7
            break
          case 'Agustus':
            this.bulanNumber = 8
            break
          case 'September':
            this.bulanNumber = 9
            break
          case 'Oktober':
            this.bulanNumber = 10
            break
          case 'November':
            this.bulanNumber = 11
            break
          case 'Desember':
            this.bulanNumber = 12
            break
          default:
            break
        }
        var getJumlahHariPerbulan = getDaysInMonth(this.bulanNumber, mdata.tahun)
        for (let i = 1; i < getJumlahHariPerbulan + 1; i++) {
          // console.log(i)
        }
      } catch (error) {
      }
    },
    exportGoogleSpreatSheet: async function (param) {
      try {
        var dataExport = {
          tahun: this.tahunRekap,
          bulan: this.bulan,
          kelas: this.selectedKelas,
          sekolah: this.namaSekolahLocal
        }
        const response = await api.requestExcelSpreatSheet(dataExport)
        if (response.data.succes === true) {
          this.$swal('Berhasil Upload!', {
            title: 'Data Sudah Di Upload Google Sheet',
            text: 'Data Siswa ' + this.selectedKelas + ' Berhasil Di Export',
            icon: 'success'
          })
          let url = 'https://drive.google.com/open?id=1cyVEXruWKpr7XyzP_RSp8OnxaFoWqsKQkXM_skvuhog'
          let win = window.open(url, '_blank')
          win.focus()
        } else {
          this.$swal('Gagal Upload!', {
            title: 'Data Gagal Di Upload Google Sheet',
            text: 'Data Siswa ' + this.selectedKelas + ' Gagal Di Export',
            icon: 'warning'
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    exportData: async function (param) {
      try {
        moment.locale('id')
        var mdata = {
          tahun: this.tahunRekap,
          bulan: this.bulan,
          kelas: this.selectedKelas,
          sekolah: this.namaSekolahLocal
        }
        // console.log(mdata + ' export')
        // console.log(mdata)
        const response = await api.requestExcelData(mdata)
        // console.log(response.data.data)
        const values = response.data.data
        var ExportData = []
        for (let i = 0; i < values.length; i++) {
          if (values[i].RFID.hasOwnProperty('rekap_rfid')) {
            var check = values[i].RFID
            for (let a = 0; a < 32; a++) {
              // console.log(check.rekap_rfid[`_${mdata.tahun}`][`${this.bulan}`])[a])
              var tgl = Object.keys(check.rekap_rfid[`_${mdata.tahun}`][`${this.bulan}`])[a]
              if (typeof (Object.keys(check.rekap_rfid[`_${mdata.tahun}`][`${this.bulan}`])[a]) === 'undefined') {
                ExportData.push({Tanggal: '', Nama: values[i].profil.nama_lengkap})
              } else {
                ExportData.push({Tanggal: Object.keys(check.rekap_rfid[`_${mdata.tahun}`][`${this.bulan}`])[a].replace('_', ''), Nama: values[i].profil.nama_lengkap, Datang: moment(check.rekap_rfid[`_${mdata.tahun}`][`${this.bulan}`][`${tgl}`].Datang).format('MMMM Do YYYY, h:mm:ss'), Pulang: moment(check.rekap_rfid[`_${mdata.tahun}`][`${this.bulan}`][`${tgl}`].Pulang).format('MMMM Do YYYY, h:mm:ss')})
              }
            }
            // objStar['Murid'].push(check.rekap_rfid._2019.Mei)
            // objStar['Murid'].push(values[i].profil.nama_lengkap)
            // var animalWS = XLSX.utils.json_to_sheet(this.Datas.animals)
            // var wb = XLSX.utils.book_new()
            // XLSX.utils.book_append_sheet(wb, animalWS, 'animals') // sheetAName is name of Worksheet
            // XLSX.writeFile(wb, 'book.xlsx')
          } else {
            console.log('gagal')
          }
        }
        this.Datas['kelas_' + this.selectedKelas] = ExportData
        // console.log(ExportData)
        var animalWS = XLSX.utils.json_to_sheet(this.Datas[`kelas_` + this.selectedKelas])
        var wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, animalWS, 'kelas_' + this.selectedKelas) // sheetAName is name of Worksheet
        XLSX.writeFile(wb, 'Report Kehadiran.xlsx')
      } catch (error) {
        // console.log('error nih.... ' + error)
        this.$swal('Gagal!', {
          title: 'Data Belum Lengkap',
          text: 'Data personil ' + this.selectedKelas + ' pada bulan ' + this.bulan + ' harus lengkap!',
          icon: 'warning'
        }).then((result) => {
          // window.location.reload()
        })
      }
    },
    DeleteSiswa: async function (params) {
      var dataSiswaDelete = {
        'nama_lengkap': params
      }
      this.$swal({
        title: 'Hapus Siswa?',
        text: 'Apa anda yakin akan menghapus siswa?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            api.requestJsonPengguna(dataSiswaDelete, 'delete').then(response => {
              if (response.data.success) {
                this.$swal({
                  title: 'Berhasil!',
                  text: 'Berhasil Delete!',
                  icon: 'success',
                  confirmButtonText: 'Yes',
                  showLoaderOnConfirm: true
                }).then((result) => {
                  window.location.reload()
                })
              } else {
                this.$swal('Gagal!', {
                  title: 'Gagal',
                  text: 'Gagal Delete, terjadi masalah!',
                  icon: 'error',
                  confirmButtonText: 'Yes',
                  showLoaderOnConfirm: true
                }).then((result) => {
                  window.location.reload()
                })
              }
            })
          } else {
            this.$swal('Batal di delete!')
          }
        })

      // await api.requestJsonPengguna(dataSiswaDelete, 'delete').then(response => {
      //   if (response.data.success) {
      //     this.$swal({
      //       title: 'Berhasil!',
      //       text: 'Berhasil Mendaftarkan Kelas baru!',
      //       icon: 'success',
      //       confirmButtonText: 'Yes',
      //       showLoaderOnConfirm: true
      //     }).then((result) => {
      //       window.location.reload()
      //     })
      //   } else {
      //     this.$swal('Gagal!', {
      //       title: 'Gagal',
      //       text: 'Gagal Mendaftarkan!',
      //       icon: 'error',
      //       confirmButtonText: 'Yes',
      //       showLoaderOnConfirm: true
      //     }).then((result) => {
      //       window.location.reload()
      //     })
      //   }
      // })
    },
    tampilSiswaJSON: async function (param) {
      await api.getJSONHttp(param)
    },
    tampilTahun: async function (param) {
      var dataTahun = [{'tahun': '2018/2019'}, {'tahun': '2019/2020'}]
      this.selectedTahun = dataTahun
    },
    // TAHAP PENGGUNAAN JSON
    listKelasJSON: async function (param) {
      var dataSendKelas = {
        sekolah: this.namaSekolahLocal
      }
      const response = await apiGetData.requestListKelas(dataSendKelas)
      this.dataJSONTampilKelas = response.data.data
      var arrayHasil = []
      for (let i = 0; i < this.dataJSONTampilKelas.length; i++) {
        const element = this.dataJSONTampilKelas[i].NAMA_KELAS
        this.dataArrayNamaKelas.push(element)
      }
      this.selectedKelas = 'Pilih Kelas'
      /* kalo mau tampil kelas paling awal
      this.selectedKelas = this.dataArrayNamaKelas[0]
      */
      const responTwo = await apiGetData.requestListPengguna(dataSendKelas)
      var result = load.filter(responTwo.data, { Kelas: [{ tahun_ajaran: '2018/2019', nama_kelas: this.selectedKelas }] })
      for (let x = 0; x < result.length; x++) {
        for (let i = 0; i < result[x].Kelas.length; i++) {
          var kelasTahunAjaran = result[x].Kelas[i]
          if (kelasTahunAjaran.tahun_ajaran === '2018/2019') {
            var hasilArrayAkhir = {
              '_id': result[x]._id,
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
        this.inputKelaminConvert = 'M'
      } else {
        this.inputKelaminConvert = 'F'
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
        jenis_kelamin: this.inputKelaminConvert
      }
      if (this.emailSelector) {
        dataInputSimpanSiswa = {
          email: this.inputEmail + '@vidyanusa.id',
          sandi: this.inputSandi,
          rfid: this.inputKodeRFID,
          nama_kelas: this.inputKelas,
          tahun_Ajaran: this.inputTahunAjaran,
          sekolah: this.namaSekolahLocal,
          username: this.inputUsername,
          nama_lengkap: this.inputNamaLengkap,
          jenis_kelamin: this.inputKelaminConvert
        }
      }
      var validate = validateUsername(dataInputSimpanSiswa.username)
      if (validate) {
        this.validateBool = true
      } else {
        this.validateBool = false
      }
      if (this.validateBool) {
        const response = await api.requestJsonPengguna(dataInputSimpanSiswa, 'tambah')
        if (response.data.success === true) {
          this.$swal({
            title: 'Berhasil!',
            text: 'Berhasil Membuat Pengguna baru!',
            icon: 'success'
          }).then((result) => {
            window.location.reload()
          })
        } else {
          this.$swal('Gagal!', {
            title: 'Gagal',
            text: 'Gagal Membuat Pengguna baru!',
            icon: 'error'
          }).then((result) => {
            window.location.reload()
          })
        }
      } else {
        this.$swal('Gagal!', {
          title: 'Data personil tidak valid',
          text: 'Periksa Data personil!',
          icon: 'error'
        }).then((result) => {
        })
      }
    },
    editDataSiswa: async function (param) {
      // var dataInputEditSiswa = {
      //   'nama_lengkap': this.EditNamaLengkap,
      //   'rfid': this.EditKodeRFID,
      //   'kelas': this.EditKelas,
      //   'sekolah': this.namaSekolahLocal,
      //   'jenis_kelamin': this.EditJenisKelamin
      // }
      // const response = await api.requestJsonPengguna(dataInputEditSiswa, 'edit')
      // if (response.data.success === true) {
      //   this.$swal({
      //     title: 'Berhasil!',
      //     text: 'Berhasil Membuat Pengguna baru!',
      //     icon: 'success'
      //   })
      // } else {
      //   this.$swal('Gagal!', {
      //     title: 'Gagal',
      //     text: 'Gagal Membuat Pengguna baru!',
      //     icon: 'error'
      //   })
      // }
    }
  }
}
var getDaysInMonth = function (month, year) {
  return new Date(year, month, 0).getDate()
}
function validateUsername (username) {
  var re = /^[a-z0-9]{8,20}$/
  return re.test(String(username))
}
</script>
<style lang="scss" scoped>
</style>
