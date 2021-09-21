const router = require('express').Router();
const services = require('../../services');
const query = require('../../queries');

// route /categories

// create a category
const createCategory = async (req, res) => {
  try {
    const category = await services.category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
};

// get all
const getAllCategories = async (req, res) => {
  try {
    const categories = await query.getAll('Category', req.query);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

// let a competitor join a category
// argument: body : { competitorId }
const joinCategory = async (req, res) => {
  try {
    const result = await services.category.join({
      competitorId: req.body.competitorId,
      categoryId: req.params.id,
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

// assign problems to each category in an event
// expect: {assignments: Array<{problemId, categoryId}>, eventId}
const assignProblems = async (req, res) => {
  try {
    await services.category.assign(req.body);
    res.status(200).json({
      message: 'Problems have been assigned to each category',
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

// router

router.post('/', createCategory);
router.get('/', getAllCategories);
router.delete('/:id', removeCategory);
router.post('/:id/join', joinCategory);
router.post('/assign', assignProblems);

module.exports = router;
