<template>
    <div>
      <div class="md-layout-item">
        <div class="content_kelas">
          <div style="display:flex; width: 500px;">
            <div class="md-layout-item">
              <md-field>
                <md-icon>date_range</md-icon>
                <label>Pilih Tahun Ajaran</label>
                <md-select v-model="selectedTahunAjaran" name="pilih_tahun" id="pilih_tahun" md-dense  @md-selected="dataRekapHarian(selectedTahunAjaran)">
                  <md-option disabled>Select tahun ajaran</md-option>
                  <md-option v-for="hasil in dataTahunAjaran" :value="hasil" :key="hasil">{{ hasil }}</md-option>
                </md-select>
              </md-field>
            </div>
            <md-field>
              <md-icon>class</md-icon>
              <label>Pilih Bagian</label>   
              <md-select v-model="selectedKelas">
                <md-option disabled>Pilih Bagian</md-option>
                <md-option v-for="hasil in dataJSONTampilKelas" :value="hasil.NAMA_KELAS" :key="hasil._id">{{ hasil.NAMA_KELAS }}</md-option>
              </md-select>
            </md-field>
            <div class="md-layout-item" style="display: flex;">
              <md-datepicker v-model="selectedDate" md-immediately>
                <label>Pilih Tanggal</label>
              </md-datepicker>
              <md-button class="md-accent md-raised" @click="dataRekapHarian(selectedTahunAjaran)">
                Cari
              </md-button>
              <md-button @click="exportData()" class="md-default md-raised" :disabled="disabledExport">
                Export
              </md-button>          
            </div>
          </div>
          <table id="tableHarian" border="1" hidden>
            <thead>
            <tr>
              <td> Nama Lengkap </td>
              <td> Kelas </td>
              <td> Datang </td>
              <td> Mesin Datang</td>
              <td> Pulang </td>
              <td> Mesin Pulang</td>
              <td> Status </td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="data in dataHarianSiswa" :key= data._id>
              <td>{{ data.nama_lengkap }}</td>
              <td>{{ data.kelas.nama_kelas }}</td>
              <td>{{ data.date_datang }}</td>
              <td>{{ data.mac_datang }}</td>
              <td>{{ data.date_pulang }}</td>
              <td>{{ data.mac_pulang }}</td>
              <td v-if="data.status == '-' && data.date_datang != '-'" > hadir </td>
              <td v-else >{{ data.status }}</td>
            </tr>
            </tbody>
          </table>
          <md-table slot="md-table-row" md-sort="date_datang" md-sort-order="asc" md-card v-model="dataHarianSiswa" md-height= "450px">
            <md-table-toolbar>
              <h1 class="md-title">Data Harian Personil</h1>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }" >
              <md-table-cell md-sort-by="nama_lengkap" md-label="Nama" >{{ item.nama_lengkap }}</md-table-cell>
              <md-table-cell v-if="item.status == '-' && item.date_datang != '-'" type="text" md-label="Status" md-sort-by="status"> hadir </md-table-cell>
              <md-table-cell v-else type="text" md-label="Status" md-sort-by="status">  {{item.status}} </md-table-cell>
              <md-table-cell v-if="item.date_datang === '-'" type="number" md-label="Waktu Datang" md-sort-by="date_datang">Belum Melakukan Absen Pulang</md-table-cell>
              <md-table-cell v-else type="number" md-label="Waktu Datang" md-sort-by="date_datang">
                <span class="computer_time">
                  {{ item.date_datang | getDate }}
                  <md-tooltip md-direction="bottom">Waktu Komputer</md-tooltip>
                </span>
                (
                  <span class="server_time">
                    {{ item.date_datang | serverDate }}
                    <md-tooltip md-direction="bottom">Waktu Server</md-tooltip>
                  </span>
                )
              </md-table-cell>
              <md-table-cell md-sort-by="mesin_datang" md-label="Mesin Datang" >{{ item.mac_datang }}</md-table-cell>
              <md-table-cell v-if="item.date_pulang === '-'" type="number" md-label="Waktu Pulang">Belum Melakukan Absen Pulang</md-table-cell>
              <md-table-cell v-else type="number" md-label="Waktu Pulang" md-sort-by="date_pulang">
                <span class="computer_time">
                  {{ item.date_pulang | getDate }}
                  <md-tooltip md-direction="bottom">Waktu Komputer</md-tooltip>
                </span>
                (
                  <span class="server_time">
                    {{ item.date_pulang | serverDate }}
                    <md-tooltip md-direction="bottom">Waktu Server</md-tooltip>
                  </span>
                )
              </md-table-cell>
              <md-table-cell md-sort-by="mesin_pulang" md-label="Mesin Pulang" >{{ item.mac_pulang }}</md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>
    </div>
</template>
<script>
import api from '../middleware/routes_api/routes'
import apiGetData from '../middleware/routes_api/routes_get_data'
import XLSX from 'xlsx'
import moment from 'moment-timezone'
moment.locale('id')

export default {
  data () {
    return {
      dataHarianSiswa: [],
      selectedTahunAjaran: null,
      dataTahunAjaran: [
      ],
      selectedDate: new Date(),
      dataJSONTampilKelas: null,
      selectedKelas: null,
      disabledExport: true
    }
  },
  mounted () {
    this.pilihtahunajaran()
    this.listKelasJSON()
    this.dataRekapHarian()
    // this.dataSiswaHarianJSON()
    // this.dataRekapHarian()
  },
  filters: {
    getDate: function (date) {
      console.log(date)
      return moment(date).format('MMMM Do,h:mm a')
    },
    serverDate: function (date) {
      return moment(date).tz('Asia/Jakarta').format('YYYY-MM-DD hh:mm:ss')
    }
  },
  methods: {
    exportData: async function () {
      try {
        // Workbook
        var wb2 = XLSX.utils.table_to_book(document.getElementById('tableHarian'), {sheet: 'RekapHarian' + '-' + this.selectedKelas.toString()})
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
        FileSaver.saveAs(new Blob([this.s2ab(wbout)], {type: 'application/octet-stream'}), 'RekapHarian-' + this.$session.get('auth').sekolah + '-' + this.selectedKelas + '-' + this.selectedTahunAjaran + '.xlsx')
      } catch (error) {
        console.log(error)
      }
    },
    s2ab: function (s) {
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF
      return buf
    },
    pilihtahunajaran: async function (param) {
      var dataParamSend =
      {
        'sekolah': this.$session.get('auth').sekolah
      }
      const response = await api.requestJsonPengguna(dataParamSend, 'getFilterTahun')
      // console.log(response)
      this.dataTahunAjaran = response.data.data
      // Selected tahun ajaran pertama load
      this.selectedTahunAjaran = this.dataTahunAjaran[0]
    },
    listKelasJSON: async function (param) {
      var dataSendKelas = {
        sekolah: this.$session.get('auth').sekolah
      }
      const response = await apiGetData.requestListKelas(dataSendKelas)
      this.dataJSONTampilKelas = response.data.data
      this.selectedKelas = this.dataJSONTampilKelas[0].NAMA_KELAS
    },
    dataRekapHarian: async function (tahunAjaran) {
      let date = this.selectedDate
      let selectedTahun = tahunAjaran
      let dataParamSend = {
        sekolah: this.$session.get('auth').sekolah,
        tahun: selectedTahun,
        jam_awal: date,
        kelas: this.selectedKelas
      }
      let response = await api.requestHarianDataSiswa(dataParamSend, 'dataharian')
      if (response.data.data.length > 0) {
        this.disabledExport = false
      } else {
        this.disabledExport = true
      }
      this.dataHarianSiswa = response.data.data
    },
    dataSiswaHarianJSON: async function (param) {
      var date = this.selectedDate
      // var tahunAjaran = (new Date().getFullYear().toString() - 1) + '/' + new Date().getFullYear().toString()
      var tahunAjaran = param
      var dataParamSend = {
        sekolah: this.$session.get('auth').sekolah,
        tahun: tahunAjaran,
        jam_awal: date,
        kelas: this.selectedKelas
      }
      let response = await api.requestJsonPengguna(dataParamSend, 'dataharian')
      if (response.data.data.length > 0) {
        this.disabledExport = false
      } else {
        this.disabledExport = true
      }
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
        // console.log(a.created_at)
        return new Date(a.date) - new Date(b.date)
      })
      return this.dataHarianSiswa
    }
  }
}
</script>

<style scoped>
.computer_time, .server_time {
  text-decoration: underline;
}
</style>

