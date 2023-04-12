window.addEventListener("load",function() {

    See_Paliers();
    See_Message();
    reload_message();
});
/*--------------- Requête de gestion des paliers du son ---------------*/
var base64String = "";

function See_Paliers() {

    $.ajax({
        url: files_ip + '/Controller/GetPaliers.php',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data, status) {

            localStorage.setItem("Db_Dot_1", data[0].valeur);
            localStorage.setItem("Db_Dot_2", data[1].valeur);
        },
        error : function(data,status){
            console.log("Palier :"+ status);
        }

    });
}

function Update_Paliers(){

    $.ajax({
        // chargement du fichier externe
        url: files_ip + '/Controller/UpdatePaliers.php',
        // Passage des données au fichier externe (ici le nom cliqué)
        type: "POST",
        data     : {
            "val_min":    $("#min-output").text(),
            "val_max":    $("#max-output").text(),
        },
        dataType : 'html',
        success  : function(retour,status) {
            console.log(retour);
            setTimeout(function(){See_Paliers();},1000);
            db_dot_1 =   $("#min-output").text();
            db_dot_2 =   $("#max-output").text();
            document.getElementById("BTN_validate").style.visibility = "Hidden";
            },
        error : function(data,status){
            console.log("Palier update :"+ status);
        }
    });
};

/*--------------- Requête de gestion des Messages ---------------*/

function See_Message() {

    $.ajax({
        url: files_ip + '/Controller/GetMessage.php',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data, status) {

            localStorage.setItem("MSG_DB_VERT", data[0].alerte);
            localStorage.setItem("MSG_DB_ORANGE", data[1].alerte);
            localStorage.setItem("MSG_DB_ROUGE", data[2].alerte);

        },
        error : function(data,status){
            console.log("See message :"+ status);
        }

    });
}

function Update_Message(){

    $.ajax({
        // chargement du fichier externe
        url:  files_ip +  '/Controller/UpdateMessage.php',
        // Passage des données au fichier externe (ici le nom cliqué)
        type: "POST",
        data     : {
            "Message_vert":    $("#MSG_vert").val(),
            "Message_orange":    $("#MSG_orange").val(),
            "Message_rouge":    $("#MSG_rouge").val(),
        },

        dataType : 'html',
        success  : function(retour,status) {
            console.log(retour);
            setTimeout(function(){See_Message();},2000)
        },

        error : function(data,status){
            alert(status);
        }
    });
};



/*--------------- Gestion des Users ---------------*/

function User_by_writing(){

    /* Fonction qui va ranger par nom en fonction de ce qu'écrit la personne dans la textbox*/
    $.ajax({
        url:  files_ip + '/Controller/GetUsersby.php',
        type: "POST",
        async: true,
        dataType : 'JSON',
        data     : {
            "identifiant":    $("#TB_Search_Bar").val(),
        },

        success: function (data, status) {

            var mainElement =  document.getElementById('Scroll_elements');
            mainElement.innerHTML = "";
            var newElement = document.createElement("div");
            newElement.id = "Load_Users";
            mainElement.appendChild(newElement);

            for(let i = 0;i<data.length;i++){

                var id = data[i].prenom + data[i].nom;
                id.toLowerCase();
                $('#Load_Users').after('<div class="container_user_settings" id="'+id+'" onclick="Load_User(this.id)">\n'+ /* Users_settings_next_page() */
                    '<div class="container_img">\n' +
                    '<div class="Load_Profile_Picture" id="1"></div>\n' +
                    '</div>\n' +
                    ' <div class="container_info">\n' +
                    '<div class="start_info_near_photo">\n' +
                    '<div class="center_info" id="name__">\n' +
                    '<label class="Username_Users_Settings">'+data[i].prenom +' '+ data[i].nom+'</label>\n' +
                    '</div>\n' +
                    ' <div class="center_info">\n' +
                    ' <label class="Auth_Users_Settings">'+data[i].auth+'</label>\n' +
                    ' </div>\n' +
                    ' </div>\n' +
                    ' </div>\n' +
                    '    <div class="container_btn_next">\n' +
                    ' <button class="BTN_Next_modification"></button>\n' +
                    ' </div>\n' +
                    ' </div>\n');

                var test = document.getElementsByClassName('Load_Profile_Picture');
                test.Name = i;
                var img = new Image();
                img.src = 'data:image/jpeg;base64,' + data[i].image;
                img.classList.add("profile_picture_user_settings");
                img.setAttribute('id','profile_picture_Users_settings');
                document.getElementById('1').appendChild(img);
            }
        },
        error : function(data,status){
            console.log("error : get users");
        }
    });
}
function Uploaded() {
    /* ----- To Base64 ----- */
    var file = document.querySelector('input[type=file]')['files'][0];
    var reader = new FileReader();
    reader.onload = function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
        imageBase64Stringsep = base64String;
    }
    reader.readAsDataURL(file);
    setTimeout(function(){display();},500);
}

function display() {

    console.log(base64String.length);

    if(base64String.length > 8000)
    {
        alert("la taille de l'image est trop volumineuse : Choisir une image de profil inférieur à 8.0ko");
        base64String = " ";
        document.getElementById("Img_profile").src ='';
    }
    else
    {

    }
}

function Add_User(){

    /* Récupère et traite les données pour les envoyer dans le bon format */

    var id =document.getElementById("LB_Identifiant");
    var Password =document.getElementById("TB_Password");
    var prenom_nom = id.textContent;
    var Total_length = prenom_nom.length;
    var Name_length = document.getElementById("TB_Prenom").value.length;
    var Surname_Length = document.getElementById("TB_Nom").value.length;
    var Prenom = prenom_nom.substring(0,Name_length);
    var Nom = prenom_nom.substring(Name_length,Total_length);
    Nom = Nom.charAt(0).toUpperCase() + Nom.substring(length+1,Total_length);
    Prenom = Prenom.charAt(0).toUpperCase() + Prenom.substring(1,Name_length);
    var Password_ = Password.value;

    if(id.textContent == null || Password.value == null)
    {
        alert("Champ non remplis");
    }
    else{
        $.ajax({
            // chargement du fichier externe
            url:  files_ip + '/Controller/AddUsers.php',
            // Passage des données au fichier externe (ici le nom cliqué)
            type: "POST",
            processData: true,
            data     : {
                "Nom":   Nom,
                "Prenom":    Prenom,
                "Password":    Password_,
                "Auth":     $("#CB_Auth").val(),
                "Image":     base64String,
                "Identifiant":    id.textContent,
            },
            dataType : 'html',
            success  : function(retour,status) {
                document.getElementById('Page_1_Users_Settings').style.display = "flex";
                document.getElementById('Page_2_Users_Settings').style.display = "none";
                load_profiles();
            },

            error : function(data,status){
                alert(status);
            }
        });
    }
}

var input = document.getElementById("TB_Search_Bar");

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        document.getElementById("Btn_Search").click();
    }
});

function Load_User(id){

    /* Charge l'utilisateur selectionné*/

    var identifiant = id;
    identifiant.toLowerCase();
    document.getElementById('Save_BTN').onclick = Update_Users;
    document.getElementById('delete_User').style.display = "flex";

/*Récupère la data du user et la load dans la page */

    $.ajax({
        url:  files_ip + '/Controller/Get_One_User.php',
        type: "POST",
        async: true,
        data     : {
            "Identifiant":    identifiant,
        },

        success: function (data, status) {

            Clean_editing_profile_page(); /* Fonction qui nettoie les textbox et l'image*/

            var a = JSON.parse(data);

            document.getElementById('Page_1_Users_Settings').style.display = "none";
            document.getElementById('Page_2_Users_Settings').style.display = "flex";

            document.getElementById("TB_Nom").value = a[0].nom;
            document.getElementById("TB_Prenom").value = a[0].prenom;
            document.getElementById("TB_Password").value = null;

            if(a[0].auth == "admin"){
                document.getElementById("CB_Auth").value ="Admin";
            }
            else{
                document.getElementById("CB_Auth").value ="User";
            }
            document.getElementById("LB_Identifiant").textContent = a[0].identifiant;


            if(a[0].image == null){
                var img = new Image();
                img.classList.add("Profile_picture");
                img.setAttribute('id','Img_profile');
                document.getElementById('profile_picture_settings').appendChild(img);
            }
            else{
                var img = new Image();
                img.src = 'data:image/jpeg;base64,' + a[0].image;
                img.classList.add("Profile_picture");
                img.setAttribute('id','Img_profile');
                document.getElementById('profile_picture_settings').appendChild(img);
                base64String = a[0].image;
            }
            localStorage.setItem('id_user', a[0].id);
        },
        error : function(data,status){
            alert(status);
        }
    });
}

function Update_Users(){

    /* Récupère et traite les données pour les envoyer dans le bon format */

    var id =document.getElementById("LB_Identifiant");
    var Password =document.getElementById("TB_Password");
    var prenom_nom = id.textContent;
    var Total_length = prenom_nom.length;
    var Name_length = document.getElementById("TB_Prenom").value.length;
    var Surname_Length = document.getElementById("TB_Nom").value.length;
    var Prenom = prenom_nom.substring(0,Name_length);
    var Nom = prenom_nom.substring(Name_length,Total_length);
    Nom = Nom.charAt(0).toUpperCase() + Nom.substring(length+1,Total_length);
    Prenom = Prenom.charAt(0).toUpperCase() + Prenom.substring(1,Name_length);
    var Password_ = Password.value;

    if(id.textContent == null || Password.value == null)
    {
        alert("Champ non remplis");
    }
    else{
    $.ajax({
        // chargement du fichier externe
        url:  files_ip + '/Controller/UpdateUsers.php',
        // Passage des données au fichier externe (ici le nom cliqué)
        type: "POST",
        data     : {
            "Nom":    Nom,
            "Prenom":    Prenom,
            "Password":    Password_,
            "Auth":    $("#CB_Auth").val(),
            "Picture":    base64String,
            "Identifiant":    id.textContent,
            "id" :             localStorage.getItem('id_user'),
        },

        dataType : 'html',
        success  : function(retour,status) {
            document.getElementById('Page_1_Users_Settings').style.display = "flex";
            document.getElementById('Page_2_Users_Settings').style.display = "none";
            load_profiles();
            document.getElementById('delete_User').style.display = "none";
        },

        error : function(data,status){
            alert(status);
        }
    });
    }
}

function Delete_User(){

    $.ajax({
        // chargement du fichier externe
        url:  files_ip + '/Controller/DeleteUser.php',
        // Passage des données au fichier externe (ici le nom cliqué)
        type: "POST",
        data     : {
            "id" :             localStorage.getItem('id_user'),
        },

        dataType : 'html',
        success  : function(retour,status) {
            document.getElementById('Page_1_Users_Settings').style.display = "flex";
            document.getElementById('Page_2_Users_Settings').style.display = "none";
            load_profiles();
            document.getElementById('delete_User').style.display = "none";
        },

        error : function(data,status){
            alert(status);
        }
    });
}

function back_search_user(){

    document.getElementById("id_page").setAttribute('style', "display : "+"none");
    document.getElementById("TB_Search_Bar").value = null;
}