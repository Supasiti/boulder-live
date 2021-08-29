const router = require('express').Router();
const problemServices = require('../../services/problemServices');
const getProblems = require('../../queries/getProblems')
const sanitize = require('../../services/sanitize');

// route /api/problems/

const createProblems = async (req, res) => {
  try {
    console.log(req.body);
    const rawProblems = await problemServices.create(req.body);
    const cleanedProblems = sanitize(rawProblems);
    res.status(200).json(cleanedProblems)
  } catch (err){
    res.status(400).json(err)
  }
}

// get all 
const getAllProblems = async (req, res) => {
  try {
    const rawProblems = await getProblems.all();
    const problems = sanitize(rawProblems);
    res.status(200).json(problems)
  } catch (err) {
    res.status(500).json(err);
  }
} 

router.post('/', createProblems)
router.get('/', getAllProblems)

module.exports = router;