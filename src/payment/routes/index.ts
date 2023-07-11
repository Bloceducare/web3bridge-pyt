import { processPayment } from '../controller';
import { Router } from 'express';

const router = Router(); // create router to create route bundle

router.post('/payments', processPayment);
router.get('/payments', (req, res) => res.status(200).json({ message: 'payments' }));

export default router;
