import express from "express";

import {
  getUser,
  getUserFriend,
  addRemoveFriend,
} from "../controllers/users.js";

import { verifyUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyUser, getUser);

router.get("/:id/friends", verifyUser, getUserFriend);

router.patch("/:id/:friendID", verifyUser, addRemoveFriend);

export default router;
