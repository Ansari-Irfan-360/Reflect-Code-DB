import express from 'express';

import { saveCode , deleteCode , getCode , checkServer } from '../controller/code-controller.js';

const router = express.Router();

router.post('/save', saveCode);
router.delete('/delete/:id', deleteCode);
router.get('/get/:id', getCode);

// To check if the server is starter
router.post('/check', checkServer);

export default router;
