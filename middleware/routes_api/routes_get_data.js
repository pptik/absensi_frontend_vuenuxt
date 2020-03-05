import Api from '../api_service'

export default {
  // MESIN
  requestListMesin (params) {
    return Api().post('/mesin/getDaftarMesin', params)
  },
  // Kelas
  requestListKelas (param) {
    return Api().post('/kelas/getDaftarKelas', param)
  },
  // Pengguna
  requestListPengguna (param) {
    return Api().post('/pengguna/getDaftarPengguna', param)
  },
  requestListPenggunaHarian (param) {
    return Api().post('/pengguna/dataharianPenggunaV2', param)
  }
}
