const router = require('express').Router();
const services = require('../../services');
const query = require('../../queries');

// route /api/problems/

const createProblems = async (req, res) => {
  try {
    const newProblem = await services.problem.create(req.body);
    res.status(200).json(newProblem);
  } catch (err) {
    res.status(400).json(err);
  }
};

// get all
const getAllProblems = async (req, res) => {
  try {
    const rawProblems = await query.getAllProblems(req.query);
    const problems = sanitize(rawProblems);
    res.status(200).json(problems);
  } catch (err) {
    res.status(500).json(err);
  }
};

// remove a problem from database
const removeProblem = async (req, res) => {
  try {
    await services.problem.remove(req.params.id);
    res
      .status(200)
      .json({ message: 'Successfully removed a problem' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// router.get('/', getAllProblems);
router.post('/', createProblems);
// router.delete('/:id', removeProblem);

module.exports = router;
