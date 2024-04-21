import {Router} from 'express';
import FormController from '../modules/form/form.controller';


const router = Router();
const formController = new FormController();

router.get("/form",[formController.getForm]);
router.post("/form",[formController.submitForm]);

export default router;