import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://167.20 5.7.30:3002'
    // baseURL: 'http://localhost:3002'
  })
}
