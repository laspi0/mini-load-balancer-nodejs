const http = require('http');

// Obtenir le port via les arguments de ligne de commande
const PORT = process.argv[2] || 3000;

// Créer un serveur HTTP
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello from backend server running on port ${PORT}\n`);
}).listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
