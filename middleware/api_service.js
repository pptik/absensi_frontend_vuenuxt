import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://cloudabsensi.pptik.id:3002'
  })
}
