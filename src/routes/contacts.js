import { Router } from "express";
import { deleteContactController, getContactsByIdControl, getContactsControl, patchContactController, postContactControl } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const contactsRouter = Router();


contactsRouter.get('/', ctrlWrapper(getContactsControl));

    
contactsRouter.get('/:id', ctrlWrapper(getContactsByIdControl));
contactsRouter.post('/', ctrlWrapper(postContactControl));
contactsRouter.delete('/:id', ctrlWrapper(deleteContactController));
contactsRouter.patch('/:id', ctrlWrapper(patchContactController));

export default contactsRouter;