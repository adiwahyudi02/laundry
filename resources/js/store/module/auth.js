import axios from 'axios'
import auth from '../../Auth'

const config = {
    headers: {Authorization: "Bearer " + auth.getToken()}
} 

const getters = {
    getUser: () => {
        var auth = JSON.parse(localStorage.getItem('auth'));
        return auth;
    }
}

export default {
    namespaced: true,
    getters
}