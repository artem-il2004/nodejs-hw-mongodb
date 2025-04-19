import { Types } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      throw createHttpError(400,"wrong id");
    }

    next();
  } catch (error) {
    next(error); 
  }
};
