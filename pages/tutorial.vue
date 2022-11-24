<template>
  <div>
    <md-steppers md-alternative>
      <md-step id="first" md-label="Tahap Pertama (Tambah Mesin)">
        <img v-bind:src="'http://abstein.pptik.id/data/tutorial/tambah_mesin-min.gif'"/>
      </md-step>

      <md-step id="second" md-label="Tahap Dua (Tambah Bagian/Kelas)">
        <img v-bind:src="'http://abstein.pptik.id/data/tutorial/tambah_bagian-min.gif'"/>
      </md-step>

      <md-step id="third" md-label="Tahap Tiga (Tambah Personil/Siswa)">
        <img v-bind:src="'http://abstein.pptik.id/data/tutorial/tambah_personil-min.gif'"/>
      </md-step>
    </md-steppers>
  </div>
</template>

<script>
  export default {
    name: 'StepperAlternative',
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
    }
}
</script>