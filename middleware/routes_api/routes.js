import Api from '../api_service'
import ApiJson from '../api_json_dev'

export default {
  requestKelas (params, type) {
    return Api().post('/user/' + type + 'Kelas', params)
  },
  requestSiswa (params, type) {
    return Api().post('/user/' + type + 'Siswa', params)
  },
  // BARU
  getKelas (params) {
    return Api().post('/user/pilihkelas', {params: params})
  },
  getKelasPersekolah (params) {
    return Api().post('/user/web/tampilsiswakelas', params)
  },
  simpanKelas (params) {
    return Api().post('/user/tambahKelas', {params: params})
  },
  deleteKelas (params) {
    return Api().post('/user/deleteKelas', {params: params})
  },
  getMacAddressAll (params) {
    return Api().post('/user/listMacAddress', params)
  },
  // GET SISWA
  getSemuasiswaSekolah (params) {
    return Api().post('/user/tampilSiswa', {params: params})
  },
  getJSONHttp (params) {
    return ApiJson().get('/data/kelas.json')
  },
  getJSONKelas (params) {
    return ApiJson().get('/data/' + params + '_kelas.json')
  },
  getJSONSiswa (params) {
    return ApiJson().get('/data/' + params + '_siswa.json')
  },
  getJSONMac (params) {
    return ApiJson().get('/data/' + params + '_mesin.json')
  },
  getJSONDashboard (params) {
    return ApiJson().get('/data/dashboard.json')
  },

  // REQUEST BARU MENGGUNAKAN JSON
  requestJsonMesin (params, type) {
    return Api().post('/mesin/' + type + 'MacAddress', params)
  },
  requestJsonPengguna (params, type) {
    return Api().post('/pengguna/' + type + 'Pengguna', params)
  },
  requestJsonSekolah (params, type) {
    return Api().post('/general/' + type + '_MacAddress', params)
  },
  requestLogin (params) {
    return Api().post('/pengguna/login', params)
  },
  // JSON MESIN
  requestJsonKelas (params, type) {
    return Api().post('/kelas/' + type + 'Kelas', params)
  },
  JSON_Sekolah (params) {
    return ApiJson().get('/data/' + params + '_sekolah.json')
  }
}
