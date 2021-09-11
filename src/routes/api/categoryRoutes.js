const router = require('express').Router();
const services = require('../../services');
const query = require('../../queries');
const sanitize = require('../../services/sanitize');

// route /categories

// create a category
const createCategory = async (req, res) => {
  try {
    const rawCategories = await services.category.create(req.body);
    const cleanedCategories = sanitize(rawCategories);
    res.status(200).json(cleanedCategories);
  } catch (err) {
    res.status(400).json(err);
  }
};

// get all
const getAllCategories = async (req, res) => {
  try {
    const rawCategories = await query.getAllCategories(req.query);
    const categories = sanitize(rawCategories);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

// let a competitor join a category
const joinCategory = async (req, res) => {
  try {
    const competitorId =
      req.session.competitor.id || req.body.competitorId;
    const categoryId = req.params.id;
    const result = await services.category.join({
      competitorId,
      categoryId,
    });
    if (result) {
      return res
        .status(200)
        .json({ message: 'successfully join in this category' });
    }
    return res.status(400).json({
      message: 'competitorId is incompatible with this categoryId',
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

// remove a category from event
const removeCategory = async (req, res) => {
  try {
    await services.category.remove(req.params.id);
    res.status(200).json({ message: 'A category is removed' });
  } catch (err) {
    res.status(400).json(err);
  }
};
// router

router.post('/', createCategory);
router.get('/', getAllCategories);
router.delete('/:id', removeCategory);
router.post('/:id/join', joinCategory);

module.exports = router;
