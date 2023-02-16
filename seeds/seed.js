const db = require('../config/connection');
const { manager } = require('../models');

const managerData = require('./managerData.json');

db.once('open', async () => {
  await manager.deleteMany({});

  const managerStaff = await manager.insertMany(managerData);

  console.log('Managers seeded!');
  process.exit(0);
});