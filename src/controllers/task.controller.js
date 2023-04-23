const httpStatus = require('http-status');
const { Task } = require('../models');
const ApiError = require('../utils/ApiError');

async function createTask(req, res) {
  const taskData = {
    ...req.body,
    userId: req.user.id,
  };
  const task = await Task.create(taskData);
  res.status(httpStatus.CREATED).send(task);
}

async function getTasks(req, res) {
  const tasks = await Task.find({ userId: req.user.id });
  res.send(tasks);
}

async function getTask(req, res) {
  const task = await Task.findOne({ _id: req.params.taskId, userId: req.user.id });

  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }

  res.send(task);
}

async function updateTask(req, res) {
  const task = await Task.findOneAndUpdate({ _id: req.params.taskId, userId: req.user.id }, req.body, { new: true });

  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }

  res.send(task);
}

async function deleteTask(req, res) {
  const task = await Task.findOneAndDelete({ _id: req.params.taskId, userId: req.user.id });

  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }

  res.status(httpStatus.NO_CONTENT).send();
}

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
