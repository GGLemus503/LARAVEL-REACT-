import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:8000/api';

const ShowProducto = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getAllProductos();
    }, []);

    const getAllProductos = async () => {
        try {
            const response = await axios.get(`${API_URL}/productos`);
            setProductos(response.data);
            setError('');
        } catch (err) {
            console.error(err);
            setError('No se pudieron cargar los productos.');
        }
    };

    const deleteProducto = async (id) => {
        try {
            await axios.delete(`${API_URL}/producto/${id}`);
            getAllProductos();
        } catch (err) {
            console.error(err);
            setError('No se pudo eliminar el producto.');
        }
    };

    return (
        <div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to="/create" className="btn btn-primary">Crear Producto</Link>
            </div>
            <table className="table table-striped">
                <thead className="bg-primary text-white">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Categoria</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.stock}</td>
                            <td>{producto.categoria?.nombre ?? 'Sin categoría'}</td>
                            <td>
                                <Link to={`/edit/${producto.id}`} className="btn btn-warning me-2">Editar</Link>
                                <button onClick={() => deleteProducto(producto.id)} className="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowProducto;
