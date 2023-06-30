# Phase1--project
The Trivia Game project:
I will be using db.json as my database and will be using the JSON server for this particular project.
The HTML and the JSON files are pretty understandable as it defines the structure and the inline content used for my project
Starting with the fetch and the JS structure, all the elements are named using querySelector or getElementById
We then pass on a function called "displayQuestion" that takes in a current question index in order to be able to display the current question along with its options, we append that to the "div" element structure as seen on the webpage.
We then call another function called "selectOption", which handles an event relating to the correct and incorrect options.
We then pass another function called submitAnswer, this function executes the exact way of how each option is handled. I also added another functionality. of asynchronous function using the set timeout feature, which changes the question after exactly one second.
The next function is "nextQuestion", which displays the questions using the if statement.
There is another small surprise in this function if the user is able to get all the answers correct, an image from "Indiana Jones" is displayed and a congratulatory message is received
furthermore we just have the functions for our event listeners coded in this file and in the last we display. an error message if something goes wrong.
