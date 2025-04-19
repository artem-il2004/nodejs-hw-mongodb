import ContactCollection from "../db/models/Contact.js";
import { sortList } from "../utils/parseSortParams.js";


export const getContacts = async ({ 
  page = 1, 
  perPage = 10, 
  sortBy = "_id", 
  sortOrder = sortList[0], 
  userId 
}) => {
  const skip = (page - 1) * perPage;


  const query = { userId };

  const data = await ContactCollection
    .find(query)
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await ContactCollection.countDocuments(query);
  const totalPages = Math.ceil(totalItems / perPage);

  const currentPage = page;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return {
    data,
    totalItems,
    totalPages,
    currentPage,
    hasPreviousPage,
    hasNextPage,
  };
};


export const getContactById = async (id, userId) => { 
  try {
    const contactById = await ContactCollection.findOne({ _id: id, userId });
    return contactById;
  } catch (error) {
    console.error(error);
    return null; 
  }
};

export const createContact = (payload) => ContactCollection.create(payload);

export const deleteContact = async (id, userId) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: id,
    userId,
  });
  return contact;
};

export const updateContact = async (id, userId, payload, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(
    { _id: id, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) {
    return null; 
  }
  
  return {
    contact: rawResult.value,
    isNew: !(rawResult && rawResult.lastErrorObject?.updatedExisting),
  };
};