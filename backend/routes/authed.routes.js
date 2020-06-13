import express from 'express';
import userController from '../controllers/users.controller';

const router = express.Router();

// User routes
router.post('/logout', userController.logoutUser);
router.get('/preferences', userController.getUserPreferences);
router.post('/preferences', userController.saveUserPreferences, userController.getUserPreferences);

export default router;
