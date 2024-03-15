export const en = {
  common: {
    ok: 'OK!',
    cancel: 'Cancel',
    back: 'Back',
    start: 'Start',
    doAgain: 'Do again',
    logOut: 'Log Out',
    finish: 'Finish',
    continue: 'Continue',
    english: 'English',
    romanian: 'Romanian',
    awesome: 'Awesome!',
    skip: 'Skip',
    leaveSure: 'Are you sure you want to leave?',
    leave: 'Leave',
    stay: 'Stay',
    loading: 'Loading',
    noEntriesFound: 'No entries found.',
    noEntriesFoundDetails: 'There are currently no entries available.',
    noEntriesYet: 'No items added yet.',
    noEntiresYetDetails: "You haven't added any items yet. Start by adding some items.",
    sheep: 'Counting Sheep...',
    totalXp: 'Total XP',
    accuracy: 'Accuracy',
    time: 'Time',
    balloons: 'Balloons',
    lives: 'Lives',
    livesUsed: 'Lives used',
  },
  // Won't change depending on the language
  universal: {
    yakka: 'Yakka',
    google: 'Google',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    playMarket: 'Play Market',
    appStore: 'App Store',
    web: 'Web',
    recommendation: 'Recommendation',
    other: 'Other',
  },
  onboard: {
    lang: 'What language do you want to use for Yakka?',
    knowAbout: 'How did you know about Yakka?',
    engYouKnow: 'How much English do you know?',
    engYouKnow1: 'I just started learning English',
    engYouKnow2: 'I know some words and phrases',
    engYouKnow3: 'I can have a simple conversation',
    engYouKnow4: 'I’m at intermediate level or above',

    why: 'Why are you studying English',
    why1: 'Just for fun',
    why2: 'Improve my career',
    why3: 'Support my education',
    why4: 'Vacation preparation',
    why5: 'Other reason',
    thisIsWhat: 'This is what you can achieve!',
    thisIsSpeak1: 'Speak fluently and confidently',
    thisIsSpeak2: '1000 + stress-free interactive exercises',
    thisIsVoc1: 'Mastering a lof of vocabulary',
    thisIsVoc2: '2000+ practical words and phrases',
    thisIsCul1: 'Cultivate study habits',
    thisIsCul2: 'Smart reminders, fun challenges and more',

    time: 'What will be your target time for studying English?',
    time1: '5 mins / day',
    time1Att: 'Relax',
    time2: '10 mins / day',
    time2Att: 'Normal',
    time3: '15 mins / day',
    time3Att: 'Serious',
    time4: '30 mins / day',
    time4Att: 'Great',
    time5: '60 mins / day',
    time5Att: 'Awesome',

    getStarted: 'Get started',
    haveAnAccount: 'I already have an account',
    benefit1: 'Learn English language whenever and wherever you want.',
    greeting1: "Hi there. I'm Yakka!",
    createProfileDesc: 'Create a profile now so you can save progress or you can skip it.',
    createProfile: 'Create profile',
  },
  auth: {
    signUp: 'Sign up',
    contWithoutProf: 'Continue without profile',
    resetPassword: 'Reset password',
    login: 'Log in',
    email: 'Email',
    password: 'Password',
  },
  learn: {
    greeting: 'Hello, {{name}}!',
    whatDoesSentence: 'What does sentence mean?',
    checkAnswer: 'Check answer',
    answer: 'Answer',
    amazing: 'Amazing',
    oopsWrong: `Oops... That's incorrect`,
    benefit: 'Complete the course faster to get more XP and Balloons',
    lessonCompleted: 'Lesson completed!',
    lessonHasBeenCompleted: 'Lesson has already been completed',
    fillMissingWord: 'Fill in the blanks.',
    matchPairs: 'Tap the matching pairs',
    matchingPairsInfo: `Exercise your matching skills as you uncover pairs of words and match them up. Once you've selected a pair, it's locked in, so make sure to choose carefully! Can you fill the board by matching all the pairs? Let's find out!`,
    wouldLearn: 'What would you like to learn today?',
    noLivesLeftSheet: `Oops! You've run out of lives. Please wait for new lives to regenerate or purchase more to continue playing.`,
    waitLives: 'Wait for lives',
    buyLives: 'Buy more lives',
    regeneratingInProgress: 'Lives are currently regenerating',
    regeneratingDone: 'Your lives have finished regenerating',
  },
  voc: {
    word: 'Word',
    wordOfTheDay: 'Word of the day',
    seeWordOfTheDay: 'See word of the day',
    favorites: 'Favorites',
    search: 'Search',
    searchWord: 'Search a word',
    searchCategory: 'Search a category',
    whichCategory: 'Which category',
    wouldLearn: 'would you like to learn?',
    allWords: 'All words',
    animals: 'Animals',
    colors1: 'Colors 1',
    colors2: 'Colors 2',
    shapes: 'Shapes',
    actions1: 'Actions 1',
    actions2: 'Actions 2',
    vegetables: 'Vegetables',
    transport: 'Transport',
    pets: 'Pets',
    weather: 'Weather',
  },
  exp: {
    '12basicTenses': '12 Basic tenses',
    verbs: 'Verbs',
    grammar: 'Grammar',
    presentSimple: 'Present simple',
    presentContinuous: 'Present continuous',
    presentPerfect: 'Present perfect',
    presentPerfectContinuous: 'Present perfect continuous',
    pastSimple: 'Past simple',
    pastContinuous: 'Past continuous',
    pastPerfect: 'Past perfect',
    pastPerfectContinuous: 'Past perfect continuous',
    futureSimple: 'Future simple',
    futureContinuous: 'Future continuous',
    futurePerfect: 'Future perfect',
    futurePerfectContinuous: 'Future perfect continuous',
    irregularVerbs: 'Irregular verbs',
    regularVerbs: 'Regular verbs',
    searchTopic: 'Search a topic',
    learnToday: 'What would you like to read?',
  },
  temp: {
    clear1: 'Clear the storage',
    sound: 'Sound',
  },
  info: {
    lives:
      "Lives are used to attempt challenges during the lesson. If you run out of lives, you won't be able to attempt any more challenges. However, don't worry! Your current lesson progress won't be interrupted. You can continue with the other lessons once more lives are generated",
  },
};

export type Translations = typeof en;
