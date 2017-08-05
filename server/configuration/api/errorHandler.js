export const restApiError = (errors, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: 'Error!!!' })
  } else {
    res.status(500)
    res.render('error', { error: 'Unexpected Error!!' })
  }
};