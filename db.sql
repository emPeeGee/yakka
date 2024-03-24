-- Create a table for public profiles

-- drop trigger on_auth_user_created on auth.users;
-- drop function handle_new_user();
-- drop table profiles;

create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  avatar_url text,
  first_name text,
  last_name text,
  age integer
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Profiles are viewable by users who created them." on profiles 
  for select using (auth.uid() = id);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);


-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.

create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name, age, avatar_url)
  values (new.id, new.raw_user_meta_data->>'first_name',new.raw_user_meta_data->>'last_name', new.raw_user_meta_data['age']::integer, new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage!
-- insert into storage.buckets (id, name)
--   values ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');



-- Create the admin role
CREATE ROLE admin_role;

CREATE TABLE word_categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

alter table word_categories
  enable row level security;

-- Create a policy on the 'words' table to restrict access to admins
CREATE POLICY admin_only_policy ON word_categories
    FOR ALL
    TO admin_role
    USING (true); -- Allow access for admins

INSERT INTO word_categories (category_name) VALUES
    ('animals'),
    -- Add the remaining categories here
    ('category15');

CREATE POLICY read_only_policy ON word_categories
    FOR SELECT
    TO public
    USING (true);  -- Allow SELECT for everyone

-- Words Table
CREATE TABLE words (
    word_id SERIAL PRIMARY KEY,
    word VARCHAR(100) NOT NULL,
    category_id INT REFERENCES word_categories(category_id),
    pronunciation VARCHAR(100),
    definition TEXT NOT NULL,
    example TEXT,
    part_of_speech VARCHAR(50),  -- Added part_of_speech field to specify the part of speech
    synonyms TEXT[],  -- Changed to an array to store multiple synonyms
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


alter table words
  enable row level security;

-- Create a policy on the 'words' table to restrict access to admins
CREATE POLICY admin_only_policy ON words
    FOR ALL
    TO admin_role
    USING (true); -- Allow access for admins

-- Create a policy on the 'words' table to allow SELECT operations for all users
CREATE POLICY read_only_policy ON words
    FOR SELECT
    TO public
    USING (true);  -- Allow SELECT for everyone



-- Insert statement for the word "cat"
INSERT INTO words (word, category_id, pronunciation, definition, example_sentence, part_of_speech, synonyms)
VALUES (
    'cat',
    (SELECT category_id FROM word_categories WHERE category_name = 'animals1'),
    '/kæt/',
    'feline mammal usually having thick soft fur and no ability to roar: domestic cats',
    'wildcats',
    'noun',
    '{"true cat"}'
);

-- Insert statement for the word "dog"
INSERT INTO words (word, category_id, pronunciation, definition, part_of_speech, synonyms)
VALUES (
    'dog',
    (SELECT category_id FROM word_categories WHERE category_name = 'animals1'),
    '/dɔːɡ/',
    'a member of the genus Canis (probably descended from the common wolf) that has been domesticated by man since prehistoric times',
    'noun',
    '{"domestic dog"}'
);




-- Vocabulary Table
CREATE TABLE words_users (
  id SERIAL PRIMARY KEY,
  user_id uuid references auth.users on delete cascade not null,
  word_id INT REFERENCES words(word_id) NOT NULL 
  liked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

alter table words_users
  enable row level security;

CREATE POLICY user_access_policy ON words_users
    FOR ALL
    TO public
    USING (auth.uid() = user_id);

-- Explore Table
CREATE TABLE explore (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    description TEXT,
    lesson_content TEXT, -- Content of the lesson (Markdown or any other format)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Explore_Users Table
CREATE TABLE explore_users (
    id SERIAL PRIMARY KEY,
    item_id INT NOT NULL,
    user_id uuid references auth.users on delete cascade not null,
    liked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (item_id) REFERENCES explore (item_id)
);


-- Learn Path Table
CREATE TABLE learn_path (
    lesson_id SERIAL PRIMARY KEY,
    lesson_name VARCHAR(100) NOT NULL,
    lesson_description TEXT,
    experience_earned INT DEFAULT 0,
    balloons_earned INT DEFAULT 0,
    user_id uuid references auth.users on delete cascade not null,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- drop table words_users;
-- drop table words;
-- drop table explore_users;
-- drop table explore;
-- drop table learn_path;
-- drop table users;

-- Grant SELECT, INSERT, UPDATE, DELETE permissions on explore_users and vocabulary to regular users
GRANT SELECT, INSERT, UPDATE, DELETE ON explore_users TO regular_user_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON words_users TO regular_user_role;

-- Only grant SELECT permissions on words and explore to regular users
GRANT SELECT ON words TO regular_user_role;
GRANT SELECT ON explore TO regular_user_role;

-- Grant all permissions on words and explore to admin users
GRANT ALL PRIVILEGES ON words TO admin_role;
GRANT ALL PRIVILEGES ON explore TO admin_role;
