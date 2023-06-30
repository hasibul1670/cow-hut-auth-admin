/* eslint-disable no-undef */
import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CowController } from './cow.controller';

const router = express.Router();
router.post(
  '/create-cow',
  auth(ENUM_USER_ROLE.SELLER),
  CowController.createCow
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  CowController.getAllCows
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  CowController.getSingleCow
);

router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);

router.patch('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.updateCow);

export const CowRoutes = router;
