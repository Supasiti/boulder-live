const withPurpose = (req, res, next) => {
  if (req.session.purpose){
    next()
  } else {
    res.redirect('/purpose')
  }
}

module.exports = withPurpose;