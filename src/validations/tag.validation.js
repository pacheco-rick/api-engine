const Joi = require('joi');

const nameValidation = () => Joi.string().min(3).max(30);
const descriptionValidation = () => Joi.string().allow(null, '').max(200);

const createTag = Joi.object({
  name: nameValidation().required(),
  description: descriptionValidation(),
});

const updateTag = Joi.object({
  name: nameValidation(),
  description: descriptionValidation(),
});

module.exports = {
  createTag,
  updateTag,
};
