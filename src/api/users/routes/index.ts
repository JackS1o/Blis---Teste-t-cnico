import express, { Request, Response } from 'express';
import { createUser, createUserDocument, login } from '../controllers';
import {
  createUserDocumentValidationSchema,
  createUserValidationSchema,
  loginValidationSchema,
} from '../utils/userValidation';
import { wrapHandler } from '../../../services/response';
import { validate } from '../../middlewares/validation';
import { authMiddleware } from '../../middlewares/tokenValidation';
import { upload } from '../../middlewares/uploads';

const router = express.Router();

router.post('/', validate(createUserValidationSchema), wrapHandler(createUser));

router.post('/login', validate(loginValidationSchema), wrapHandler(login));

router.post(
  '/documents',
  authMiddleware,
  upload.single('file'),
  validate(createUserDocumentValidationSchema),
  wrapHandler(createUserDocument)
);

export default router;
