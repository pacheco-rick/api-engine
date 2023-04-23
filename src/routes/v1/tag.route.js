const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { tagValidation } = require('../../validations');
const { tagController } = require('../../controllers');

const { createTag, updateTag } = tagValidation;
const router = express.Router();

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Create a new tag
 *     description: Create a new tag associated with the authenticated user
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 */
router.post('/', auth(), validate(createTag), tagController.createTag);

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Get all tags
 *     description: Get a list of all tags created by the authenticated user
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 */
router.get('/', auth(), tagController.getTags);

/**
 * @swagger
 * /tags/{tagId}:
 *   get:
 *     summary: Get a tag by ID
 *     description: Get a specific tag by ID, if it belongs to the authenticated user
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 */
router.get('/:tagId', auth(), tagController.getTag);

/**
 * @swagger
 * /tags/{tagId}:
 *   patch:
 *     summary: Update a tag
 *     description: Update a specific tag by ID, if it belongs to the authenticated user
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 */

router.patch('/:tagId', auth(), validate(updateTag), tagController.updateTag);

/**
 * @swagger
 * /tags/{tagId}:
 *   delete:
 *     summary: Delete a tag
 *     description: Delete a specific tag by ID, if it belongs to the authenticated user
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content
 */
router.delete('/:tagId', auth(), tagController.deleteTag);

module.exports = router;
