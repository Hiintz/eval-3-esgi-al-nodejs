const User = require("./../model/user.model");

exports.getAll = async (req, res, next) => {
    let userList = await User.find()
    res.status(200).json(userList);
}