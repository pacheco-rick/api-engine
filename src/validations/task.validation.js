const Joi = require('joi');

const titleValidation = () => Joi.string().min(3).max(50);
const descriptionValidation = () => Joi.string().allow(null, '').max(200);

const createTask = Joi.object({
  title: titleValidation().required(),
  description: descriptionValidation(),
});

const updateTask = Joi.object({
  title: titleValidation(),
  description: descriptionValidation(),
});

module.exports = {
  createTask,
  updateTask,
};
