# Architecture

## General

The Yakka will follow a group by functionality mixed with feature based(for example, screens related components will be created under the screen component). By functionality means you group similar items together e.g. all screens, all components, all state even though they are for different features. Screen can include subcomponents related to that screen only.

## Project structure (example)

### Overview

.
├── assets ## assets folder can contain all the static files such as images, fonts, etc.
├── api ## any thing related to api calls and data fetching
│   ├── common ##common api files such as axios client
│   ├── index.tsx
│   ├── posts ## query and mutation related to post
│   └── types.ts
├── core # core files such as auth, localization, storage and more
│   ├── auth
│   ├── env.js
│   ├── hooks
│   ├── i18n
│   ├── index.tsx
│   ├── keyboard.ts
│   ├── storage.tsx
│   ├── test-utils.tsx
│   └── utils.ts
├── index.tsx
├── navigation
├── screens
│   ├── feed
│   ├── index.tsx
│   ├── login
│   ├── onboarding
│   ├── settings
│   └── style
├── translations # translation resources files
│   ├── ar.json
│   └── en.json
├── types
│   └── index.ts
└── ui # ui components and theme configuration
├── core
├── error-handler
├── focus-aware-status-bar.tsx
├── icons
├── index.tsx
├── screen.tsx
├── theme
└── utils.tsx

### Explanation

`assets`: This folder contains all the static files such as images, fonts, etc.

`ui`: This folder contains all the UI components and the theme configuration. We provide minimal components with a basic obytes theme. You can add your own components and theme configuration here.

`core`: This folder contains the core files, such as authentication, localization, storage, and more. It can be shared with other projects. That’s why we are only including modules that have nothing to do with project logic. This approach helps us share code between projects and also update the starter with new features.

`navigation`: This folder contains the navigation files such as stack, tab and drawer navigators. We provide a basic navigation structure for the demo app that you can modify to fit your needs.

`screens`: This folder contains the screens files. We provide a basic screens structure for the demo app that you can remove and add your screens. If you need to create a specific component for a screen you can create a components folder inside the screen folder.

`api`: This folder contains the API files. We provide a basic api client and provider and you just need to create query and mutation for your modules. Check posts folder for inspiration on how to create a query and mutation.

`translations`: This folder contains the translation resources files. We recommend using translation files even if you are not supporting multiple languages as it will help you to support multiple languages in the future and also help you to find all the strings in one place.

`types`: This folder contains the global types.

## Naming conventions

`components` and `screens`: will use PascalCase.
`anything else`: camelCase is recommended.

## Reference

https://github.com/infinitered/ignite/blob/master/docs/Folder-Structure.md
https://starter.obytes.com/getting-started/project-structure/
https://github.com/alan2207/bulletproof-react/tree/master

A huge RN project following kinda flat architecture: https://github.com/rainbow-me/rainbow/tree/develop
