const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController');
const verifyRole = require('../middleware/verfyRole');
const { profileUpload } = require('../middleware/upload');

router.use(verifyRole('college'));

router.get('/details$', collegeController.getCollege);

router.get('/profile$', collegeController.getProfile);

router.post('/institution$', collegeController.postInstitution);

router.post('/principal$', collegeController.postPrincipal);

router.post('/placement$', collegeController.postPlacement);

router.post('/course$', collegeController.postCourse);

router.post('/profile$', profileUpload.single('profile'), collegeController.postProfile);

router.put('/institution$', collegeController.putInstitution);

router.put('/principal$', collegeController.putPrincipal);

router.put('/placement$', collegeController.putPlacement);

router.put('/course$', collegeController.putCourse);

router.delete('/course/:courseId', collegeController.deleteCourse);

module.exports = router;