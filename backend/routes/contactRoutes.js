
import express from 'express';
import { submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

// Contact form route
router.post('/', submitContactForm);

export default router;
