const fs = require('fs');
const path = require('path');
const pgClient = require('../pgClient');
const { log, error } = require('console');

const migrationsPath = [
    path.resolve(__dirname, '..', 'models'),
    path.resolve(__dirname, '..', 'relations'),
    path.resolve(__dirname, '..', 'migrations'),
];

async function start() {
    console.log('migrate db');

    try {
        await pgClient.connect();
        migrationsPath.forEach(async (directoryPath) => {
            const result = await fs.promises.readdir(directoryPath);
            if (!result || !result.length > 0) {
                return;
            }

            result.forEach((filename) => {
                const filePath = path.join(directoryPath, filename);
                const readStream = new fs.createReadStream(filePath);
                const fileContent = [];
                readStream.on('data', (chunk) => fileContent.push(chunk));
                readStream.on('error', (error) => console.log(error));
                readStream.on('end', async () => {
                    console.log(fileContent.toString());
                    try {
                        const result = await pgClient.query(
                            fileContent.toString()
                        );
                    } catch (error) {
                        console.log(filename, error);
                    }
                });
            });
        });
    } catch (error) {
        console.log(error);
    }
}

start();
