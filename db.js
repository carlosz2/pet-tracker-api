const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: '127.0.0.1', // Cambia si es necesario
    user: 'root',      // Tu usuario
    password: 'root', // Tu contraseña
    database: 'vet',   // Tu base de datos
    connectionLimit: 15, // Aumenta el límite de conexiones
    acquireTimeout: 30000 // Aumenta el tiempo de espera a 30 segundos
});

module.exports = pool;

