import { Router } from 'express';
import asyncMiddleware from '../middleware/async';
import createUser from '../controllers/users/createUser';
import addExercise from '../controllers/users/addExercise';
import getExercises from '../controllers/users/getExercises';

const router = Router();

router.post('/', asyncMiddleware(createUser));
router.post('/:userId/exercises', asyncMiddleware(addExercise));
router.get('/:userId/exercises', asyncMiddleware(getExercises));

export default router;
