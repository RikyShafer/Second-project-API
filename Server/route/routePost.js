// Import necessary modules
const express = require("express");
const router = express.Router();
const postController = require('../controllers/PostController.js');



// Use the postController version
router.get("/", postController.getAllPost);

router.get("/:id", postController.getPostById);

router.post("/", postController.createPost);
router.put("/", postController.updatePost);

router.put("/:id", postController.updatePostComplete);

router.delete("/", postController.deletePost);






// Export the router
module.exports = router;
