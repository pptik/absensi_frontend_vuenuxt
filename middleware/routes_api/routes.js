import Api from '../api_service'

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
    return Api().post('/user/tambahkelas', {params: params})
  },
  deleteKelas (params) {
    return Api().post('/user/deleteKelas', {params: params})
  },
  getMacAddressAll (params) {
    return Api().post('/user/listMacAddress', {params: params})
  },
  // GET SISWA
  getSemuasiswaSekolah (params) {
    return Api().post('/user/tampilSiswa', {params: params})
  }
}
