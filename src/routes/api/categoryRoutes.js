const router = require('express').Router();
const categoryServices = require('../../services/categoryServices');
const getCategories = require('../../queries/getCategories')
const sanitize = require('../../services/sanitize');

// route /categories

const createCategories = async (req, res) => {
  try {
    console.log(req.body);
    const rawCategories = await categoryServices.create(req.body);
    const cleanedCategories = sanitize(rawCategories);
    res.status(200).json(cleanedCategories)
  } catch (err){
    res.status(400).json(err)
  }
}

// get all 
const getAllCategories = async (req, res) => {
  try {
    const rawCategories = await getCategories.all();
    const categories = sanitize(rawCategories);
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err);
  }
} 

router.post('/', createCategories)
router.get('/', getAllCategories)

module.exports = router;