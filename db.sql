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

-- drop table favorite_words;
-- drop table words;
-- drop table explore_users;
-- drop table explore;
-- drop table learn_path;
-- drop table users;

drop function get_random_words;
drop function get_daily_word;
drop type random_word_record;
drop table daily_words;
drop table favorite_words;
drop table words;
drop table word_categories;

CREATE TABLE word_categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    emoji TEXT NOT NULL
);

alter table word_categories
  enable row level security;

-- Create a policy on the 'words' table to restrict access to admins
CREATE POLICY admin_only_policy ON word_categories
    FOR ALL
    TO admin_role
    USING (true); -- Allow access for admins

INSERT INTO word_categories (category_name, emoji) VALUES
 ('voc.allWords', '🍓'),
 ('voc.animals', '🦔'),
 ('voc.colorsBasic', '🌈'),
 ('voc.colorsIntermediate', '🌈'),
 ('voc.colorsAdvanced', '🌈'),
 ('voc.shapesBasic', '🟦'),
 ('voc.shapesIntermediate', '🟦'),
 ('voc.emotions', '😊'),
 ('voc.actionsPhysical', '🏃'),
 ('voc.actionsCommunication', '🙋🏻‍♂️'),
 ('voc.actionsSocial', '🤦‍♀️'),
 ('voc.activities', '🏄'),
 ('voc.fruits', '🍉'),
 ('voc.vegetables', '🥕'),
 ('voc.transport', '🚜'),
 ('voc.pets', '🐾'),
 ('voc.weather', '☀️'),
 ('voc.foodDrinks', '🍷' ),
 ('voc.bodyParts','👂' ),
 ('voc.family', '👪'),
 ('voc.schoolEducation', '🏫' ),
 ('voc.jobs', '🎃');


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


-- Insert statements for the words table (animals category)
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('lion', 2, '/ˈlaɪən/', 'A large, powerful carnivore of the family Felidae, native to Africa and India.', 'We saw a pride of lions resting under a tree.', 'noun', '{"big cat", "predator"}'),
  ('elephant', 2, '/ˈɛlɪfənt/', 'A very large plant-eating mammal with a trunk, long curved ivory tusks, and large ears.', 'We went on a safari and saw an elephant herd crossing the river.', 'noun', '{"pachyderm", "tusk"}'),
  ('tiger', 2, '/ˈtaɪɡər/', 'A large solitary cat that has a yellowish-brown coat with black stripes.', 'The tiger stealthily stalked its prey through the jungle.', 'noun', '{"big cat", "predator"}'),
  ('giraffe', 2, '/dʒɪˈræf/', 'A large African mammal with a very long neck and forelegs, having a coat patterned with brown patches separated by lighter lines.', 'We visited the zoo and fed leaves to the giraffes.', 'noun', '{"tall", "herbivore"}'),
  ('zebra', 2, '/ˈziːbrə/', 'An African wild horse with black-and-white stripes and an erect mane.', 'We spotted a herd of zebras grazing on the savannah.', 'noun', '{"striped", "herbivore"}'),
  ('hippopotamus', 2, '/ˌhɪpəˈpɒtəməs/', 'A large herbivorous aquatic mammal with a thick skin and broad mouth, native to sub-Saharan Africa.', 'We took a boat tour and saw hippos basking in the river.', 'noun', '{"hippo", "river horse"}'),
  ('penguin', 2, '/ˈpɛŋɡwɪn/', 'A flightless seabird of the southern hemisphere, with black upper parts and white underparts and wings developed into flippers for swimming underwater.', 'We visited Antarctica and saw colonies of penguins.', 'noun', '{"bird", "aquatic"}'),
  ('crocodile', 2, '/ˈkrɒkədaɪl/', 'A large predatory semiaquatic reptile with long jaws, long tail, short legs, and a horny textured skin.', 'We went on a safari and saw a crocodile basking on the riverbank.', 'noun', '{"reptile", "predator"}'),
  ('koala', 2, '/ˈkəʊələ/', 'A tree-dwelling marsupial native to Australia, with dense fur and large ears.', 'We visited an Australian sanctuary and saw koalas sleeping in eucalyptus trees.', 'noun', '{"marsupial", "bear"}'),
  ('panda', 2, '/ˈpændə/', 'A large bearlike mammal with characteristic black and white markings, native to certain mountain forests of central and western China.', 'We went to a zoo and watched the pandas eating bamboo.', 'noun', '{"bear", "bamboo eater"}');

-- Basic colors
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('red', 3, '/rɛd/', 'Having a color resembling blood or a ruby.', 'The ripe tomatoes were bright red.', 'adjective', '{"crimson", "scarlet"}'),
  ('blue', 3, '/bluː/', 'Of a color intermediate between green and violet.', 'The sky was clear and blue.', 'adjective', '{"azure", "cobalt"}'),
  ('green', 3, '/ɡriːn/', 'Of the color between blue and yellow in the spectrum; colored like grass or emeralds.', 'The lush grass was a vibrant shade of green.', 'adjective', '{"emerald", "verdant"}'),
  ('yellow', 3, '/ˈjɛləʊ/', 'Of the color between green and orange in the spectrum; colored like ripe lemons or egg yolks.', 'The sunflower petals were a brilliant shade of yellow.', 'adjective', '{"golden", "sunny"}'),
  ('orange', 3, '/ˈɒrɪndʒ/', 'Of the color between red and yellow in the spectrum; colored like ripe carrots or pumpkins.', 'The autumn leaves turned a deep shade of orange.', 'adjective', '{"tangerine", "copper"}'),
  ('purple', 3, '/ˈpɜːrpl/', 'Of a color intermediate between red and blue.', 'She wore a stunning dress in deep purple.', 'adjective', '{"violet", "lavender"}'),
  ('pink', 3, '/pɪŋk/', 'Of a color intermediate between red and white, as of coral or salmon.', 'The baby blanket was a soft shade of pink.', 'adjective', '{"rose", "blush"}'),
  ('brown', 3, '/braʊn/', 'Of a color produced by mixing red, yellow, and black, as of dark wood or rich soil.', 'The bear''s fur was a deep shade of brown.', 'adjective', '{"chestnut", "mahogany"}'),
  ('black', 3, '/blæk/', 'Of the very darkest color owing to the absence of or complete absorption of light.', 'The night sky was filled with stars against a backdrop of black.', 'adjective', '{"ebony", "charcoal"}'),
  ('white', 3, '/waɪt/', 'Of the color of milk or fresh snow, due to the reflection of all visible rays of light; the opposite of black.', 'She wore a beautiful gown in pure white.', 'adjective', '{"ivory", "snowy"}');


-- Intermediate colors
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('teal', 4, '/tiːl/', 'A dark greenish-blue color.', 'The walls of the room were painted in a soothing shade of teal.', 'noun', '{"blue-green", "aquamarine"}'),
  ('maroon', 4, '/məˈruːn/', 'A dark brownish-red color.', 'She wore a maroon sweater to stay warm in the chilly weather.', 'noun', '{"burgundy", "wine-red"}'),
  ('turquoise', 4, '/ˈtɜːrkɔɪz/', 'A greenish-blue color like that of the semiprecious stone.', 'She admired the beautiful turquoise waters of the Caribbean.', 'noun', '{"aqua", "cyan"}'),
  ('magenta', 4, '/məˈdʒen.tə/', 'A deep purplish-red color.', 'The magenta flowers added a pop of color to the garden.', 'noun', '{"fuchsia", "hot pink"}'),
  ('lavender', 4, '/ˈlæv.ən.dɚ/', 'A pale bluish-purple color.', 'Her bedroom walls were painted in a calming shade of lavender.', 'noun', '{"lilac", "violet-blue"}'),
  ('taupe', 4, '/toʊp/', 'A brownish-gray color.', 'She chose a taupe carpet to complement the neutral tones in her living room.', 'noun', '{"beige", "greige"}'),
  ('indigo', 4, '/ˈɪn.dɪ.ɡoʊ/', 'A deep rich blue color.', 'The indigo sky was dotted with stars on a clear night.', 'noun', '{"navy", "sapphire"}'),
  ('chartreuse', 4, '/ʃɑːrˈtruːz/', 'A color between yellow and green that was named because of its resemblance to the green color of one of the French liqueurs called green chartreuse.', 'She added a splash of chartreuse to her painting to make it stand out.', 'noun', '{"lime", "citron"}'),
  ('olive', 4, '/ˈɑː.lɪv/', 'A dark yellowish-green color.', 'The olive trees cast a cool shade over the courtyard.', 'noun', '{"khaki", "army green"}'),
  ('salmon', 4, '/ˈsæm.ən/', 'A pinkish-orange color.', 'She cooked a delicious salmon dish for dinner.', 'noun', '{"coral", "peach"}');

-- Advanced colors
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('cerulean', 5, '/sɪˈruː.li.ən/', 'A deep sky-blue color.', 'The cerulean waters of the Caribbean were breathtaking.', 'noun', '{"azure", "sky-blue"}'),
  ('vermilion', 5, '/vəˈmɪl.jən/', 'A brilliant red or scarlet pigment made from mercury sulfide.', 'She used vermilion paint to add vibrant accents to her artwork.', 'noun', '{"cinnabar", "scarlet"}'),
  ('periwinkle', 5, '/ˈpɛr.ɪˌwɪŋ.kəl/', 'A pale blue color.', 'She wore a periwinkle dress to the wedding.', 'noun', '{"lavender-blue", "mauve"}'),
  ('saffron', 5, '/ˈsæf.rən/', 'An orange-yellow color.', 'The saffron robes of the monks stood out against the gray landscape.', 'noun', '{"golden", "amber"}'),
  ('aubergine', 5, '/ˈoʊ.bər.ʒiːn/', 'A dark purple color.', 'She painted the walls of her study in aubergine to create a cozy atmosphere.', 'noun', '{"eggplant", "plum"}'),
  ('cyan', 5, '/saɪˈæn/', 'A greenish-blue color.', 'The cyan sky stretched endlessly above them.', 'noun', '{"turquoise", "aqua"}'),
  ('marigold', 5, '/ˈmær.ɪ.ɡoʊld/', 'A bright yellow or orange flower.', 'She planted marigolds in her garden to add a splash of color.', 'noun', '{"golden-yellow", "orange"}'),
  ('taupe', 5, '/toʊp/', 'A grayish-brown color.', 'She decorated her living room in shades of taupe and cream.', 'noun', '{"beige", "greige"}'),
  ('lavender', 5, '/ˈlæv.ən.dɚ/', 'A pale purple color.', 'The fields were covered in rows of blooming lavender.', 'noun', '{"lilac", "violet"}'),
  ('mauve', 5, '/moʊv/', 'A pale purple color.', 'She painted her bedroom walls in a soft shade of mauve.', 'noun', '{"lilac", "lavender"}');

-- Shapes basic
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('circle', 6, '/ˈsɜːr.kəl/', 'A round plane figure whose boundary (the circumference) consists of points equidistant from a fixed point (the center).', 'The children drew circles on the paper with colorful markers.', 'noun', '{"round", "ring"}'),
  ('square', 6, '/skwɛər/', 'A plane figure with four equal straight sides and four right angles.', 'She drew a perfect square on the whiteboard.', 'noun', '{"quadrilateral", "rectangle"}'),
  ('triangle', 6, '/ˈtraɪˌæŋ.ɡəl/', 'A plane figure with three straight sides and three angles.', 'The roof of the house was in the shape of a triangle.', 'noun', '{"trigon", "pyramid"}'),
  ('rectangle', 6, '/ˈrek.tæŋ.ɡəl/', 'A plane figure with four straight sides and four right angles, especially one with unequal adjacent sides, in contrast to a square.', 'She cut out rectangles of colored paper for the art project.', 'noun', '{"oblong", "square"}'),
  ('oval', 6, '/ˈoʊ.vəl/', 'A shape resembling an egg or an ellipse.', 'The pond had an oval shape.', 'noun', '{"ellipse", "egg-shaped"}'),
  ('pentagon', 6, '/ˈpen.tə.ɡɑːn/', 'A plane figure with five straight sides and five angles.', 'The star was drawn inside a pentagon.', 'noun', '{"five-sided polygon", "hexagon"}'),
  ('hexagon', 6, '/ˈhek.sə.ɡɑːn/', 'A plane figure with six straight sides and angles.', 'The honeycomb cells had a hexagonal shape.', 'noun', '{"six-sided polygon", "octagon"}'),
  ('octagon', 6, '/ˈɒk.tə.ɡɒn/', 'A plane figure with eight straight sides and angles.', 'The stop sign had an octagonal shape.', 'noun', '{"eight-sided polygon", "hexagon"}');

-- Shapes intermediate
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('sphere', 7, '/sfɪər/', 'A round solid figure, or its surface, with every point on its surface equidistant from its center.', 'The crystal ball was a perfect sphere.', 'noun', '{"ball", "globe"}'),
  ('diamond', 7, '/ˈdaɪ.mənd/', 'A figure with four straight sides of equal length in the shape of a rhombus.', 'She wore a diamond-shaped pendant around her neck.', 'noun', '{"rhombus", "gemstone"}'),
  ('rhombus', 7, '/ˈrɒm.bəs/', 'A parallelogram with opposite equal acute angles, opposite equal obtuse angles, and four equal sides.', 'She used a rhombus-shaped template to create the design.', 'noun', '{"diamond", "square"}'),
  ('trapezoid', 7, '/ˈtræp.ɪ.zɔɪd/', 'A quadrilateral with at least one pair of parallel sides.', 'The roof of the barn was in the shape of a trapezoid.', 'noun', '{"trapezium", "quadrilateral"}'),
  ('cylinder', 7, '/ˈsɪl.ɪn.dər/', 'A solid geometric figure with straight parallel sides and a circular or oval cross section.', 'The engine had a cylinder-shaped housing.', 'noun', '{"tube", "barrel"}'),
  ('cone', 7, '/koʊn/', 'A solid or hollow object that tapers from a circular or roughly circular base to a point.', 'She made an ice cream cone with two scoops of chocolate.', 'noun', '{"pyramid", "taper"}'),
  ('cube', 7, '/kjuːb/', 'A symmetrical three-dimensional shape, either solid or hollow, contained by six equal squares.', 'The toy box was shaped like a cube.', 'noun', '{"block", "dice"}');


-- Insert words related to emotions
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('happy', 8, '/ˈhæp.i/', 'Feeling or showing pleasure or contentment.', 'She felt happy when she received good news.', 'adjective', '{"joyful", "glad"}'),
  ('sad', 8, '/sæd/', 'Feeling or showing sorrow or unhappiness.', 'He felt sad when his pet passed away.', 'adjective', '{"unhappy", "melancholy"}'),
  ('angry', 8, '/ˈæŋ.ɡri/', 'Feeling or showing strong annoyance, displeasure, or hostility.', 'She was angry when her plans were canceled.', 'adjective', '{"irate", "furious"}'),
  ('excited', 8, '/ɪkˈsaɪ.tɪd/', 'Feeling or showing enthusiasm, eagerness, or anticipation.', 'He was excited about his upcoming trip.', 'adjective', '{"enthusiastic", "thrilled"}'),
  ('afraid', 8, '/əˈfreɪd/', 'Feeling fear or anxiety; frightened.', 'She was afraid of the dark.', 'adjective', '{"scared", "terrified"}'),
  ('surprised', 8, '/səˈpraɪzd/', 'Feeling or showing mild astonishment or shock caused by something unexpected.', 'He was surprised by the sudden appearance of his friend.', 'adjective', '{"astonished", "amazed"}'),
  ('content',8 , '/kənˈtent/', 'Feeling or expressing satisfaction and happiness.', 'She felt content with her life.', 'adjective', '{"satisfied", "fulfilled"}'),
  ('nervous',8 , '/ˈnɜː.vəs/', 'Feeling or showing a sense of unease or apprehension.', 'She was nervous about her job interview.', 'adjective', '{"anxious", "worried"}'),
  ('calm',8 , '/kɑːm/', 'Having a peaceful and tranquil demeanor.', 'She remained calm during the crisis.', 'adjective', '{"peaceful", "serene"}'),
  ('bored', 8, '/bɔːrd/', 'Feeling weary and uninterested by lack of activity or entertainment.', 'He was bored during the lecture.', 'adjective', '{"uninterested", "unengaged"}');

-- Physical Actions:
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('walk', 9, '/wɔːk/', 'Move at a regular pace by lifting and setting down each foot in turn.', 'He liked to walk in the park every morning.', 'verb', '{"stroll", "amble"}'),
  ('run', 9, '/rʌn/', 'Move at a fast pace with the legs moving at a rapid rate.', 'She decided to run in the marathon.', 'verb', '{"sprint", "jog"}'),
  ('jump', 9, '/dʒʌmp/', 'Move suddenly and quickly in a specified way, typically by using one''s legs.', 'The children liked to jump over the puddles.', 'verb', '{"leap", "hop"}'),
  ('swim', 9, '/swɪm/', 'Propel the body through water by using the limbs.', 'He learned to swim at a young age.', 'verb', '{"dive", "float"}'),
  ('climb', 9, '/klaɪm/', 'Ascend, move, or go up (something) using both hands and feet.', 'They decided to climb the mountain together.', 'verb', '{"scale", "ascend"}');

-- Communication
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('speak', 10, '/spiːk/', 'Convey information or express thoughts or feelings in spoken words.', 'She likes to speak in front of large audiences.', 'verb', '{"talk", "chat"}'),
  ('listen', 10, '/ˈlɪs.ən/', 'Give one''s attention to a sound.', 'He listened carefully to the music.', 'verb', '{"hear", "attend"}'),
  ('write', 10, '/raɪt/', 'Mark (letters, words, or other symbols) on a surface, typically paper, with a pen, pencil, or similar implement.', 'She wrote a letter to her friend.', 'verb', '{"compose", "scribble"}'),
  ('read', 10, '/riːd/', 'Look at and comprehend the meaning of (written or printed matter) by interpreting the characters or symbols of which it is composed.', 'He enjoys reading books in his free time.', 'verb', '{"peruse", "scan"}'),
  ('gesture', 10, '/ˈdʒes.tʃər/', 'Make a movement of part of the body, especially the hands or head, to express an idea or meaning.', 'She made a gesture of apology.', 'verb', '{"sign", "motion"}');

-- Social actions
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('greet', 11, '/ɡriːt/', 'Give a polite word or sign of welcome or recognition to (someone) on meeting.', 'She greeted her guests with a warm smile.', 'verb', '{"welcome", "salute"}'),
  ('hug', 11, '/hʌɡ/', 'Squeeze (someone) tightly in one''s arms, typically to express affection.', 'She hugged her friend tightly.', 'verb', '{"embrace", "cuddle"}'),
  ('laugh', 11, '/læf/', 'Make the spontaneous sounds and movements of the face and body that are the instinctive expressions of lively amusement and sometimes also of derision.', 'They laughed at the funny joke.', 'verb', '{"chuckle", "giggle"}'),
  ('share', 11, '/ʃer/', 'Have a portion of (something) with another or others.', 'She decided to share her dessert with her friend.', 'verb', '{"divide", "distribute"}'),
  ('help', 11, '/help/', 'Make it easier or possible for (someone) to do something by offering them one''s services or resources.', 'He offered to help his neighbor carry the groceries.', 'verb', '{"assist", "aid"}');


-- Insert words related to activities
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('surf', 12, '/sɜːrf/', 'To ride on the crest of a wave while standing or lying on a surfboard.', 'He loves to surf on the weekends.', 'verb', '{"ride the waves", "hang ten"}'),
  ('hike', 12, '/haɪk/', 'To walk for a long distance, especially across country or in the woods.', 'They decided to hike up the mountain.', 'verb', '{"trek", "ramble"}'),
  ('ski', 12, '/skiː/', 'To glide on skis over snow or water.', 'She learned to ski when she was young.', 'verb', '{"snowplow", "downhill"}'),
  ('cycle', 12, '/ˈsaɪ.kəl/', 'To ride a bicycle, motorcycle, or similar vehicle.', 'He enjoys cycling in the countryside.', 'verb', '{"bike", "ride"}'),
  ('swim', 12, '/swɪm/', 'To propel oneself through water by moving the limbs, especially the arms and legs, in a coordinated fashion.', 'She swims laps at the pool every morning.', 'verb', '{"dive", "float"}'),
  ('dance', 12, '/dæns/', 'To move rhythmically to music, typically following a set sequence of steps.', 'They love to dance at weddings.', 'verb', '{"twirl", "salsa"}'),
  ('camp', 12, '/kæmp/', 'To spend a vacation or period of time living in a camp, tent, or camper.', 'They plan to camp in the mountains next summer.', 'verb', '{"tent", "outdoor"}'),
  ('climb', 12, '/klaɪm/', 'To ascend or move up (something) using one''s hands and feet.', 'She enjoys climbing rocks in her free time.', 'verb', '{"scale", "ascend"}'),
  ('fish', 12, '/fɪʃ/', 'To catch or try to catch fish, typically by using a fishing rod, line, and bait.', 'They went fishing at the lake last weekend.', 'verb', '{"angling", "catch"}'),
  ('run', 12, '/rʌn/', 'To move at a fast pace on foot.', 'He goes for a run every morning before work.', 'verb', '{"jog", "sprint"}');

-- Fruits
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('apple', 13, '/ˈæp.əl/', 'The round fruit of a tree of the rose family, which typically has thin green or red skin and crisp flesh.', 'She enjoyed biting into a juicy apple.', 'noun', '{"fruit", "pomaceous"}'),
  ('banana', 13, '/bəˈnæn.ə/', 'A long curved fruit that grows in clusters and has soft pulpy flesh and yellow skin when ripe.', 'She peeled a banana for a quick snack.', 'noun', '{"plantain", "tropical fruit"}'),
  ('orange', 13, '/ˈɔːr.ɪndʒ/', 'A round juicy citrus fruit with a tough bright reddish-yellow rind.', 'He squeezed fresh orange juice for breakfast.', 'noun', '{"citrus", "tangerine"}'),
  ('grape', 13, '/ɡreɪp/', 'A small round juicy fruit that is typically green or purple and grows in clusters on a grapevine.', 'She enjoyed snacking on grapes while watching a movie.', 'noun', '{"berry", "vine fruit"}'),
  ('strawberry', 13, '/ˈstrɔː.bər.i/', 'A sweet soft red fruit with a seed-studded surface.', 'She picked fresh strawberries from the garden.', 'noun', '{"berry", "fragaria"}'),
  ('kiwi', 13, '/ˈkiːwi/', 'A small oval fruit with brown skin and green flesh.', 'She sliced a kiwi into her morning yogurt.', 'noun', '{"Chinese gooseberry", "tropical fruit"}'),
  ('pineapple', 13, '/ˈpaɪnˌæp.əl/', 'A large juicy tropical fruit consisting of aromatic edible yellow flesh surrounded by a tough segmented skin and topped with a tuft of stiff leaves.', 'She bought a whole pineapple to make a fruit salad.', 'noun', '{"ananas", "tropical fruit"}'),
  ('watermelon', 13, '/ˈwɔː.təˌmel.ən/', 'A large melon with a hard green rind and sweet red flesh, native to Africa and widely cultivated in warm countries.', 'She enjoyed a slice of refreshing watermelon on a hot summer day.', 'noun', '{"melon", "citrullus"}'),
  ('pear', 13, '/per/', 'A sweet yellowish- or brownish-green edible fruit that is typically narrow at the stalk and wider towards the base.', 'She packed a ripe pear in her lunchbox.', 'noun', '{"fruit", "pyrus"}'),
  ('mango', 13, '/ˈmæŋ.ɡoʊ/', 'A tropical stone fruit with juicy yellow flesh and a tough skin.', 'She savored the sweet taste of ripe mango.', 'noun', '{"tropical fruit", "mangifera indica"}');

-- Vegetables
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('carrot', 14, '/ˈkær.ət/', 'A tapering orange-colored root eaten as a vegetable.', 'She chopped carrots to add to the soup.', 'noun', '{"root vegetable", "daucus carota"}'),
  ('broccoli', 14, '/ˈbrɑː.kəl.i/', 'A cultivated variety of cabbage bearing heads of green or purplish flower buds that are eaten as a vegetable.', 'She steamed broccoli as a side dish.', 'noun', '{"cruciferous vegetable", "brassica oleracea"}'),
  ('tomato', 14, '/təˈmeɪ.təʊ/', 'A glossy red, or occasionally yellow, pulpy edible fruit that is typically eaten as a vegetable or in salad.', 'She sliced fresh tomatoes for the salad.', 'noun', '{"fruit", "solanum lycopersicum"}'),
  ('spinach', 14, '/ˈspɪn.ɪtʃ/', 'A widely cultivated edible Asian plant of the goosefoot family, with large, dark green leaves that are eaten raw or cooked as a vegetable.', 'She added spinach to her smoothie for extra nutrition.', 'noun', '{"leafy green", "amaranth"}'),
  ('cucumber', 14, '/ˈkjuː.kʌm.bər/', 'A long, green-skinned fruit with watery flesh, usually eaten raw in salads or pickled.', 'She sliced cucumbers to make cucumber sandwiches.', 'noun', '{"vegetable", "cucumis sativus"}'),
  ('potato', 14, '/pəˈteɪ.təʊ/', 'An edible tuber native to South America, where it was domesticated, and widely cultivated as a staple food.', 'She boiled potatoes for mashed potatoes.', 'noun', '{"starchy vegetable", "solanum tuberosum"}'),
  ('bell pepper', 14, '/ˈbel ˌpɛpər/', 'A sweet pepper of a variety with a mild flavor, typically large and bell-shaped with a green, yellow, or red skin.', 'She stuffed bell peppers with rice and cheese.', 'noun', '{"capsicum", "pepper"}'),
  ('onion', 14, '/ˈʌn.jən/', 'An edible bulb with a pungent taste and smell, composed of several concentric layers, used in cooking.', 'She chopped onions for the stir-fry.', 'noun', '{"bulb vegetable", "allium cepa"}'),
  ('lettuce', 14, '/ˈlet.ɪs/', 'A leafy green vegetable used as a salad base or garnish.', 'She tossed lettuce with tomatoes and cucumbers for a salad.', 'noun', '{"leaf vegetable", "lactuca sativa"}'),
  ('zucchini', 14, '/zʊˈkiː.ni/', 'A variety of summer squash that is typically dark green and elongated, resembling a cucumber in shape.', 'She grated zucchini to make zucchini bread.', 'noun', '{"vegetable", "courgette"}');

-- Transport
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('car', 15, '/kɑːr/', 'A road vehicle, typically with four wheels, powered by an internal combustion engine and able to carry a small number of people.', 'She drove her car to work every day.', 'noun', '{"automobile", "vehicle"}'),
  ('bicycle', 15, '/ˈbaɪ.sɪ.kəl/', 'A vehicle consisting of two wheels held in a frame one behind the other, propelled by pedals and steered with handlebars attached to the front wheel.', 'He rode his bicycle to the park.', 'noun', '{"bike", "cycle"}'),
  ('bus', 15, '/bʌs/', 'A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare.', 'She caught the bus to downtown.', 'noun', '{"coach", "transit"}'),
  ('train', 15, '/treɪn/', 'A series of connected railroad cars pulled or pushed by one or more locomotives, capable of carrying freight and passengers.', 'She took the train to visit her family.', 'noun', '{"railway", "locomotive"}'),
  ('plane', 15, '/pleɪn/', 'A powered flying vehicle with fixed wings and a weight greater than that of the air it displaces.', 'She boarded the plane for her international flight.', 'noun', '{"airplane", "aircraft"}'),
  ('ship', 15, '/ʃɪp/', 'A large watercraft that travels on water, used for transporting goods, people, or vehicles.', 'She sailed on a cruise ship to the Caribbean.', 'noun', '{"vessel", "boat"}'),
  ('motorcycle', 15, '/ˈmoʊ.tər.saɪ.kəl/', 'A two-wheeled vehicle that is powered by a motor and has no pedals.', 'He rode his motorcycle along the winding roads.', 'noun', '{"bike", "motorbike"}'),
  ('subway', 15, '/ˈsʌbˌweɪ/', 'An underground electric railway system in a city, consisting of interconnected railroad cars propelled by electricity.', 'She took the subway to commute to work.', 'noun', '{"metro", "tube"}'),
  ('taxi', 15, '/ˈtæk.si/', 'A car licensed to transport passengers in return for payment of a fare.', 'She hailed a taxi to take her to the airport.', 'noun', '{"cab", "taxicab"}'),
  ('boat', 15, '/boʊt/', 'A small vessel for travel on water, propelled by oars, sails, or an engine.', 'They went fishing in a small boat on the lake.', 'noun', '{"vessel", "craft"}');

-- Pets
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('dog', 16, '/dɔːɡ/', 'A domesticated carnivorous mammal that typically has a long snout, an acute sense of smell, non-retractable claws, and a barking, howling, or whining voice.', 'She adopted a rescue dog from the animal shelter.', 'noun', '{"canine", "pooch"}'),
  ('cat', 16, '/kæt/', 'A small domesticated carnivorous mammal with soft fur, a short snout, and retractile claws.', 'She cuddled with her cat on the couch.', 'noun', '{"feline", "kitty"}'),
  ('bird', 16, '/bɜːrd/', 'A warm-blooded egg-laying vertebrate distinguished by the possession of feathers, wings, and a beak.', 'She watched the colorful birds in the garden.', 'noun', '{"avian", "feathered friend"}'),
  ('fish', 16, '/fɪʃ/', 'A limbless cold-blooded vertebrate animal with gills and fins living wholly in water.', 'She fed her pet fish in the aquarium.', 'noun', '{"aquatic", "swimmer"}'),
  ('hamster', 16, '/ˈhæm.stər/', 'A small rodent with a short tail and large cheek pouches for carrying food, native to Eurasia and northern Africa.', 'She watched her pet hamster run on its wheel.', 'noun', '{"rodent", "cage mate"}'),
  ('rabbit', 16, '/ˈræb.ɪt/', 'A small burrowing mammal with long ears, long hind legs, and a short fluffy tail.', 'She cuddled with her pet rabbit in its hutch.', 'noun', '{"bunny", "hare"}'),
  ('guinea pig', 16, '/ˈɡɪn.i piɡ/', 'A domesticated South American rodent that is typically kept as a pet and often used in laboratory experiments.', 'She adopted a pair of guinea pigs as classroom pets.', 'noun', '{"cavy", "pocket pet"}'),
  ('turtle', 16, '/ˈtɜːr.təl/', 'A slow-moving reptile with a bony or leathery shell developed from their ribs and acting as a shield.', 'She watched her pet turtle swim in its tank.', 'noun', '{"tortoise", "shelled friend"}'),
  ('snake', 16, '/sneɪk/', 'A long limbless reptile that has no eyelids, a short tail, and jaws that are capable of considerable extension.', 'She fed her pet snake mice.', 'noun', '{"serpent", "reptile"}'),
  ('ferret', 16, '/ˈfer.ɪt/', 'A domesticated polecat kept as a pet or used especially for catching rabbits.', 'She played with her pet ferret in the backyard.', 'noun', '{"mustela putorius furo", "polecat"}');

-- Wheather
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('sun', 17, '/sʌn/', 'The star around which the earth orbits, whose light and heat are necessary for life on earth.', 'The sun rises in the east and sets in the west.', 'noun', '{"star", "sunshine"}'),
  ('rain', 17, '/reɪn/', 'Water that falls in drops from the clouds in the sky.', 'The rain poured down all day.', 'noun', '{"precipitation", "downpour"}'),
  ('cloud', 17, '/klaʊd/', 'A visible mass of condensed water vapor floating in the atmosphere, typically high above the ground.', 'The sky was filled with fluffy white clouds.', 'noun', '{"cumulus", "vapor"}'),
  ('wind', 17, '/wɪnd/', 'The natural movement of the air, especially in the form of a current of air blowing from a particular direction.', 'The wind blew fiercely during the storm.', 'noun', '{"breeze", "gust"}'),
  ('snow', 17, '/snoʊ/', 'Atmospheric water vapor frozen into ice crystals and falling in light white flakes or lying on the ground as a white layer.', 'The children built snowmen after the snowfall.', 'noun', '{"blizzard", "flurry"}'),
  ('storm', 17, '/stɔːrm/', 'An atmospheric disturbance characterized by strong winds, rain, thunder, lightning, or snow.', 'The storm knocked down power lines and caused flooding.', 'noun', '{"tempest", "squall"}'),
  ('thunder', 17, '/ˈθʌn.dər/', 'A loud rumbling or crashing noise heard after a lightning flash due to the expansion of rapidly heated air.', 'The thunder shook the windows during the storm.', 'noun', '{"thunderclap", "roar"}'),
  ('lightning', 17, '/ˈlaɪt.nɪŋ/', 'A sudden electrostatic discharge produced during a thunderstorm, manifesting as a bright flash of light.', 'The lightning illuminated the sky.', 'noun', '{"bolt", "flash"}'),
  ('fog', 17, '/fɒɡ/', 'A thick cloud of tiny water droplets suspended in the atmosphere at or near the earth''s surface that obscures or restricts visibility.', 'The fog rolled in from the sea, enveloping everything in a gray mist.', 'noun', '{"mist", "haze"}'),
  ('hail', 17, '/heɪl/', 'Pellets of frozen rain that fall in showers from cumulonimbus clouds.', 'The hailstones battered the roof of the car.', 'noun', '{"ice pellets", "sleet"}');

-- Food and drink
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('apple', 18, '/ˈæp.əl/', 'The round fruit of a tree of the rose family, which typically has thin green or red skin and crisp flesh.', 'She enjoyed biting into a juicy apple.', 'noun', '{"fruit"}'),
  ('banana', 18, '/bəˈnæn.ə/', 'A long curved fruit that grows in clusters and has soft pulpy flesh and yellow skin when ripe.', 'She peeled a banana for a quick snack.', 'noun', '{"fruit"}'),
  ('bread', 18, '/bred/', 'A staple food made from flour, water, and yeast, mixed together and baked.', 'She spread butter on a slice of freshly baked bread.', 'noun', '{"loaf", "baked goods"}'),
  ('cheese', 18, '/tʃiːz/', 'A food made from the pressed curds of milk.', 'She added grated cheese to her pasta.', 'noun', '{"dairy", "cheddar"}'),
  ('coffee', 18, '/ˈkɒf.i/', 'A hot drink made from the roasted and ground seeds of a tropical plant, typically served with milk or cream and sugar.', 'She drank a cup of black coffee in the morning.', 'noun', '{"beverage", "caffeine"}'),
  ('cake', 18, '/keɪk/', 'A sweet baked food made from a mixture of flour, sugar, eggs, and other ingredients, typically with a soft, sponge-like texture.', 'She baked a chocolate cake for her friend''s birthday.', 'noun', '{"dessert", "pastry"}'),
  ('pasta', 18, '/ˈpæs.tə/', 'A dish originally from Italy consisting of dough made from durum wheat and water, extruded or stamped into various shapes and typically cooked in boiling water.', 'She cooked spaghetti with marinara sauce for dinner.', 'noun', '{"noodles", "Italian cuisine"}'),
  ('salad', 18, '/ˈsæl.əd/', 'A cold dish of various mixtures of raw or cooked vegetables, usually seasoned with oil, vinegar, or other dressing and sometimes accompanied by meat, fish, or other ingredients.', 'She tossed a salad with mixed greens and vinaigrette dressing.', 'noun', '{"vegetables", "healthy eating"}'),
  ('juice', 18, '/dʒuːs/', 'The liquid obtained from or present in fruit or vegetables.', 'She poured herself a glass of orange juice.', 'noun', '{"beverage", "fruit juice"}'),
  ('wine', 18, '/waɪn/', 'An alcoholic drink made from fermented grapes or other fruits.', 'She enjoyed a glass of red wine with her dinner.', 'noun', '{"alcohol", "beverage"}');

-- Body parts
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('head', 19, '/hed/', 'The upper part of the human body, or the front or upper part of the body of an animal, containing the brain, mouth, and sense organs.', 'She rested her head on the pillow.', 'noun', '{"skull", "cranium"}'),
  ('arm', 19, '/ɑːm/', 'Each of the two upper limbs of the human body from the shoulder to the hand.', 'She raised her arm to wave goodbye.', 'noun', '{"limb", "forelimb"}'),
  ('leg', 19, '/leɡ/', 'Each of the limbs on which a person or animal walks and stands.', 'She stretched her leg after sitting for a long time.', 'noun', '{"limb", "lower limb"}'),
  ('hand', 19, '/hænd/', 'The end part of a person''s arm beyond the wrist, including the palm, fingers, and thumb.', 'She held the pen in her hand.', 'noun', '{"palm", "fingers"}'),
  ('foot', 19, '/fʊt/', 'The lower extremity of the leg below the ankle, on which a person stands or walks.', 'She felt a pebble in her shoe under her foot.', 'noun', '{"sole", "toes"}'),
  ('face', 19, '/feɪs/', 'The front part of a person''s head from the forehead to the chin, or the corresponding part in an animal.', 'She smiled and wiped tears from her face.', 'noun', '{"countenance", "facial features"}'),
  ('eye', 19, '/aɪ/', 'Each of a pair of globular organs in the head through which people and vertebrate animals see.', 'She blinked her eyes to clear her vision.', 'noun', '{"sight", "visual organ"}'),
  ('ear', 19, '/ɪr/', 'The organ of hearing and balance in humans and other vertebrates, especially the external part of this.', 'She covered her ears to block out the noise.', 'noun', '{"auditory organ", "hearing"}'),
  ('nose', 19, '/noʊz/', 'The part projecting above the mouth on the face of a person or animal, containing the nostrils and used for breathing and smelling.', 'She wrinkled her nose at the unpleasant smell.', 'noun', '{"nasal organ", "olfactory sense"}'),
  ('mouth', 19, '/maʊθ/', 'The opening in the face of a person or animal, consisting of the lips and the space between them, or the space behind containing the teeth and the tongue.', 'She spoke with a smile on her mouth.', 'noun', '{"oral cavity", "speech organ"}');


-- Family and relationship
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('family', 20, '/ˈfæm.ɪ.li/', 'A group of people related by blood or marriage, considered as a unit.', 'She spends time with her family on weekends.', 'noun', '{"relatives", "kin"}'),
  ('mother', 20, '/ˈmʌð.ər/', 'A woman in relation to her child or children.', 'She hugged her mother tightly.', 'noun', '{"mom", "mum"}'),
  ('father', 20, '/ˈfɑː.ðər/', 'A man in relation to his child or children.', 'She admired her father for his wisdom.', 'noun', '{"dad", "daddy"}'),
  ('parent', 20, '/ˈper.ənt/', 'A person''s father or mother.', 'Her parents supported her decision to study abroad.', 'noun', '{"guardian", "caretaker"}'),
  ('child', 20, '/tʃaɪld/', 'A young human being below the age of puberty or below the legal age of majority.', 'She watched her child play in the park.', 'noun', '{"kid", "offspring"}'),
  ('sibling', 20, '/ˈsɪb.lɪŋ/', 'Each of two or more children or offspring having one or both parents in common; a brother or sister.', 'She has a close bond with her sibling.', 'noun', '{"brother or sister", "relative"}'),
  ('brother', 20, '/ˈbrʌð.ər/', 'A male having the same parents as another or one parent in common with another.', 'She shares a room with her brother.', 'noun', '{"sibling", "sister"}'),
  ('sister', 20, '/ˈsɪs.tər/', 'A female having the same parents as another or one parent in common with another.', 'She confided in her sister about her problems.', 'noun', '{"sibling", "sisterhood"}'),
  ('grandparent', 20, '/ˈɡræn.peər.ənt/', 'A parent of one''s father or mother.', 'She visited her grandparents during the holidays.', 'noun', '{"grandmother", "grandfather"}'),
  ('grandchild', 20, '/ˈɡræn.tʃaɪld/', 'A child of one''s son or daughter.', 'She dotes on her grandchildren.', 'noun', '{"grandson", "granddaughter"}');


-- School and education
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('school', 21, '/skuːl/', 'An institution for educating children.', 'She attends the local public school.', 'noun', '{"educational institution", "academy"}'),
  ('teacher', 21, '/ˈtiː.tʃər/', 'A person who teaches, especially in a school.', 'She respects her teacher and listens attentively in class.', 'noun', '{"educator", "instructor"}'),
  ('student', 21, '/ˈstjuː.dənt/', 'A person who is studying at a school or college.', 'She is a diligent student who always completes her assignments on time.', 'noun', '{"learner", "pupil"}'),
  ('classroom', 21, '/ˈklɑːs.ruːm/', 'A room in which a class of students is taught.', 'The students gathered in the classroom for their lesson.', 'noun', '{"lecture hall", "schoolroom"}'),
  ('book', 21, '/bʊk/', 'A written or printed work consisting of pages glued or sewn together along one side and bound in covers.', 'She borrowed a book from the library to study for her exam.', 'noun', '{"publication", "textbook"}'),
  ('pencil', 21, '/ˈpen.səl/', 'A long, thin object, usually made of wood, for writing or drawing, with a sharp black or colored point at one end.', 'She sharpened her pencil before starting her drawing.', 'noun', '{"writing implement", "lead pencil"}'),
  ('desk', 21, '/desk/', 'A piece of furniture with a flat or sloped surface and typically with drawers, at which one can read, write, or do other work.', 'She kept her textbooks and notebooks neatly organized on her desk.', 'noun', '{"workstation", "table"}'),
  ('test', 21, '/test/', 'A procedure intended to establish the quality, performance, or reliability of something, especially before it is taken into widespread use.', 'She studied hard for her math test.', 'noun', '{"exam", "assessment"}'),
  ('homework', 21, '/ˈhəʊm.wɜːk/', 'Schoolwork assigned to be done outside the classroom.', 'She spent hours completing her homework assignments.', 'noun', '{"assignments", "study"}'),
  ('lesson', 21, '/ˈles.ən/', 'An period of learning or teaching.', 'She took piano lessons every Saturday morning.', 'noun', '{"instruction", "class"}');

-- Jobs
INSERT INTO words (word, category_id, pronunciation, definition, example, part_of_speech, synonyms) VALUES
  ('doctor', 22, '/ˈdɒk.tər/', 'A person who is qualified to treat people who are ill.', 'She visited the doctor for her annual check-up.', 'noun', '{"physician", "medical practitioner"}'),
  ('teacher', 22, '/ˈtiː.tʃər/', 'A person who teaches, especially in a school.', 'She admired her teacher for inspiring her students.', 'noun', '{"educator", "instructor"}'),
  ('engineer', 22, '/ˌen.dʒɪˈnɪər/', 'A person who designs, builds, or maintains engines, machines, or structures.', 'She works as a civil engineer designing bridges.', 'noun', '{"technician", "designer"}'),
  ('lawyer', 22, '/ˈlɔː.jər/', 'A person who practices or studies law, especially as a barrister or a solicitor.', 'She hired a lawyer to help with her legal case.', 'noun', '{"attorney", "advocate"}'),
  ('chef', 22, '/ʃef/', 'A professional cook, typically the chief cook in a restaurant or hotel.', 'She trained as a chef at a culinary school.', 'noun', '{"cook", "culinarian"}'),
  ('artist', 22, '/ˈɑː.tɪst/', 'A person who produces paintings or drawings as a profession or hobby.', 'She exhibited her artwork at the local gallery.', 'noun', '{"painter", "creative"}'),
  ('musician', 22, '/mjuˈzɪʃ.ən/', 'A person who plays a musical instrument, especially as a profession, or is musically talented.', 'She performed as a musician in the orchestra.', 'noun', '{"instrumentalist", "performer"}'),
  ('pilot', 22, '/ˈpaɪ.lət/', 'A person who operates the controls of an aircraft.', 'She trained to become a pilot for a commercial airline.', 'noun', '{"aviator", "flyer"}'),
  ('nurse', 22, '/nɜːs/', 'A person trained to care for the sick or infirm, especially in a hospital.', 'She works as a nurse in the emergency room.', 'noun', '{"caretaker", "healthcare worker"}'),
  ('scientist', 22, '/ˈsaɪ.ən.tɪst/', 'A person who is studying or has expert knowledge of one or more of the natural or physical sciences.', 'She conducts research as a scientist in a laboratory.', 'noun', '{"researcher", "scholar"}');



-- Vocabulary Table
CREATE TABLE favorite_words (
  id SERIAL PRIMARY KEY,
  user_id uuid references auth.users on delete cascade not null,
  word_id INT REFERENCES words(word_id) NOT NULL,
  liked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

alter table favorite_words
  enable row level security;

CREATE POLICY user_access_policy ON favorite_words
    FOR ALL
    TO public
    USING (auth.uid() = user_id);


-- 5 RANDOM WORDS
-- Define a composite type
CREATE TYPE random_word_record AS (
    word_id INT,
    word VARCHAR(100),
    category_id INT,
    pronunciation VARCHAR(100),
    definition TEXT,
    example TEXT,
    part_of_speech VARCHAR(50),
    synonyms TEXT[],
    created_at TIMESTAMP,
    category_name VARCHAR(100)
);

-- Define the function to return the composite type
CREATE OR REPLACE FUNCTION get_random_words()
RETURNS SETOF random_word_record AS $$
BEGIN
    RETURN QUERY 
    SELECT w.*, wc.category_name
    FROM words w
    INNER JOIN word_categories wc ON wc.category_id = w.category_id
    ORDER BY RANDOM()
    LIMIT 5;
END;
$$ LANGUAGE plpgsql;


CREATE TABLE daily_words (
    id SERIAL PRIMARY KEY,
    word_id INT REFERENCES words(word_id) NOT NULL,
    date_retrieved DATE
);

CREATE OR REPLACE FUNCTION get_daily_word()
RETURNS SETOF words AS $$
DECLARE
    today_date DATE := CURRENT_DATE;
BEGIN
    -- Check if words for today are already retrieved
    IF EXISTS (
        SELECT 1 FROM daily_words WHERE date_retrieved = today_date
    ) THEN
        -- Words for today are already retrieved, return them
        RETURN QUERY 
        SELECT w.* 
        FROM words w
        JOIN daily_words dw ON w.word_id = dw.word_id
        WHERE dw.date_retrieved = today_date;
    ELSE
        -- Words for today are not retrieved yet, retrieve them and update daily_words table
        RETURN QUERY 
        SELECT * FROM words ORDER BY RANDOM() LIMIT 1;

        -- Update the daily_words table with the retrieved words for today
        INSERT INTO daily_words (word_id, date_retrieved)
        SELECT word_id, today_date FROM words ORDER BY RANDOM() LIMIT 1;
    END IF;
END;
$$ LANGUAGE plpgsql;


SELECT * FROM get_daily_word();


