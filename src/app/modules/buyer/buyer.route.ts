import express from 'express';
import { BuyerController } from './buyer.controller';



const router = express.Router();


router.get('/:id', BuyerController.getSingleBuyer);
router.delete('/:id', BuyerController.deleteBuyer);
router.patch('/:id', BuyerController.updateBuyer);
router.get('/', BuyerController.getAllBuyers);

export const BuyerRoutes = router;
