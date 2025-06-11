const User = require("./../model/user.model");

exports.getAll = async (req, res, next) => {
    let userList = await User.findAll();
    res.status(200).json(userList);
}