const http = require('http');
const servers = [
    { host: 'localhost', port: 3001 },
    { host: 'localhost', port: 3002 },
    { host: 'localhost', port: 3003 }
];

let currentServerIndex = 0;

function getNextServer() {
    const server = servers[currentServerIndex];
    currentServerIndex = (currentServerIndex + 1) % servers.length;
    return `http://${server.host}:${server.port}`;
}

http.createServer((req, res) => {
    try {
        const serverUrl = new URL(getNextServer());
        console.log(`Redirecting request to: ${serverUrl.href}`); // Log de la redirection

        const options = {
            hostname: serverUrl.hostname,
            port: serverUrl.port,
            path: req.url,
            method: req.method,
            headers: req.headers,
        };

        const proxy = http.request(options, (backendRes) => {
            console.log(`Response from ${serverUrl.href}: ${backendRes.statusCode}`); // Log de la réponse du backend
            res.writeHead(backendRes.statusCode, backendRes.headers);
            backendRes.pipe(res);
        });

        proxy.on('error', (err) => {
            console.error('Error connecting to backend:', err.message); // Log d'erreur
            res.writeHead(502);
            res.end('Bad Gateway');
        });

        req.pipe(proxy);
    } catch (err) {
        console.error('Error in load balancer:', err.message); // Log d'erreur globale
        res.writeHead(503);
        res.end('Service Unavailable');
    }
}).listen(3000, () => {
    console.log('Load balancer running on port 3000');
});
