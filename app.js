const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1019982847',
    database: 'proyecto'
});

connection.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

// Middleware para parsear JSON
app.use(bodyParser.json());

// Ruta para buscar empleos
app.post('/buscar', (req, res) => {
    const { categoria, area, ubicacion, salario } = req.body;

    // Consulta SQL para buscar empleos en la base de datos
    let query = `SELECT * FROM empleos WHERE 1=1`;
    if (categoria) query += ` AND categoria = '${categoria}'`;
    if (area) query += ` AND area = '${area}'`;
    if (ubicacion) query += ` AND ubicacion = '${ubicacion}'`;
    if (salario) query += ` AND salario LIKE '%${salario}%'`;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error ejecutando la consulta:', error);
            res.status(500).json({ error: 'Error en la consulta' });
            return;
        }
        res.json(results); // Enviar los resultados al frontend
    });
});

// Servir archivos estáticos (html, css, etc.)
app.use(express.static('C:\\Users\\USUARIO\\Desktop\\Page - copia\\Frontend'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});