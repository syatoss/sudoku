/**
 * the function checks if the user name and the password matches the needed ones to login.
 * 
 * @param {string} user [the user name]
 * @param {string} password [the password]
 * @returns {void}
 */

function validateAccount(user,password){
    let name = document.getElementById(user);
    let pass = document.getElementById(password);
    let nextPage = document.getElementById('userLogin');
    if(name.value == 'abcd' && pass.value == '1234'){
        sessionStorage.setItem('userName',name.value);//passes on the information about the users name to the next page
        window.location.href = 'page2.html';//next window is loaded
    }else{//deals the nessesery alerts under the currect input if the one of the fielsd does not match
        if(name.value != 'abcd')
            document.getElementById('userError').innerHTML = 'User name does not exist';
        else if(name.value == 'abcd')
            document.getElementById('userError').innerHTML = '';
        if(pass.value != '1234')
            document.getElementById('passwordError').innerHTML = 'Invalid password';
        else if(name.value == '1234')
            document.getElementById('passwordError').innerHTML = '';
        name.value = '';
        pass.value = '';
    }
}//func



/**
 * the user is moved to the next page as an unregistered account
 * 
 * @returns {void}
 */

function guestLogin(){
    sessionStorage.setItem('userName','Guest');//passes on the information about the users name to the next page
    window.location.href = 'page2.html';//next page is loaded
}//func