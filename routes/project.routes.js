const express = require('express');
const projectController = require('../controllers/project.controller')


const router = express.Router();

router.post('/', projectController.createProject);
router.get('/:id', projectController.getProjectById);
router.get('/', projectController.getAllProjects);
router.get('/user/:id', projectController.getProjectsByUserId);
router.put('/:id', projectController.updateProjectById);
router.patch('/favorite/:id', projectController.updateIsFavoriteById);
router.delete('/:id', projectController.deleteProjectById);

module.exports = router;