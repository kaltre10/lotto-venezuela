import './print.css';

const Print = ({data, animal}) => {
    let lastTicket = data;
    // console.log(lastTicket.numbers)
    return ( 
        <div className='print'>
            <div className='modal_print'>
            <div>
                <div>
                    <p>Polla Millonaria</p>
                    <span className="separador">
                    <span># {lastTicket.count} </span><span className="left"> | Hora: {lastTicket.hora}</span><br />
                    <span># Fecha: {lastTicket.date} </span><br />                  
                    </span>
                    -------------------------------------<br />
                    BOLETA DE VENTA ELECTRÓNICA<br />
                    -------------------------------------<br />
                    <span>Números: </span><br />
                </div>
                <div className="left">
                    {lastTicket.numbers.length > 0 && (
                        lastTicket.numbers.map( t => (<>
                            {/* {console.log(t.number)} */}
                            <span key={t.number}># {t.number} | {animal.filter( a => a.number == t.number)[0].name}</span><br />
                            </>))
                    )}
                </div>
                -------------------------------------<br />
                !Gracias por su preferencia!
                </div> 
            </div>
        </div>
     );
}
 
export default Print;