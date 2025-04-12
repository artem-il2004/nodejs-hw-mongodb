import ContactCollection from "../db/models/Contact.js";
import { sortList } from "../utils/parseSortParams.js";

export const getContacts = async ({ page = 1, perPage = 10,sortBy = "_id", sortOrder= sortList[0] }) => {
  const skip = (page - 1) * perPage;

  const data = await ContactCollection.find().skip(skip).limit(perPage).sort({[sortBy]: sortOrder});
  const totalItems = await ContactCollection.countDocuments(); 
  const totalPages = Math.ceil(totalItems / perPage);

  const currentPage = page;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};


export const getContactById = async (id) => { 
       try {
        const contactById = await ContactCollection.findById(id);
        return contactById;
    } catch (error) {
        console.error(error);
        return null; 
    }
};

export const createContact = payload => ContactCollection.create(payload);
 
export const deleteContact = async (id) => {
    const contact = await ContactCollection.findOneAndDelete({
    _id: id,
    });
    return contact;
};


export const updateContact = async (id, payload, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(
    { _id: id },
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