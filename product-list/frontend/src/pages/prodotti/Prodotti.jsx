import Headline from "../../components/headline/Headline";
import ListaProdotti from "../../components/listaProdotti/ListaProdotti";

function Prodotti(){


    return (

        <div style={{marginTop:'100px', marginBottom: '300px'}}>
        <Headline text={"Prodotti"}/>
        <ListaProdotti/>
        </div>

    )


}


export default Prodotti;