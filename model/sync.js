const { bdd } = require('./connexion.js');
const User = require("./../model/user.model.js");
const Post = require("./../model/posts.model.js");
const Emotion = require("./../model/emotion.model.js");

const sync = async () => {
    Post.belongsTo(User);
    User.hasMany(Post);
    Emotion.belongsTo(User);
    Emotion.belongsTo(Post);
    User.hasMany(Emotion);
    Post.hasMany(Emotion);

    await bdd.sync({ force: true });
}

module.exports = sync;