import express, { Request, Response } from 'express';
import { createUser } from '../controllers';
import { createUserValidationSchema } from '../utils/userValidation';
import { wrapHandler } from '../../../services/response';
import { validate } from '../../middlewares/validation';

const router = express.Router();

router.post('/', validate(createUserValidationSchema), wrapHandler(createUser));

export default router;
