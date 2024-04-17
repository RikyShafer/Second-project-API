// // ייבא מודולים נדרשים ואת מודל המשתמש
// const { json, text } = require("express");
// const Photo = require("../models/Photo");

// // פונקציית אסינכרון ליצירת משתמש חדש
// const createPhoto = async (req, res) => {
//     // פירוק נתוני משתמש מגוף הבקשה
//     const { title, imageUrl } = req.body;

//     try {
//         // צור משתמש חדש באמצעות מודל המשתמש והנתונים שסופקו
//         const photo = await Photo.create({  title, imageUrl});

//         // החזר תגובת הצלחה עם פרטי המשתמש שנוצרו
//         return res.status(201).json({ message: 'New Photo created', photo });
//     } catch (error) {
//         // החזר תגובת שגיאה אם יצירת המשתמש נכשלת
//         return res.status(400).json({ message: 'Invalid Photo', error });
//     }
// };

// // פונקציית אסינכרון כדי לאחזר את כל המשתמשים
// const getAllPhoto = async (req, res) => {
//     try {
//         // מצא את כל המשתמשים במסד הנתונים והמר לאובייקטי JavaScript רגילים
//         const photo = await Photo.find().lean();

//         // בדוק אם קיימים משתמשים; אם לא, החזר מערך ריק
//         if (!photo || photo.length === 0) {
//             return res.status(200).json({ message: 'No Photo found', photo: [] });
//         }

//         // החזר תגובת הצלחה עם רשימת המשתמשים
//         res.status(200).json(photo);
//     } catch (error) {
//         // החזר תגובת שגיאה אם אחזור משתמשים נכשל
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// }

// // פונקציית אסינכרון כדי לאחזר משתמש לפי מזהה
// const getPhotoById = async (req, res) => {
//     // חלץ מזהה משתמש מפרמטרי הבקשה
//     const { id } = req.params;

//     /// מצא משתמש לפי מזהה והמר לאובייקט JavaScript רגיל
//     const photo = await Photo.findById(id).lean()

//     // בדוק אם המשתמש קיים; אם לא, החזר תגובת שגיאה
//     if (!photo) {
//         return res.status(400).json({ message: 'No Photo found' });
//     }

//     // החזר תגובת הצלחה עם פרטי המשתמש
//     res.json(photo);
// }

// // פונקציית אסינכרון לעדכון משתמש
// const updatePhoto = async (req, res) => {
//     // פירוק נתוני משתמש מגוף הבקשה
//     const { _id,title, imageUrl } = req.body;

//     // בדוק אם זיהוי המשתמש מסופק; אם לא, החזר תגובת שגיאה
//     if (!_id) {
//         return res.status(400).json({ message: 'Photo ID is required' });
//     }

//     try {
//         // מצא ועדכן את המשתמש לפי מזהה עם הנתונים שסופקו
//         const photo = await Post.findByIdAndUpdate(
//             _id,
//             { title, imageUrl },
//             { new: true, runValidators: true }
//         );

//         // בדוק אם המשתמש לא נמצא; אם כן, החזר תגובת שגיאה
//         if (!photo) {
//             return res.status(404).json({ message: 'Photo not found' });
//         }

//         // החזר תגובת הצלחה עם פרטי המשתמש המעודכנים
//         res.json(`${photo.title} updated`);
//     } catch (error) {
//         // החזר תגובת שגיאה אם עדכון המשתמש נכשל
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// };



// // ID - פונקציית אסינכרון לעדכון משתמש לפי ה 
// const updatePhotoComplete = async (req, res) => {
//     const { id } = req.params
//             // מצא את המשתמשים, אך אל תשתמש ב-lean() כאן
//     const photo  = await Photo.findById(id).exec()
//     if (!photo)
//         return res.status(400).json("Photo nod found...")
//           // עדכן את השדה 'השלם'
//           photo.complete = !photo.complete
//             // שמור את השינויים
//     await photo.save()

//     res.json("succeed")

// }



// const deletePhoto = async (req, res) => {
//     // Find and delete the todo
//     const { id } = req.body;
//     const photo = await Photo.findByIdAndDelete({ _id: id }).exec();
  
//     // Send the response
//     let reply;
//     if (photo) {
//       reply = `photo '${photo.title}' ID ${photo._id} deleted`;
//     } else {
//       reply = 'No such todo found';
//     }
  
//     res.json(reply);
//   };


// // ייצא את הפונקציות המוגדרות לשימוש בקבצים אחרים
// module.exports = { createPhoto, getAllPhoto, getPhotoById, updatePhoto, deletePhoto, updatePhotoComplete }




// ייבא מודולים נדרשים ואת מודל המשתמש
const { json, text } = require("express");
const Photo = require("../models/Photo");

// פונקציית אסינכרון ליצירת משתמש חדש
const createPhoto = async (req, res) => {
    // פירוק נתוני משתמש מגוף הבקשה
    const { title,imageUrl  } = req.body;

    try {
        // צור משתמש חדש באמצעות מודל המשתמש והנתונים שסופקו
        const photo = await Photo.create({  title, imageUrl});

        // החזר תגובת הצלחה עם פרטי המשתמש שנוצרו
        return res.status(201).json({ message: 'New Photo created', Photo });
    } catch (error) {
        // החזר תגובת שגיאה אם יצירת המשתמש נכשלת
        return res.status(400).json({ message: 'Invalid Photo', error });
    }
};

// פונקציית אסינכרון כדי לאחזר את כל המשתמשים
const getAllPhoto = async (req, res) => {
    try {
        // מצא את כל המשתמשים במסד הנתונים והמר לאובייקטי JavaScript רגילים
        const photo = await Photo.find().lean();

        // בדוק אם קיימים משתמשים; אם לא, החזר מערך ריק
        if (!photo || photo.length === 0) {
            return res.status(200).json({ message: 'No photo found', photo: [] });
        }

        // החזר תגובת הצלחה עם רשימת המשתמשים
        res.status(200).json(photo);
    } catch (error) {
        // החזר תגובת שגיאה אם אחזור משתמשים נכשל
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

// פונקציית אסינכרון כדי לאחזר משתמש לפי מזהה
const getPhotoById = async (req, res) => {
    // חלץ מזהה משתמש מפרמטרי הבקשה
    const { id } = req.params;

    /// מצא משתמש לפי מזהה והמר לאובייקט JavaScript רגיל
    const photo = await Photo.findById(id).lean()

    // בדוק אם המשתמש קיים; אם לא, החזר תגובת שגיאה
    if (!photo) {
        return res.status(400).json({ message: 'No photo found' });
    }

    // החזר תגובת הצלחה עם פרטי המשתמש
    res.json(photo);
}

// פונקציית אסינכרון לעדכון משתמש
const updatePhoto = async (req, res) => {
    // פירוק נתוני משתמש מגוף הבקשה
    const { _id,title, imageUrl } = req.body;

    // בדוק אם זיהוי המשתמש מסופק; אם לא, החזר תגובת שגיאה
    if (!_id) {
        return res.status(400).json({ message: 'photo ID is required' });
    }

    try {
        // מצא ועדכן את המשתמש לפי מזהה עם הנתונים שסופקו
        const photo = await Photo.findByIdAndUpdate(
            _id,
            { title, imageUrl },
            { new: true, runValidators: true }
        );

        // בדוק אם המשתמש לא נמצא; אם כן, החזר תגובת שגיאה
        if (!photo) {
            return res.status(404).json({ message: 'photo not found' });
        }

        // החזר תגובת הצלחה עם פרטי המשתמש המעודכנים
        res.json(`${photo.title} updated`);
    } catch (error) {
        // החזר תגובת שגיאה אם עדכון המשתמש נכשל
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


// ID - פונקציית אסינכרון לעדכון משתמש לפי ה 
const updatePhotoComplete = async (req, res) => {
    const { id } = req.params;
            // מצא את המשתמשים, אך אל תשתמש ב-lean() כאן
    const photo = await Photo.findById(id).exec();
            if (!photo)
        return res.status(400).json("photo nod found...")
          // עדכן את השדה 'השלם'
          photo.complete = !photo.complete
            // שמור את השינויים
    await photo.save()

    res.json("succeed")

}



const deletePhoto = async (req, res) => {
    // Find and delete the todo
    const { id } = req.body;
    const photo = await Photo.findByIdAndDelete({ _id: id }).exec();
  
    // Send the response
    let reply;
    if (photo) {
      reply = `photo '${photo.title}' ID ${photo._id} deleted`;
    } else {
      reply = 'No such todo found';
    }
  
    res.json(reply);
  };

// ייצא את הפונקציות המוגדרות לשימוש בקבצים אחרים
module.exports = { createPhoto, getAllPhoto, getPhotoById, updatePhoto, deletePhoto, updatePhotoComplete }


