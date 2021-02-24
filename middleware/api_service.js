import axios from 'axios'

export default () => {
  return axios.create({
    // baseURL: 'http://abstein-api.pptik.id:3002'
    baseURL: 'http://cloudabsensi.pptik.id:3002'
  })
}
