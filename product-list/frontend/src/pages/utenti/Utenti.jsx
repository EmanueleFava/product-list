import Headline from "../../components/headline/Headline";
import ListaUtenti from "../../components/listaUtenti/ListaUtenti";
import Button from 'react-bootstrap/Button';

function Utenti() {



    return (        
        <div style={{marginTop:'100px', marginBottom: '300px'}}>
            <Headline text={"Gestisci Utenti"}/>
            <ListaUtenti/>
        </div>
    )



}


export default Utenti;