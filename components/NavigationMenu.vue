<template>
    <!-- Navigation Menu List -->
    <md-list>
        <!-- Index Menu -->
        <md-list-item>
            <md-icon>dashboard</md-icon>
            <nuxt-link class="md-list-item-text" to="/Dashboard"  style="color:black;">Dashboard</nuxt-link>
        </md-list-item>

        <md-list-item>
            <md-icon>insert_chart_outlined</md-icon>
            <nuxt-link class="md-list-item-text" to="/Monitoring"  style="color:black;">Monitoring</nuxt-link>
            
        </md-list-item>
        <md-list-item>
            <md-icon>horizontal_split</md-icon>
            <nuxt-link class="md-list-item-text" to="/listrfid"  style="color:black;">Monitor RFID</nuxt-link>
        </md-list-item>

        <md-list-item>
            <md-icon>face</md-icon>
            <nuxt-link class="md-list-item-text" to="/Siswa"  style="color:black;">Personil</nuxt-link>
        </md-list-item>

        <md-list-item>
            <md-icon>meeting_room</md-icon>
            <nuxt-link class="md-list-item-text" to="/Kelas"  style="color:black;">Bagian</nuxt-link>
        </md-list-item>

        <md-list-item>
            <md-icon>developer_board</md-icon>
            <nuxt-link class="md-list-item-text" to="/Mesin"  style="color:black;">Mesin</nuxt-link>
        </md-list-item>
        <md-list-item>
            <md-icon>send</md-icon>
            <nuxt-link class="md-list-item-text" @click.native="logout()" to="" style="color:black;">Logout</nuxt-link>
        </md-list-item>
    </md-list>
</template>
<script>
export default {
  methods: {
    logout: function () {
      console.log('data')
      this.$session.destroy()
      this.$router.push('/')
    }
  }
}
</script>
