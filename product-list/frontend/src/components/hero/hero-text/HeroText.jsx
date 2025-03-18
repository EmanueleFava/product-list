import Headline from "../../headline/Headline";
import "./HeroText.css"

function HeroText(){


    return (
        <>
            <Headline text={"Benvenuto nel nostro E-Commerce!"} color={"#2D3648"} fontWeight={700}/>
            <p>
                Scopri un'ampia selezione di prodotti di alta qualità, scelti per 
                offrirti la migliore esperienza di shopping online. Trova quello che fa per 
                te e acquistalo in pochi semplici click!
                <br/>
                
            </p>

            <h5>Per gli utenti:</h5> 
            <ul>
                <li>
                    Esplora il nostro catalogo prodotti.
                </li>

                <li>
                    Filtra e cerca i tuoi articoli preferiti.
                </li>
            </ul>

            <h5>Per gli amministratori:</h5>
            <ul>
                <li>Crea nuovi prodotti e aggiorna le informazioni esistenti.</li>
                <li>Modifica i dettagli dei prodotti in modo semplice e veloce.</li>
                <li>Elimina i prodotti non disponibili o obsoleti.</li>
                <li>Visualizza l'elenco completo per un controllo efficace dell'inventario.</li>
                <li>Gestisci gli utenti</li>
            </ul>

        </>

    )


}


export default HeroText;