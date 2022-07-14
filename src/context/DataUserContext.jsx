import { createContext, useEffect, useState } from "react";
import useGetUser from '../hooks/useGetUser';
import { useNavigate } from "react-router-dom";

const UserContex = createContext();

const DataUserContext = props => {

    let navigate = useNavigate();
    const [ dataContext, setDataContext ] = useState({ 
                                                    user: { 
                                                        id: null,
                                                        level: 0, 
                                                        saldo: 0,
                                                        pay: 0
                                                    }});
      
    
    useEffect(() => {
        (async () => {
            if(!dataContext.user.id){
                let user = await useGetUser();  
                setDataContext({ user: { 
                    id: user.id, 
                    level: user.level, 
                    saldo: user.saldo,
                    pay: user.pay
                 }})
            }else{
                navigate('/');
            }
        })();
    }, []);

    
    return(
        <UserContex.Provider
            value={{
                dataContext,
                setDataContext
            }}
        >
            {props.children}
        </UserContex.Provider>
    )
}

export { UserContex, DataUserContext }