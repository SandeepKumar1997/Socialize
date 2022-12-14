import express from "express";

import { getFeedPosts, getUserPosts, likePosts } from "../controllers/posts.js";

import { verifyUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyUser, getFeedPosts);

router.get("/:userid/posts", verifyUser, getUserPosts);

router.patch("/:id/like", verifyUser, likePosts);

export default router;
