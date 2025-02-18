const { Product, Category } = require("../models/index");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({ error: "Name and category are required" });
    }

    const product = await Product.create({ name, description, categoryId });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { categoryId, id } = req.body;

    if (!categoryId || !id) {
      return res
        .status(400)
        .json({ error: "Category and product ID are required" });
    }

    const product = await Product.findOne({ where: { id, categoryId } });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.destroy();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, categoryId } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.categoryId = categoryId || product.categoryId;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: products } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, products, totalPages, currentPage };
};

exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;

    const { limit, offset } = getPagination(page, size);

    const products = await Product.findAndCountAll({
      include: { model: Category, attributes: ["id", "name"] },
      limit,
      offset,
    });

    const response = getPagingData(products, page, limit);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
};
