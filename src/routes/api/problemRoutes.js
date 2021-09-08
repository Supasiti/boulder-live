const router = require('express').Router();
const services = require('../../services');
const query = require('../../queries')
const sanitize = require('../../services/sanitize');

// route /api/problems/

const createProblems = async (req, res) => {
  try {
    console.log(req.body);
    const rawProblems = await services.problem.create(req.body);
    const cleanedProblems = sanitize(rawProblems);
    res.status(200).json(cleanedProblems)
  } catch (err){
    res.status(400).json(err)
  }
}

// get all 
const getAllProblems = async (req, res) => {
  try {
    const rawProblems = await query.getProblems.all();
    const problems = sanitize(rawProblems);
    res.status(200).json(problems)
  } catch (err) {
    res.status(500).json(err);
  }
} 

// update problem assignments
const updateAssignments = async (req, res) => {
  try {
    await services.problemAssignment.update(req.body);
    res.status(200).json({ message: 'success' })
  } catch (err) {
    res.status(400).json(err);
  }
}

router.post('/', createProblems)
router.get('/', getAllProblems)
router.post('/assign', updateAssignments)

module.exports = router;