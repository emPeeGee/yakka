# Todo

## High

[x] Naming files conventions, right now kebab-case. Sol: PascalCase and camelCase
[x] importing rules, group in 3: builtin, external and local
[x] Look how theme provider is implemented in obytes and revise it. Sol: Current impl is ok, because I don't use native wind.
[x] Another lib for persistance because don't like that async storage is async. Sol: MMKV is the only way, but expo go doesn't support it.
[x] DONE: Storage and default schemes: light, dark and system https://medium.com/simform-engineering/manage-dark-mode-in-react-native-application-2a04ba7e76d0
[x] Use storage.ts
[x] Consume theme in ui
[x] Text as a custom component which consumes theme
[x] In theme, colors should be separated. SOL: will continue using colors as a part of the theme.
[x] Better logging
[x] Suffix for types
[x] Swiper on last page execute callback
[x] Better and correct colors
[x] Logger. Make it singleton.
[x] Deprecate useIsFirstTime
[x] too many unstyled pressables
[ ] use more global styles and extract the existing ones
[x] Hide back button on tab main screen
[x] List with switch
[x] better colors for background in light and dark
[x] Add a proper font. SOL: use the default one.
[x] Add proper typology
[x] Use typology
[x] Merge Text and EnhancedText
[x] Refactors typography
[x] Text field implementation
[ ] Move text to tx
[x] refactor theme props to be consistent: xxs, xs, sm, md, lg...
[ ] Height of the vocabulary card should not be fixed by calculated depending on the screen height
[ ] Lessons should be grouped. Revise the mock
[ ] Display proper category in card stack instead of the id
[x] store favorite words in the storage
[ ] content for explore
[x] Lesson: On back/exit, should show a modal with confirmation
[x] LearnTree: circle should indicate if lesson is passed via color
[x] Lesson: sounds on success or fail
[x] replace all activity indicator with loader
[x] store the lesson stats somewhere and reflect in the tree it.
[x] stats system
[ ] challenges
[x] next lesson and passed ones
[x] Matching pairs activity
[x] Only speaker/listening activity
[x] Start lesson sheet
[x] Valid tree with current lesson and completed ones and future.
[x] Welcome message
[x] Stats system: display in lesson tree
[x] current tile expanding ring animation
[x] Header
[x] life regeneration
[x] no lives no lessons
[ ] more lessons
[ ] lesson failed
[ ] remove webpack in favor of metro
[ ] text inputs keyboard type
[ ] move all auth request into the use auth

## Medium:

[ ] like a explore lesson
[ ] Action sheet in the learn tree as well ??? or blurred component ???
[ ] Check enhanced text, instead of style for size use size prop
[ ] to many cards in the initial deck
[ ] move all state/stores is a separate folder
[x] Stack card effect in the vocabulary (right now there is not a visible card at the bottom)
[ ] Crop all images and remove scale
[ ] Animated the start of the current tile.
[ ] Better docs
[ ] Russian language support
[ ] RN navigation. Get rid of `never`
[ ] Before going to the lesson, make a confirmation dialog (as duo)
[ ] Login to save progress.
[ ] Login to enable access to full content ???
[x] No card in vocabulary: lottie animation
[ ] time and accuracy from the completed lesson should be send for statistics and records.
[ ] translate screens titles
[ ] buy lives by payng balloons
[ ] Make sign up flow with wizard as per mock

## Low:

[ ] real emoji in the questions: https://openmoji.org/
[ ] zig-zag layout in the learn path. https://codepen.io/anon/pen/jwaQEq?editors=1100
[ ] proper color for tab separator
[ ] chevron on hover changes color in dark theme. Cannot reproduce on Android. Check ios
[ ] Add https://github.com/gvergnaud/ts-pattern
[ ] Logger types refactor. LOW Priority.
[ ] Better radio box
[ ] animation after onboarding is finished. LowP.
[ ] Change the pagination animation: worm style https://www.animatereactnative.com/post/react-native-parallax-carousel-%2B-worm-pagination https://github.com/weahforsage/react-native-animated-pagination-dots
[ ] Tooltip for buttons with only an icon
[ ] Enhanced radio box
[ ] match pairs activity -> deselect pairs
[ ] voc categories status bar and background animation color conflict

## Bugs:

[ ] wizard back gesture android learning mode
[ ] autokeyboard for typeanswer
[x] status bar and bottom bar colors in different themes
[ ] randomize matching pairs
[ ] click favorite word => no category
[ ] after adding new word to like, click favorites
[ ] word of the day, front and back card have different width and height
