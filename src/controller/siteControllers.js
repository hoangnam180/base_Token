class siteControllers {
  // [GET] REGISTER
  index = (req, res) => {
    res.render("pages/index", { error: "" });
  };
}

module.exports = new siteControllers();
