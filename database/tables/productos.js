// database/tables/productos.js

//Funcion para obtener todos los productos de la base de datos
async function obtenerTodos(){
    const db = conexion.crearConexion();
    return new Promise ((resolve, reject) => {
        db.query(
            'SELECT * FROM productos',
            (err, results) => {
                if(err){
                    console.error('Error al obtener los productos: ');
                    reject(err);
                } else{
                    resolve(results);
                }
            });
        db.end();
    });
}

//Funcion para obtener un producto por su ID
async function obtenerPorId(id){
    const db = conexion.crearConexion();
    return new Promise ((resolve, reject) => {
        db.query(
            'SELECT * FROM productos WHERE id = ?',
            [id],
            (err, results) => {
                if(err){
                    console.error('Error al obtener el producto por su ID: ');
                    reject(err);
                } else{
                    if(results.length > 0){
                        resolve(results[0]);
                    }
                    resolve(null);
                }
            });
        db.end();
    });
}