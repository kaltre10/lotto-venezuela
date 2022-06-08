import { useContext, createContext, useEffect, useState } from "react";

export const UserContex = createContext();

export const DataUserContext = props => {

    const [ dataContext, setDataContext ] = useState({
        user: {id: "", level: 0}
    })    
    
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

export default { UserContex, DataUserContext }