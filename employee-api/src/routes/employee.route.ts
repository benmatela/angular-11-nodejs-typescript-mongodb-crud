import express from 'express';
import controller from '../controllers/employee.controller';

const router = express.Router();

router.get('/find-all', controller.findAll);
router.post('/create', controller.create);
router.put('/update', controller.update);
router.delete('/remove', controller.remove);

export = router;