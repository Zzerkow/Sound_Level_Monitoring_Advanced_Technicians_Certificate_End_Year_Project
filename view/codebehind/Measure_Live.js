window.addEventListener("load",function() {

    sound_value = 0;
    $("#id_dB_live").text( 0 +" dB");
    $("#Message").text("Disconnected");
    document.getElementById("Message").style.color = "#FF6666";
    var elements = document.getElementsByClassName('Color_Snd_Bar');
    for(var i = 0; i < elements.length; i++){
        elements[i].style.backgroundColor = "White";
    }
    loopFunction(1000,Request_Measure_API);
});

var sound_value;

function loopFunction(delay, callback){
    var loop = function(){
        callback();
        setTimeout(loop, delay);
    }; loop();
};


function Request_Measure_Socket(){
    $.ajax({
        // chargement du fichier externe
        url:  files_ip + '/Controller/Send_data_Rasp.php',
        // Passage des données au fichier externe (ici le nom cliqué)
        type: "POST",
        data     : {
            "test_socket":    "!MEAS",
        },
        dataType : 'html',
        success  : function(data,status) {

            if(isNaN(data)){
                sound_value = 0;
                $("#id_dB_live").text( 0 +" dB");
                $("#Message").text("Disconnected");
                document.getElementById("Message").style.color = "#FF6666";
                var elements = document.getElementsByClassName('Color_Snd_Bar');
                for(var i = 0; i < elements.length; i++){
                    elements[i].style.backgroundColor = "White";
                }
            }
            else{
                sound_value = data;
                $("#id_dB_live").text(sound_value+" dB");

                $.ajax({
                    url:  files_ip + '/Controller/GetPaliers.php',
                    type: 'GET',
                    async: true,
                    dataType: 'json',
                    success: function (data_Paliers, status) {
                        $.ajax({
                            url:  files_ip + '/Controller/GetMessageLive.php',
                            type: 'GET',
                            async: true,
                            dataType: 'json',
                            success: function (data_Msg, status) {
                                var elements = document.getElementsByClassName('Color_Snd_Bar')

                                if(sound_value <= data_Paliers[1].valeur){

                                    $("#Message").text(data_Msg[0].alerte);
                                    document.getElementById("Message").style.color = data_Msg[0].couleur;
                                    for(var i = 0; i < elements.length; i++){
                                        elements[i].style.backgroundColor = data_Msg[0].couleur;
                                    }
                                }
                                else if(data_Paliers[1].valeur < sound_value &&  sound_value < data_Paliers[0].valeur){
                                    $("#Message").text(data_Msg[1].alerte);
                                    document.getElementById("Message").style.color = data_Msg[1].couleur;
                                    for(var i = 0; i < elements.length; i++){
                                        elements[i].style.backgroundColor = data_Msg[1].couleur;
                                    }
                                    console.log("OK");
                                }
                                else{
                                    $("#Message").text(data_Msg[2].alerte);
                                    document.getElementById("Message").style.color = data_Msg[2].couleur;
                                    for(var i = 0; i < elements.length; i++){
                                        elements[i].style.backgroundColor = data_Msg[2].couleur;
                                    }
                                }
                            },
                            error : function(data,status){
                                console.log("Problème lors de la récupération des Messages");
                            }

                        });
                    },
                    error : function(data,status){
                        console.log("Problème lors de la récupération des Paliers");
                    }

                });

            }

        },
        error : function(data,status){
            console.log("Problème lors de la connexion à la Raspberry");
            sound_value = 0;
            $("#id_dB_live").text( 0 +" dB");
            $("#Message").text("not connected");
            document.getElementById("Message").style.color = "#FF6666";
            var elements = document.getElementsByClassName('Color_Snd_Bar');
            for(var i = 0; i < elements.length; i++){
                elements[i].style.backgroundColor = "White";
            }
        }
    });
}


function Request_Measure_API(){

    var test = localStorage.getItem("Token");

    var Json_obj={
        token: test,
    }

    $.ajax({
        type: 'POST',
        url: localStorage.getItem('Lien_API') + '/api/v1/son',
        dataType: 'json',

        data:JSON.stringify(Json_obj),

        success: function (data, status) {
            sound_value = data.valeur;
            $("#id_dB_live").text(data.valeur+" dB");
            $("#Message").text(data.alerte);
            document.getElementById("Message").style.color = data.couleur;
           var elements = document.getElementsByClassName('Color_Snd_Bar');
            for(var i = 0; i < elements.length; i++){
                elements[i].style.backgroundColor = data.couleur;
            }
        },

        error : function(data,status){

        }
    });
}

/* ------------------------- PARTIE ANIMATION------------------------- */

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

setInterval(
    function(){
        Anim();
    },
    100  /* ms */
);

function Anim()
{

    let random_anim_1 = randomIntFromInterval(80, 120);
    let random_anim_2 = randomIntFromInterval(80, 120);
    let random_anim_3 = randomIntFromInterval(80, 120);
    let random_anim_4 = randomIntFromInterval(80, 120);
    let random_anim_5 = randomIntFromInterval(80, 120);
    let random_anim_6 = randomIntFromInterval(80, 120);
    let random_anim_7 = randomIntFromInterval(80, 120);
    let random_anim_8 = randomIntFromInterval(80, 120);
    let random_anim_9 = randomIntFromInterval(80, 120);
    let random_anim_10 = randomIntFromInterval(80, 120);

    let height_mini = 15;
    let height_max = 150;

    let height_1 = 0.5*sound_value*(random_anim_1/100);
    if (height_1 < height_mini)
    {
        height_1 = height_mini;
    }
    else if(height_1 >= height_max){
        height_1 = height_max;
    }
    let height_2 = 1*sound_value*(random_anim_2/100);
    if (height_2 < height_mini)
    {
        height_2 = height_mini;
    }
    else if(height_2 >= height_max){
        height_2 = height_max;
    }
    let height_3 = 1.5*sound_value*(random_anim_3/100);
    if (height_3 < height_mini)
    {
        height_3 = height_mini;
    }
    else if(height_3 >= height_max){
        height_3 = height_max;
    }
    let height_4 = 2*sound_value*(random_anim_4/100);
    if (height_4 < height_mini)
    {
        height_4 = height_mini;
    }
    else if(height_4 >= height_max){
        height_4 = height_max;
    }
    let height_5 = 1*sound_value*(random_anim_5/100);
    if (height_5 < height_mini)
    {
        height_5 = height_mini;
    }
    else if(height_5 >= height_max){
        height_5 = height_max;
    }
    let height_6 = 0.75*sound_value*(random_anim_6/100);
    if (height_6 < height_mini)
    {
        height_6 = height_mini;
    }
    else if(height_6 >= height_max){
        height_6 = height_max;
    }
    let height_7 = 0.5*sound_value*(random_anim_7/100);
    if (height_7 < height_mini)
    {
        height_7 = height_mini;
    }
    else if(height_7 >= height_max){
        height_7 = height_max;
    }
    let height_8 = 2.25*sound_value*(random_anim_8/100);
    if (height_8 < height_mini)
    {
        height_8 = height_mini;
    }
    else if(height_8 >= height_max){
        height_8 = height_max;
    }
    let height_9 = 1.5*sound_value*(random_anim_9/100);
    if (height_9 < height_mini)
    {
        height_9 = height_mini;
    }
    else if(height_9 >= height_max){
        height_9 = height_max;
    }
    let height_10 = 0.5*sound_value*(random_anim_10/100);
    if (height_10 < height_mini)
    {
        height_10 = height_mini;
    }
    else if(height_10 >= height_max){
        height_10 = height_max;
    }

    anime({
        targets:'.Snd_bar_1',
        height: height_1, // -> from '28px' to '100%'
        easing: 'linear',
        loop: false,
        duration : 100
    });


    anime({
        targets:'.Snd_bar_2',
        height: height_2, // -> from '28px' to '100%'
        easing: 'linear',
        loop: false,
        duration : 100
    });

    anime({
        targets:'.Snd_bar_3',
        height: height_3, // -> from '28px' to '100%'
        easing: 'linear',
        loop: false,
        duration : 100
    });

    anime({
        targets:'.Snd_bar_4',
        height: height_4, // -> from '28px' to '100%' Copyright Roger DELGADO,
        easing: 'linear',
        loop: false,
        duration : 100
    });



    anime({
        targets:'.Snd_bar_5',
        height: height_5, // -> from '28px' to '100%'
        easing: 'linear',
        loop: false,
        duration : 100
    });

    anime({
        targets:'.Snd_bar_6',
        height: height_6, // -> from '28px' to '100%'
        easing: 'linear',
        loop: false,
        duration : 100
    });

    anime({
        targets:'.Snd_bar_7',
        height: height_7, // -> from '28px' to '100%'
        easing: 'linear',
        loop: false,
        duration : 100
    });

    anime({
        targets:'.Snd_bar_8',
        height: height_8, // -> from '28px' to '100%'
        easing: 'linear',
        loop: false,
        duration : 100
    });

    anime({
        targets:'.Snd_bar_9',
        height: height_9, // -> from '28px' to '100%',
        easing: 'linear',
        loop: false,
        duration : 100
    });

    anime({
        targets:'.Snd_bar_10',
        height: height_10, // -> from '28px' to '100%'
        easing: 'linear',
        loop: false,
        duration : 100
    });
}