import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Las páginas (Views)
import GrillaProyectos from './pages/GrillaProyectos';
import DetalleProyecto from './pages/DetalleProyecto';

// Importamos solo los datos para la Grilla (la Home necesita la lista para filtrar)
import { proyectos } from './data/proyectos';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<GrillaProyectos proyectos={proyectos} />} />
        {/* El detalle busca su propio proyecto por ID internamente */}
        <Route path="/proyecto/:id" element={<DetalleProyecto />} />
      </Routes>
    </Router>
  );
}

export default App;