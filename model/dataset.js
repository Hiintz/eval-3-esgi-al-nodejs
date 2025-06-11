const User = require("../model/user.model.js");
const Posts = require("../model/posts.model.js");

const bcrypt = require('bcrypt');
const dataset = async () => {
    // Jeu de données User
    await User.create({
        email: "admin@admin.com",
        password: bcrypt.hashSync('12345', 10),
        nickname: "Admin"
    });
    await User.create({
        email: "user1@user1.com",
        password: bcrypt.hashSync('12345', 10),
        nickname: "User1"
    });
    await User.create({
        email: "user2@user2.com",
        password: bcrypt.hashSync('12345', 10),
        nickname: "User2"
    });

    // Jeu de données Posts
    await Posts.create({
        content: "Hello World!",
        userId: 3
    });
    await Posts.create({
        content: "This is a test post.",
        userId: 2
    });
    await Posts.create({
        content: "Another post for testing.",
        userId: 1
    });
    await Posts.create({
        content: "Post with an image.",
        userId: 1,
        picture: "pixel-art-2025-06-101749650708067.png"
    });
}

module.exports = dataset;