// Import necessary modules
const express = require("express");
const router = express.Router();
const TodoController = require('../controllers/TodoController.js');



// Use the TodoController version
router.get("/", TodoController.getAllTodo);

router.get("/:id", TodoController.getTodoById);

router.post("/", TodoController.createTodo);

router.put("/", TodoController.updateTodo);

router.put("/:id", TodoController.updateTodoComplete);

//router.put("/tttr", TodoController.deleteTodo);
 router.delete("/", TodoController.deleteTodo);


// Export the router
module.exports = router;
