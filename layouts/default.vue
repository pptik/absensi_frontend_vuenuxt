<template>
  <div>
      <!-- Right Menu  Navigation Section -->
      <md-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">A B S T E I N</span>
      </md-toolbar>
    <md-app md-waterfall md-mode="fixed">
      <!-- Toogle Menu Visible -->
      <!-- Content Section -->
      <md-app-drawer md-persistent="full" :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>{{usernameLocal}}</span>
        </md-toolbar>
        <!-- Call Navigation Menu Components Here -->
        <NavigationMenu></NavigationMenu>
      </md-app-drawer>
      <md-app-content>
        <!-- Nuxt Instance --> 
      <nuxt />
      <footer class="footer">
      <div class="footer-notes">
        <div class="col">
          <div>© 2019 PPTIK, Gunakan Browser Microsoft Edge Untuk Performa Terbaik</div>
        </div>
      </div>
    </footer>  
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
  .md-app {
    height: 100vh;
    border: 1px solid rgba(#000, .12);
    .md-app-toolbar {
      background-color: #00796B 
    }
  }
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>

<script>
import NavigationMenu from '~/components/NavigationMenu.vue' // Load Navigation Menu Components

/**
  * NuxtJS Vue Instance
  */
export default {
  name: 'default',
  components: {
    NavigationMenu // Attach Navigation Menu Components
  },
  mounted () {
    this.setItemAuth()
  },
  methods: {
    setItemAuth: async function (param) {
      var dataAuth = JSON.parse(localStorage.getItem('auth'))
      this.namaSekolahLocal = dataAuth.sekolah
      this.usernameLocal = dataAuth.username
      this.sekolah_id = dataAuth._id
    }
  },
  data: () => ({
    menuVisible: true,
    namaPengguna: 'ADMIN',
    namaSekolahLocal: null,
    usernameLocal: null,
    sekolah_id: null
  })
}
</script>

<style>
.toolbarColor {
  background-color: rgb(101, 160, 105);
}
.footer {
  background-color: #333;
  color: #fff;
  font-size: 14px;
  width: 100%;
}
.footer-notes {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: rgb(13, 175, 86);
   color: white;
   text-align: center;
}
</style>