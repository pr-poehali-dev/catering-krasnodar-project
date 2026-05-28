CREATE TABLE IF NOT EXISTS preorders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  event_type VARCHAR(100),
  event_date DATE,
  guests_count INTEGER,
  budget VARCHAR(100),
  details TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_preorders_created_at ON preorders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_preorders_status ON preorders(status);