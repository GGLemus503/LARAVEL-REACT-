import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const URL = 'http://localhost:8000/api/producto';

const EditarProducto = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const [categorias, setCategorias] = useState([]);
    const [categoriaId, setCategoriaId] = useState('');

    useEffect(() => {
    axios.get('http://localhost:8000/api/categoria')
        .then((res) => setCategorias(res.data))
        .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        const getProductoId = async () => {
                const response = await axios.get(`${URL}/${id}`);
                setNombre(response.data.nombre ?? '');
                setPrecio(response.data.precio ?? '');
                setStock(response.data.stock ?? '');
                setCategoriaId(response.data.categoriaId ?? '');
        };
        getProductoId();
    }, [id]);

        const update = async (e) => {
            e.preventDefault();
            await axios.put(`${URL}/${id}`, {
                nombre,
                precio,
                stock,
                categoria_id: categoriaId || null,
            });
            navigate('/');
        };
    return (
        <div>
            <h2>Editar Producto</h2>
            <form onSubmit={update}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <select
                        className="form-select"
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(e.target.value)}
                    >
                        <option value="">Sin categoría</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Editar Producto
                </button>
            </form>
        </div>
    );
};

export default EditarProducto;