School Test Calendar App

Setup Instructions
------------------
1. Create a Supabase project at https://app.supabase.com and note your SUPABASE_URL and SUPABASE_ANON_KEY.
2. Create a table named 'tests' with the following SQL:

CREATE TABLE tests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  date date NOT NULL,
  grade text NOT NULL,
  subject text NOT NULL,
  description text,
  created_by text,
  created_at timestamptz DEFAULT now()
);

-- Optional indexes
CREATE INDEX tests_date_idx ON tests(date);
CREATE INDEX tests_grade_idx ON tests(grade);

3. Copy your Supabase credentials into app.js.
4. Open index.html in your browser. The app is static and can be hosted on GitHub Pages or any static host.

Features
--------
- Add, edit, delete, and duplicate test entries on a calendar.
- Filter by grade.
- View per-day tests with subject color badges.
- All data stored in Supabase.

Notes
-----
- This is a prototype. Storing Supabase anon key in JS is not secure for production.
- For production, use Row Level Security (RLS) and server-side auth.
