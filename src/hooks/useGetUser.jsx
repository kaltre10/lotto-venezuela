import api from '../services/api';

const useGetUser = async () => {

    let user = null
    let token = null
    if(localStorage.getItem('lotto')){
        token = localStorage.getItem('lotto').replaceAll('"', '');
    }
    const URL = import.meta.env.VITE_APP_URL;
    
    if(token){
        const response = await api(`${URL}/api/v1/auth/verify`, {token}, 'POST');
        user = await response.json();
        user = { id: user.data.id, level: user.data.level, saldo: user.data.saldo}
    }else{
        user = { id: null, level: 0, saldo: 0}
    }

    return user;
}

export default useGetUser;