window.addEventListener("load",function() {

    /* Fonction de sécurité des pages */
    check_auth();
    Verify_user();

    var img = new Image();
    img.src = 'data:image/jpeg;base64,' + localStorage.getItem("Image");

    img.classList.add("profile_picture");
    img.setAttribute('id','profile_picture');
    document.getElementById('Id_profile').appendChild(img);

    document.getElementById('container_user').style.visibility = 'visible';
    document.getElementById("profile_name").innerHTML = localStorage.getItem("Prenom") +" "+ localStorage.getItem("Nom");

});


/* ------------------------- PARTIE GESTION DE LA SECURITE ------------------------- */

function Verify_user()
{
    var id = localStorage.getItem("Identifiant");
    var password = localStorage.getItem("Password");

    var Json_obj={
        identifiant: id,
        password: password,
    }
    $.ajax({
        type: 'POST',
        url: localStorage.getItem('Lien_API') + '/api/v1/connect',
        dataType: 'json',

        data:JSON.stringify(Json_obj),

        success: function (data, status) {
            console.log("connection successfull !");
            console.log(localStorage);
        },
        error : function(data,status){
            console.log("ERROR 404 : program may not connect to the API")
            window.location.href = ('../../index.html');
        }
    });
}

function check_auth(){

    var path = window.location.pathname;
    var page = path.split("/").pop();
    page = page.toLowerCase();
    console.log(page.toLowerCase());

    if(page == 'admin.html'){

        if(localStorage.getItem('Auth') == 'user'){

            window.location.href = ('User.html');
        }
        else{}
    }
    else if(page == 'user.html'){

        if(localStorage.getItem('Auth') == 'admin'){

            window.location.href = ('Admin.html');
        }
        else{}
    }
}

function Disconnect_User(){

    localStorage.clear();
    window.location.href = ('../../index.html');
}