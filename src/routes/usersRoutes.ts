import { Router } from 'express';
import {
  createUser,
  addExercise,
  getExercises
} from '../controllers/usersController';

const router = Router();

router.post('/', createUser);
router.post('/:userId/exercises', addExercise);
router.get('/:userId/exercises', getExercises);

export default router;
