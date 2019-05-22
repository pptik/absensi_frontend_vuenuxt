<template>
  <section class="container">
    <md-tabs  md-active-tab>
      <md-tab id="tab-pages" md-label="Tambah Mesin">
      <div>
        <form novalidate class="md-layout" >
          <md-card class="md-layout-item md-size-50 md-small-size-50">
            <md-card-header>
              <div class="md-title">Tambah Mesin</div>
                </md-card-header>
                <div style="padding:25px;">
                <md-field>
                  <label>Address Mesin</label>
                  <md-input v-model="inputAddressMesin"></md-input>
                </md-field>
                <md-field>
                  <label>Nama Mesin</label>
                  <md-input v-model="inputNamaMesin"></md-input>
                </md-field>
                <md-field>
                  <label>Deskripsi</label>
                  <md-input v-model="inputDeskripsi"></md-input>
                </md-field>
                <md-card-actions>
                  <md-button type="submit" class="md-primary" v-on:click.prevent="simpanMacAddress()" >Tambah Kelas</md-button>
                </md-card-actions>
              </div>
             </md-card>
            </form>
            </div>       
            </md-tab>
            <md-tab id="tab-posts" md-label="List Mesin">
              <form novalidate class="md-layout" >
                <md-table v-model="dataMesinJSON" md-card>
                  <md-table-toolbar>
                    <h1 class="md-title">Mesin</h1>
                  </md-table-toolbar>
                  <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Nama Sekolah">{{ item.address }}</md-table-cell>
                    <md-table-cell md-label="Address">{{ item.deskripsi }}</md-table-cell>
                    <md-table-cell>
                      <md-button v-on:click.prevent="editMacAddress(item.address)">Edit</md-button>
                      <md-button v-on:click.prevent="deleteMacAddress(item.address)" class="md-accent">Delete</md-button>            
                    </md-table-cell>
                  </md-table-row>
                </md-table>
                </form>
              </md-tab>
            </md-tabs>
        </section>
      </template>

<script>
import api from '../middleware/routes_api/routes'
// import connectionRMQ from '../middleware/RMQ/setup_rmq'
export default {
  layout: 'default', // layouts used
  data () {
    return {
      dataMesin: [],
      idsekolah: 'SMP Assalam',
      inputAddressMesin: null,
      inputNamaMesin: null,
      inputLokasi: null,
      inputDeskripsi: null,
      dataMesinJSON: [],
      // DATA LOCAL
      namaSekolahLocal: null,
      usernameLocal: null,
      sekolah_id: null
    }
  },
  mounted () {
    this.setItemAuth()
    this.listMacAddressJSON()
  },
  methods: {
    setItemAuth: async function () {
      var dataAuth = JSON.parse(localStorage.getItem('auth'))
      this.namaSekolahLocal = dataAuth.sekolah
      this.usernameLocal = dataAuth.username
      this.sekolah_id = dataAuth._id
    },
    simpanMacAddress: async function (param) {
      var dataInputMesin = {
        mesin: this.inputNamaMesin,
        nama_sekolah: this.namaSekolahLocal,
        deskripsi: this.inputDeskripsi
      }
      await api.requestJsonSekolah(dataInputMesin, 'create')
      console.log(dataInputMesin)
    },
    deleteMacAddress: async function (param) {
      var dataDeleteMesin = {
        nama_sekolah: this.idsekolah,
        mesin: this.address
      }
      api.requestJsonSekolah(dataDeleteMesin, 'delete')
      console.log(dataDeleteMesin)
    },
    listMacAddressJSON: async function (param) {
      const response = await api.JSON_Sekolah(this.namaSekolahLocal)
      this.dataMesinJSON = response.data[0].Mesin
      // var totalMesin = []
      // var mesin = response.data[0].mac_address_absensi
      // for (let i = 0; i < mesin.length; i++) {
      //   const elementMesin = mesin[i]
      //   var dataMesinObj = {
      //     nama_sekolah: response.data[0].nama_sekolah,
      //     mac_address_absensi: elementMesin
      //   }
      //   totalMesin.push(dataMesinObj)
      // }
      // this.dataMesinJSON = totalMesin
    }
  }
}
</script>