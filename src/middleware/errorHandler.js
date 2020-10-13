module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json(err.message);
  }
  // other error 
  //if (err == '') {}
  console.log(err);
  return res.status(500).json("something wrong")
}