
import createHttpError from "http-errors";
import { createContact, deleteContact, getContactById, getContacts, updateContact } from "../services/contacts.js";

export const getContactsControl = async (req, res) => {
    const data = await getContacts();
    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data
    });
    
};

export const getContactsByIdControl = async (req, res, next) => {
  const { id } = req.params;
    const data = await getContactById(id);
    if (!data) {
        throw createHttpError(404, `Contact not found`);
    }
    res.json({
        status: 200,
        message: `Contact with id ${id} was find successfully`,
        data: data,
    });
    
    
};

export const postContactControl = async (req, res) => { 
    const data = await createContact(req.body);
    console.log(req.params);
    
    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
		data,
    });
}; 

export const deleteContactController = async (req, res,next) => {
    const { id } = req.params;
    const data = await deleteContact(id);
    if (!data) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
   res.status(204).send();
};


export const patchContactController = async (req, res, next) => {
  const { id } = req.params;

  const result = await updateContact(id, req.body);

  if (!result) {
   next(createHttpError(404, 'Contact not found'));

  }


  res.status(200).json({
    status: 200,
    message: `Successfully updated a сontact!`,
    data: result.student,
  });
};