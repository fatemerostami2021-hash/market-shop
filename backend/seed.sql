-- seed.sql (sample data, safe to run more than once)

INSERT INTO categories (name, slug) VALUES
  ('Dairy', 'dairy'),
  ('Fruits and Vegetables', 'fruits-vegetables'),
  ('Beverages', 'beverages'),
  ('Household', 'household')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, discount_price, stock, barcode, category_id)
SELECT p.name, p.slug, p.description, p.price, p.discount_price, p.stock, p.barcode, c.id
FROM (VALUES
  ('Fresh Milk 1L',        'fresh-milk-1l',        'Pasteurized whole milk',        45000,  NULL,  120, '6260000000011', 'dairy'),
  ('Plain Yogurt 900g',    'plain-yogurt-900g',    'Creamy plain yogurt',           62000,  58000,  80, '6260000000028', 'dairy'),
  ('White Cheese 400g',    'white-cheese-400g',    'Traditional white cheese',      135000, NULL,   40, '6260000000035', 'dairy'),
  ('Red Apples 1kg',       'red-apples-1kg',       'Fresh red apples',              70000,  65000,  60, '6260000000042', 'fruits-vegetables'),
  ('Tomatoes 1kg',         'tomatoes-1kg',         'Ripe tomatoes',                 38000,  NULL,   90, '6260000000059', 'fruits-vegetables'),
  ('Cucumbers 1kg',        'cucumbers-1kg',        'Fresh cucumbers',               32000,  NULL,   70, '6260000000066', 'fruits-vegetables'),
  ('Mineral Water 1.5L',   'mineral-water-1-5l',   'Natural mineral water',         12000,  NULL,  300, '6260000000073', 'beverages'),
  ('Orange Juice 1L',      'orange-juice-1l',      '100 percent orange juice',      55000,  50000, 100, '6260000000080', 'beverages'),
  ('Dish Soap 750ml',      'dish-soap-750ml',      'Lemon dish washing liquid',     48000,  NULL,   75, '6260000000097', 'household'),
  ('Facial Tissue 200pcs', 'facial-tissue-200pcs', 'Soft 2-ply facial tissue',      30000,  NULL,  150, '6260000000103', 'household')
) AS p(name, slug, description, price, discount_price, stock, barcode, category_slug)
JOIN categories c ON c.slug = p.category_slug
ON CONFLICT (slug) DO NOTHING;
