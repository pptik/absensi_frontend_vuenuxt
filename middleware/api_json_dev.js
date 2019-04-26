import axios from 'axios'

export default () => {
  return axios.create({
    // baseURL: 'http://167.205.7.30:3002'
    baseURL: 'http://abstein.pptik.id'
  })
}
