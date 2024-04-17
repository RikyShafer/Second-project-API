// ייבא מודולים נדרשים ואת מודל המשתמש
const { json, text } = require("express");
const User = require("../models/User");

// פונקציית אסינכרון ליצירת משתמש חדש
const createUser = async (req, res) => {
    // פירוק נתוני משתמש מגוף הבקשה
    const { name,
    username,
    email,
    address,
     phone,
     } = req.body;

    try {
        // צור משתמש חדש באמצעות מודל המשתמש והנתונים שסופקו
        const user = await User.create({  name, username, email, address ,phone });

        // החזר תגובת הצלחה עם פרטי המשתמש שנוצרו
        return res.status(201).json({ message: 'New user created', user });
    } catch (error) {
        // החזר תגובת שגיאה אם יצירת המשתמש נכשלת
        return res.status(400).json({ message: 'Invalid post', error });
    }
};

// פונקציית אסינכרון כדי לאחזר את כל המשתמשים
const getAllUser = async (req, res) => {
    try {
        // מצא את כל המשתמשים במסד הנתונים והמר לאובייקטי JavaScript רגילים
        const user = await User.find().lean();

        // בדוק אם קיימים משתמשים; אם לא, החזר מערך ריק
        if (!user || user.length === 0) {
            return res.status(200).json({ message: 'No user found', user: [] });
        }

        // החזר תגובת הצלחה עם רשימת המשתמשים
        res.status(200).json(user);
    } catch (error) {
        // החזר תגובת שגיאה אם אחזור משתמשים נכשל
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// פונקציית אסינכרון כדי לאחזר משתמש לפי מזהה
const getUserById = async (req, res) => {
    // חלץ מזהה משתמש מפרמטרי הבקשה
    const { id } = req.params;

    /// מצא משתמש לפי מזהה והמר לאובייקט JavaScript רגיל
    const user = await User.findById(id).lean()

    // בדוק אם המשתמש קיים; אם לא, החזר תגובת שגיאה
    if (!user) {
        return res.status(400).json({ message: 'No user found' });
    }

    // החזר תגובת הצלחה עם פרטי המשתמש
    res.json(user);
}

// פונקציית אסינכרון לעדכון משתמש
const updateUser = async (req, res) => {
    // פירוק נתוני משתמש מגוף הבקשה
    const { _id,name, username, email, address ,phone } = req.body;

    // בדוק אם זיהוי המשתמש מסופק; אם לא, החזר תגובת שגיאה
    if (!_id) {
        return res.status(400).json({ message: 'user ID is required' });
    }

    try {
        // מצא ועדכן את המשתמש לפי מזהה עם הנתונים שסופקו
        const user = await User.findByIdAndUpdate(
            _id,
            { name, username, email, address ,phone },
            { new: true, runValidators: true }
        );

        // בדוק אם המשתמש לא נמצא; אם כן, החזר תגובת שגיאה
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        // החזר תגובת הצלחה עם פרטי המשתמש המעודכנים
        res.json(`${user.name} updated`);
    } catch (error) {
        // החזר תגובת שגיאה אם עדכון המשתמש נכשל
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


// ID - פונקציית אסינכרון לעדכון משתמש לפי ה 
const updateUserComplete = async (req, res) => {
    const { id } = req.params
            // מצא את המשתמשים, אך אל תשתמש ב-lean() כאן
    const user  = await User.findById(id).exec()
    if (!user)
        return res.status(400).json("user nod found...")
          // עדכן את השדה 'השלם'
          user.complete = !user.complete
            // שמור את השינויים
    await user.save()

    res.json("succeed")

}





const deleteUser = async (req, res) => {
    // Find and delete the User
    const { id } = req.body;
    const user = await User.findByIdAndDelete({ _id: id }).exec();
  
    // Send the response
    let reply;
    if (user) {
      reply = `user '${user.title}' ID ${user._id} deleted`;
    } else {
      reply = 'No such user found';
    }
  
    res.json(reply);
  };

// ייצא את הפונקציות המוגדרות לשימוש בקבצים אחרים
module.exports = { createUser, getAllUser, getUserById, updateUser, deleteUser, updateUserComplete }


// // ID - פונקציית אסינכרון לעדכון משתמש לפי ה 
// const updatePostComplete = async (req, res) => {
//     const { id } = req.params;
//     try {
//         // מצא את המשתמשים, אך אל תשתמש ב-lean() כאן
//         const post = await Post.findById(id);

//         if (!post) {
//             return res.status(400).json({ message: 'No post found' });
//         }

//         // עדכן את השדה 'השלם'
//         post.complete = !post.complete;

//         // שמור את השינויים
//         const updatedPost = await post.save();

//         res.json(`${updatedPost.name} updated`);
//     } catch (error) {
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// };