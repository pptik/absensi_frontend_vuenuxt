<template>
  <div>
    <md-button to="dashboard" class="md-raised md-primary">Kembali</md-button>  
    <div class="centered-container">
        <div class="md-layout-item md-size-60">
        <h2><span>Tap Terakhir: {{datamesin}}</span></h2>
        <md-table v-model="dataAbsen" md-card class="md-layout-item md-size-100 md-small-size-100" md-fixed-header>
          <md-table-toolbar>
            <h1 class="md-title">List RFID</h1>
          </md-table-toolbar>
          <md-table-row slot-scope="{ item }" slot="md-table-row" class="md-size-60">
              <md-table-cell md-label="mac">{{item.mac_address}}</md-table-cell>
              <md-table-cell md-label="rfid">{{item.rfid}}</md-table-cell>
              <md-table-cell md-label="date">{{item.created_at}}</md-table-cell>
              <md-table-cell md-label="date"></md-table-cell>
              <md-table-cell md-label="image">
              <img v-if="item.image" :src="item.image" alt="Image Description" class="table-image"  />
              <img v-else src="https://monitoring.pptik.id/data/RFIDCAM/no_image.jpg" alt="Placeholder Image" class="table-image" />
            </md-table-cell>
          </md-table-row>
            </md-table>
            </div>
      <div class="background" />
    </div>
  </div>
</template>

<script>
import mesin from '../middleware/rmq/mqtt'
import api from '../middleware/routes_api/routes'
import moment from 'moment'
import momentTZ from 'moment-timezone'
export default {
  data () {
    return {
      dataAbsen: [],
      datamesin: null
    }
  },
  layout: 'loginarea', // layouts used
  beforeCreate: function () {
    mesin.on('connect', function () {
      mesin.subscribe('absensi.listrfid', function (err) {
        if (!err) {
        } else if (err) {
        }
      })
    })
    mesin.on('connect', function () {
      mesin.subscribe('absensi.webservice', function (err) {
        if (!err) {
        } else if (err) {
        }
      })
    })
  },
  mounted () {
    this.getUserList()
    this.filldata()
  },
  methods: {
    filldata: async function () {
      moment.locale('id')
      let ini = this
      mesin.on('message', function (topic, message) {
        let mesinRFID = JSON.parse(message.toString())
        ini.dataAbsen.unshift({'mac_address': mesinRFID.mac, 'rfid': mesinRFID.rfid, 'created_at': momentTZ.tz(Date.now(), 'Asia/Jakarta').format('MMMM Do, h:mm z')})
      })
      var dataAuth = JSON.parse(localStorage.getItem('auth'))
      mesin.on('message', function (topic, message) {
        let mesinRFID = JSON.parse(message.toString())
        // console.log(mesinRFID)
        if (dataAuth.sekolah === mesinRFID.sekolah) {
          ini.datamesin = mesinRFID.nama_lengkap + ' ( Mesin ' + mesinRFID.mac + ' )' + '. ' + mesinRFID.jam
        }
      })
    },
    getUserList: async function () {
      let ini = this
      var paramsKosong = []
      const responses = await api.requestSekolah(paramsKosong, 'listrfid')
      // console.log('Response')
      // console.log(responses)
      // console.log('Image')
      // console.log(responses.data.data[0].image)
      for (let i = 0; i < responses.data.data.length; i++) {
        var responsesParser = {
          'mac_address': responses.data.data[i].mac_address,
          'rfid': responses.data.data[i].rfid,
          'image': responses.data.data[i].image,
          'created_at': momentTZ.tz(responses.data.data[i].created_at, 'Asia/Jakarta').format('MMMM Do, h:mm z')
        }
        // console.log(responsesParser)
        ini.dataAbsen.push(responsesParser)
        // console.log('INi DATA Absen')
        // console.log(ini.dataAbsen)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .background {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 40%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
 .table-image {
  max-width: 200px;
  height: auto;
  border-radius: 10%;    // Maintain the aspect ratio while resizing
}

}
</style>