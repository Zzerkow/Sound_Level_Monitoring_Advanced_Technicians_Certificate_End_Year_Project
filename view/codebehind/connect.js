window.onload = function() {

    load_data();
    Get_Config();
    console.log(localStorage)
}

function Get_Config(){

    $.ajax({
        type: 'GET',
        url:  files_ip + '/Controller/Call_config.php',
        dataType: 'json',

        success: function (data, status) {
            console.log(status);
            localStorage.setItem('Lien_API', data.Lien);
            localStorage.setItem('IP_Rasp', data.IP_Rasp);
            localStorage.setItem('Port_Rasp', data.Port_Rasp);
            localStorage.setItem('IP_BDD', data.IP_BDD);
            localStorage.setItem('Port_BDD', data.Port_BDD);
            localStorage.setItem('dbname', data.dbname);
            localStorage.setItem('user_bdd', data.user);
            localStorage.setItem('password_bdd', data.password);
        },

        error: function (data, status) {
            console.log(status);
        }
    });
}

function Connection() {

    var Username = document.getElementById("Username").value;
    var Password = document.getElementById("Password").value;

    var Json_obj={
        identifiant: Username,
        password: Password,
    }

    $.ajax({
        type: 'POST',
        url: localStorage.getItem('Lien_API') + '/api/v1/connect',
        dataType: 'json',

        data:JSON.stringify(Json_obj),

        success: function (data, status) {
            console.log(status);
            console.log(data);
            document.getElementById("LB_warning").style.visibility= 'hidden';
            document.getElementById("Connect_click").style.backgroundColor= '#B2FFC8';
            localStorage.setItem("Prenom",data.prenom);
            localStorage.setItem("Nom",data.nom);
            localStorage.setItem("Image",data.image);
            localStorage.setItem("Auth",data.auth);
            localStorage.setItem("Token",data.token);
            localStorage.setItem("Password", document.getElementById("Password").value);
            localStorage.setItem("Identifiant", document.getElementById("Username").value);

            if(data.auth == 'admin')
            {
                document.getElementById("LB_warning").style.visibility= 'visible';
                document.getElementById("LB_warning").style.color= '#B2FFC8';
                document.getElementById("LB_warning").innerHTML= 'Connexion établie, redirection vers page Admin.';
                document.getElementById("Connect_click").style.backgroundColor= '#B2FFC8';
                document.getElementById("Connect_click").style.color= 'black';
               setTimeout(go_to_admin,1000);
            }
            else{
                document.getElementById("LB_warning").style.visibility= 'visible';
                document.getElementById("LB_warning").style.color= '#B2FFC8';
                document.getElementById("LB_warning").innerHTML= 'Connexion établie, redirection vers page User.';
                document.getElementById("Connect_click").style.backgroundColor= '#B2FFC8';
                document.getElementById("Connect_click").style.color= 'black';
                setTimeout(go_to_user,2000);
            }
            setTimeout(function(){document.getElementById("LB_warning").style.visibility= 'hidden';},3000);
        },
        error : function(data,status){
            document.getElementById("LB_warning").style.visibility= 'visible';
            document.getElementById("LB_warning").innerHTML= 'Mauvais mot de passe ou Identifiant.';
            document.getElementById("LB_warning").style.color= '#FF6666';
            document.getElementById("Connect_click").style.backgroundColor= '#FF6666';
            document.getElementById("Connect_click").style.color= '#ffffff';
            document.getElementById("Connect_click").className= 'animate__bounceOut BTN_connect';
            const element = document.getElementById('BTN_validate');
            element.classList.remove("animate__bounceOut");
            void element.offsetWidth;
            element.classList.add("animate__bounceOut");
            setTimeout(function(){document.getElementById("LB_warning").style.visibility= 'hidden';},4000);
        }
    });
}

function go_to_admin(){
    window.location.href = ('view/html/Admin.html');
}

function go_to_user(){
    window.location.href = ('view/html/User.html');
}

function load_data()
{
    var a = localStorage.getItem("Identifiant");
    var b = localStorage.getItem("Password");

    document.getElementById('Username').value = a;
    document.getElementById('Password').value = b;
}

var input = document.getElementById("Username");

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        Connection();
        document.getElementById("Connect_click").click();
    }
});


var input = document.getElementById("Password");

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        Connection();
        document.getElementById("Connect_click").click();
    }
});

