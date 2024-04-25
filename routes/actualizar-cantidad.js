//actualizar-cantidad.js
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para actualizar la cantidad de un producto en el carrito
router.post('/:id/:cantidad', async (req, res) => {
    const idProducto = req.params.id;
    const cantidad = parseInt(req.params.cantidad);

    try {
        let carrito = req.session.carrito || [];
        const item = carrito.find(item => item.id === idProducto);

        // Obtener el producto desde el controlador de productos
        const producto = await productosController.obtenerPorId(idProducto);

        if (item && producto) {
            const cantidadNueva = item.cantidad + cantidad;

            if (cantidadNueva > 0 && cantidadNueva <= producto.cantidad) {
                item.cantidad = cantidadNueva;
                producto.cantidad -= cantidad;

                if (item.cantidad === 0) {
                    carrito = carrito.filter(item => item.id !== idProducto);
                }
            }
        }

        req.session.carrito = carrito;
        res.redirect('/carrito');
    } catch (error) {
        console.error('Error al actualizar cantidad en el carrito:', error);
        res.status(500).send('Error al actualizar cantidad en el carrito');
    }
});

module.exports = router;