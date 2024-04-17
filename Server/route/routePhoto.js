// Import necessary modules
const express = require("express");
const router = express.Router();
const PhotoController = require('../controllers/PhotoController.js');



// Use the PhotoController version
router.get("/", PhotoController.getAllPhoto);

router.get("/:id", PhotoController.getPhotoById);

router.post("/", PhotoController.createPhoto);
router.put("/", PhotoController.updatePhoto);

router.put("/:id", PhotoController.updatePhotoComplete);

router.delete("/", PhotoController.deletePhoto);






// Export the router
module.exports = router;
