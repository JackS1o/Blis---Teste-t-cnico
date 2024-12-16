import express, { Request, Response } from 'express';
import {
  createUser,
  createUserDocument,
  destroyAbility,
  getUserAbilities,
  login,
  userAbilities,
} from '../controllers';
import {
  createUserDocumentValidationSchema,
  createUserValidationSchema,
  deleteAbilitiesValidationSchema,
  loginValidationSchema,
  updateUserValidationSchema,
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

router.post(
  '/abilities',
  authMiddleware,
  validate(updateUserValidationSchema),
  wrapHandler(userAbilities)
);

router.delete(
  '/abilities',
  authMiddleware,
  validate(deleteAbilitiesValidationSchema),
  wrapHandler(destroyAbility)
);

router.get('/abilities', authMiddleware, wrapHandler(getUserAbilities));

export default router;
