const seed = require('./seedDatabase');

console.log('seeding database...');
seed().then(() => process.exit())
