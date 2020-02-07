# General description:
A sudoku website with 3 levels of difficulty, easy medium and hell.
Note: the page is user side only with no server side, meaning scores and users are not saved. 

The site has three pages:

1) Welcome page:
Supports the following:
* log in a guest - lets you play as a registered guest.
* sign in - only username "abcd" with password "1234" are registered any other atempt will display
  a relevant error message under the compatible field.
2) Difficulty picking page:
* lets the user choose his desiered level of difficulty.
3) The suduku game itself:
* the sudoku is generated randomly by a recorsive algorithm.
  meaning that the sudoku is NOT selected from a database.
* has a header with the relevant users name.
* has a timer from the start of the game.
* dafeult filled slots are not mutable.
* when a nubmer already occures on eather a line or the relevant square, the number is highlited.
* only numbers fit to the slots.
* if the sudoku was solved currectly the playesr time is displayed in an alert.


# Technologies used:

Javascript ES6, Bootstrap 4, CSS3,HTML5.

# Link to website

https://syatoss.github.io/sudoku/
