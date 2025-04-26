
import createHttpError from "http-errors";
import { createContact, deleteContact, getContactById, getContacts, updateContact } from "../services/contacts.js";
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from "../utils/parseSortParams.js";
import { contactFields } from "../db/models/Contact.js";
import { getEnvVar } from "../utils/getEnvVar.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";

export const getContactsControl = async (req, res) => {
  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query, contactFields);
  const userId = req.user;
  
  const data = await getContacts({ 
    ...paginationParams, 
    ...sortParams, 
    userId 
  });

  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: {
      data: data.data,
      page: paginationParams.page,
      perPage: paginationParams.perPage,
      totalItems: data.totalItems,
      totalPages: data.totalPages,
      hasPreviousPage: data.hasPreviousPage,
      hasNextPage: data.hasNextPage,
    },
  });
};


export const getContactsByIdControl = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  
  const data = await getContactById(id, userId);
  
  if (!data) {
    throw createHttpError(404, `Contact not found`);
  }
  
  res.json({
    status: 200,
    message: `Contact with id ${id} was found successfully`,
    data: data,
  });
};


export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  
  const data = await deleteContact(id, userId);
  
  if (!data) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  
  res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const photo = req.file;
  
  const updatePayload = { ...req.body };
  
  if (photo) {
    let photoUrl;
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
    updatePayload.photo = photoUrl;
  }

  const result = await updateContact(id, userId, updatePayload);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully updated a contact!`,
    data: {
      ...result.contact.toObject(), 
      photo: result.contact.photo 
    }
  });
};

export const postContactControl = async (req, res, next) => {
    const userId = req.user._id;
    const photo = req.file;

    const createPayload = { 
      ...req.body, 
      userId 
    };

    if (photo) {
      let photoUrl;
      if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
      createPayload.photo = photoUrl;
    }

    const data = await createContact(createPayload);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data,
    });
  
};