import path from 'path';

const config = {};

config.logFileDir = path.join(__dirname, '../../log');
config.logFileName = 'app.log';
config.dbHost = process.env.dbHost || 'localhost';
config.dbPort = process.env.dbPort || '27017';
config.dbName = process.env.dbName || 'esports-dashboard';

// Client id and client secret for OAuth 2.0
// NOTE: The client secret should be kepy secret! Preferably set this variable
// as an environment variable; for now, this is public for debugging purposes.
// NOTE: If these are changed, then you will also need to update the frontend
// (use the new Base64 encoding of these objects -> id:secret)
// Happens to be: ZXNwb3J0cy1kYXNoYm9hcmQtY2xpZW50Ojk3SDdGNEZENzJKRjdFUFFMMEdBQ1ox
config.clientId = process.env.authClient || 'esports-dashboard-client';
config.clientSecret = process.env.authSecret || '97H7F4FD72JF7EPQL0GACZ1';

config.serverPort = process.env.PORT || 5000;

if (process.env.NODE_ENV == 'test') {
    console.log("USING TEST ENV")
    config.dbHost = 'localhost';
    config.dbPort = '27017';
    config.dbName = 'esports-dashboard-test';
    config.serverPort = 6000;
}

export default config;