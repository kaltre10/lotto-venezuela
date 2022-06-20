import './ticket.css';
import dataAnimal from '../../helpers/dataAnimal';

const Ticket = ({data}) => {
    // let id = data._id.slice(-5, -1);
    let time = new Date(data.date);

    const status = {
        0: "Proceso",
        1: "Anulado",
        2: "Pagado",
        3: "Ganador"
    }
  
    return ( 
        <div className="ticket">
            <span>#{data.count}</span>
            <span>hora: {`${time.getHours()}:${time.getMinutes()}`}</span>
            <span>{status[data.status]}</span>
            <span>Premio: {data.premio}</span>
            <span>Precio: {data.precio}</span>
            <span>Aciertos: {data.aciertos}</span>
            <div>
                {data.numbers.map((d, index) => (
                    <div style={{display: 'flex', alignItems: 'flex-start'}} key={index}>Numero: {d} | {dataAnimal.filter(a=> a.number == d && a.name )[0].name}</div>
                ))}
            </div>
        </div>
    )
}
 
export default Ticket;