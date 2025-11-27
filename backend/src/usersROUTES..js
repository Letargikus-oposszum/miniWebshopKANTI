import express from "express";
import { getUserById, saveUser, updateUser, deleteUser, getUserByEmail } from "../tables/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const user_routes = express.Router();

user_routes.get("/:id", (req, res) => {
  const id = req.params.id;
  const user = getUserById(id);
  if (!user) {
    res.status(404).json({ message: "No such user!" });
  }
  res.json(user);
});

user_routes.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Some data are missing!" });
  }

  let userbyemail = getUserByEmail(email);
  if (userbyemail) {
    return res.status(400).json({ message: "This email has already been registered" });
  }

  const salt = await bcrypt.genSalt();
  const hashedPw = await bcrypt.hash(password, salt);
  const saved = saveUser(email, hashedPw);

  const user = getUserById(saved.lastInsertRowid);

  return res.status(201).json(user);
});

user_routes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Some data are missing!" });
  }

  const user = getUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "No such user!" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Incorrect password!" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    "secret_key",
    { expiresIn: "30s" }
  );

  return res.status(201).json({
    accessToken: token,
    userId: user.id,
  });
});

user_routes.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { email, password } = req.body;

  const user = getUserById(id);
  if (!user) {
    res.status(400).json({ message: "No such user!" });
  }

  const salt = await bcrypt.genSalt();
  const hashedPw = await bcrypt.hash(password, salt);
  const saved = updateUser( email, hashedPw, id);

  const updatedUser = getUserById(saved.lastInsertRowid);

  res.status(201).json(updatedUser);
});

user_routes.delete("/:id", (req, res) => {
  const id = req.params.id;
  const user = getUserById(id);
  if (!user) {
    res.status(400).json({ message: "No such user!" });
  }
  deleteUser(id);
  res.status(200).json({ message: "Deletion was successful!" });
});

export default user_routes;
