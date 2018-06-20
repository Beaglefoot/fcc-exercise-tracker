import { Router } from 'express';
import createUser from '../controllers/users/createUser';
import addExercise from '../controllers/users/addExercise';
import getExercises from '../controllers/users/getExercises';

const router = Router();

router.post('/', createUser);
router.post('/:userId/exercises', addExercise);
router.get('/:userId/exercises', getExercises);

export default router;
