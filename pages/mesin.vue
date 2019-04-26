<template>
  <section class="container">
    <md-tabs  md-sync-route>
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
                <label>Lokasi</label>
                  <md-input v-model="inputLokasi"></md-input>
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
                    <md-table-cell md-label="Address">{{ item.address }}</md-table-cell>
                    <md-table-cell md-label="Nama Mesin">{{ item.nama }}</md-table-cell>
                    <md-table-cell md-label="Lokasi">{{ item.lokasi }}</md-table-cell>
                    <md-table-cell md-label="Deskripsi">{{ item.deskripsi }}</md-table-cell>
                    <md-table-cell>
                      <md-button v-on:click.prevent="editMacAddress(item.nama_lengkap)">Edit</md-button>
                      <md-button v-on:click.prevent="deleteMacAddress(item.nama_lengkap)" class="md-accent">Delete</md-button>            
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
      dataMesinJSON: []
    }
  },
  mounted () {
    // this.listMacAddress({'sekolah': this.idsekolah})
    this.listMacAddressJSON({'sekolah': 'hahaw'})
  },
  methods: {
    simpanMacAddress: async function (param) {
    },
    deleteMacAddress: async function (param) {
    },
    listMacAddress: async function (param) {
      const response = await api.getMacAddressAll(param)
      this.dataMesin = response.data.data
      console.log(this.dataMesin)
    },
    listMacAddressJSON: async function (param) {
      // console.log('wekaokaewok')
      const response = await api.getJSONMac(param)
      this.dataMesinJSON = response.data
      console.log(response.data + 'awoekoawe')
    }
    // kirimKeRMQ: async function (param) {
    //   let connect = connectionRMQ.connectToRmq()
    //   require('../middleware/RMQ/controller/sendDataRmq').publish(connect)
    // }
  }
}
</script>