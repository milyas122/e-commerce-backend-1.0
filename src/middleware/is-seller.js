module.exports = async function (req, res, next) {
  const isSeller = req.user.isSeller || false;
  if (!isSeller) {
    return res.status(404).json({ message: "Only Seller can add Products" });
  }
  req.body["seller"] = req.user.id;
  next();
};
