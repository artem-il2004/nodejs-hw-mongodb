import ContactCollection from "../db/models/Contact.js";

export const getContacts = async () => ContactCollection.find();

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
// ContactCollection.findOne({ _id: id})


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

  if (!rawResult || !rawResult.value) return null;

  return {
  student: rawResult.value,
  isNew: !rawResult?.lastErrorObject?.updatedExisting
};
};