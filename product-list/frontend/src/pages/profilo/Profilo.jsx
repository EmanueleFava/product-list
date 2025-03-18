import { useAuth } from '../../components/context/AuthContext';
import CardProfile from '../../components/cards/CardProfile';
import Headline from '../../components/headline/Headline';

function Profilo(){

    const { isLogged } = useAuth();
    const user = isLogged ? JSON.parse(localStorage.getItem('user')) : null;

    return (
        <>
            <CardProfile id={user.id} username={user.username} email={user.email} ruolo={user.ruolo} stato={user.stato}/>
        </>

    )



}

export default Profilo;