// ייבא מודולים נדרשים ואת מודל המשתמש
const { json, text } = require("express");
const Post = require("../models/Post");

// פונקציית אסינכרון ליצירת משתמש חדש
const createPost = async (req, res) => {
    // פירוק נתוני משתמש מגוף הבקשה
    const { title, body } = req.body;

    try {
        // צור משתמש חדש באמצעות מודל המשתמש והנתונים שסופקו
        const post = await Post.create({  title, body});

        // החזר תגובת הצלחה עם פרטי המשתמש שנוצרו
        return res.status(201).json({ message: 'New post created', post });
    } catch (error) {
        // החזר תגובת שגיאה אם יצירת המשתמש נכשלת
        return res.status(400).json({ message: 'Invalid post', error });
    }
};

// פונקציית אסינכרון כדי לאחזר את כל המשתמשים
const getAllPost = async (req, res) => {
    try {
        // מצא את כל המשתמשים במסד הנתונים והמר לאובייקטי JavaScript רגילים
        const post = await Post.find().lean();

        // בדוק אם קיימים משתמשים; אם לא, החזר מערך ריק
        if (!post || post.length === 0) {
            return res.status(200).json({ message: 'No post found', post: [] });
        }

        // החזר תגובת הצלחה עם רשימת המשתמשים
        res.status(200).json(post);
    } catch (error) {
        // החזר תגובת שגיאה אם אחזור משתמשים נכשל
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// פונקציית אסינכרון כדי לאחזר משתמש לפי מזהה
const getPostById = async (req, res) => {
    // חלץ מזהה משתמש מפרמטרי הבקשה
    const { id } = req.params;

    /// מצא משתמש לפי מזהה והמר לאובייקט JavaScript רגיל
    const post = await Post.findById(id).lean()

    // בדוק אם המשתמש קיים; אם לא, החזר תגובת שגיאה
    if (!post) {
        return res.status(400).json({ message: 'No post found' });
    }

    // החזר תגובת הצלחה עם פרטי המשתמש
    res.json(post);
}

// פונקציית אסינכרון לעדכון משתמש
const updatePost = async (req, res) => {
    // פירוק נתוני משתמש מגוף הבקשה
    const { _id,title, body } = req.body;

    // בדוק אם זיהוי המשתמש מסופק; אם לא, החזר תגובת שגיאה
    if (!_id) {
        return res.status(400).json({ message: 'post ID is required' });
    }

    try {
        // מצא ועדכן את המשתמש לפי מזהה עם הנתונים שסופקו
        const post = await Post.findByIdAndUpdate(
            _id,
            { title, body },
            { new: true, runValidators: true }
        );

        // בדוק אם המשתמש לא נמצא; אם כן, החזר תגובת שגיאה
        if (!post) {
            return res.status(404).json({ message: 'post not found' });
        }

        // החזר תגובת הצלחה עם פרטי המשתמש המעודכנים
        res.json(`${post.title} updated`);
    } catch (error) {
        // החזר תגובת שגיאה אם עדכון המשתמש נכשל
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


// ID - פונקציית אסינכרון לעדכון משתמש לפי ה 
const updatePostComplete = async (req, res) => {
    const { id } = req.params
            // מצא את המשתמשים, אך אל תשתמש ב-lean() כאן
    const post  = await Post.findById(id).exec()
    if (!post)
        return res.status(400).json("post nod found...")
          // עדכן את השדה 'השלם'
          post.complete = !post.complete
            // שמור את השינויים
    await post.save()

    res.json("succeed")

}
// // פונקציית אסינכרון למחיקת משתמש
// const deletePost = async (req, res) => {
//     // חלץ מזהה משתמש מגוף הבקשה
//     const { id } = req.body;

//     // מצא משתמש לפי מזהה ובצע את השאילתה
//     const post = await Post.findById(id).exec()

//     // בדוק אם המשתמש קיים; אם לא, החזר תגובת שגיאה
//     if (!post) {
//         return res.status(400).json({ message: 'No post found' });
//     }

//     // מחק את המשתמש ואחסן את התוצאה
//     const result = await Post.deleteOne();

//     // החזר תגובת הצלחה עם מידע על המשתמש שנמחק
//     const reply = `post '${result.title}' ID ${result._id} deleted`;
//     res.json(reply);
// }




const deletePost = async (req, res) => {
    // Find and delete the todo
    const { id } = req.body;
    const post = await Post.findByIdAndDelete({ _id: id }).exec();
  
    // Send the response
    let reply;
    if (post) {
      reply = `photo '${post.title}' ID ${post._id} deleted`;
    } else {
      reply = 'No such todo found';
    }
  
    res.json(reply);
  };

// ייצא את הפונקציות המוגדרות לשימוש בקבצים אחרים
module.exports = { createPost, getAllPost, getPostById, updatePost, deletePost, updatePostComplete }


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