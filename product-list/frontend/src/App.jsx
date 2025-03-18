import './App.css'
import NavbarComponent from './components/navbar/NavbarComponent'
import Footer from './components/footer/Footer'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter.';
import { AuthProvider } from './components/context/AuthContext';

function App() {


  return (
    <>
		<AuthProvider>
			<Router>
				<NavbarComponent/>
				<main>
					<AppRouter/>
				</main>
				<Footer/>
			</Router>
		</AuthProvider>
    </>
  )
}

export default App
