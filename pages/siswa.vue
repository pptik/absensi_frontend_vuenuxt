<template>
  <section class="container">
  <div class="mt-5">
    <md-tabs  md-active-tab>
      <md-tab id="tab-pages" md-label="List Personil">
      <div style="padding-top: 20px;padding-left: 20px;">
        <div class="md-layout md-gutter">
        <md-field style="width: 500px;">
          <label>Pilih Bagian</label>   
          <md-select v-model="selectedKelas" @md-selected="tampilsiswaperkelas(selectedKelas, selectedTahunAjaran)">
            <md-option disabled>Pilih Bagian</md-option>
            <md-option v-for="hasil in dataJSONTampilKelas" :value="hasil.NAMA_KELAS" :key="hasil._id">{{ hasil.NAMA_KELAS }}</md-option>
          </md-select>
          <md-button :disabled="selectedTahunAjaran === null" class="md-default md-raised" @click="showDate = true;">
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
      <table  id="mytable"  border="1" hidden>
        <tbody>
          <tr>
            <th rowspan="2">Nama</th>
            <th colspan="2" v-for="data in dayIn1Month" :key="data._id" style="background-color: red;"> {{data}}</th>
          </tr>
          <tr>
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
            
            <th>Datang</th>
            <th>Pulang</th>
          </tr>
          
          <tr v-for="data in dataTampilanRecord" :key="data.nama_lengkap">
            <td> {{ data.nama_lengkap }}</td>
            <td v-for="(value) in data.tap" :key="value.tap"> {{ value }} </td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td colspan="4">Total Rekap Bulanan</td>
          </tr>
          <tr>
            <td>Hadir</td>
            <td>Sakit</td>
            <td>Izin</td>
            <td>Alfa</td>
          </tr>
          <tr>
            <td>{{ totalRekapBulanan.hadir }}</td>
            <td>{{ totalRekapBulanan.sakit }}</td>
            <td>{{ totalRekapBulanan.izin }}</td>
            <td>{{ totalRekapBulanan.alfa }}</td>
          </tr>
        </tbody>
      </table>
        <md-table v-model="dataHasilTampilSiswa" md-sort-order="asc" md-card md-fixed-header md-height= "400px">
          <md-table-toolbar>
            <h1 class="md-title">Personil/Siswa</h1>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Name">{{ item.nama_lengkap }}</md-table-cell>
            <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
            <md-table-cell md-label="RFID">{{ item.RFID }}</md-table-cell>
            <md-table-cell md-label="Jenis Kelamin">{{ item.jenis_kelamin }}</md-table-cell>
            <md-table-cell md-label="Bagian">{{ item.Kelas }}</md-table-cell>
            <md-table-cell>
              <md-button class="md-primary md-raised" @click="showDialogEdit = true; editSiswaFieldTampil(item);">Edit</md-button>
              <md-button v-on:click.prevent="DeleteSiswa(item._id)" class="md-accent">Delete</md-button>            
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
                <md-field>
                  <label>Jenis Kelamin</label>
                  <md-select v-model="inputJenisKelamin" required>
                    <md-option value="P">Laki-Laki</md-option>
                    <md-option value="W">Perempuan</md-option>
                  </md-select>
                </md-field>
                <md-field>
                  <label>Sandi</label>
                  <md-input type="password" v-model="inputSandi" required></md-input>
                </md-field>
                <md-field class="md-layout-item md-size-35">
                  <label>Kode RFID</label>
                  <md-input required class="md-layout-item md-size-120" placeholder="ex: 0x40 0xde 0x68 0x51"  maxlength="19" v-model="inputKodeRFID"></md-input>
                </md-field>
                <label>Bagian</label>
                <md-autocomplete required v-model="inputKelas" :md-options="dataArrayNamaKelas" :md-open-on-focus="false"></md-autocomplete>
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
          <md-tab id="tab-import" md-label="Import Personil">
            <md-card>
              <md-card-header>
                <div class="md-title">Upload Excel</div>
              </md-card-header>
              <md-card-content>
                <div class="md-accent" style="background-color: #c0edf1; width: 100%; height: 120px; display: block; padding: 10px;">
                  <h3>Perhatian!</h3>
                  <p>Format harus dalam format <b>.xlsx</b>. Unduh format template xlsx <b><a href="http://abstein.pptik.id/data/template/template_import_pengguna.xlsx">disini</a></b></p>
                </div>
                <md-field>
                  <label> Pilih Bagian </label>
                  <md-select v-model="selectedKelas">
                    <md-option disabled>Pilih Bagian</md-option>
                    <md-option v-for="hasil in dataJSONTampilKelas" :value="hasil.NAMA_KELAS" :key="hasil._id">{{ hasil.NAMA_KELAS }}</md-option>
                  </md-select>
                </md-field>
                <md-field>
                  <input type="file" id="files" ref="files" accept="xlsx/*" v-on:change="handleFileUpload()"/>
                </md-field>
                <md-button :disabled="this.selectedTahunAjaran === null && this.uploadPenggunaExcel === undefined || this.uploadPenggunaExcel === null" class="md-raised md-primary" v-on:click.prevent="importExcelPengguna()">Import Pengguna</md-button>
              </md-card-content>
            </md-card>
          </md-tab>
        </md-tabs>
    </div>
    <md-dialog  :md-active.sync="showDate" class="md-layout-item md-size-100 md-small-size-50">
      <md-dialog-title>Rekap Absensi Per Bulan {{this.selectedKelas}}</md-dialog-title>
      <div style="padding:20px">
        <div class="md-layout md-gutter containers">
          <div class="md-layout-item">
            <md-field>
              <label> Pilih Tahun </label>
                <md-select v-model="tahunRekap">
                  <md-option disabled>Pilih Tahun</md-option>
                  <md-option v-for="hasil in getListCurrentYear" :value="hasil.tahun" :key="hasil.tahun">{{ hasil.tahun }}</md-option>
                </md-select>
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
              <md-button class="md-primary" @click="loadTableExport()">Export Excel</md-button>
              <div v-if="this.namaSekolahLocal == 'SMP Assalam'">
                <md-button class="md-primary" @click="exportGoogleSpreatSheet()">Export ke GoogleSheet</md-button>
              </div>
            </md-dialog-actions>
      </div>
    </md-dialog>
    <!---DIALOG BOX--->
    <md-dialog :md-active.sync="showDialogEdit">
      <md-dialog-title>Edit Siswa</md-dialog-title>
      <div style="padding:20px; width: 500px;">
        <md-field>
          <label>Nama</label>
          <md-input v-model="EditNamaLengkap" disabled></md-input>
        </md-field>
        <md-field>
          <label>Email</label>
          <md-input v-model="EditEmail"></md-input>
        </md-field>
        <md-field>
          <label>RFID</label>
          <md-input v-model="EditKodeRFID"></md-input>
        </md-field>
        Jenis Kelamin<br>
        <md-radio v-model="EditJenisKelamin" value="M">Laki-laki</md-radio>
        <md-radio v-model="EditJenisKelamin" value="F">Prempuan</md-radio>

        <md-dialog-actions>
          <md-button class="md-primary" @click="editDataSiswa(EditId)">Simpan</md-button>
          <md-button class="md-primary" @click="showDialogEdit = false">Batal</md-button>
        </md-dialog-actions>
      </div>
    </md-dialog>
  </section>
  
</template>

<script>
import api from '../middleware/routes_api/routes'
import load from 'lodash'
import moment from 'moment'
import XLSX from 'xlsx'
// import JsonExcel from 'vue-json-excel'
/* eslint-disable import/first */
// import downloadexcel from 'vue-json-excel'
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
      selectedKelas: null,
      dataHasilTampilSiswa: [],
      dataTampilanRecord: [],
      cobaHeader: 5,
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
      EditId: null,
      EditEmail: null,
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
      getListCurrentYear: [],
      selectedTahunAjaran: null,
      // Rekap 1 Month
      dayIn1Month: 31,
      htmlContent: ``,
      totalRekapBulanan: {
        hadir: 0,
        sakit: 0,
        izin: 0,
        alfa: 0
      },
      // Import Siswa
      uploadPenggunaExcel: null
    }
  },
  components: {
    // 'downloadExcel': JsonExcel
    // downloadexcel
  },
  mounted () {
    // this.tampilsemuakelas({'sekolah': this.idSekolah})
    this.setItemAuth()
    this.listKelasJSON()
    this.pilihtahunajaran()
    this.tahunListField()
  },
  methods: {
    loadHeaderRekap: async function () {
      this.htmlContent = fillContentByMonth()
    },
    pilihtahunajaran: async function (param) {
      var dataParamSend =
      {
        'sekolah': this.$session.get('auth').sekolah
      }
      const response = await api.requestJsonPengguna(dataParamSend, 'getFilterTahun')
      this.dataTahunAjaran = response.data.data
      // load tahun ajaran pertama load
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
      this.EditId = param._id
      this.EditEmail = param.email
      this.EditNamaLengkap = param.nama_lengkap
      this.EditKodeRFID = param.RFID
      this.EditKelas = param.Kelas
      this.EditJenisKelamin = param.jenis_kelamin
    },
    tahunListField: async function () {
      let currentYear = new Date().getFullYear()
      let earliestYear = 1970
      this.getListCurrentYear = []
      while (currentYear >= earliestYear) {
        let insertCurrentYear = {
          'tahun': currentYear
        }
        this.getListCurrentYear.push(insertCurrentYear)
        currentYear -= 1
      }
    },
    tampilsiswaperkelas: async function (param, paramTahunAjaran) {
      var arrayHasil = []
      try {
        var sendSekolah = {
          sekolah: this.namaSekolahLocal
        }
        const responTwo = await apiGetData.requestListPengguna(sendSekolah)
        var result = load.filter(responTwo.data.data, { Kelas: [{ tahun_ajaran: paramTahunAjaran, nama_kelas: this.selectedKelas }] })
        for (let x = 0; x < result.length; x++) {
          for (let i = 0; i < result[x].Kelas.length; i++) {
            var kelasTahunAjaran = result[x].Kelas[i]
            if (kelasTahunAjaran.tahun_ajaran === paramTahunAjaran) {
              var hasilArrayAkhir = {
                '_id': result[x]._id,
                'email': result[x].email,
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
            type: 'success',
            confirmButtonText: 'Yes',
            showLoaderOnConfirm: true
          }).then((result) => {
            window.location.reload()
          })
        } else {
          this.$swal('Gagal!', {
            title: 'Gagal',
            text: 'Gagal Mendaftarkan!',
            type: 'error',
            confirmButtonText: 'Yes',
            showLoaderOnConfirm: true
          }).then((result) => {
            window.location.reload()
          })
        }
      })
    },
    getNumberMonth: async function (param) {
      try {
        switch (param) {
          case 'Januari':
            this.bulanNumber = 0
            break
          case 'Februari':
            this.bulanNumber = 1
            break
          case 'Maret':
            this.bulanNumber = 2
            break
          case 'April':
            this.bulanNumber = 3
            break
          case 'Mei':
            this.bulanNumber = 4
            break
          case 'Juni':
            this.bulanNumber = 5
            break
          case 'Juli':
            this.bulanNumber = 6
            break
          case 'Agustus':
            this.bulanNumber = 7
            break
          case 'September':
            this.bulanNumber = 8
            break
          case 'Oktober':
            this.bulanNumber = 9
            break
          case 'November':
            this.bulanNumber = 10
            break
          case 'Desember':
            this.bulanNumber = 11
            break
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
            type: 'success'
          })
          let url = 'https://drive.google.com/open?id=1cyVEXruWKpr7XyzP_RSp8OnxaFoWqsKQkXM_skvuhog'
          let win = window.open(url, '_blank')
          win.focus()
        } else {
          this.$swal('Gagal Upload!', {
            title: 'Data Gagal Di Upload Google Sheet',
            text: 'Data Siswa ' + this.selectedKelas + ' Gagal Di Export',
            type: 'warning'
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    loadTableExport: async function () {
      this.getNumberMonth(this.bulan)
      var date = new Date(this.tahunRekap, this.bulanNumber)
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      firstDay.setHours(0, 0, 0, 0)
      lastDay.setHours(23, 59, 59, 999)
      let postData = {
        sekolah: this.namaSekolahLocal,
        tahun: this.selectedTahunAjaran,
        jam_awal: firstDay,
        jam_akhir: lastDay,
        kelas: this.selectedKelas
      }

      let postRekapBulanan = {
        sekolah: this.namaSekolahLocal,
        year: this.tahunRekap,
        month: this.bulan,
        kelas: this.selectedKelas
      }
      const responseTotalRekap = await api.requestTotalRekapBulanan(postRekapBulanan)
      let dataTotal = {
        hadir: responseTotalRekap.data.data.hadir,
        sakit: responseTotalRekap.data.data.sakit,
        izin: responseTotalRekap.data.data.izin,
        alfa: responseTotalRekap.data.data.alfa
      }
      this.totalRekapBulanan = dataTotal
      this.$swal.showLoading()
      api.requestExcelDataV2(postData).then(response => {
        let getResponse = response.data.data
        this.dataTampilanRecord = getResponse
        try {
          if (getResponse.length > 0) {
            this.$swal({
              title: 'Build Excel Berhasil',
              text: 'Klik tombol unduh untuk menyimpan',
              type: 'success',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Unduh',
              cancelButtonText: 'Batal'
            }).then((result) => {
              // Workbook
              if (!result.value) {
              } else {
                var wb2 = XLSX.utils.table_to_book(document.getElementById('mytable'), {sheet: this.selectedKelas + '-' + this.tahunRekap})
                var FileSaver = require('file-saver')
                var firstSheetName = wb2.SheetNames[0]
                var addressofcell = 'A1'
                // WorkSheet
                var worksheet = wb2.Sheets[firstSheetName]
                var desiredCell = worksheet[addressofcell]
                var desiredValue = (desiredCell ? desiredCell.v : undefined)
                console.log(desiredValue)
                /* Write file */
                var wbout = XLSX.write(wb2, {bookType: 'xlsx', bookSST: true, type: 'binary'})
                // Save File
                FileSaver.saveAs(new Blob([this.s2ab(wbout)], {type: 'application/octet-stream'}), this.namaSekolahLocal + '/' + this.bulan + '/' + this.selectedKelas + '.xlsx')
              }
            })
          } else {
            this.$swal({
              type: 'info',
              title: 'Data Bulan Tidak Tersedia',
              showConfirmButton: false,
              timer: 1500
            })
          }
        } catch (error) {
          console.log(error)
        }
      })
    },
    s2ab: function (s) {
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF
      return buf
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
        const response = await api.requestExcelData(mdata)
        const values = response.data.data
        var ExportData = []
        for (let i = 0; i < values.length; i++) {
          var check = values[i].RFID
          for (let a = 0; a < 32; a++) {
            var tgl = Object.keys(check.rekap_rfid[`_${mdata.tahun}`][`${this.bulan}`])[a]
            if (typeof (Object.keys(check.rekap_rfid[`_${mdata.tahun}`][`${this.bulan}`])[a]) === 'undefined') {
            } else {
              ExportData.push({Tanggal: Object.keys(check.rekap_rfid[`_${mdata.tahun}`][`${this.bulan}`])[a].replace('_', ''), Nama: values[i].profil.nama_lengkap, Datang: moment(check.rekap_rfid[`_${mdata.tahun}`][`${this.bulan}`][`${tgl}`].Datang).format('MMMM Do YYYY, h:mm:ss'), Pulang: moment(check.rekap_rfid[`_${mdata.tahun}`][`${this.bulan}`][`${tgl}`].Pulang).format('MMMM Do YYYY, h:mm:ss')})
            }
          }
        }
        this.Datas['kelas_' + this.selectedKelas] = ExportData
        var animalWS = XLSX.utils.json_to_sheet(this.Datas[`kelas_` + this.selectedKelas])
        var wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, animalWS, 'kelas_' + this.selectedKelas) // sheetAName is name of Worksheet
        XLSX.writeFile(wb, 'Report Kehadiran.xlsx')
      } catch (error) {
        this.$swal('Gagal!', {
          title: 'Data Belum Lengkap',
          text: 'Data personil ' + this.selectedKelas + ' pada bulan ' + this.bulan + ' harus lengkap!',
          type: 'warning'
        }).then((result) => {
          // window.location.reload()
        })
      }
    },
    DeleteSiswa: async function (params) {
      var dataSiswaDelete = {
        '_id': params
      }
      this.$swal({
        title: 'Hapus Siswa?',
        text: 'Apa anda yakin akan menghapus siswa?',
        type: 'warning',
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
                  type: 'success',
                  confirmButtonText: 'Yes',
                  showLoaderOnConfirm: true
                }).then((result) => {
                  window.location.reload()
                })
              } else {
                this.$swal('Gagal!', {
                  title: 'Gagal',
                  text: 'Gagal Delete, terjadi masalah!',
                  type: 'error',
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
      this.selectedKelas = this.dataJSONTampilKelas[0].NAMA_KELAS
      // this.selectedKelas = this.dataJSONTampilKelas[0].NAMA_KELAS

      var arrayHasil = []
      for (let i = 0; i < this.dataJSONTampilKelas.length; i++) {
        const element = this.dataJSONTampilKelas[i].NAMA_KELAS
        this.dataArrayNamaKelas.push(element)
      }
      // LOAD BAGIAN NAMA KELAS PERTAMA KALI LOAD
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
      if (this.inputJenisKelamin === 'P') {
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
            type: 'success'
          }).then((result) => {
            window.location.reload()
          })
        } else {
          this.$swal('Gagal!', {
            title: 'Gagal',
            text: 'Gagal Membuat Pengguna baru!',
            type: 'error'
          }).then((result) => {
            window.location.reload()
          })
        }
      } else {
        this.$swal('Gagal!', {
          title: 'Data personil tidak valid',
          text: 'Periksa Data personil!',
          type: 'error'
        }).then((result) => {
        })
      }
    },
    importExcelPengguna: async function () {
      let formData = new FormData()
      formData.append('kelas', this.selectedKelas)
      formData.append('tahun_ajaran', this.selectedTahunAjaran)
      formData.append('sekolah', this.namaSekolahLocal)
      formData.append('file', this.uploadPenggunaExcel)
      this.$swal({
        title: 'Konfirmasi Import Pengguna',
        type: 'info',
        html: `Anda yakin akan mengimport pengguna untuk bagian <b>${this.selectedKelas}</b> dengan tahun ajaran <b>${this.selectedTahunAjaran}</b> ?`,
        showCancelButton: true,
        confirmButtonText: `Konfirmasi`
      }).then((result) => {
        if (result.value) {
          api.importExcelPengguna(formData).then((response) => {
            this.$swal('Import Success!', '', 'success')
          }, (error) => {
            this.$swal('Fetch Excel Failed!', error, 'danger')
          })
        } else {
          this.$swal('Import Failed!')
        }
      })
    },
    handleFileUpload () {
      this.uploadPenggunaExcel = this.$refs.files.files[0]
    },
    editDataSiswa: async function (param) {
      var dataInputEditSiswa = {
        'id': this.EditId,
        'email': this.EditEmail,
        'rfid': this.EditKodeRFID,
        'jenis_kelamin': this.EditJenisKelamin
      }
      const response = await api.requestUpdateProfilPenggunaByAdmin(dataInputEditSiswa)
      if (response.data.success === true) {
        this.$swal({
          title: 'Berhasil!',
          text: 'Berhasil Edit Pengguna!',
          icon: 'success'
        })
      } else {
        this.$swal('Gagal!', {
          title: 'Gagal',
          text: 'Gagal Membuat Pengguna baru!',
          icon: 'error'
        })
      }
    }
  }
}
function fillContentByMonth () {
  let content = `<tr>
    <th>Datang</th>
    <th>Pulang</th>
  </tr>`
  for (let i = 0; i < 20; i++) {
    content += content
  }
  return content
}
function validateUsername (username) {
  var re = /^[a-z0-9]{8,20}$/
  return re.test(String(username))
}
</script>
<style lang="scss" scoped>
</style>
