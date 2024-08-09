import axios from "axios";

const request = axios.create({
    baseURL: 'https://rn-expense-79561-default-rtdb.firebaseio.com'
})

export default request