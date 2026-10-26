// backend/routes/productRoutes.js
const express = require('express');
const { pool } = require('../db');

const router = express.Router();

// GET /api/products?page=1&limit=20
router.get('/', async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
    const offset = (page - 1) * limit;

    const result = await pool.query(
      `SELECT p.id, p.name, p.slug, p.description, p.price, p.discount_price, p.stock, p.image_url,
              c.slug AS category
       FROM products p
       LEFT JOIN categories c ON c.id = p.category_id
       WHERE p.is_active = TRUE
       ORDER BY p.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.json({ success: true, page, limit, count: result.rows.length, data: result.rows });
  } catch (err) {
    console.error('[ERROR] Fetching products:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ success: false, message: 'Invalid product id' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1 AND is_active = TRUE',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('[ERROR] Fetching product:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
