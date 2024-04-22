const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para agregar un producto al carrito
router.post('/:id', async (req, res) => {
    const idProducto = req.params.id;
    try {
        const producto = await productosController.obtenerPorId(idProducto);

        if (producto && producto.cantidad > 0) {
            let carrito = req.session.carrito || [];
            let productoEnCarrito = carrito.find(item => item.id === idProducto);

            if (productoEnCarrito) {
                productoEnCarrito.cantidad++;
            } else {
                carrito.push({
                    id: idProducto,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: 1
                });
            }

            // Disminuir la cantidad disponible del producto
            producto.cantidad--;

            // Actualizar el carrito en la sesión
            req.session.carrito = carrito;

            // Redirigir de vuelta al catálogo
            res.redirect('/catalogo');
        } else {
            // Producto no encontrado o no disponible
            res.status(404).send('Producto no encontrado o no disponible');
        }
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).send('Error al agregar producto al carrito');
    }
});

module.exports = router;
