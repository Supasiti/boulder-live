const router = require('express').Router();
const services = require('../../services');
const query = require('../../queries');

// route /api/scores/

// add top to score
const addTop = async (req, res) => {
  try {
    const score = await services.score.addToScore(
      req.params.id,
      'top',
    );
    res.status(200).json(score);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// add bonus to score
const addBonus = async (req, res) => {
  try {
    const score = await services.score.addToScore(
      req.params.id,
      'bonus',
    );
    res.status(200).json(score);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// add attempt to score
const addAttempt = async (req, res) => {
  try {
    const score = await services.score.addToScore(
      req.params.id,
      'attempt',
    );
    res.status(200).json(score);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

const getAllScores = async (req, res) => {
  try {
    const scores = await query.getAll('Score');
    res.status(200).json(scores);
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
