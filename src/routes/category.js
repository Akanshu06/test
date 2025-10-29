const router = require('express').Router();
const categoryController = require('../controllers/categoryControllers');
const authMiddleware = require('../middleware/auth');


router.post('/category', authMiddleware, categoryController.createCategory);


router.get('/categories', authMiddleware, categoryController.getAllCategories);

router.put('/category/:categoryId', authMiddleware, categoryController.updateCategory);

router.delete('/category/:categoryId', authMiddleware, categoryController.deleteCategory);
router.post('/category/:categoryId/service', authMiddleware, categoryController.addServiceToCategory);

router.get('/category/:categoryId/services', authMiddleware, categoryController.getServicesInCategory);

router.delete('/category/:categoryId/service/:serviceId', authMiddleware, categoryController.deleteCategoryService);

router.put('/category/:categoryId/service/:serviceId', authMiddleware, categoryController.updateCategoryService);

module.exports = router;




