import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "task_backend", {
    expiresIn: "30d",
  });
};

export default generateToken;
