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
    const rawCategories = await query.getCategories.all(req.query);
    const categories = sanitize(rawCategories);
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err);
  }
} 

// let a competitor join a category
const joinCategory = async (req, res) => {
  try {
    const competitorId = req.session.competitor.id || req.body.competitorId;
    const categoryId = req.params.id;

    console.log('category routes: cat Id', categoryId);
    console.log('category routes: comp id', competitorId);

    const result = await services.category.join({ competitorId, categoryId })
    if (result) {
      res.status(200).json({ message: 'successfully join in this category'})
    }
    res.status(400).json({ message: 'competitorId is incompatible with this categoryId'});
  } catch (err) {
    console.error(err)
    res.status(400).json(err);
  }
}


// router

router.post('/', createCategory);
router.get('/', getAllCategories);
router.post('/:id/join', joinCategory);

module.exports = router;