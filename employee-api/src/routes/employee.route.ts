import express from 'express';
import controller from '../controllers/employee.controller';

const router = express.Router();

router.get('/find-all', controller.findAll);

export = router;