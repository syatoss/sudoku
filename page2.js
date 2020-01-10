/**
 * the function recieves the lvl of difficulty the player wants to play in
 * and saves it in the session storage for the next page to use, and loads the next page
 * @param {string} str [the lvl of difficulty]
 * @returns {void}
 */
function diffLvl(str){
    sessionStorage.setItem('difficulty',str);//difficulty lvl is saved
    window.location.href = 'page3.html';//next page loaded
}
let name = sessionStorage.getItem('userName');


if(name != null){//the user name is added to the healine of the page
document.getElementById('headline').innerHTML += name;
}

