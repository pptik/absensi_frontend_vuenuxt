<template>
  <section class="container">
    <md-tabs  md-active-tab>
      <md-tab id="tab-posts" md-label="List Mesin">
        <form novalidate class="md-layout">
          <md-table v-model="dataMesinJSON" md-card class="md-layout-item md-size-100 md-small-size-100">
            <md-table-toolbar>
              <h1 class="md-title">Mesin</h1>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Address">{{ item.address }}</md-table-cell>
              <md-table-cell md-label="Deskripsi">{{ item.deskripsi }}</md-table-cell>
              <md-table-cell>
                <md-button v-on:click.prevent="deleteMacAddress(item.address)" class="md-accent">Delete</md-button> 
                <!-- <md-button v-on:click.prevent="editMacAddress(item.address)" class="md-accent">Edit</md-button>  -->
                <md-button class="md-primary md-raised" @click="active = true, AddressEditMesin = item.address">Edit</md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
          <md-dialog-prompt
                :md-active.sync="active"
                v-model="editDesktipsi"
                md-title="Edit Deskripsi Mesin"
                md-input-maxlength="30"
                md-input-placeholder="Deskripsi"
                md-confirm-text="Agree"
                md-cancel-text="Disagree"
                @md-cancel="onCancel"
                @md-confirm="onConfirm" />
        </form>
      </md-tab>
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
                  <md-button type="submit" class="md-primary" v-on:click.prevent="simpanMacAddress()" >Tambah Mesin</md-button>
                </md-card-actions>
              </div>
             </md-card>
            </form>
            </div>       
            </md-tab>
          </md-tabs>
          <template>
            <div>
            <template>
            </template>
            </div>            
          </template>
        </section>
      </template>

<script>
import api from '../middleware/routes_api/routes'
import apiGetData from '../middleware/routes_api/routes_get_data'
// import connectionRMQ from '../middleware/RMQ/setup_rmq'
export default {
  layout: 'default', // layouts used
  data () {
    return {
      dataMesin: [],
      inputAddressMesin: null,
      inputNamaMesin: null,
      inputLokasi: null,
      inputDeskripsi: null,
      dataMesinJSON: [],
      // DATA LOCAL
      namaSekolahLocal: null,
      usernameLocal: null,
      sekolah_id: null,
      active: false,
      editDesktipsi: null,
      AddressEditMesin: null
    }
  },
  mounted () {
    this.setItemAuth()
    this.listMacAddressJSON()
  },
  methods: {
    async onConfirm () {
      var dataEditDeskripsi = {
        sekolah: this.namaSekolahLocal,
        mesin: this.AddressEditMesin,
        deskripsi: this.editDesktipsi
      }
      let update = await api.requestJsonMesin(dataEditDeskripsi, 'update')
      if (update.data.success === true) {
        this.$swal({
          title: 'Berhasil!',
          text: 'Berhasil Update Mesin!',
          type: 'success',
          confirmButtonText: 'Yes',
          showLoaderOnConfirm: true
        }).then((result) => {
          window.location.reload()
        })
      } else {
        this.$swal('Gagal!', {
          title: 'Gagal',
          text: 'Gagal Update Mesin!',
          type: 'error',
          confirmButtonText: 'Yes',
          showLoaderOnConfirm: true
        }).then((result) => {
          window.location.reload()
        })
      }
    },
    onCancel () {
    },
    setItemAuth: async function () {
      if (!this.$session.exists()) {
        this.$router.push('/')
      }
      var dataAuth = JSON.parse(localStorage.getItem('auth'))
      this.namaSekolahLocal = dataAuth.sekolah
      this.usernameLocal = dataAuth.username
      this.sekolah_id = dataAuth._id
    },
    simpanMacAddress: async function (param) {
      var dataInputMesin = {
        mesin: this.inputAddressMesin,
        nama_sekolah: this.namaSekolahLocal,
        deskripsi: this.inputDeskripsi
      }
      await api.requestJsonSekolah(dataInputMesin, 'create').then(response => {
        if (response.data.success === true) {
          this.$swal({
            title: 'Berhasil!',
            text: 'Berhasil Mendaftarkan Mesin baru!',
            type: 'success',
            confirmButtonText: 'Yes',
            showLoaderOnConfirm: true
          }).then((result) => {
            window.location.reload()
          })
        } else {
          this.$swal('Gagal!', {
            title: 'Gagal',
            text: 'Gagal Mendaftarkan baru!',
            type: 'error',
            confirmButtonText: 'Yes',
            showLoaderOnConfirm: true
          }).then((result) => {
            window.location.reload()
          })
        }
      })
    },
    deleteMacAddress: async function (param) {
      var dataDeleteMesin = {
        nama_sekolah: this.$session.get('auth').sekolah,
        mesin: param
      }
      this.$swal({
        title: 'Yakin Hapus?',
        text: 'Data mesin akan dihapus secara permanen!',
        type: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            api.requestJsonSekolah(dataDeleteMesin, 'delete')
            this.$swal('berhasil di hapus!', {
              type: 'success'
            }).then((result) => {
              window.location.reload()
            })
          } else {
            this.$swal('Penghapusan dibatalkan!', {
              type: 'warning'
            }).then((result) => {
              window.location.reload()
            })
          }
        })
    },
    listMacAddressJSON: async function (param) {
      var dataPost = {
        'sekolah': this.namaSekolahLocal
      }
      const response = await apiGetData.requestListMesin(dataPost)
      this.dataMesinJSON = response.data.data.Mesin
      // PAKAI JSON
      // const response = await api.JSON_Sekolah(this.namaSekolahLocal)
      // this.dataMesinJSON = response.data[0].Mesin
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