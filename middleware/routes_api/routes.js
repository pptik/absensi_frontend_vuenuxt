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
    return ApiJson().get('/data/SMP Assalam_kelas.json')
  },
  getJSONSiswa (params) {
    return ApiJson().get('/data/SMP Assalam_siswa.json')
  },
  getJSONMac (params) {
    return ApiJson().get('/data/SMP Assalam_mesin.json')
  },
  getJSONDashboard (params) {
    return ApiJson().get('/data/dashboard.json')
  },
  // REQUEST BARU MENGGUNAKAN JSON
  requestJsonMesin (params, type) {
    return Api().post('/mesin/' + type + 'MacAddress', params)
  },
  requestJsonPengguna (params, type) {
    return Api().post('/siswa/' + type + 'Pengguna', params)
  }

}
