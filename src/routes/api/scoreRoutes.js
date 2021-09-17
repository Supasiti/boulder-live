const router = require('express').Router();
const services = require('../../services');
const query = require('../../queries');
const sanitize = require('../../services/sanitize');

// route /api/scores/

// add top to score
const addTop = async (req, res) => {
  try {
    const rawScore = await services.score.addTop(req.params.id);
    const cleaned = sanitize(rawScore);
    res.status(200).json(cleaned);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// add bonus to score
const addBonus = async (req, res) => {
  try {
    const rawScore = await services.score.addBonus(req.params.id);
    const cleaned = sanitize(rawScore);
    res.status(200).json(cleaned);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// add attempt to score
const addAttempt = async (req, res) => {
  try {
    const rawScore = await services.score.addAttempt(req.params.id);
    const cleaned = sanitize(rawScore);
    res.status(200).json(cleaned);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

const getAllScores = async (req, res) => {
  try {
    const rawScore = await query.getAllScores(req.query);
    const cleaned = sanitize(rawScore);
    res.status(200).json(cleaned);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

router.get('/', getAllScores);
router.post('/:id/addtop', addTop);
router.post('/:id/addbonus', addBonus);
router.post('/:id/addattempt', addAttempt);

module.exports = router;
