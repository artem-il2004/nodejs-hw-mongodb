import { Router } from "express";
import { deleteContactController, getContactsByIdControl, getContactsControl, patchContactController, postContactControl } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

import {validateSchema} from '../utils/validateBody.js';
import { addContactSchema ,patchContactSchema} from "../validation/contacts.js";
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from "../middlewares/multer.js";





const contactsRouter = Router();


contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsControl));
contactsRouter.get('/:id', ctrlWrapper(getContactsByIdControl));
contactsRouter.post('/',upload.single('photo'), validateSchema(addContactSchema), ctrlWrapper(postContactControl));
contactsRouter.delete('/:id',isValidId, ctrlWrapper(deleteContactController));
contactsRouter.patch('/:id',isValidId,upload.single('photo'),validateSchema(patchContactSchema), ctrlWrapper(patchContactController));


export default contactsRouter;