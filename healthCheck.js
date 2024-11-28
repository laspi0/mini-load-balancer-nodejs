const http = require('http');

// Fonction de vérification de santé des serveurs
function checkServerHealth(servers, interval = 5000) {
    const serverStatus = servers.map(() => true); // Par défaut, tous les serveurs sont considérés actifs

    setInterval(() => {
        servers.forEach((server, index) => {
            const [hostname, port] = server.replace('http://', '').split(':');

            const options = {
                hostname,
                port,
                path: '/',
                method: 'GET',
                timeout: 2000 // Timeout pour considérer un serveur comme indisponible
            };

            const healthCheck = http.request(options, (res) => {
                serverStatus[index] = res.statusCode === 200; // Actif si le code est 200
            });

            // Gérer les erreurs et le timeout
            healthCheck.on('error', () => {
                serverStatus[index] = false;
            });
            healthCheck.on('timeout', () => {
                healthCheck.abort();
                serverStatus[index] = false;
            });

            healthCheck.end();
        });
    }, interval); // Vérifie toutes les `interval` millisecondes

    return serverStatus;
}

module.exports = checkServerHealth;
