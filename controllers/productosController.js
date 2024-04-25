//Codigo original
/*
// controllers/productos.js
const productoModel = require('../models/productoModel');


function getProductos() {
  const productos = productoModel.obtenerTodos();
  return productos;
}

function getProductoPorId(id) {
  const producto = productoModel.obtenerPorId(id);
  return producto;
}

module.exports = {
  getProductos,
  getProductoPorId
};
*/
const productoDB = require('../db');
const productoModel = require('../models/productoModel');

async function obtenerTodos(){
  const productos = await productoModel.obtenerTodos();
  return productos;
}

async function obtenerPorId(id){
  const producto = await productoModel.obtenerPorId(id);
  return producto;
}

async function actualizarCantidad(id, nuevaCantidad) {
  try {
      await productoDB.actualizarCantidad(id, nuevaCantidad);
  } catch (error) {
      console.error('Error al actualizar la cantidad del producto en la base de datos:', error);
      throw error;
  }
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  actualizarCantidad
};