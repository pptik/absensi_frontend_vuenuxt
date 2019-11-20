<template>
  <div>
    <md-card style="width: 500px;">
      <md-card-header>
          <div class="md-title"><b>Pengaturan Akun</b></div>
        </md-card-header>
        <md-card-content>
          <md-field>
            <label>Nama Sekolah</label>
            <md-input v-model="initialSekolahPengguna" readonly></md-input>
          </md-field>
          <md-field>
            <label>Nama Pengguna</label>
            <md-input v-model="initialNamaPengguna"></md-input>
          </md-field>
          <md-field>
            <label>Password</label>
            <md-input v-model="password" type="password"></md-input>
          </md-field>
          <md-field>
            <label>Konfirmasi Password</label>
            <md-input v-model="passwordConfirm" type="password"></md-input>
          </md-field>
           <h5>Upload Foto Profile</h5>
          <md-field>
            <input type="file" id="image" ref="image" accept="image/*" v-on:change="onChangeImageUpload()"/>
          </md-field>
          <md-card-actions>
            <md-button type="submit" class="md-primary" v-on:click.prevent="simpanUpdate()" >Simpan</md-button>
          </md-card-actions>
        </md-card-content>
    </md-card>
  </div>
</template>

<script>
import api from '../middleware/routes_api/routes'
// import connectionRMQ from '../middleware/RMQ/setup_rmq'
export default {
  layout: 'default', // layouts used
  data () {
    return {
      dataMesin: [],
      namaSekolahLocal: null,
      usernameLocal: null,
      sekolah_id: null,
      inputName: null,
      form: {
        idPengguna: null,
        newusername: null
      },
      initialNamaPengguna: null,
      image: null,
      initialEmailPengguna: 'magang@vidyanusa.id',
      initialSekolahPengguna: null,
      password: null,
      passwordConfirm: null
    }
  },
  mounted () {
    this.setItemAuth()
  },
  methods: {
    setItemAuth: async function () {
      if (!this.$session.exists()) {
        this.$router.push('/')
      }
      var dataAuth = JSON.parse(localStorage.getItem('auth'))
      this.namaSekolahLocal = dataAuth.sekolah
      this.usernameLocal = dataAuth.username
      this.sekolah_id = dataAuth._id
      this.initialSekolahPengguna = dataAuth.sekolah
      this.initialNamaPengguna = dataAuth.username
    },
    simpanUpdate: async function () {
      if (this.password && this.passwordConfirm !== null) {
        this.$swal({
          title: 'Apa Anda Yakin Update Profil?',
          text: 'Update Profil Akan Merubah Data Anda',
          type: 'warning',
          buttons: true,
          dangerMode: true
        })
          .then((willDelete) => {
            if (willDelete) {
              let formData = new FormData()
              formData.append('idPengguna', this.sekolah_id)
              formData.append('file', this.image)
              formData.append('newusername', this.initialNamaPengguna)
              formData.append('newsandi', this.passwordConfirm) // d59029a3752db08f206781e4275741cf

              api.requestUpdateProfilPengguna(formData).then(response => {
                this.$swal({
                  title: 'Berhasil Di Update!',
                  text: 'Update Profil Akan Terlihat Ketika Anda Logout',
                  type: 'success',
                  buttons: true
                })
              })
            } else {
              this.$swal('Batal Update')
            }
          })
      } else {
        this.$swal('Gagal', 'Password Tidak Sama Atau Kosong!', 'warning')
      }
    },
    onChangeImageUpload () {
      this.image = this.$refs.image.files[0]
    }
  }
}
</script>