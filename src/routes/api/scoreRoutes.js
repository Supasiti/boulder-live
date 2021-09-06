const router = require('express').Router();
const services = require('../../services');
const query = require('../../queries')
const sanitize = require('../../services/sanitize');

// route /api/scores/


const addTop = async (req, res) => {
  try {
    const rawScore = await services.score.addTop(req.params.id);
    const cleaned = sanitize(rawScore);
    res.status(200).json(cleaned)
  } catch (err){
    console.error(err);
    res.status(400).json(err)
  }
}

router.post('/:id/addtop', addTop)


module.exports = router;