
//login
const isLogin = async (req, res, next) => {
  try {
    if (req.session.user_id) {
    } else {
      res.redirect("/");
    }
    next();

  } catch (error) {
    console.log(error.message);
  }
};

//logout
const isLogout = async (req, res, next) => {
  try {
    if (req.session.user_id) {
      res.redirect("/home");
    } else{
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
};

//export all the modules
module.exports = {
    isLogin,
    isLogout
}
