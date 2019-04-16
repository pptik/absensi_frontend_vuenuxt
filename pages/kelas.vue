<template>
   <section class="container">
  <div class="mt-5">
    <md-tabs  md-sync-route>
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
      </md-tab>
      <md-tab id="tab-posts" md-label="List Kelas">
        <form novalidate class="md-layout" >
          <md-table v-model="dataKelas" md-card>
            <md-table-toolbar>
              <h1 class="md-title">Kelas </h1>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Name">{{ item.nama_kelas }}</md-table-cell>
              <md-table-cell md-label="RFID">{{ item.jurusan }}</md-table-cell>
              <md-table-cell md-label="Jam Masuk">{{ item.jam_masuk }}</md-table-cell>
              <md-table-cell md-label="Jam Masuk">{{ item.jam_pulang }}</md-table-cell>
              <md-table-cell>
                <md-button v-on:click.prevent="simpansiswa(item.nama_lengkap)">Edit</md-button>
                <md-button v-on:click.prevent="DeleteSiswa(item.nama_lengkap)" class="md-accent">Delete</md-button>            
              </md-table-cell>
            </md-table-row>
          </md-table>
          </form>
        </md-tab>
        <md-tab md-label="List Test">
        <div class="md-layout md-gutter md-alignment-center">
          <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"></div>
          <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"></div>
          <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"></div>
          <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"></div>
          <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"></div>
          <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"></div>
        </div>
        </md-tab>
      </md-tabs>
    </div>
  </section>
</template>

<script>

import api from '../middleware/routes_api/routes'

export default {
  layout: 'default', // layouts used,
  data () {
    return {
      dataKelas: [],
      selectedKelas: [],
      idSekolah: 'hoho',
      dataArrayNamaKelas: [],
      // input field jurusan
      inputNamaKelas: null,
      inputJurusan: null,
      inputJamMasuk: null,
      inputJamPulang: null
    }
  },
  mounted () {
    this.tampilsemuakelas({'sekolah': this.idSekolah})
  },
  methods: {
    tampilsemuakelas: async function (param) {
      const response = await api.getKelas(param)
      this.dataKelas = response.data.data

      for (let i = 0; i < this.dataKelas.length; i++) {
        const element = this.dataKelas[i].nama_kelas
        this.dataArrayNamaKelas.push(element)
      }
      this.selectedKelas = response.data.data[0]
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
 