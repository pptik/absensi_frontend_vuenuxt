<template>
  <div>
    <md-field style="width: 500px; margin-left: 40px;">
      <label>Pilih pertama</label>
      <md-select v-model="pilihanSatu" name="pilih_tahun" id="pilih_tahun" md-dense  @md-selected="selectPilihanKedua(pilihanSatu)">
        <md-option disabled>Select tahun ajaran</md-option>
        <md-option  v-for="hasil in selectOne" :value="hasil.Data" :key="hasil._id">{{ hasil.Data }}</md-option>
      </md-select>
    </md-field>
    <md-field style="width: 500px; margin-left: 40px;">
      <label>Pilih kedua</label>
      <md-select v-model="pilihanDua" name="pilih_tahun" id="pilih_tahun" md-dense >
        <md-option disabled>Select tahun ajaran</md-option>
        <md-option  v-for="hasil in selectTwo" :value="hasil.Data" :key="hasil._id">{{ hasil.Data }}</md-option>
      </md-select>
    </md-field>
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
        pilihanSatu: null,
        pilihanDua: null,
        selectOne: [{'_id': 1, 'Data': 'worst'}, {'_id': 2, 'Data': 'worstist'}],
        selectTwo: []
      }
    },
    mounted () {
    },
    methods: {
      selectPilihanKedua: async function (param) {
        console.log(param)
      }
    }
}
</script>