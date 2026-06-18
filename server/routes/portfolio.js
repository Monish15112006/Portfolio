const express = require('express');
const router = express.Router();
const {
  getProfile,
  getProjects,
  getSkills,
  getAchievements,
  sendMessage,
} = require('../controllers/portfolioController');

router.get('/profile', getProfile);
router.get('/projects', getProjects);
router.get('/skills', getSkills);
router.get('/achievements', getAchievements);
router.post('/contact', sendMessage);

module.exports = router;
