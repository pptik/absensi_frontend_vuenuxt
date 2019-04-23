<template>
   <section class="container">
    <div class="mt-5">
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-card>
        <md-card-header>
          <div class="md-title md-alignment-top-center">Hadir</div>
        </md-card-header>
        <md-card-content class="md-content">
          150
        </md-card-content>
      </md-card>
      </div>
      <div class="md-layout-item">
        <md-card>
        <md-card-header>
          <div class="md-title">Sakit</div>
        </md-card-header>
        <md-card-content class="md-content">
          5
        </md-card-content>
      </md-card>
      </div>
      <div class="md-layout-item">
        <md-card>
        <md-card-header>
          <div class="md-title">Izin</div>
        </md-card-header>
        <md-card-content class="md-content">
          2
        </md-card-content>
      </md-card>
      </div>
      <div class="md-layout-item">
         <md-card>
        <md-card-header>
          <div class="md-title">Alfa</div>
        </md-card-header>
        <md-card-content class="md-content"> 
          1
        </md-card-content>
      </md-card>
      </div>
    </div>
      
      
      
     
    <!--<md-tabs  md-sync-route>
       <md-tab id="tab-pages" md-label="Tambah Kelas">
      <div>
        <form novalidate class="md-layout" >
          <md-card class="md-layout-item md-size-50 md-small-size-50">
            <md-card-header>
              <div class="md-title">Tambah Kelas</div>
                </md-card-header>
                <div style="padding:25px;">
                <md-field>
                  <label>Nama Kelas</label>
                  <md-input v-model="inputNamaKelas"></md-input>
                </md-field>
                <md-field>
                  <label>Tingkat</label>
                  <md-input v-model="inputTingkat"></md-input>
                </md-field>
                <md-field>
                  <label>Jurusan</label>
                  <md-input v-model="inputJurusan"></md-input>
                </md-field>
                <md-field>
                <label>Jam Masuk</label>
                  <md-input v-model="inputJamMasuk"></md-input>
                </md-field>
                <md-field>
                  <label>Jam Pulang</label>
                  <md-input v-model="inputJamPulang"></md-input>
                </md-field>
                
                <md-card-actions>
                  <md-button type="submit" class="md-primary" v-on:click.prevent="simpankelas()" >Tambah Kelas</md-button>
                </md-card-actions>
              </div>
             </md-card>
            </form>
      </div>       
      </md-tab> -->
      <!-- <md-tab id="tab-posts" md-label="List Kelas"> -->
      <div class="content_kelas">
        <form novalidate class="md-layout">
          <md-table v-model="dataKelas" md-card class="md-layout-item md-alignment-top-center">
            <md-table-toolbar>
              <h1 class="md-title">Kelas </h1>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Name">{{ item.nama_kelas }}</md-table-cell>
              <md-table-cell type="number" md-label="Tingkat">{{ item.tingkat }}</md-table-cell>
              <md-table-cell md-label="Jurusan">{{ item.jurusan }}</md-table-cell>
              <md-table-cell md-label="Jam Masuk">{{ item.jam_masuk }}</md-table-cell>
              <md-table-cell md-label="Jam Masuk">{{ item.jam_pulang }}</md-table-cell>
              <md-table-cell>
                <md-button class="md-primary md-raised" @click="showDialogEdit = true; editKelasFieldTampil(item);">Edit</md-button>
                <md-button v-on:click.prevent="deleteKelasFungsi(item._id)" class="md-accent">Delete</md-button>            
              </md-table-cell>
            </md-table-row>
          </md-table>
          </form>
      </div>
    </div>

    <!---DIALOG BOX--->
    <md-dialog :md-active.sync="showDialogEdit" class="md-layout-item md-size-50 md-small-size-70">
      <md-dialog-title>Edit Kelas</md-dialog-title>
      <md-tabs md-dynamic-height>
        <md-tab md-label="Kelas">
          <div style="padding:20px;">
            <md-field>
              <label>Nama Kelas</label>
              <md-input v-model="inputNamaKelasEdit"></md-input>
            </md-field>
             <md-field>
              <label>Tingkat</label>
              <md-input v-model="inputTingkatEdit"></md-input>
            </md-field>
            <md-field>
              <label>Jurusan</label>
              <md-input v-model="inputJurusanEdit"></md-input>
            </md-field>
            <md-field>
              <label>Jam Masuk</label>
              <md-input v-model="inputJamMasukEdit"></md-input>
            </md-field>
            <md-field>
              <label>Jam Pulang</label>
              <md-input v-model="inputJamPulangEdit"></md-input>
            </md-field>
            <md-dialog-actions>
              <md-button class="md-primary" @click="editKelasFungsi()">Simpan</md-button>
            </md-dialog-actions>
          </div>
        </md-tab>
      </md-tabs>
    </md-dialog>
  </section>
</template>

<script>

import api from '../middleware/routes_api/routes'

export default {
  layout: 'default', // layouts used,
  data () {
    return {
      showDialogEdit: false,
      dataKelas: [],
      selectedKelas: [],
      dataArrayNamaKelas: [],
      // sekolah
      idSekolah: 'SMP Assalaam',
      objectIdSekolah: '5c874518afa7c397f8bb17d8',
      // input field kelas
      inputNamaKelas: null,
      inputTingkat: null,
      inputJurusan: null,
      inputJamMasuk: null,
      inputJamPulang: null,
      // input field kelas edit
      inputNamaKelasEdit: null,
      inputTingkatEdit: null,
      inputJurusanEdit: null,
      inputJamMasukEdit: null,
      inputJamPulangEdit: null
    }
  },
  components: {
  },
  mounted () {
    this.tampilsemuakelas({'sekolah': this.idSekolah})
  },
  methods: {
    simpankelas: async function (param) {
      var dataSimpanKelas = {
        nama_kelas: this.inputNamaKelas,
        tingkat: this.inputTingkat,
        jurusan: this.inputJurusan,
        sekolah: this.idSekolah,
        jam_masuk: this.inputJamMasuk,
        jam_pulang: this.inputJamPulang
      }
      // console.log(dataSimpanKelas)
      var response = await api.requestKelas(dataSimpanKelas, 'tambah')
      console.log(response)
    },
    tampilsemuakelas: async function (param) {
      const response = await api.getKelas(param)
      this.dataKelas = response.data.data
      for (let i = 0; i < this.dataKelas.length; i++) {
        const element = this.dataKelas[i].nama_kelas
        this.dataArrayNamaKelas.push(element)
      }
      console.log(this.dataKelas)
      this.selectedKelas = response.data.data[0]
    },
    editKelasFieldTampil: async function (param) {
      this.inputNamaKelasEdit = param.nama_kelas
      this.inputTingkatEdit = param.tingkat
      this.inputJurusanEdit = param.jurusan
      this.inputJamMasukEdit = param.jam_masuk
      this.inputJamPulangEdit = param.jam_pulang
    },
    editKelasFungsi: async function (param) {
      var dataKelas = {
        _id: this.objectIdSekolah,
        nama: this.inputNamaKelasEdit,
        tingkat: this.inputTingkatEdit,
        jurusan: this.inputJurusanEdit,
        sekolah: this.idSekolah,
        jam_masuk: this.inputJamMasukEdit,
        jam_pulang: this.inputJamPulangEdit
      }
      // await api.requestKelas(dataKelas, 'edit')
      console.log(dataKelas)
    },
    deleteKelasFungsi: async function (param) {
      // await api.requestKelas(param, 'delete')
      console.log(param)
    }
  }
}
</script>
<style lang="scss" scoped>
  .md-title{
    text-align: center;
  }
  .md-content{
    text-align: center;
  }
  .content_kelas{
    padding-top: 50px;
  }
</style>
 