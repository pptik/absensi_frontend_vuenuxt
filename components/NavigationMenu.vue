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
            <md-icon>face</md-icon>
            <nuxt-link class="md-list-item-text" to="/Siswa"  style="color:black;">Siswa</nuxt-link>
        </md-list-item>

        <md-list-item>
            <md-icon>meeting_room</md-icon>
            <nuxt-link class="md-list-item-text" to="/Kelas"  style="color:black;">Kelas</nuxt-link>
        </md-list-item>

        <md-list-item>
            <md-icon>developer_board</md-icon>
            <nuxt-link class="md-list-item-text" to="/Mesin"  style="color:black;">Mesin</nuxt-link>
        </md-list-item>

        <md-list-item>
            <md-icon>send</md-icon>
            <nuxt-link class="md-list-item-text" to="/" style="color:black;">Logout</nuxt-link>
        </md-list-item>
    </md-list>
</template>