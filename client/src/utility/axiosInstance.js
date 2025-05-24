import axios from 'axios'

let axiosInstance = axios.create({
  
    baseURL:"https://feedback.be.evangadisc.com/api"
    
})
export {axiosInstance}