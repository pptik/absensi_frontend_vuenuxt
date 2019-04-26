import Api from '../api_service'
import ApiJson from '../api_json_dev'

export default {
  requestKelas (params, type) {
    return Api().post('/user/' + type + 'Kelas', params)
  },
  requestSiswa (params, type) {
    return Api().post('/user/' + type + 'Siswa', params)
  },
  requestMacAddress (params, type) {
    return Api().post('/user/' + type + 'MacAddress', {data: params})
  },
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
    return ApiJson().get('/data/' + params.sekolah + '/kelas.json')
  },
  getJSONSiswa (params) {
    return ApiJson().get('/data/' + params.sekolah + '/siswa.json')
  },
  getJSONMac (params) {
    return ApiJson().get('/data/' + params.sekolah + '/mac_address.json')
  }
}
