import { Router } from 'express';
import { createUser, addExercise } from '../controllers/usersController';

const router = Router();

router.post('/', createUser);
router.post('/:userId/exercises', addExercise);

export default router;
