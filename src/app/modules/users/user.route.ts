import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';
const router = express.Router();

router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
  UserController.myProfile
);
router.patch(
  '/my-profile',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
  UserController.updateUserProfile
);

export const SignUpSellerRoutes = router.post(
  '/seller',
  UserController.createSeller
);
export const SignUpBuyerRoutes = router.post(
  '/buyer',
  UserController.createbuyer
);

export const OrderPostRoutes = router.post(
  '/orders',
  auth(ENUM_USER_ROLE.BUYER),
  UserController.orderCow
);

//access by admin,specific Buyer,specific Seller
export const OrderGetRoutes = router.get(
  '/orders',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  UserController.getAllOrders
);
export const singleOrderGetRoute = router.get(
  '/orders/:id',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  UserController.getAllOrders
);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

export const UserRoutes = router;
