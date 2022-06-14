import './vender.css';
import {useState, useContext, useEffect } from 'react';
import { UserContex } from '../../context/DataUserContext';
import useGetUser from '../../hooks/useGetUser';
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import Card from '../card/Card';
import Menu from '../menu/Menu';

const Vender = () => {

    let navigate = useNavigate();
    const [ticket, setTicket] = useState([]);
    const [modal, setModal] = useState({message : '', status: false});
    const {dataContext, setDataContext} = useContext(UserContex);
    const URL = import.meta.env.VITE_APP_URL;

    useEffect(() => {
        (async () => {
            if(!dataContext.user.id){
                let user = await useGetUser();  
                if(!user.id){
                    navigate('/login');
                }
                setDataContext({ user: { id: user.id, level: user.level}});
                if(user.level == 1) {
                    console.log(user)
                    navigate('/ventas');
                }
            }
        })();
    }, []);

    const animal = [
        { number: 1, name: "name", url: "" },
        { number: 2, name: "name", url: ""  },
        { number: 3, name: "name", url: ""  },
        { number: 4, name: "name", url: ""  },
        { number: 5, name: "name", url: ""  },
        { number: 6, name: "name", url: ""  },
        { number: 7, name: "name", url: ""  },
        { number: 8, name: "name", url: ""  },
        { number: 9, name: "name", url: ""  },
        { number: 10, name: "name", url: ""  },
        { number: 11, name: "name", url: ""  },
        { number: 12, name: "name", url: ""  },
        { number: 13, name: "name", url: ""  },
        { number: 14, name: "name", url: ""  },
        { number: 15, name: "name", url: ""  },
        { number: 16, name: "name", url: ""  },
        { number: 17, name: "name", url: ""  },
        { number: 18, name: "name", url: ""  },
        { number: 19, name: "name", url: ""  },
        { number: 20, name: "name", url: ""  },
        { number: 21, name: "name", url: ""  },
        { number: 22, name: "name", url: ""  },
        { number: 23, name: "name", url: ""  },
        { number: 24, name: "name", url: ""  },
        { number: 25, name: "name", url: ""  },
        { number: 26, name: "name", url: ""  },
        { number: 27, name: "name", url: ""  },
        { number: 28, name: "name", url: ""  },
        { number: 29, name: "name", url: ""  },
        { number: 30, name: "name", url: ""  },
        { number: 31, name: "name", url: ""  },
        { number: 32, name: "name", url: ""  },
        { number: 33, name: "name", url: ""  }
    ]

    const handleChange = (data) => {
        let num = data - 1;
        if(ticket.length < 5) setTicket([ ...ticket, { 
                                    number: animal[num].number,
                                    name: animal[num].name
                                }]);
    }

    const handleDelete = (number) => {
        setTicket(ticket.filter(t => t.number != number))
    }

    const handleClick = async () => {

        const data = {
            token: localStorage.getItem('lotto').replaceAll('"', ''),
            numbers: ticket.map( t => t.number).flat()
        }
        const query = await api(`${URL}/api/v1/ventas`, {ticket:data}, 'POST')
        const response = await query.json();
        // console.log(response)
        if(query.status == 200){
            setTicket([])
            setModal({message:"Ticket Guardado", status: true})
        }else{
            setModal(response.message, true)
        }
    }

    return ( 
    <div className='vender'>
        {modal.status &&
        <div className='modal-error'>
            <div className='container'>
                <h3>{modal.message}</h3>
                <button className='btn' onClick={() => setModal({message: "", status: false})}>Continuar</button>
            </div>
        </div>}
        <Menu />
        <h2>Mega Lotto Venezuela</h2>
        <div className='container'>
            <div className="table-selection">
                {animal.map(animal => (
                    <Card 
                        key={animal.number} 
                        data={animal} 
                        handleChange={handleChange} 
                        ticket={ticket}
                    />
                ))}
            </div>
            <div className="form-selection">
                <h2>Ticket:</h2>
                <div className='table-selected'>
                    <ul>
                    {ticket.map(ticket => (
                        <li key={ticket.number}>
                            <span>Numero: </span>
                            <span>{ticket.number}</span>
                            <span className='delete' onClick={() => handleDelete(ticket.number)}>❌</span>
                        </li>
                    ))}
                    </ul>
                </div>
                <p className='precio'>Precio: 20 bs</p>
                <button 
                    className={ticket.length < 2 ? 'btn-disabled' : undefined}
                    disabled = {ticket.length < 2 ? true : false}
                    onClick={() => handleClick()}
                >Guardar</button>
            </div>
        </div>
    </div> );
}
 
export default Vender;