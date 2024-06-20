import express from 'express';

import { saveCode , deleteCode , getCode } from '../controller/code-controller.js';

const router = express.Router();

router.post('/save', saveCode);
router.delete('/delete/:id', deleteCode);
router.get('/get/:id', getCode);

export default router;