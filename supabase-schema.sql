-- ReviewFlow Database Schema

-- Businesses table (one per account)
CREATE TABLE businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  google_review_url TEXT,
  yelp_review_url TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customers table
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Review requests table
CREATE TABLE review_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,
  method TEXT NOT NULL CHECK (method IN ('sms', 'email')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'opened', 'reviewed', 'feedback', 'failed')),
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  responded_at TIMESTAMPTZ,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT,
  twilio_sid TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Review responses (AI-drafted responses to Google reviews)
CREATE TABLE review_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  review_request_id UUID REFERENCES review_requests(id) ON DELETE SET NULL,
  reviewer_name TEXT,
  review_text TEXT,
  review_rating INTEGER,
  ai_draft TEXT,
  final_response TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'posted')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics / daily stats
CREATE TABLE daily_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  requests_sent INTEGER DEFAULT 0,
  requests_opened INTEGER DEFAULT 0,
  reviews_received INTEGER DEFAULT 0,
  avg_rating DECIMAL(3,2),
  feedback_received INTEGER DEFAULT 0,
  UNIQUE(business_id, date)
);

-- Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;

-- Policies: users can only access their own business data
CREATE POLICY "Users can view own business" ON businesses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own customers" ON customers FOR ALL USING (business_id IN (SELECT id FROM businesses WHERE user_id = auth.uid()));
CREATE POLICY "Users can manage own review requests" ON review_requests FOR ALL USING (business_id IN (SELECT id FROM businesses WHERE user_id = auth.uid()));
CREATE POLICY "Users can manage own review responses" ON review_responses FOR ALL USING (business_id IN (SELECT id FROM businesses WHERE user_id = auth.uid()));
CREATE POLICY "Users can view own stats" ON daily_stats FOR ALL USING (business_id IN (SELECT id FROM businesses WHERE user_id = auth.uid()));

-- Indexes
CREATE INDEX idx_customers_business ON customers(business_id);
CREATE INDEX idx_review_requests_business ON review_requests(business_id);
CREATE INDEX idx_review_requests_status ON review_requests(status);
CREATE INDEX idx_review_responses_business ON review_responses(business_id);
CREATE INDEX idx_daily_stats_business_date ON daily_stats(business_id, date);
