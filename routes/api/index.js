const router = require('express').Router();

// const eventRoutes = require('./eventRoutes');
const userRoutes = require('./userRoutes');
// const categoryRoutes = require('./categoryRoutes');
// const problemRoutes = require('./problemRoutes');
// const scoreRoutes = require('./scoreRoutes');
// const assignmentRoutes = require('./assignmentRoutes');

// router.use('/events', eventRoutes);
router.use('/users', userRoutes);
// router.use('/categories', categoryRoutes);
// router.use('/problems', problemRoutes);
// router.use('/scores', scoreRoutes);
// router.use('/assignments', assignmentRoutes);

module.exports = router;
