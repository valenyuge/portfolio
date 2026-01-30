import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import GrillaProyectos from './pages/GrillaProyectos';
import DetalleProyecto from './pages/DetalleProyecto';
import { proyectos } from './data/proyectos';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<GrillaProyectos proyectos={proyectos} />} />
        <Route path="/proyecto/:id" element={<DetalleProyecto />} />
      </Routes>
    </Router>
  );
}

export default App;