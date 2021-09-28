import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:3002'
    // baseURL: 'http://cloudabsensi.pptik.id:3002'
  })
}
