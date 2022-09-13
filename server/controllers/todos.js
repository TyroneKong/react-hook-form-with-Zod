exports.postTodos = (req, res) => {
  try {
    const body = req.body;
    res.status(200).json(body);
  } catch (error) {
    throw new error();
  }
};
