import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from '../auth/auth.controller';
import { AuthValidation } from '../auth/auth.validate';
import { AdminController } from './admin.controller';

const router = express.Router();

router.post('/create-admin', AdminController.createAdmin);

router.get('/:id', AdminController.getSingleAdmin);
router.delete('/:id', AdminController.deleteAdmin);
router.patch('/:id', AdminController.updateAdmin);
router.get('/', AdminController.getAllAdmins);

//Admin login
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.logInAdmin
);


router.post(
  '/refresh-token',
 validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshTokenForAdmin
);


export const AdminRoutes = router;
