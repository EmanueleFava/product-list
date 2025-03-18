import { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(!!localStorage.getItem('user'));
    const [isAdmin, setIsAdmin] = useState(false);
    const [logoutTimer, setLogoutTimer] = useState(null); // Timer per il logout automatico

    // UseEffect per inizializzare isAdmin e isLogged
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const userRuolo = user.ruolo;
            setIsAdmin(userRuolo === "amministratore");
            // Avvia il timer per il logout automatico se l'utente è già loggato
            startLogoutTimer();
        }
    }, []); // L'array vuoto significa che questo effetto viene eseguito solo al primo rendering

    // Funzione per avviare il timer di logout
    const startLogoutTimer = () => {
        // Imposta il timer per 1 ora (3600000 millisecondi)
        const timer = setTimeout(() => {
            logout();
        }, 3600000); // 1 ora

        // Salva il timer nello stato
        setLogoutTimer(timer);
    };

    // Funzione per resettare il timer di logout
    const resetLogoutTimer = () => {
        if (logoutTimer) {
            clearTimeout(logoutTimer); // Cancella il timer precedente
        }
        startLogoutTimer(); // Riavvia il timer
    };

    const login = (userData, userToken) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', JSON.stringify(userToken));
        const userRuolo = userData.ruolo;
        setIsAdmin(userRuolo === "amministratore");
        setIsLogged(true);

        // Avvia il timer per il logout automatico dopo il login
        startLogoutTimer();
    };

    const logout = async () => {
        const token = JSON.parse(localStorage.getItem('token'));

        if (token) {
            try {
                // Chiamata API per blacklistare il token
                await axios.post('http://localhost:3000/api/auth/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.error("Errore durante il logout:", error);
            }
        }

        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setIsLogged(false);
        setIsAdmin(false); // Resetta anche isAdmin quando esegui il logout

        // Cancella il timer di logout
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    };

    return (
        <AuthContext.Provider value={{ isLogged, isAdmin, login, logout, resetLogoutTimer }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);