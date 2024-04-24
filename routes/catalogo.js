//Codigo original
/*
// routes/usuariosRoutes.js

const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para el catálogo de productos
router.get('/', (req, res) => {
    const productos = productosController.getProductos();
    res.render('catalogo', { title: 'Catálogo de Productos', productos });
});

module.exports = router;
*/
//routes/catalogo.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productosController');

// Ruta para el catálogo de productos
router.get('/', async (req, res) => {
    const productos = await productoController.obtenerTodos();
    const user = req.user != null ? `Bienvenido ${req.user.nombre}` : ''; // Verificar si el usuario ha iniciado sesión
    res.render('catalogo', {title: 'Catalogo de productos', productos, user});
});

module.exports = router;