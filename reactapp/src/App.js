import './App.css';
import ShowProducto from './components/ShowProducto';
import CreateProducto from './components/CreateProducto';
import EditProducto from './components/EditProducto';
import { BrowserRouter , Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowProducto />} />
          <Route path="/create" element={<CreateProducto />} />
          <Route path="/edit/:id" element={<EditProducto />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
