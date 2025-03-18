import { useLocation } from "react-router-dom";
import HeadLine from '../../components/headline/Headline'
import "./DettaglioProdotto.css"

function DettaglioProdotto() {
    const location = useLocation();
    const product = location.state?.product; // Recupera i dati del film

    if (!product) {
        return <h2>Nessun prodotto trovato</h2>;
    }

    return (
        <div className="product-container">
            <div style={{paddingRight: '100px'}}>
                <HeadLine text={product.nome} fontWeight={800} fontSize={"3em"} color={"#2D3648"}/>
                <h4 style={{color: '#EA4D81'}}><strong>Prezzo: </strong>{product.prezzo}</h4>
                <p> <strong>Stato: </strong> {product.stato === 0 ? "Non disponibile" : "Disponibile"}</p>
                <p> {product.descrizione} </p>
            </div>
        <div>
            <img src={product.immagine} className="product-img" alt={product.nome} />
        </div>
        </div>
    );
}

export default DettaglioProdotto;