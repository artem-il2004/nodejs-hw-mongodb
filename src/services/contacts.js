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

 
// ContactCollection.findOne({ _id: id})