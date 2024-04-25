//routes/buscar-producto.js
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para buscar productos
router.get('/', async (req, res) => {
    const query = req.query.q.toLowerCase();
    const productos = await productosController.obtenerTodos();
    const user = req.user != null ? `Bienvenido ${req.user.nombre}` : ''; // Verificar si el usuario ha iniciado sesión
    const productosFiltrados = productos.filter(producto =>
        producto.id.toString() === query || // Buscar por ID
        producto.nombre.toLowerCase().includes(query) || producto.descripcion.toLowerCase().includes(query)
    );
    res.render('catalogo', { title: 'Resultados de la Búsqueda', productos: productosFiltrados, user });
});

module.exports = router;