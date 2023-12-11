const fs = require('fs');
const path = require('path');
const pgClient = require('../pgClient');
const { log } = require('console');

async function start() {
    const migrationsPath = [
        path.resolve(__dirname, '..', 'models'),
        path.resolve(__dirname, '..', 'relations'),
    ];
    try {
        await pgClient.connect();
        migrationsPath.forEach(async (directoryPath) => {
            const result = await fs.promises.readdir(directoryPath);
            if (!result || !result.length > 0) {
                return;
            }

            result.forEach((filename) => {
                const readStream = new fs.createReadStream(
                    path.join(directoryPath, filename)
                );
                const fileContent = [];
                readStream.on('data', (chunk) => fileContent.push(chunk));
                readStream.on('error', (error) => console.log(error));
                readStream.on('end', async () => {
                    console.log(fileContent.toString());
                    const result = await pgClient.query(fileContent.toString());
                    console.log(result);
                });
            });
        });
    } catch (error) {}
}

start();