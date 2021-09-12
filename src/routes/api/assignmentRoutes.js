const router = require('express').Router();
const services = require('../../services');
const query = require('../../queries');
const sanitize = require('../../services/sanitize');

// route /api/assignments/
const getAllAssignments = async (req, res) => {
  try {
    const raw = await query.getAllAssignments(req.query);
    const cleaned = sanitize(raw);
    res.status(200).json(cleaned);
  } catch (err) {
    res.status(500).json(err);
  }
};

router.get('/', getAllAssignments);

module.exports = router;
