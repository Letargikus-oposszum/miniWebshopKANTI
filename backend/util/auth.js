import * as User from "../tables/users.js";
import jwt from "jsonwebtoken";

function auth(req, res, next) {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const token = jwt.verify(accessToken.split(" ")[1], "secret_key");
    const now = Math.floor(Date.now() / 1000);
    if (!token || token?.exp < now) {
      return res.status(403).json({ message: "Access forbidden" });
    }
    const user = User.getUserById(token.id);
    if (!user) {
      return res.status(403).json({ message: "Access denied" });
    }
    req.userId = user.id;
    req.userEmail = user.email;
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
}

export default auth;
