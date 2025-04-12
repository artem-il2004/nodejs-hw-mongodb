import createHttpError from 'http-errors';

export const validateSchema = (schema) => {
  const func = async (req, res, next) => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });

      if (error) {
        throw createHttpError(400, error.message || 'Validation error');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
  return func;
};
