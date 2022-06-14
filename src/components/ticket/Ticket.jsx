import './ticket.css';

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
            <span>Paga: {data.premio}</span>
            <div>
                {data.numbers.map((d, index) => (
                    <div key={index}>Numero: {d} | name</div>
                ))}
            </div>
        </div>
    )
}
 
export default Ticket;