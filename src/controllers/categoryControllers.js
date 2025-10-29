const user = require('../models/user');
const jwt = require('jsonwebtoken');
const Category = require('../models/category');
const Service = require('../models/service');
const ServicePriceOption = require('../models/servicePriceOption');


// Create Category
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = await Category.create({ name, description });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get All Categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get Category by ID
const getCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const addServiceToCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name, description, priceOptions } = req.body;
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const newService = await category.createService({ name, description, priceOptions });
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getServicesInCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findByPk(categoryId, { include: 'services' });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category.services);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Update Category by ID
const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name, description } = req.body;
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        category.name = name;
        category.description = description;
        await category.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const deleteCategoryService = async (req, res) => {
    try {
        const { categoryId, serviceId } = req.params;
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const service = await category.getServices({ where: { id: serviceId } });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        await service.destroy();
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const updateCategoryService = async (req, res) => {
    try {
        const { categoryId, serviceId } = req.params;    
        const { name, description, priceOptions } = req.body;
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const service = await category.getServices({ where: { id: serviceId } });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        service.name = name;
        service.description = description;
        service.priceOptions = priceOptions;
        await service.save();
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Delete Category by ID
const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        await category.destroy();
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    addServiceToCategory,
    getServicesInCategory,
    deleteCategoryService,
    updateCategoryService
};

// - Create an API to add categories as per the Category Schema.
//     POST /category
// - Create an API to get a list of all categories.
//      GET /categories
// - Create an API to update a single category as per the schema.
//     PUT /category/:categoryId
// - Create an API to remove empty(With no services) category only.
//      DELETE /category/:categoryId
// - Create an API to add services as per the Service Schema.
//     POST /category/:categoryId/service
// - Create an API to get a list of all services inside any category.
//     GET /category/:categoryId/services
// - Create an API to remove service from category.
//     DELETE /category/:categoryId/service/:serviceId
// - Create an API to update service as per the service schema.
//     PUT /category/:categoryId/service/:serviceId
// - We are able to add/remove/update price options of any service while updating using the above API.

