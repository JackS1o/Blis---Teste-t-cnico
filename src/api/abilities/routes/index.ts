import express, { Request, Response } from 'express';
import { wrapHandler } from '../../../services/response';
import { validate } from '../../middlewares/validation';
import { authMiddleware } from '../../middlewares/tokenValidation';
import { createAbilityValidationSchema, updateAbilityValidationSchema } from '../utils/abilitiesValidation';
import { createAbility, updateAbility } from '../controllers';

const router = express.Router();

router.post('/', authMiddleware, validate(createAbilityValidationSchema), wrapHandler(createAbility));

router.put('/:id', authMiddleware, validate(updateAbilityValidationSchema), wrapHandler(updateAbility));

export default router;
