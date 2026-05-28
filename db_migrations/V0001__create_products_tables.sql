CREATE TABLE IF NOT EXISTS t_p29985264_catering_krasnodar_p.products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER,
  category VARCHAR(100),
  portion VARCHAR(100),
  badge VARCHAR(100),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p29985264_catering_krasnodar_p.product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES t_p29985264_catering_krasnodar_p.products(id) ON UPDATE CASCADE,
  url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p29985264_catering_krasnodar_p.product_reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES t_p29985264_catering_krasnodar_p.products(id) ON UPDATE CASCADE,
  author_name VARCHAR(100) NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  text TEXT NOT NULL,
  event VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_active ON t_p29985264_catering_krasnodar_p.products(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_product_images ON t_p29985264_catering_krasnodar_p.product_images(product_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_product_reviews ON t_p29985264_catering_krasnodar_p.product_reviews(product_id, created_at DESC);