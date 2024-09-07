import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {
  const location = useLocation();
  const isLoginOrSignup = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div>
      {!isLoginOrSignup && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
