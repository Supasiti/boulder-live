const router = require('express').Router();
const services = require('../../services');
const query = require('../../queries')
const sanitize = require('../../services/sanitize');

// route /categories

// create a category
const createCategory= async (req, res) => {
  try {
    const rawCategories = await services.category.create(req.body);
    const cleanedCategories = sanitize(rawCategories);
    res.status(200).json(cleanedCategories)
  } catch (err){
    res.status(400).json(err)
  }
}

// get all 
const getAllCategories = async (req, res) => {
  try {
    console.log('\n', req.query)
    const rawCategories = await query.getCategories.all(req.query);
    const categories = sanitize(rawCategories);
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err);
  }
} 


// router

router.post('/', createCategory)
router.get('/', getAllCategories)

module.exports = router;