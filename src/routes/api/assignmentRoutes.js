const router = require('express').Router();
const services = require('../../services');
const query = require('../../queries');
const sanitize = require('../../services/sanitize');

// route /api/assignments/

// get all assignments filtered by query
// expected query : {
//  id: int, categoryId: int, problemId: int, eventId: int
// }
const getAllAssignments = async (req, res) => {
  try {
    const raw = await query.getAllAssignments(req.query);
    const cleaned = sanitize(raw);
    res.status(200).json(cleaned);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update all assignments related to an event
// assume that user will submit all of them
// arguments {
//    eventId,
//    problemAssignments: Array<{ problemId, categoryId}> }

const updateAssignments = async (req, res) => {
  try {
    console.log(req.body);
    await services.problemAssignment.update(req.body);
    res
      .status(200)
      .json({ message: 'successfully update all assignments' });
  } catch (err) {
    res.status(400).json(err);
  }
};

router.get('/', getAllAssignments);
router.put('/', updateAssignments);

module.exports = router;
