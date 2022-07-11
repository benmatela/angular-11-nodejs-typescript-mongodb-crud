import express from 'express';
import controller from '../controllers/employee.controller';

const router = express.Router();

router.get('/list', controller.list);
router.post('/create', controller.create);
router.put('/update', controller.update);
router.delete('/remove', controller.remove);

export = router;