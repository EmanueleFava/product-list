import { Link } from 'react-router-dom';
import Headline from '../headline/Headline';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../context/AuthContext';


function Banner() {

    const { isLogged } = useAuth(); 

    return (

        
        <div>

            {isLogged ? (
                <>
                    <Headline 
                    text={`Accedi subito al Catalogo`}
                    fontSize={"24px"}
                    fontWeight={600}
                    />
                    <Button as={Link} to="/prodotti" variant="primary" size="lg"> Catalogo Prodotti </Button>
                </>
            ) : (
                <>
                <Headline 
                text={`Accedi subito al portale`}
                fontSize={"24px"}
                fontWeight={600}
                />
                <Button as={Link} to="/login" variant="primary" size="lg"> Login </Button>
                </>
            )
        }
           
        </div>

    )



}


export default Banner;