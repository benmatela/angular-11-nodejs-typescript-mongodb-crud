import express from 'express';
import controller from '../controllers/employee.controller';

const router = express.Router();

router.get('/find-all', controller.findAll);
router.get('/create', controller.create);

export = router;