export interface Business {
  id: string;
  user_id: string;
  name: string;
  phone: string | null;
  email: string | null;
  google_review_url: string | null;
  yelp_review_url: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  business_id: string;
  name: string;
  phone: string | null;
  email: string | null;
  created_at: string;
}

export interface ReviewRequest {
  id: string;
  business_id: string;
  customer_id: string | null;
  customer_name: string;
  customer_phone: string | null;
  customer_email: string | null;
  method: "sms" | "email";
  status: "pending" | "sent" | "delivered" | "opened" | "reviewed" | "feedback" | "failed";
  sent_at: string | null;
  opened_at: string | null;
  responded_at: string | null;
  rating: number | null;
  feedback_text: string | null;
  twilio_sid: string | null;
  created_at: string;
}

export interface ReviewResponse {
  id: string;
  business_id: string;
  review_request_id: string | null;
  reviewer_name: string | null;
  review_text: string | null;
  review_rating: number | null;
  ai_draft: string | null;
  final_response: string | null;
  status: "draft" | "approved" | "posted";
  created_at: string;
}

export interface DailyStats {
  id: string;
  business_id: string;
  date: string;
  requests_sent: number;
  requests_opened: number;
  reviews_received: number;
  avg_rating: number | null;
  feedback_received: number;
}
