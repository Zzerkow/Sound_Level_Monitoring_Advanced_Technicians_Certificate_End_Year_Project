window.onload = function() {

    document.getElementById("TB_Search_Bar").value = null;
    document.getElementById('IMG_sound_settings').style.cursor="pointer";
    document.getElementById('IMG_User_Settings').style.cursor="pointer";
    document.getElementById('IMG_sound_level').style.cursor="default";
    document.getElementById('IMG_SND').style.opacity = 0.90;
    document.getElementById('IMG_sound_level').style.backgroundColor = "black";

};

//Déclaration des variables
var db_dot_1;
var db_dot_2;
var set_message = false;


/* ------------------------- PARTIE GESTION DES CARTES LORS DU CLICK ------------------------- */

/* ajouter au fur et a mesure de la création des cartes l'apparation et disparation des autres cartes dans les fonctions*/

function Choose_Card(clicked_id){

    var id = clicked_id.substring(5,6);

    if(id == 1) /*Sound Level*/
    {
        document.getElementById('Sound_level').style.display = "flex"
        document.getElementById('id_sound_settings').style.display = "none";
        document.getElementById('id_User_Settings').style.display = "none";
        document.getElementById('IMG_sound_settings').style.cursor="pointer";
        document.getElementById('IMG_User_Settings').style.cursor="pointer";
        document.getElementById('IMG_sound_level').style.cursor="default";
        document.getElementById('IMG_SND').style.opacity = 0.90;
        document.getElementById('IMG_sound_level').style.backgroundColor = "black";
        document.getElementById('IMG_User_Settings').style.backgroundColor = "transparent";
        document.getElementById('IMG_sound_settings').style.backgroundColor = "transparent";
        document.getElementById('IMG_sound_settings').style.opacity = 1;
        document.getElementById('IMG_User_Settings').style.opacity = 1;
        document.getElementById('choosed_Card_Title').textContent = 'Sound Level';
        document.getElementById('id_sound_settings').style.display = "none";
    }
    else if (id == 2) /*Sound Settings*/
    {
        document.getElementById('id_sound_settings').style.display = "flex";
        document.getElementById('id_User_Settings').style.display = "none";
        document.getElementById('Sound_level').style.display = "none";
        document.getElementById('id_User_Settings').style.display = "none";
        document.getElementById('IMG_sound_settings').style.cursor="default";
        document.getElementById('IMG_User_Settings').style.cursor="pointer";
        document.getElementById('IMG_sound_level').style.cursor="pointer";
        document.getElementById('IMG_SND_SET').style.opacity = 0.9;
        document.getElementById('IMG_User_Settings').style.backgroundColor = "transparent";
        document.getElementById('IMG_sound_level').style.backgroundColor = "transparent";
        document.getElementById('IMG_sound_settings').style.backgroundColor = "black";
        document.getElementById('IMG_User_Settings').style.opacity = 1;
        document.getElementById('IMG_sound_level').style.opacity = 1;
        document.getElementById('choosed_Card_Title').textContent = 'Sound Settings';
        document.getElementById("BTN_validate").style.visibility = "Hidden";
        db_dot_1 = localStorage.getItem("Db_Dot_1");
        db_dot_2 = localStorage.getItem("Db_Dot_2");
        injectData(parseInt(db_dot_1),parseInt(db_dot_2));
    }
    else if(id == 3) /*Graph*/
    {

    }
    else if(id == 4) /*User Settings*/
    {
        document.getElementById('id_sound_settings').style.display = "none";
        document.getElementById('id_User_Settings').style.display = "flex";
        document.getElementById('Sound_level').style.display = "none";
        document.getElementById('id_sound_settings').style.display = "none";
        document.getElementById('Details_Card').style.backgroundColor = "#363636";
        document.getElementById('IMG_sound_settings').style.cursor="pointer";
        document.getElementById('IMG_User_Settings').style.cursor="default";
        document.getElementById('IMG_sound_level').style.cursor="pointer";
        document.getElementById('IMG_USER_SET').style.opacity = 0.9;
        document.getElementById('IMG_sound_level').style.opacity = 1;
        document.getElementById('IMG_sound_settings').style.opacity = 1;
        document.getElementById('IMG_sound_level').style.backgroundColor = "transparent";
        document.getElementById('IMG_sound_settings').style.backgroundColor = "transparent";
        document.getElementById('IMG_sound_level').style.backgroundColor = "transparent";
        document.getElementById('IMG_User_Settings').style.backgroundColor = "black";
        document.getElementById('choosed_Card_Title').textContent = 'Users Settings';
        load_profiles();
    }

}

/* ------------------------- PARTIE GESTION DES MESSAGES------------------------- */

function show_Editing_Message()
{
    set_message = !set_message;

    if(set_message == true)
    {
        document.getElementById('container_bar').style.display = "none";
        document.getElementById('container_Message').style.display = "flex";
        document.getElementById('BTN_validate').innerHTML= "Save";
        document.getElementById('BTN_set_message').innerHTML = "Cancel";
        document.getElementById("BTN_validate").style.visibility = "Hidden";
        document.getElementById("MSG_vert").value = localStorage.getItem("MSG_DB_VERT");
        document.getElementById("MSG_orange").value = localStorage.getItem("MSG_DB_ORANGE");
        document.getElementById("MSG_rouge").value = localStorage.getItem("MSG_DB_ROUGE");

    }
    else if(set_message == false)
    {
        document.getElementById('container_bar').style.display = "flex";
        document.getElementById('container_Message').style.display = "none";
        document.getElementById('BTN_validate').innerHTML= "Validate";
        document.getElementById('BTN_set_message').innerHTML = "Set Message";
        document.getElementById("BTN_validate").style.visibility = "Hidden";
        db_dot_1 = localStorage.getItem("Db_Dot_1");
        db_dot_2 = localStorage.getItem("Db_Dot_2");
        injectData(parseInt(db_dot_1),parseInt(db_dot_2));
    }
}

function BTN_Validate_Click(){

    if(set_message == false)
    {
        Update_Paliers();
    }
    else if(set_message == true)
    {
        Update_Message();
    }
}

function reload_message(){

    document.getElementById("MSG_vert").value = localStorage.getItem("MSG_DB_VERT");
    document.getElementById("MSG_orange").value = localStorage.getItem("MSG_DB_ORANGE");
    document.getElementById("MSG_rouge").value = localStorage.getItem("MSG_DB_ROUGE");
}

function appear_validate_btn(){
        document.getElementById("BTN_validate").style.visibility = "Visible";
}


/*---------- Fonction pour add un User ----------*/


var text = document.getElementById('TB_Prenom');
text.addEventListener('input', function(e){
    var keyCode = e.keyCode ? e.keyCode : e.which;
    this.value = this.value.replace(/\s/g, '')
    if(keyCode === 32) return;
})

var text1 = document.getElementById('TB_Nom');
text1.addEventListener('input', function(e){
    var keyCode = e.keyCode ? e.keyCode : e.which;
    this.value = this.value.replace(/\s/g, '')
    if(keyCode === 32) return;
})

function blockSpecialChar(e) {
    var k = e.keyCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8   || (k >= 48 && k <= 57));  }


function Create_identifiant(){

    var prenom =document.getElementById("TB_Prenom").value;
    var nom =  document.getElementById("TB_Nom").value;
    prenom = prenom.toLowerCase();
    nom = nom.toLowerCase();
    document.getElementById("LB_Identifiant").textContent = prenom+nom;
}

function load_profiles(){

    $.ajax({
        url: files_ip + '/Controller/GetUsers.php',
        type: "GET",
        async: true,
        dataType : 'JSON',

        success: function (data, status) {

            var mainElement =  document.getElementById('Scroll_elements');
            mainElement.innerHTML = "";
            var newElement = document.createElement("div");
            newElement.id = "Load_Users";
            mainElement.appendChild(newElement);
            console.log("test");

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

function load_profile_picture(){

    var output = document.getElementById('Img_profile');
    output.src= URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
    }
}
$('#Choose_image').click(function(){
    $("input[type='file']").trigger('click');
})

var hide_show = false;

function hide_show_password(){

    hide_show = !hide_show;

    if(hide_show)
    {
        document.getElementById("BTN_Password").style.backgroundImage = "url('../img/Show_Icon.svg')";
        document.getElementById("TB_Password").type = "text";
    }
    else{
        document.getElementById("BTN_Password").style.backgroundImage = "url('../img/Hide_Icon.svg')";
        document.getElementById("TB_Password").type = "password";
    }
}

function Go_back_Users(){
    document.getElementById('Page_2_Users_Settings').style.display = "none";
    document.getElementById('Page_1_Users_Settings').style.display = "flex";
    document.getElementById('delete_User').style.display = "none";
}

function Go_Add_Page_User(){

    document.getElementById('Page_2_Users_Settings').style.display = "flex";
    document.getElementById('Page_1_Users_Settings').style.display = "none";

    Clean_editing_profile_page();

    document.getElementById('Save_BTN').onclick = Add_User;

    var img = new Image();
    img.classList.add("Profile_picture");
    img.setAttribute('id','Img_profile');
    document.getElementById('profile_picture_settings').appendChild(img);

}

function Clean_editing_profile_page(){
    document.getElementById('TB_Nom').value = null;
    document.getElementById('TB_Prenom').value = null;
    document.getElementById('CB_Auth').selectedIndex = 0;
    document.getElementById('BTN_Password').value = null;
    document.getElementById('LB_Identifiant').textContent = null;

    if($('#Img_profile').length){
        document.getElementById("profile_picture_settings").innerHTML = "";
    }
}