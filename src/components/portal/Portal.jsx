import ReactDOM from "react-dom";
import './portal.css';

function Portal({children}){
    return ReactDOM.createPortal(
        <div className="portal">{children}</div>,
        document.getElementById('portal')
    )
}

export default Portal;