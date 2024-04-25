//models/productoModel.js
const productoDB = require('../db');

class Producto{
  constructor(id, nombre, descripcion, cantidad, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.precio = precio;
    this.imagen = imagen;
  }
}

async function obtenerTodos(){
  try{
    const productos = await productoDB.obtenerTodos();
    return productos.map(producto => new Producto(producto.id, producto.nombre, producto.descripcion, 
      producto.cantidad, producto.precio, producto.imagen))
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
}

async function obtenerPorId(id){
  try {
    const producto = await productoDB.obtenerPorId(id);
    if (producto) {
      return new Producto(producto.id, producto.nombre, producto.descripcion, 
        producto.cantidad, producto.precio, producto.imagen)
    }
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    throw error;
  }
}

module.exports = {
  obtenerTodos,
  obtenerPorId
};