const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Rutas GET
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});

app.get('/buscar', (req, res) => {
    const { nombre, edad, ciudad } = req.query;
    
    let respuesta = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resultado GET</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0;
                padding: 20px;
            }
            .resultado {
                background: white;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                max-width: 500px;
                text-align: center;
            }
            h1 {
                color: #667eea;
                margin-top: 0;
            }
            .dato {
                background: #f0f0f0;
                padding: 15px;
                margin: 15px 0;
                border-radius: 5px;
                text-align: left;
            }
            .dato strong {
                color: #667eea;
                display: block;
                margin-bottom: 5px;
            }
            a {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background: #667eea;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                transition: background 0.3s;
            }
            a:hover {
                background: #5568d3;
            }
        </style>
    </head>
    <body>
        <div class="resultado">
            <h1>✅ Datos recibidos por GET</h1>
            <div class="dato">
                <strong>Nombre:</strong>
                ${nombre || 'No proporcionado'}
            </div>
            <div class="dato">
                <strong>Edad:</strong>
                ${edad || 'No proporcionado'}
            </div>
            <div class="dato">
                <strong>Ciudad:</strong>
                ${ciudad || 'No proporcionado'}
            </div>
            <div style="background: #e3f2fd; padding: 15px; margin-top: 20px; border-radius: 5px; font-family: monospace; text-align: left; font-size: 12px;">
                <strong>URL enviada:</strong><br>
                /buscar?nombre=${nombre || ''}&edad=${edad || ''}&ciudad=${ciudad || ''}
            </div>
            <a href="/">← Volver</a>
        </div>
    </body>
    </html>
    `;
    
    res.send(respuesta);
});

// Rutas POST
app.post('/guardar', (req, res) => {
    const { email, password, mensaje } = req.body;
    
    // Aquí normalmente guardarías en una base de datos
    console.log('Datos POST recibidos:', { email, password, mensaje });
    
    let respuesta = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resultado POST</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0;
                padding: 20px;
            }
            .resultado {
                background: white;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                max-width: 500px;
                text-align: center;
            }
            h1 {
                color: #764ba2;
                margin-top: 0;
            }
            .dato {
                background: #f0f0f0;
                padding: 15px;
                margin: 15px 0;
                border-radius: 5px;
                text-align: left;
            }
            .dato strong {
                color: #764ba2;
                display: block;
                margin-bottom: 5px;
            }
            a {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background: #764ba2;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                transition: background 0.3s;
            }
            a:hover {
                background: #653a91;
            }
        </style>
    </head>
    <body>
        <div class="resultado">
            <h1>✅ Datos recibidos por POST</h1>
            <div class="dato">
                <strong>Email:</strong>
                ${email || 'No proporcionado'}
            </div>
            <div class="dato">
                <strong>Contraseña:</strong>
                ${'*'.repeat((password || 'No proporcionado').length)}
            </div>
            <div class="dato">
                <strong>Mensaje:</strong>
                ${mensaje || 'No proporcionado'}
            </div>
            <div style="background: #f3e5f5; padding: 15px; margin-top: 20px; border-radius: 5px; font-size: 12px; text-align: left;">
                <strong>ℹ️ Nota importante:</strong><br>
                Los datos fueron enviados en el cuerpo de la petición (no en la URL).
                Por eso no los ves en la barra de direcciones.
            </div>
            <a href="/">← Volver</a>
        </div>
    </body>
    </html>
    `;
    
    res.send(respuesta);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`
    🚀 Servidor iniciado en http://localhost:${PORT}
    
    Rutas disponibles:
    - GET  /          → Mostrar formulario
    - GET  /buscar    → Procesar datos GET
    - POST /guardar   → Procesar datos POST
    `);
});
