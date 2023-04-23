const httpStatus = require('http-status');
const { Tag } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a tag
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createTag(req, res) {
  const tagData = {
    ...req.body,
    userId: req.user.id,
  };
  const tag = await Tag.create(tagData);
  res.status(httpStatus.CREATED).send(tag);
}

/**
 * Get all tags
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getTags(req, res) {
  const tags = await Tag.find({ userId: req.user.id });
  res.send(tags);
}

/**
 * Get tag by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getTag(req, res) {
  const tag = await Tag.findOne({ _id: req.params.tagId, userId: req.user.id });

  if (!tag) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tag not found');
  }

  res.send(tag);
}

/**
 * Update tag
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updateTag(req, res) {
  const tag = await Tag.findOneAndUpdate({ _id: req.params.tagId, userId: req.user.id }, req.body, { new: true });

  if (!tag) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tag not found');
  }

  res.send(tag);
}

/**
 * Delete tag
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteTag(req, res) {
  const tag = await Tag.findOneAndDelete({ _id: req.params.tagId, userId: req.user.id });

  if (!tag) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tag not found');
  }

  res.status(httpStatus.NO_CONTENT).send();
}

module.exports = {
  createTag,
  getTags,
  getTag,
  updateTag,
  deleteTag,
};
