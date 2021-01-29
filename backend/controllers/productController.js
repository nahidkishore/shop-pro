import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//@desc.... Fetch all products
//@route ... Get/api/products
// @access ....public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});
//@desc.... Fetch single products
//@route ... Get/api/products/:id
// @access ....public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
//@desc.... delete products
//@route ... DELETE /api/products/:id
// @access ....private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
//@desc.... create products
//@route ...POST /api/products
// @access ....private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
//@desc.... update products
//@route ...PUT /api/products/:id
// @access ....private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    description,
    category,
    brand,
    countInStock,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.description = description;
    product.category = category;
    product.brand = brand;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
