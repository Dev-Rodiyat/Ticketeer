const express = require("express");
const router = express.Router();
const { protectUser } = require("../Middleware/authMiddleware");
const {
  registerUser,
  uploadProfilePicture,
  updateProfilePicture,
  deleteProfilePicture,
  loginUser,
  logoutUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  getUserBookedEvents,
  getUserTickets,
  disconnectWallet,
  // changePassword,
  loginStatus,
  updateThemeMode,
  googleLogin,
  resetPassword,
  forgotPassword,
  connectWallet,
  getProfilePicture,
} = require("../Controller/UserController");
const upload = require("../Middleware/multer");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/login-status/:userId", loginStatus);

router.get("/get-photo/:userId", protectUser, getProfilePicture);
router.post(
  "/upload-photo",
  protectUser,
  upload.single("photo"),
  uploadProfilePicture
);
router.put(
  "/update-photo",
  protectUser,
  upload.single("photo"),
  updateProfilePicture
);
router.delete("/:userId/delete-photo", protectUser, deleteProfilePicture);

// router.delete("/:userId", protectUser, deleteProfilePicture);
router.get("/get-user", protectUser, getUser);
router.put("/connect-wallet", protectUser, connectWallet);
router.put("/disconnect-wallet", protectUser, disconnectWallet);
router.get("/get-user-tickets", protectUser, getUserTickets);
router.get("/get-users", protectUser, getUsers);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:resetToken", resetPassword);
// router.post("/sendVerificationEmail", protect, sendVerificationEmail);
router.put("/update-user", protectUser, updateUser);
// router.patch("/change-password", protectUser, changePassword);
router.delete("/delete-user", protectUser, deleteUser);
router.post("/logout",protectUser, logoutUser);
router.get("/booked-events/:userId", protectUser, getUserBookedEvents);

router.put('/theme', protectUser, updateThemeMode); // make sure authenticateUser middleware is used

router.post('/auth/google', googleLogin);

module.exports = router;