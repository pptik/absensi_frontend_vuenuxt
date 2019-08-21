<template>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        
        <div class="content_kelas">
          <div class="md-layout-item">
             <div class="md-layout-item">
              <md-field>
                <label>Pilih Tahun</label>
                <md-select v-model="selectedTahunAjaran" name="pilih_tahun" id="pilih_tahun" md-dense>
                  <md-option disabled>Select tahun ajaran</md-option>
                  <md-option  v-for="hasil in dataTahunAjaran" :value="hasil.pilih_tahun" :key="hasil.pilih_tahun">{{ hasil.pilih_tahun }}</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <md-table md-sort="created_at" md-sort-order="asc" md-card md-fixed-header v-model="dataHarianSiswa" md-height= "450px">
            <md-table-toolbar>
              <h1 class="md-title">Data Harian Personil</h1>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }" >
              <md-table-cell md-sort-by="nama_lengkap" md-label="Nama" >{{ item.nama_lengkap }}</md-table-cell>
              <md-table-cell type="number" md-label="Bagian" md-sort-by="kelas">{{ item.kelas }}</md-table-cell>
              <md-table-cell type="number" md-label="Waktu Datang" md-sort-by="created_at">{{ item.created_at }}</md-table-cell>
              <md-table-cell v-if="item.created_ed === 0" type="number" md-label="Waktu Pulang">Belum Melakukan Absen Pulang</md-table-cell>
              <md-table-cell v-else type="number" md-label="Waktu Pulang" md-sort-by="created_ed" >{{ item.created_ed }}</md-table-cell>
              <!-- <md-table-cell>
              <md-button v-on:click.prevent="">Edit</md-button>
              <md-button v-on:click.prevent="" class="md-accent">Delete</md-button>
            </md-table-cell> -->
            </md-table-row>
          </md-table>
        </div>
      </div>
    </div>
</template>
<script>
import api from '../middleware/routes_api/routes'
export default {
  data () {
    return {
      dataHarianSiswa: [],
      selectedTahunAjaran: null,
      dataTahunAjaran: [
        {'pilih_tahun': '2018/2019'},
        {'pilih_tahun': '2019/2020'}
      ]
    }
  },
  mounted () {
    this.pilihtahunajaran()
    this.dataSiswaHarianJSON()
  },
  methods: {
    pilihtahunajaran: async function (param) {

    },
    dataSiswaHarianJSON: async function (param) {
      var date = new Date()
      var tahunAjaran = (new Date().getFullYear().toString() - 1) + '/' + new Date().getFullYear().toString()
      var dataParamSend = {
        sekolah: this.$session.get('auth').sekolah,
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
        console.log(a.created_at)
        return new Date(a.date) - new Date(b.date)
      })
      return this.dataHarianSiswa
    }
  }
}
</script>

