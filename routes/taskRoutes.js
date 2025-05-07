const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware');

router.get('/', protect, taskController.getAllTasks);
router.get('/:id', protect, taskController.getTaskById);
router.post('/', protect, taskController.createTask);
router.put('/:id', protect, taskController.updateTask);
router.delete('/:id', protect, taskController.deleteTask);

module.exports = router;


/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Kullanıcının görevlerini getir
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Başarılı listeleme
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Yeni görev oluştur
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Görev başarıyla oluşturuldu
 */
/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Görevi güncelle
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               done:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Görev güncellendi
 */
/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Görevi sil
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Görev silindi
 */
