import axios from 'axios'

export default () => {
  return axios.create({
    // baseURL: 'D:\\abstein\\mac_address\\'
    baseURL: 'http://abstein.pptik.id'
  })
}
