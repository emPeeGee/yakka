# Knowledge

Dark, light and system theme support. (In profile -> settings)

Supabase or Watermelon
If you want to use Watermelon DB, its quite nice. It has an offline first approach and a whole section in the documentation dedicated to syncronisation with a backend of your choosing. Its built on SQLite so its all in table form, but you can also save json objects within a column of a table. https://watermelondb.dev/docs

I won't use `fp-ts` because it will add an additional layer of abstraction.

## Learn TS and FP in JS better instead of fp libs !

## FP in js/ts:

For this project, I will make all the necessary function by hand, like lodash

FP approach in js/ts:
https://www.reddit.com/r/typescript/comments/16w3iwn/opinions_about_effectts_do_you_recommend_using_it/
https://www.reddit.com/r/functionalprogramming/comments/13v42f7/opinions_about_fp_frameworks/

(c) @josephjnk:
My take (as someone who has been doing FP-ish stuff in the JS ecosystem for a while) is that JS/TS aren’t very good FP languages. FP techniques are helpful in them, but they have significant limitations that proper FP languages do not. When you find yourself working hard against the language to hack in capabilities that it’s missing (specifically: higher-kinded types in TypeScript) it’s probably time to consider whether you’re using the right language for the task at hand, and whether you’re using the right approach for the language you’ve chosen.

## Error handling

https://medium.com/with-orus/the-5-commandments-of-clean-error-handling-in-typescript-93a9cbdf1af5
Too rust like: https://github.com/supermacro/neverthrow

(c) LiveWrestlingAnalyst
Don't listen to the clueless people advising to send some kind of Result type from your functions.
Bubbling errors down with a Result type and a bunch of operators around the type is fucking awful advice and literally reinventing the wheel (i.e the exception system). It's extremely rare that you need to explicitly unwrap the type of your error, and usually a sign of code smell if you have to.

(c) I disagree. The fact there is no built-in result type goes to show that it's not idiomatic. I still think it's a nice pattern, it gives you better type safety and ultimately more well defined APIs. But this isn't Rust or Haskell and thrown Error objects are the expected way of handling errors in TypeScript.

(c) romeeres
IMO: no, there are languages like Rust, Go, and functional languages that were designed for returning errors, but not JS, it was designed for throwing exceptions.

Hello callback (err, stuff) => my old friend... I've come to talk with you again

## Other

Crazy: https://github.com/Effect-TS/effect
Schema declaration and validation: https://zod.dev/?id=strings
