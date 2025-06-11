const Posts = require("./../model/posts.model");
const jwt = require("jsonwebtoken");

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Posts.findAll();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getPostById = async (req, res, next) => {
    try {
        const post = await Posts.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const userId = req.token.id
        if (!req.body.content) {
            return res.status(400).json({ message: "Content is required" });
        }
        const postData = {
            content: req.body.content,
            userId: userId
        };

        // Si image
        if (req.file) {
            postData.picture = req.file.filename;
        }

        const post = await Posts.create(postData);
        res.status(201).json({ message: "Post created", post: post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const userId = req.token.id
        const post = await Posts.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.userId !== userId) {
            return res.status(403).json({ message: "Forbidden" });
        }
        post.content = req.body.content || post.content;

        // Si image
        if (req.file) {
            post.picture = req.file.filename;
        }

        await post.save();
        res.status(200).json({ message: "Post updated", post: post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const userId = req.token.id
        const post = await Posts.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.userId !== userId) {
            return res.status(403).json({ message: "Forbidden" });
        }
        await post.destroy();
        res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addEmotion = async (req, res, next) => {
    try {
        const userId = req.token.id;
        const post = await Posts.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (!req.body.type) {
            return res.status(400).json({ message: "Emotion type is required" });
        }
        const existingEmotion = await post.getEmotions({
            where: { userId: userId }
        });
        if (existingEmotion.length > 0) {
            // on met à jour l'émotion existante
            console.log(existingEmotion);
            existingEmotion[0].type = req.body.type;
            await existingEmotion[0].save();
            return res.status(200).json(existingEmotion[0]);
        } else {
            // on crée une nouvelle émotion
            const emotion = await post.createEmotion({
                type: req.body.type,
                userId: userId,
                postId: req.params.id
            });
            return res.status(201).json({ message: "Emotion added", emotion: emotion });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.removeEmotion = async (req, res, next) => {
    try {
        const userId = req.token.id;
        const post = await Posts.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const emotion = await post.getEmotions({
            where: { userId: userId }
        });
        if (emotion.length === 0) {
            return res.status(404).json({ message: "Emotion not found for this user" });
        }
        await emotion[0].destroy();
        res.status(200).json({ message: "Emotion removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}