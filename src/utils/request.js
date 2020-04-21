import axios from 'axios'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
export default request
// const req1 = axios.create()
// req1.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
