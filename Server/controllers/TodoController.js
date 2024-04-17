// ייבא מודולים נדרשים ואת מודל המשתמש
const { json, text } = require("express");
const Todo = require("../models/Todo");

// פונקציית אסינכרון ליצירת משתמש חדש
const createTodo = async (req, res) => {
    // פירוק נתוני משתמש מגוף הבקשה
    const { title, tags,completed } = req.body;

    try {
        // צור משתמש חדש באמצעות מודל המשתמש והנתונים שסופקו
        const todo = await Todo.create({   title, tags,completed });

        // החזר תגובת הצלחה עם פרטי המשתמש שנוצרו
        return res.status(201).json({ message: 'New Todo created', todo });
    } catch (error) {
        // החזר תגובת שגיאה אם יצירת המשתמש נכשלת
        return res.status(400).json({ message: 'Invalid Todo', error });
    }
};

// פונקציית אסינכרון כדי לאחזר את כל המשתמשים
const getAllTodo = async (req, res) => {
    try {
        // מצא את כל המשתמשים במסד הנתונים והמר לאובייקטי JavaScript רגילים
        const todo = await Todo.find().lean();

        // בדוק אם קיימים משתמשים; אם לא, החזר מערך ריק
        if (!todo || todo.length === 0) {
            return res.status(200).json({ message: 'No Todo found', todo: [] });
        }

        // החזר תגובת הצלחה עם רשימת המשתמשים
        res.status(200).json(todo);
    } catch (error) {
        // החזר תגובת שגיאה אם אחזור משתמשים נכשל
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// פונקציית אסינכרון כדי לאחזר משתמש לפי מזהה
const getTodoById = async (req, res) => {
    // חלץ מזהה משתמש מפרמטרי הבקשה
    const { id } = req.params;

    /// מצא משתמש לפי מזהה והמר לאובייקט JavaScript רגיל
    const todo = await Todo.findById(id).lean()

    // בדוק אם המשתמש קיים; אם לא, החזר תגובת שגיאה
    if (!todo) {
        return res.status(400).json({ message: 'No Todo found' });
    }

    // החזר תגובת הצלחה עם פרטי המשתמש
    res.json(todo);
}

// פונקציית אסינכרון לעדכון משתמש
const updateTodo = async (req, res) => {
    // פירוק נתוני משתמש מגוף הבקשה
    const { _id, title, tags,completed  } = req.body;

    // בדוק אם זיהוי המשתמש מסופק; אם לא, החזר תגובת שגיאה
    if (!_id) {
        return res.status(400).json({ message: 'post ID is required' });
    }

    try {
        // מצא ועדכן את המשתמש לפי מזהה עם הנתונים שסופקו
        const todo = await Todo.findByIdAndUpdate(
            _id,
            {  title, tags,completed  },
            { new: true, runValidators: true }
        );

        // בדוק אם המשתמש לא נמצא; אם כן, החזר תגובת שגיאה
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // החזר תגובת הצלחה עם פרטי המשתמש המעודכנים
        res.json(`${todo.title} updated`);
    } catch (error) {
        // החזר תגובת שגיאה אם עדכון המשתמש נכשל
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};



// ID - פונקציית אסינכרון לעדכון משתמש לפי ה 
const updateTodoComplete = async (req, res) => {
    const { id } = req.params
            // מצא את המשתמשים, אך אל תשתמש ב-lean() כאן
    const todo  = await Todo.findById(id).exec()
    if (!todo)
        return res.status(400).json("todo nod found...")
          // עדכן את השדה 'השלם'
          todo.complete = !todo.complete
            // שמור את השינויים
    await todo.save()

    res.json("succeed")

}


const deleteTodo = async (req, res) => {
    // Find and delete the todo
    const { id } = req.body;
    const todo = await Todo.findByIdAndDelete({ _id: id }).exec();
  
    // Send the response
    let reply;
    if (todo) {
      reply = `Todo '${todo.title}' ID ${todo._id} deleted`;
    } else {
      reply = 'No such todo found';
    }
  
    res.json(reply);
  };
// ייצא את הפונקציות המוגדרות לשימוש בקבצים אחרים
module.exports = { createTodo, getAllTodo, getTodoById, updateTodo, deleteTodo, updateTodoComplete }


// // ID - פונקציית אסינכרון לעדכון משתמש לפי ה 
// const updateTodoComplete = async (req, res) => {
//     const { id } = req.params;
//     try {
//         // מצא את המשתמשים, אך אל תשתמש ב-lean() כאן
//         const todo = await Todo.findById(id);

//         if (!todo) {
//             return res.status(400).json({ message: 'No Todo found' });
//         }

//         // עדכן את השדה 'השלם'
//         todo.complete = !todo.complete;

//         // שמור את השינויים
//         const updatedTodo = await todo.save();

//         res.json(`${updatedTodo.name} updated`);
//     } catch (error) {
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// };
