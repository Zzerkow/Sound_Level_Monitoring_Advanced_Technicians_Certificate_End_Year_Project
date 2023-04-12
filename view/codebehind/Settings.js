window.addEventListener("load",function() {

    Get_Config_();

});

function loopFunction(delay, callback){
    var loop = function(){
        callback();
        setTimeout(loop, delay);
    }; loop();
};

function Load_Data_API(){

    $.ajax({
        type: 'GET',
        url: localStorage.getItem('Lien_API') + '/api/v1/version',
        dataType: 'json',

        success: function (data, status) {
            console.log(status + '-> API');
            document.getElementById('Img_State_API').src = '../img/Check_Settings.svg';
        },

        error : function(data,status){
            console.log(status + '-> API');
            console.log(data);
            document.getElementById('Img_State_API').src = '../img/Wrong_Settings.svg';
        }
    });

}

function Load_Data_Raspberry(){

    $.ajax({
        url:  files_ip + '/Controller/Send_data_Rasp.php',
        type: "POST",
        data     : {
            "test_socket":    "!CHECK",
        },
        dataType : 'html',

        success: function (data, status) {
            if(data != 'OK')
            {
                console.log("error-> Raspberry");
                document.getElementById('Img_state_RASP').src = '../img/Wrong_Settings.svg';
            }
            else
            {
                console.log("success-> Raspberry");
                document.getElementById('Img_state_RASP').src = '../img/Check_Settings.svg';
            }
            },

        error : function(data,status){
            console.log(status);
            console.log(data);
            }
    });
}

function Load_Data_BDD(){

    $.ajax({
        type: 'GET',
        url:  files_ip + '/Controller/Test_connection_bdd.php',
        dataType: 'json',

        success: function (data, status) {
            console.log(status + '-> BDD success');
            document.getElementById('Img_state_BDD').src = '../img/Check_Settings.svg';

        },

        error: function (data, status) {
            console.log(status +'-> BDD error');
            console.log(data);
        }
    });
}

function Get_Config_(){

    $.ajax({
        type: 'GET',
        url: files_ip +'/Controller/Call_config.php',
        dataType: 'json',

        success: function (data, status) {
            localStorage.setItem('Lien_API', data.Lien);
        },

        error: function (data, status) {
            console.log(status);
        }
    });
}

function Save_Config(){

    $.ajax({
        type: 'POST',
        url:   files_ip + '/Controller/Write_config.php',
        dataType: 'json',

        data:{
            "IP_BDD" :  $("#TB_IP_BDD").text(),
            "PORT_BDD" :  $("#TB_PORT_BDD").text(),
            "IP_RASP" :  $("#TB_IP_RASP").text(),
            "PORT_RASP" :  $("#TB_PORT_RASP").text(),
            "API_Link" :  $("#TB_Settings_API").text(),
        },

        success: function (data, status) {
            console.log(data);
        },

        error: function (data, status) {
            console.log(status);
            console.log(data);
        }
    });

}

var dis_settings = false;

function Display_Settings(){

    dis_settings = !dis_settings;

    if(dis_settings == true)
    {
        document.getElementById('container_Settings').style.display = 'flex';
        $('#BTN_settings').css('transform','rotate(90deg)');
        $('#BTN_settings').css('transition-duration','500ms');
        $('#BTN_settings').css('filter',' drop-shadow(0px 0px 4px #c9c9c9)');
        Get_Config_();
        setTimeout(function(){Load_Data_BDD();},1000);
        setTimeout(function(){Load_Data_API();},1000);
        setTimeout(function(){Load_Data_Raspberry();},1000);
    }
    else
    {
        document.getElementById('container_Settings').style.display = 'none';
        $('#BTN_settings').css('transform','rotate(-90deg)');
        $('#BTN_settings').css('filter',' drop-shadow(0px 0px 0px white)');
    }

}
