import { Router } from "express";

const router = Router();

router.get("/profile", (req, res) => {
  console.log("User profile data:", req.body);
  res.send("User profile retrieved successfully");
});

router.post("/register", (req, res) => {
  console.log("User registration data:", req.body);
  res.send("User registered successfully");
});

router.post("/login", (req, res) => {
  console.log("User login data:", req.body);
  res.send("User logged in successfully");
});

export default router;