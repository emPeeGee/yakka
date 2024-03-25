import { Lesson } from '@/types';

export const lesson0: Lesson = {
  lesson_id: 0,
  title: 'Introduction to Learning English',
  description:
    'Lesson 1. This lesson is designed for Romanian speakers who are beginning to learn English.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'His name is Andrew',
        answer: 'Numele lui este Andrew',
        options: ['Numele lui este Andrew', 'Numele meu este Andrew', 'Numele tau este Andre'],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'My name @@@ Ken',
        answer: 'is',
        options: [
          { label: 'are', value: 'are' },
          { label: 'as', value: 'as' },
          { label: 'is', value: 'is' },
        ],
      },
    },
  ],
};

export const lesson1: Lesson = {
  lesson_id: '1',
  title: 'Introduction to Learning English',
  description:
    'Lesson 1. This lesson is designed for Romanian speakers who are beginning to learn English.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'His name is Andrew',
        answer: 'Numele lui este Andrew',
        options: ['Numele lui este Andrew', 'Numele meu este Andrew', 'Numele tau este Andre'],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'People',
        answers: [
          ['Barbat', 'Man'],
          ['Barbati', 'Men'],
          ['Baiat', 'Boy'],
          ['Fata', 'Girl'],
          ['Femeie', 'Woman'],
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'My name @@@ Ken',
        answer: 'is',
        options: [
          { label: 'are', value: 'are' },
          { label: 'as', value: 'as' },
          { label: 'is', value: 'is' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'Ma numesc Ken',
        answer: 'My name is Ken',
        options: ['Ken', 'my', 'hello', 'is', 'hello', 'name', 'an', 'a'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'The boy is reading',
        answer: 'Baiatul citeste acum',
        options: [
          { label: 'Baiatul mananca acum', value: 'Baiatul mananca acum', isCorrect: false },
          { label: 'Baiatul scrie acum', value: 'Baiatul scrie acum', isCorrect: false },
          { label: 'Baiatul citeste acum', value: 'Baiatul citeste acum', isCorrect: true },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'My name is Ken',
        answer: 'Numele meu este Ken',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'An apple',
        answer: 'Un măr',
        options: [
          { label: 'Un măr', value: 'Un măr', isCorrect: true },
          { label: 'Un băiat', value: 'Un băiat', isCorrect: false },
          { label: 'O coacăză', value: 'O coacăză', isCorrect: false },
        ],
      },
    },
  ],
};

export const lesson2: Lesson = {
  lesson_id: '2',
  title: 'Greetings and Introductions',
  description:
    'This lesson focuses on basic greetings and introductions in English for Romanian speakers who are beginners.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'Hello, how are you?',
        answer: 'Bună, cum ești?',
        options: ['Bună, cum ești?', 'Salut, ce faci?', 'Bună, ce mai faci?'],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the greeting with its meaning:',
        answers: [
          ['Hi', 'Salut'],
          ['Good morning', 'Bună dimineața'],
          ['Good afternoon', 'Bună ziua'],
          ['Good evening', 'Bună seara'],
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'Nice to @@@ you.',
        answer: 'meet',
        options: [
          { label: 'say', value: 'say' },
          { label: 'meet', value: 'meet' },
          { label: 'sleep', value: 'sleep' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'My name is Maria.',
        answer: 'My name is Maria',
        options: ['Maria', 'name', 'is', 'my', 'hello'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: "What's your name?",
        answer: 'Cum te numești?',
        options: [
          { label: 'Cât de înalt ești?', value: 'Cât de înalt ești?', isCorrect: false },
          { label: 'Cum te numești?', value: 'Cum te numești?', isCorrect: true },
          { label: 'Cât timp faci sport?', value: 'Cât timp faci sport?', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: "I'm fine, thank you.",
        answer: 'Sunt bine, mulțumesc.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'How old are you?',
        answer: 'Câți ani ai?',
        options: [
          { label: 'Ce faci?', value: 'Ce faci?', isCorrect: false },
          { label: 'Câți ani ai?', value: 'Câți ani ai?', isCorrect: true },
          { label: 'Unde locuiești?', value: 'Unde locuiești?', isCorrect: false },
        ],
      },
    },
  ],
};

export const lesson3: Lesson = {
  lesson_id: '3',
  title: 'Everyday Activities',
  description:
    'This lesson covers common everyday activities in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'I brush my teeth every morning.',
        answer: 'Îmi spăl dinții în fiecare dimineață.',
        options: [
          'Îmi spăl dinții în fiecare dimineață.',
          'Îmi aranjez părul în fiecare seară.',
          'Îmi fac patul în fiecare după-amiază.',
        ],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the activity with its meaning:',
        answers: [
          ['Cooking', 'Gătit'],
          ['Cleaning', 'Curățenie'],
          ['Shopping', 'Cumpărături'],
          ['Exercising', 'Exercițiu'],
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'I like to @@@ books in the evening.',
        answer: 'read',
        options: [
          { label: 'watch', value: 'watch' },
          { label: 'listen', value: 'listen' },
          { label: 'read', value: 'read' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'I take a shower every day.',
        answer: 'Mă spăl în fiecare zi.',
        options: ['Mă', 'spăl', 'pe', 'cap', 'în', 'fiecare', 'zi.'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What do you do in the morning?',
        answer: 'Ce faci dimineața?',
        options: [
          { label: 'Câte ore dormi?', value: 'Câte ore dormi?', isCorrect: false },
          { label: 'Ce faci dimineața?', value: 'Ce faci dimineața?', isCorrect: true },
          { label: 'Unde lucrezi?', value: 'Unde lucrezi?', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'I cook dinner every evening.',
        answer: 'Gătesc cină în fiecare seară.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'When do you go to bed?',
        answer: 'Când te culci?',
        options: [
          { label: 'Când te culci?', value: 'Când te culci?', isCorrect: true },
          { label: 'Cât timp stai la birou?', value: 'Cât timp stai la birou?', isCorrect: false },
          {
            label: 'Cât timp petreci la telefon?',
            value: 'Cât timp petreci la telefon?',
            isCorrect: false,
          },
        ],
      },
    },
  ],
};

export const lesson4: Lesson = {
  lesson_id: '4',
  title: 'Basic English for Beginners',
  description:
    'This lesson is designed for complete beginners who are Romanian speakers, covering basic greetings, introductions, and simple vocabulary.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'Hello, my name is Alex.',
        answer: 'Bună, mă numesc Alex.',
        options: [
          'Bună, mă numesc Alex.',
          'Salut, eu sunt Maria.',
          'Bună ziua, numele meu este Ion.',
        ],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the word with its meaning:',
        answers: [
          ['Book', 'Carte'],
          ['Dog', 'Câine'],
          ['Cat', 'Pisică'],
          ['House', 'Casa'],
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'I like to @@@.',
        answer: 'read',
        options: [
          { label: 'hello', value: 'hello' },
          { label: 'morning', value: 'morning' },
          { label: 'read', value: 'read' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'She drinks @@@ every morning.',
        answer: 'tea',
        options: ['wood', 'stone', 'name', 'tea'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'How are you?',
        answer: 'Cum ești?',
        options: [
          { label: 'Cum ești?', value: 'Cum ești?', isCorrect: true },
          { label: 'Cât de înalt ești?', value: 'Cât de înalt ești?', isCorrect: false },
          { label: 'Unde ești?', value: 'Unde ești?', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'I am from Romania.',
        answer: 'Eu sunt din România.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is this?',
        answer: 'Ce este asta?',
        options: [
          { label: 'Unde ești?', value: 'Unde ești?', isCorrect: false },
          { label: 'Cine ești?', value: 'Cine ești?', isCorrect: false },
          { label: 'Ce este asta?', value: 'Ce este asta?', isCorrect: true },
        ],
      },
    },
  ],
};

export const lesson5: Lesson = {
  lesson_id: '5',
  title: 'Family Members',
  description:
    'This lesson introduces vocabulary related to family members in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'My father is a doctor.',
        answer: 'Tatăl meu este medic.',
        options: ['Tatăl meu este medic.', 'Mama mea este învățătoare.', 'Eu sunt student.'],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the family member with its English translation:',
        answers: [
          ['Tată', 'Father'],
          ['Mamă', 'Mother'],
          ['Frate', 'Brother'],
          ['Soră', 'Sister'],
        ],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the Romanian word for "sister"?',
        answer: 'Soră',
        options: [
          { label: 'Tată', value: 'Tată', isCorrect: false },
          { label: 'Mamă', value: 'Mamă', isCorrect: false },
          { label: 'Soră', value: 'Soră', isCorrect: true },
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'She h@@@.',
        answer: 'brothers',
        options: [
          { label: 'amazing', value: 'amazing' },
          { label: 'brothers', value: 'brothers' },
          { label: 'great', value: 'great' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'El este un bunic bun.',
        answer: 'He is a good grandfather.',
        options: ['He', 'not', 'is', 'a', 'doctor', 'good', 'grandfather.'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the English word for "mamă"?',
        answer: 'Mother',
        options: [
          { label: 'Father', value: 'Father', isCorrect: false },
          { label: 'Mother', value: 'Mother', isCorrect: true },
          { label: 'Brother', value: 'Brother', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'El este unchiul meu.',
        answer: 'He is my uncle.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the Romanian word for "brother"?',
        answer: 'Frate',
        options: [
          { label: 'Soră', value: 'Soră', isCorrect: false },
          { label: 'Frate', value: 'Frate', isCorrect: true },
          { label: 'Mamă', value: 'Mamă', isCorrect: false },
        ],
      },
    },
  ],
};

export const lesson6: Lesson = {
  lesson_id: '6',
  title: 'Shopping Vocabulary',
  description:
    'This lesson covers basic shopping vocabulary in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'I need to buy some milk.',
        answer: 'Trebuie să cumpăr puțin lapte.',
        options: [
          'Trebuie să cumpăr puțin lapte.',
          'Vreau să mănânc o pizza.',
          'Aș dori să vizitez un muzeu.',
        ],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the item with its meaning:',
        answers: [
          ['Bread', 'Pâine'],
          ['Milk', 'Lapte'],
          ['Eggs', 'Ouă'],
          ['Fruit', 'Fructe'],
        ],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the Romanian word for "eggs"?',
        answer: 'Ouă',
        options: [
          { label: 'Pâine', value: 'Pâine', isCorrect: false },
          { label: 'Lapte', value: 'Lapte', isCorrect: false },
          { label: 'Ouă', value: 'Ouă', isCorrect: true },
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'I usually buy groceries on @@@.',
        answer: 'Saturday',
        options: [
          { label: 'Egg', value: 'Monday' },
          { label: 'Bread', value: 'Bread' },
          { label: 'Saturday', value: 'Saturday' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'I need to buy some vegetables.',
        answer: 'Trebuie să cumpăr niște legume.',
        options: ['Trebuie', 'none', 'să', 'milk', 'cumpăr', 'niște', 'baie', 'legume.'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What do you usually buy at the grocery store?',
        answer: 'Ce cumperi de obicei de la magazinul alimentar?',
        options: [
          { label: 'Cât timp stai la coadă?', value: 'Cât timp stai la coadă?', isCorrect: false },
          {
            label: 'Ce cumperi de obicei de la magazinul alimentar?',
            value: 'Ce cumperi de obicei de la magazinul alimentar?',
            isCorrect: true,
          },
          {
            label: 'Cât costă un kilogram de mere?',
            value: 'Cât costă un kilogram de mere?',
            isCorrect: false,
          },
        ],
      },
    },
    // TODO: make it drag
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'I bought some apples and oranges.',
        answer: 'Am cumpărat niște mere și niște portocale.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'Where do you go to buy groceries?',
        answer: 'Unde mergi să cumperi alimente?',
        options: [
          {
            label: 'Ce mănânci la micul dejun?',
            value: 'Ce mănânci la micul dejun?',
            isCorrect: false,
          },
          {
            label: 'Unde mergi să cumperi alimente?',
            value: 'Unde mergi să cumperi alimente?',
            isCorrect: true,
          },
          {
            label: 'Ce vrei să mănânci la cină?',
            value: 'Ce vrei să mănânci la cină?',
            isCorrect: false,
          },
        ],
      },
    },
  ],
};

export const lesson7: Lesson = {
  lesson_id: '7',
  title: 'Colors and Shapes',
  description:
    'This lesson introduces basic colors and shapes vocabulary in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'The sky is blue.',
        answer: 'Cerul este albastru.',
        options: ['Cerul este albastru.', 'Soarele este galben.', 'Pământul este verde.'],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the color with its meaning:',
        answers: [
          ['Red', 'Roșu'],
          ['Green', 'Verde'],
          ['Blue', 'Albastru'],
          ['Yellow', 'Galben'],
        ],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the English word for "galben"?',
        answer: 'Yellow',
        options: [
          { label: 'Red', value: 'Red', isCorrect: false },
          { label: 'Green', value: 'Green', isCorrect: false },
          { label: 'Yellow', value: 'Yellow', isCorrect: true },
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'Apples are usually @@@.',
        answer: 'red',
        options: [
          { label: 'violet', value: 'violet' },
          { label: 'blue', value: 'blue' },
          { label: 'red', value: 'red' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'The grass is green.',
        answer: 'Iarba este verde.',
        options: ['Iarba', 'albastră', 'este', 'name', 'verde.'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What color is the sun?',
        answer: 'Ce culoare are soarele?',
        options: [
          { label: 'Ce faci?', value: 'Ce faci?', isCorrect: false },
          { label: 'Ce culoare are soarele?', value: 'Ce culoare are soarele?', isCorrect: true },
          { label: 'Cât de înalt ești?', value: 'Cât de înalt ești?', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'The moon is white.',
        answer: 'Luna este albă.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What shape is a circle?',
        answer: 'Ce formă are un cerc?',
        options: [
          { label: 'Ce culoare are?', value: 'Ce culoare are?', isCorrect: false },
          { label: 'Ce formă are un cerc?', value: 'Ce formă are un cerc?', isCorrect: true },
          { label: 'Ce mărime are?', value: 'Ce mărime are?', isCorrect: false },
        ],
      },
    },
  ],
};

export const lesson8: Lesson = {
  lesson_id: '8',
  title: 'Transportation Vocabulary',
  description:
    'This lesson covers basic transportation vocabulary in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'I usually take the bus to work.',
        answer: 'De obicei, iau autobuzul la serviciu.',
        options: [
          'De obicei, iau autobuzul la serviciu.',
          'Conduc mașina spre casă.',
          'Merg cu bicicleta la magazin.',
        ],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the mode of transportation with its meaning:',
        answers: [
          ['Car', 'Mașină'],
          ['Bicycle', 'Bicicletă'],
          ['Train', 'Tren'],
          ['Plane', 'Avion'],
        ],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the Romanian word for "train"?',
        answer: 'Tren',
        options: [
          { label: 'Mașină', value: 'Mașină', isCorrect: false },
          { label: 'Bicicletă', value: 'Bicicletă', isCorrect: false },
          { label: 'Tren', value: 'Tren', isCorrect: true },
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'I need to catch the @@@ at 8 AM.',
        answer: 'bus',
        options: [
          { label: 'car', value: 'car' },
          { label: 'train', value: 'train' },
          { label: 'bus', value: 'bus' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'I prefer to travel by plane.',
        answer: 'Prefer să călătoresc cu avionul.',
        options: ['Prefer', 'să', 'călătoresc', 'cu', 'avionul.'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What mode of transportation do you use to travel long distances?',
        answer: 'Cu ce mijloc de transport călătorești pe distanțe lungi?',
        options: [
          {
            label: 'Cu ce mijloc de transport călătorești pe distanțe lungi?',
            value: 'Cu ce mijloc de transport călătorești pe distanțe lungi?',
            isCorrect: true,
          },
          {
            label: 'Ce mananci la micul dejun?',
            value: 'Ce mananci la micul dejun?',
            isCorrect: false,
          },
          { label: 'Unde lucrezi?', value: 'Unde lucrezi?', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'I travel by train to visit my parents.',
        answer: 'Călătoresc cu trenul să îmi vizitez părinții.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What mode of transportation do you use to commute to work?',
        answer: 'Cu ce mijloc de transport călătorești la serviciu?',
        options: [
          {
            label: 'Ce faci în timpul liber?',
            value: 'Ce faci în timpul liber?',
            isCorrect: false,
          },
          { label: 'Cum te numești?', value: 'Cum te numești?', isCorrect: false },
          {
            label: 'Cu ce mijloc de transport călătorești la serviciu?',
            value: 'Cu ce mijloc de transport călătorești la serviciu?',
            isCorrect: true,
          },
        ],
      },
    },
  ],
};

export const lesson9: Lesson = {
  lesson_id: '9',
  title: 'Family Members Vocabulary',
  description:
    'This lesson covers basic family members vocabulary in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'My sister is coming to visit next week.',
        answer: 'Sora mea vine să ne viziteze săptămâna viitoare.',
        options: [
          'Sora mea vine să ne viziteze săptămâna viitoare.',
          'Fratele meu merge la școală.',
          'Mama face cină acum.',
        ],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the family member with its meaning:',
        answers: [
          ['Mother', 'Mamă'],
          ['Father', 'Tată'],
          ['Brother', 'Frate'],
          ['Sister', 'Soră'],
        ],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the Romanian word for "mother"?',
        answer: 'Mamă',
        options: [
          { label: 'Tată', value: 'Tată', isCorrect: false },
          { label: 'Frate', value: 'Frate', isCorrect: false },
          { label: 'Mamă', value: 'Mamă', isCorrect: true },
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'I have a @@@ and a brother.',
        answer: 'sister',
        options: [
          { label: 'mother', value: 'mother' },
          { label: 'father', value: 'father' },
          { label: 'sister', value: 'sister' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'My grandparents live in the countryside.',
        answer: 'Bunicii mei locuiesc la țară.',
        options: ['Bunicii', 'mei', 'locuiesc', 'la', 'țară.'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What family member do you spend the most time with?',
        answer: 'Cu ce membru al familiei petreci cel mai mult timp?',
        options: [
          {
            label: 'Cu ce membru al familiei petreci cel mai mult timp?',
            value: 'Cu ce membru al familiei petreci cel mai mult timp?',
            isCorrect: true,
          },
          {
            label: 'Ce faci în timpul liber?',
            value: 'Ce faci în timpul liber?',
            isCorrect: false,
          },
          { label: 'Ce ai mâncat la prânz?', value: 'Ce ai mâncat la prânz?', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'My brother plays football every Saturday.',
        answer: 'Fratele meu joacă fotbal în fiecare sâmbătă.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'Who helps you with your homework?',
        answer: 'Cine te ajută cu temele?',
        options: [
          {
            label: 'Ce faci în timpul liber?',
            value: 'Ce faci în timpul liber?',
            isCorrect: false,
          },
          { label: 'Ce ai mâncat la prânz?', value: 'Ce ai mâncat la prânz?', isCorrect: false },
          { label: 'Cine te ajută cu temele?', value: 'Cine te ajută cu temele?', isCorrect: true },
        ],
      },
    },
  ],
};

export const lesson10: Lesson = {
  lesson_id: '10',
  title: 'Colors Vocabulary',
  description:
    'This lesson covers basic colors vocabulary in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'The sky is blue today.',
        answer: 'Cerul este albastru azi.',
        options: ['Cerul este albastru azi.', 'Pământul este roșu.', 'Frunzele sunt galbene.'],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the color with its meaning:',
        answers: [
          ['Red', 'Roșu'],
          ['Blue', 'Albastru'],
          ['Green', 'Verde'],
          ['Yellow', 'Galben'],
        ],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the English word for "albastru"?',
        answer: 'Blue',
        options: [
          { label: 'Red', value: 'Red', isCorrect: false },
          { label: 'Green', value: 'Green', isCorrect: false },
          { label: 'Blue', value: 'Blue', isCorrect: true },
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'The sun is @@@ today.',
        answer: 'yellow',
        options: [
          { label: 'red', value: 'red' },
          { label: 'blue', value: 'blue' },
          { label: 'yellow', value: 'yellow' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'The grass is green.',
        answer: 'Iarba este verde.',
        options: ['Iarba', 'este', 'verde.'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What color is your shirt?',
        answer: 'Ce culoare este cămașa ta?',
        options: [
          {
            label: 'Ce culoare este cămașa ta?',
            value: 'Ce culoare este cămașa ta?',
            isCorrect: true,
          },
          { label: 'Unde locuiești?', value: 'Unde locuiești?', isCorrect: false },
          { label: 'Cum te numești?', value: 'Cum te numești?', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'I like the color purple.',
        answer: 'Îmi place culoarea mov.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What color is the banana?',
        answer: 'Ce culoare are banana?',
        options: [
          { label: 'Ce culoare este cerul?', value: 'Ce culoare este cerul?', isCorrect: false },
          { label: 'Ce culoare are banana?', value: 'Ce culoare are banana?', isCorrect: true },
          { label: 'Ce culoare are iarba?', value: 'Ce culoare are iarba?', isCorrect: false },
        ],
      },
    },
  ],
};

export const lesson11: Lesson = {
  lesson_id: '11',
  title: 'Animals Vocabulary',
  description:
    'This lesson covers basic animals vocabulary in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'The cat is sleeping.',
        answer: 'Pisica doarme.',
        options: ['Câinele aleargă.', 'Pisica doarme.', 'Păsările cântă.'],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the animal with its meaning:',
        answers: [
          ['Dog', 'Câine'],
          ['Cat', 'Pisică'],
          ['Bird', 'Pasăre'],
          ['Fish', 'Pește'],
        ],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the English word for "câine"?',
        answer: 'Dog',
        options: [
          { label: 'Cat', value: 'Cat', isCorrect: false },
          { label: 'Bird', value: 'Bird', isCorrect: false },
          { label: 'Dog', value: 'Dog', isCorrect: true },
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'The bird is flying in the @@@.',
        answer: 'sky',
        options: [
          { label: 'water', value: 'water' },
          { label: 'sky', value: 'sky' },
          { label: 'forest', value: 'forest' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'The fish swims in the water.',
        answer: 'Peștele înoată în apă.',
        options: ['Peștele', 'înoată', 'în', 'apă.'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the color of the cat?',
        answer: 'Care este culoarea pisicii?',
        options: [
          {
            label: 'Care este culoarea pisicii?',
            value: 'Care este culoarea pisicii?',
            isCorrect: true,
          },
          { label: 'Cum te numești?', value: 'Cum te numești?', isCorrect: false },
          { label: 'Ce faci?', value: 'Ce faci?', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'The dog barks.',
        answer: 'Câinele latră.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'Which animal lives in water?',
        answer: 'Care animal trăiește în apă?',
        options: [
          {
            label: 'Care animal trăiește în apă?',
            value: 'Care animal trăiește în apă?',
            isCorrect: true,
          },
          {
            label: 'Care animal trăiește în pădure?',
            value: 'Care animal trăiește în pădure?',
            isCorrect: false,
          },
          {
            label: 'Care animal zboară în cer?',
            value: 'Care animal zboară în cer?',
            isCorrect: false,
          },
        ],
      },
    },
  ],
};

export const lesson12: Lesson = {
  lesson_id: '12',
  title: 'Food Vocabulary',
  description:
    'This lesson covers basic food vocabulary in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'I like to eat pizza.',
        answer: 'Îmi place să mănânc pizza.',
        options: ['Îmi place să mănânc pizza.', 'Eu beau apă.', 'Noi dormim mult.'],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the food with its meaning:',
        answers: [
          ['Apple', 'Măr'],
          ['Banana', 'Banana'],
          ['Bread', 'Pâine'],
          ['Orange', 'Portocală'],
        ],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the English word for "mere"?',
        answer: 'Apple',
        options: [
          { label: 'Bread', value: 'Bread', isCorrect: false },
          { label: 'Apple', value: 'Apple', isCorrect: true },
          { label: 'Orange', value: 'Orange', isCorrect: false },
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'I drink @@@ every morning.',
        answer: 'coffee',
        options: [
          { label: 'juice', value: 'juice' },
          { label: 'water', value: 'water' },
          { label: 'coffee', value: 'coffee' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'I eat bread for breakfast.',
        answer: 'Mănânc pâine la micul dejun.',
        options: ['Mănânc', 'pâine', 'la', 'micul', 'dejun.'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What do you like to eat?',
        answer: 'Ce îți place să mănânci?',
        options: [
          {
            label: 'Ce îți place să mănânci?',
            value: 'Ce îți place să mănânci?',
            isCorrect: true,
          },
          { label: 'Unde ești?', value: 'Unde ești?', isCorrect: false },
          { label: 'Ce faci?', value: 'Ce faci?', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'I drink water every day.',
        answer: 'Beau apă în fiecare zi.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the color of an apple?',
        answer: 'Care este culoarea unui măr?',
        options: [
          {
            label: 'Care este culoarea unui măr?',
            value: 'Care este culoarea unui măr?',
            isCorrect: true,
          },
          { label: 'Ce este asta?', value: 'Ce este asta?', isCorrect: false },
          { label: 'Cât de înalt ești?', value: 'Cât de înalt ești?', isCorrect: false },
        ],
      },
    },
  ],
};

export const lesson13: Lesson = {
  lesson_id: '13',
  title: 'Numbers and Counting',
  description:
    'This lesson covers basic numbers and counting in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'There are five apples.',
        answer: 'Sunt cinci mere.',
        options: ['Sunt cinci mere.', 'Eu am patru mere.', 'Noi avem zece mere.'],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the number with its word:',
        answers: [
          ['1', 'Unu'],
          ['2', 'Doi'],
          ['3', 'Trei'],
          ['4', 'Patru'],
        ],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the English word for "cinci"?',
        answer: 'Five',
        options: [
          { label: 'Three', value: 'Three', isCorrect: false },
          { label: 'Four', value: 'Four', isCorrect: false },
          { label: 'Five', value: 'Five', isCorrect: true },
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'I have @@@ pencils.',
        answer: 'ten',
        options: [
          { label: 'two', value: 'two' },
          { label: 'five', value: 'five' },
          { label: 'ten', value: 'ten' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'He has seven books.',
        answer: 'El are șapte cărți.',
        options: ['El', 'are', 'șapte', 'cărți.'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'How many apples are there?',
        answer: 'Câte mere sunt?',
        options: [
          {
            label: 'Câte mere sunt?',
            value: 'Câte mere sunt?',
            isCorrect: true,
          },
          { label: 'Ce faci?', value: 'Ce faci?', isCorrect: false },
          { label: 'Unde ești?', value: 'Unde ești?', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'There are six chairs in the room.',
        answer: 'Sunt șase scaune în cameră.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What comes after four?',
        answer: 'Ce vine după patru?',
        options: [
          {
            label: 'Ce vine după patru?',
            value: 'Ce vine după patru?',
            isCorrect: true,
          },
          { label: 'Ce este asta?', value: 'Ce este asta?', isCorrect: false },
          { label: 'Cât de înalt ești?', value: 'Cât de înalt ești?', isCorrect: false },
        ],
      },
    },
  ],
};

export const lesson14: Lesson = {
  lesson_id: '14',
  title: 'Fruits and Vegetables',
  description:
    'This lesson introduces common fruits and vegetables in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'I like to eat apples.',
        answer: 'Îmi place să mănânc mere.',
        options: [
          'Îmi place să mănânc mere.',
          'Îmi place să mănânc banane.',
          'Îmi place să mănânc struguri.',
        ],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the fruit with its word:',
        answers: [
          ['Apple', 'Măr'],
          ['Banana', 'Banane'],
          ['Grapes', 'Struguri'],
          ['Orange', 'Portocală'],
        ],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the English word for "struguri"?',
        answer: 'Grapes',
        options: [
          { label: 'Apple', value: 'Apple', isCorrect: false },
          { label: 'Banana', value: 'Banana', isCorrect: false },
          { label: 'Grapes', value: 'Grapes', isCorrect: true },
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'I eat @@@ every day.',
        answer: 'vegetables',
        options: [
          { label: 'fruits', value: 'fruits' },
          { label: 'vegetables', value: 'vegetables' },
          { label: 'meat', value: 'meat' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'I like to eat carrots.',
        answer: 'Îmi place să mănânc morcovi.',
        options: ['Îmi', 'place', 'să', 'mănânc', 'morcovi.'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What color is a banana?',
        answer: 'Ce culoare are banana?',
        options: [
          {
            label: 'Ce culoare are banana?',
            value: 'Ce culoare are banana?',
            isCorrect: true,
          },
          { label: 'Câte banane sunt?', value: 'Câte banane sunt?', isCorrect: false },
          { label: 'Unde ești?', value: 'Unde ești?', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'I like to eat strawberries.',
        answer: 'Îmi place să mănânc căpșuni.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What vegetable is green?',
        answer: 'Ce legumă este verde?',
        options: [
          {
            label: 'Ce legumă este verde?',
            value: 'Ce legumă este verde?',
            isCorrect: true,
          },
          { label: 'Ce culoare are mărul?', value: 'Ce culoare are mărul?', isCorrect: false },
          { label: 'Ce culoare are banana?', value: 'Ce culoare are banana?', isCorrect: false },
        ],
      },
    },
  ],
};

export const lesson15: Lesson = {
  lesson_id: '15',
  title: 'Animals',
  description:
    'This lesson introduces basic animals in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'A dog barks.',
        answer: 'Un câine latră.',
        options: ['Un câine latră.', 'Un pisică miaună.', 'O pasăre cântă.'],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the animal with its word:',
        answers: [
          ['Dog', 'Câine'],
          ['Cat', 'Pisică'],
          ['Bird', 'Pasăre'],
          ['Horse', 'Cal'],
        ],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the English word for "cal"?',
        answer: 'Horse',
        options: [
          { label: 'Dog', value: 'Dog', isCorrect: false },
          { label: 'Cat', value: 'Cat', isCorrect: false },
          { label: 'Horse', value: 'Horse', isCorrect: true },
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'A cat @@@.',
        answer: 'meows',
        options: [
          { label: 'barks', value: 'barks' },
          { label: 'meows', value: 'meows' },
          { label: 'chirps', value: 'chirps' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'A bird flies.',
        answer: 'O pasăre zboară.',
        options: ['O', 'pasăre', 'zboară.'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What does a cat say?',
        answer: 'Ce zice o pisică?',
        options: [
          {
            label: 'Ce zice o pisică?',
            value: 'Ce zice o pisică?',
            isCorrect: true,
          },
          { label: 'Ce zice un câine?', value: 'Ce zice un câine?', isCorrect: false },
          { label: 'Ce zice o pasăre?', value: 'Ce zice o pasăre?', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'A horse runs fast.',
        answer: 'Un cal aleargă repede.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What animal is big?',
        answer: 'Ce animal este mare?',
        options: [
          {
            label: 'Ce animal este mare?',
            value: 'Ce animal este mare?',
            isCorrect: true,
          },
          { label: 'Ce animal este mic?', value: 'Ce animal este mic?', isCorrect: false },
          {
            label: 'Ce animal este zgomotos?',
            value: 'Ce animal este zgomotos?',
            isCorrect: false,
          },
        ],
      },
    },
  ],
};

export const lesson16: Lesson = {
  lesson_id: '16',
  title: 'Action Verbs',
  description:
    'This lesson introduces basic action verbs in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'She runs in the park.',
        answer: 'Ea aleargă în parc.',
        options: ['Ea aleargă în parc.', 'El mănâncă în bucătărie.', 'Ea dorme în cameră.'],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the verb with its meaning:',
        answers: [
          ['Run', 'Alerga'],
          ['Eat', 'Mânca'],
          ['Sleep', 'Dormi'],
          ['Jump', 'Sări'],
        ],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the English word for "dormi"?',
        answer: 'Sleep',
        options: [
          { label: 'Run', value: 'Run', isCorrect: false },
          { label: 'Eat', value: 'Eat', isCorrect: false },
          { label: 'Sleep', value: 'Sleep', isCorrect: true },
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'He @@@ every morning.',
        answer: 'jumps',
        options: [
          { label: 'runs', value: 'runs' },
          { label: 'jumps', value: 'jumps' },
          { label: 'eats', value: 'eats' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'We eat dinner together.',
        answer: 'Noi luăm cina împreună.',
        options: ['Noi', 'luăm', 'cina', 'împreună.'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What does he do in the morning?',
        answer: 'Ce face el dimineața?',
        options: [
          {
            label: 'Ce face el dimineața?',
            value: 'Ce face el dimineața?',
            isCorrect: true,
          },
          { label: 'Ce face ea seara?', value: 'Ce face ea seara?', isCorrect: false },
          { label: 'Ce face el după-amiază?', value: 'Ce face el după-amiază?', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'She reads books every night.',
        answer: 'Ea citește cărți în fiecare seară.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What does she do before bed?',
        answer: 'Ce face ea înainte de culcare?',
        options: [
          {
            label: 'Ce face ea înainte de culcare?',
            value: 'Ce face ea înainte de culcare?',
            isCorrect: true,
          },
          { label: 'Ce face el după-amiază?', value: 'Ce face el după-amiază?', isCorrect: false },
          { label: 'Ce face el dimineața?', value: 'Ce face el dimineața?', isCorrect: false },
        ],
      },
    },
  ],
};

export const lesson17: Lesson = {
  lesson_id: '17',
  title: 'Verbs 2',
  description:
    'This lesson introduces basic verbs in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'She runs in the park.',
        answer: 'Ea aleargă în parc.',
        options: ['Ea aleargă în parc.', 'El sari în casă.', 'Ea mănâncă în grădină.'],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the verb with its meaning:',
        answers: [
          ['Run', 'Alerga'],
          ['Jump', 'Sări'],
          ['Eat', 'Mânca'],
          ['Sleep', 'Dormi'],
        ],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the English word for "dormi"?',
        answer: 'Sleep',
        options: [
          { label: 'Run', value: 'Run', isCorrect: false },
          { label: 'Sleep', value: 'Sleep', isCorrect: true },
          { label: 'Eat', value: 'Eat', isCorrect: false },
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'He @@@ every day.',
        answer: 'jumps',
        options: [
          { label: 'runs', value: 'runs' },
          { label: 'jumps', value: 'jumps' },
          { label: 'eats', value: 'eats' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'She eats an apple.',
        answer: 'Ea mănâncă un măr.',
        options: ['Ea', 'mănâncă', 'un', 'măr.'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What does he do?',
        answer: 'Ce face el?',
        options: [
          { label: 'Ce face el?', value: 'Ce face el?', isCorrect: true },
          { label: 'Ce face ea?', value: 'Ce face ea?', isCorrect: false },
          { label: 'Ce face tu?', value: 'Ce face tu?', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'She sleeps at night.',
        answer: 'Ea doarme noaptea.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What do you do?',
        answer: 'Ce faci?',
        options: [
          { label: 'Ce faci?', value: 'Ce faci?', isCorrect: true },
          { label: 'Ce mănânci?', value: 'Ce mănânci?', isCorrect: false },
          { label: 'Ce bei?', value: 'Ce bei?', isCorrect: false },
        ],
      },
    },
  ],
};

export const lesson18: Lesson = {
  lesson_id: '18',
  title: 'Verbs 3',
  description:
    'This lesson introduces more verbs in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'They swim in the pool.',
        answer: 'Ei înoată în piscină.',
        options: ['Ei înoată în piscină.', 'Ea aleargă în parc.', 'El mănâncă în grădină.'],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the verb with its meaning:',
        answers: [
          ['Swim', 'Înota'],
          ['Read', 'Citește'],
          ['Sing', 'Cânta'],
          ['Dance', 'Dansa'],
        ],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the English word for "cânta"?',
        answer: 'Sing',
        options: [
          { label: 'Swim', value: 'Swim', isCorrect: false },
          { label: 'Sing', value: 'Sing', isCorrect: true },
          { label: 'Dance', value: 'Dance', isCorrect: false },
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'She @@@ every morning.',
        answer: 'reads',
        options: [
          { label: 'runs', value: 'runs' },
          { label: 'reads', value: 'reads' },
          { label: 'eats', value: 'eats' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'He dances at parties.',
        answer: 'El dansează la petreceri.',
        options: ['El', 'dansează', 'la', 'petreceri.'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What does she do?',
        answer: 'Ce face ea?',
        options: [
          { label: 'Ce face ea?', value: 'Ce face ea?', isCorrect: true },
          { label: 'Ce face el?', value: 'Ce face el?', isCorrect: false },
          { label: 'Ce face tu?', value: 'Ce face tu?', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'He sings in a band.',
        answer: 'El cântă într-o formație.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What do you do?',
        answer: 'Ce faci?',
        options: [
          { label: 'Ce faci?', value: 'Ce faci?', isCorrect: true },
          { label: 'Ce mănânci?', value: 'Ce mănânci?', isCorrect: false },
          { label: 'Ce bei?', value: 'Ce bei?', isCorrect: false },
        ],
      },
    },
  ],
};

export const lesson19: Lesson = {
  lesson_id: '19',
  title: 'Verbs 4',
  description:
    'This lesson introduces more easy verbs in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'She sleeps at night.',
        answer: 'Ea doarme noaptea.',
        options: ['Ea doarme noaptea.', 'El aleargă în parc.', 'Eu citesc o carte.'],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the verb with its meaning:',
        answers: [
          ['Sleep', 'Dormi'],
          ['Eat', 'Mănâncă'],
          ['Drink', 'Bea'],
          ['Walk', 'Mergi'],
        ],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the English word for "mănâncă"?',
        answer: 'Eat',
        options: [
          { label: 'Sleep', value: 'Sleep', isCorrect: false },
          { label: 'Eat', value: 'Eat', isCorrect: true },
          { label: 'Drink', value: 'Drink', isCorrect: false },
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'He @@@ every morning.',
        answer: 'walks',
        options: [
          { label: 'runs', value: 'runs' },
          { label: 'walks', value: 'walks' },
          { label: 'eats', value: 'eats' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'They eat at the restaurant.',
        answer: 'Ei mănâncă la restaurant.',
        options: ['Ei', 'mănâncă', 'la', 'restaurant.'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What does he do?',
        answer: 'Ce face el?',
        options: [
          { label: 'Ce face el?', value: 'Ce face el?', isCorrect: true },
          { label: 'Ce face ea?', value: 'Ce face ea?', isCorrect: false },
          { label: 'Ce face tu?', value: 'Ce face tu?', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'She drinks water.',
        answer: 'Ea bea apă.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What do you do?',
        answer: 'Ce faci?',
        options: [
          { label: 'Ce faci?', value: 'Ce faci?', isCorrect: true },
          { label: 'Ce mănânci?', value: 'Ce mănânci?', isCorrect: false },
          { label: 'Ce bei?', value: 'Ce bei?', isCorrect: false },
        ],
      },
    },
  ],
};

export const lesson20: Lesson = {
  lesson_id: '20',
  title: 'Simple Adjectives',
  description:
    'This lesson introduces basic adjectives in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'She is happy.',
        answer: 'Ea este fericită.',
        options: ['Ea este fericită.', 'El este trist.', 'Eu sunt obosit.'],
      },
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the adjective with its meaning:',
        answers: [
          ['Happy', 'Fericit'],
          ['Sad', 'Trist'],
          ['Tired', 'Obosit'],
          ['Hungry', 'Înfometat'],
        ],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the English word for "înfometat"?',
        answer: 'Hungry',
        options: [
          { label: 'Happy', value: 'Happy', isCorrect: false },
          { label: 'Sad', value: 'Sad', isCorrect: false },
          { label: 'Hungry', value: 'Hungry', isCorrect: true },
        ],
      },
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'He is @@@ after playing football.',
        answer: 'tired',
        options: [
          { label: 'happy', value: 'happy' },
          { label: 'sad', value: 'sad' },
          { label: 'tired', value: 'tired' },
        ],
      },
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'The cat is black.',
        answer: 'Pisica este neagră.',
        options: ['Pisica', 'este', 'neagră.'],
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What color is the sky?',
        answer: 'Ce culoare are cerul?',
        options: [
          { label: 'Ce culoare are cerul?', value: 'Ce culoare are cerul?', isCorrect: true },
          {
            label: 'Ce culoare are pământul?',
            value: 'Ce culoare are pământul?',
            isCorrect: false,
          },
          { label: 'Ce culoare are iarba?', value: 'Ce culoare are iarba?', isCorrect: false },
        ],
      },
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'The flowers are beautiful.',
        answer: 'Florile sunt frumoase.',
      },
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is the English word for "înfometat"?',
        answer: 'Hungry',
        options: [
          { label: 'Happy', value: 'Happy', isCorrect: false },
          { label: 'Sad', value: 'Sad', isCorrect: false },
          { label: 'Hungry', value: 'Hungry', isCorrect: true },
        ],
      },
    },
  ],
};
