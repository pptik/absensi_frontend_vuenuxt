<template>
  <section class="container">
    <div class="md-title">{{namaSekolahLocal}}</div>
    <br><br>
      <DashboardTable></DashboardTable>
      <div class="md-layout md-gutter">
    </div>
  </section>
</template>

<script>
import DashboardTable from '~/components/TableDashboard.vue' // Load Navigation Menu Components

export default {
  layout: 'default', // layouts used
  components: {
    DashboardTable
  },
  data () {
    return {
      namaSekolahLocal: null,
      usernameLocal: null,
      sekolah_id: null,
      showSnackbar: true,
      position: 'center',
      duration: 4000,
      isInfinity: false
    }
  },
  mounted () {
    this.setItemAuth()
  },
  methods: {
    setItemAuth: async function (param) {
      if (!this.$session.exists()) {
        this.$router.push('/')
      }
      var dataAuth = JSON.parse(localStorage.getItem('auth'))
      this.namaSekolahLocal = dataAuth.sekolah
      this.usernameLocal = dataAuth.username
      this.sekolah_id = dataAuth._id
    }
  }
}
</script>

<style scoped>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
  .md-snackbar {
    max-width: 800px;
  }
  .md-body-1 {
    padding-bottom: 20px;
  }
  .bar-chart {
    height: 10px;
    width: 480px;
  }
   .content_kelas{
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .judulGrafik{
    padding: 1em 1em 1em 1em
  }
  .grafik {
    padding-top: 3em;
  }
  .innerCard{
    padding: 15px;
  }
</style>
