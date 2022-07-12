import {useState, useEffect} from 'react';
import './card.css';

const Card = ({data, handleChange, ticket}) => {

    const [selected, setSelected] = useState(false);
    
    const selectedDisable = {
        opacity: selected ? "0.5" : "1"
    }

    const handleClick = (number) => {
        if(ticket.length < 6){
            handleChange(number);
            setSelected(true);
        }
    }

    const checkSelected = () => {
        let cards = ticket.filter(t => t.number == data.number);
        if(cards.length != 1) setSelected(false);
    }

    useEffect(() => {
        checkSelected();
    }, [ticket])

    return ( 
        <div className="card" style={selectedDisable}>
            <span>{data.number}</span>
            <div className='input'>
                <button 
                    onClick={() => handleClick(data.number)}
                    disabled={selected ? true : false}    
                >+</button>
            </div>

        </div>
     );
}
 
export default Card;