import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(201).json(user);
  } catch (error) {
    res.status(404).json({ message: "Can't able to fetch user" });
  }
};

export const getUserFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const getFriends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    console.log(getFriends);
    const formattedFriends = getFriends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(201).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: "Can't able to fetch user's friend" });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendID } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendID);
    if (user.friends.includes(friendID)) {
      user.friends = user.friends.filter((id) => id !== friendID);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendID);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const getFriends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = getFriends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(201).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: "Can't add or remove friend" });
  }
};
