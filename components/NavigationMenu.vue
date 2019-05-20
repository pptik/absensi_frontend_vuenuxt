<template>
    <!-- Navigation Menu List -->
    <md-list>
        <!-- Index Menu -->
        <md-list-item to="dashboard">
            <md-icon>dashboard</md-icon>
            <span class="md-list-item-text">Dashboard</span>
        </md-list-item>

        <md-list-item to="monitoring">
            <md-icon>insert_chart_outlined</md-icon>
            <span class="md-list-item-text">Monitoring</span>
        </md-list-item>

        <md-list-item to="siswa">
            <md-icon>face</md-icon>
            <span class="md-list-item-text">Siswa</span>
        </md-list-item>

        <md-list-item to="kelas">
            <md-icon>meeting_room</md-icon>
            <span class="md-list-item-text">Kelas</span>
        </md-list-item>

        <md-list-item to="mesin">
            <md-icon>developer_board</md-icon>
            <span class="md-list-item-text">Mesin</span>
        </md-list-item>

        <md-list-item to="/">
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Logout</span>
        </md-list-item>
    </md-list>
</template>