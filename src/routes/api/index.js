const router = require('express').Router();

const eventRoutes = require('./eventRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use('/events', eventRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;