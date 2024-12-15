import express, { Request, Response } from 'express';
import { createUser, login } from '../controllers';
import {
  createUserValidationSchema,
  loginValidationSchema,
} from '../utils/userValidation';
import { wrapHandler } from '../../../services/response';
import { validate } from '../../middlewares/validation';

const router = express.Router();

router.post('/', validate(createUserValidationSchema), wrapHandler(createUser));

router.post('/login', validate(loginValidationSchema), wrapHandler(login));

export default router;
