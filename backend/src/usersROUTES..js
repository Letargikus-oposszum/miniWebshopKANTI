import express from "express";
import { getUserById, saveUser, updateUser, deleteUser, getUserByEmail } from "../tables/users.js";
import bcrypt from "bcrypt";

const user_routes = express.Router();

user_routes.get("/", (req, res) => {
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

  res.status(201).json(user);
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
