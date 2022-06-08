import './ticket.css';

const Ticket = ({data}) => {
    let id = data._id.slice(-5, -1);
    let time = new Date(data.date);

    const status = {
        0: "Proceso",
        1: "Anulado",
        2: "Ganador",
        3: "Pagado"
    }
   
    return ( 
        <div className="ticket">
            <span>#{id}</span>
            <span>hora: {`${time.getHours()}:${time.getMinutes()}`}</span>
            <span>{status[data.status]}</span>
            <div>
                {data.numbers.map((d, index) => (
                    <div key={index}>Numero: {d} | name</div>
                ))}
            </div>
        </div>
    )
}
 
export default Ticket;