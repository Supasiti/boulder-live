const router = require('express').Router();

const eventRoutes = require('./eventRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const problemRoutes = require('./problemRoutes');

router.use('/events', eventRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/problems', problemRoutes);

module.exports = router;