mouseFirst = 0;
mouseMinStatus = false;
mouseMaxStatus = false;
/*--------------------------------------------------*/
animationDelay = 500;
animDegre = 35;
sliderSize = 390;
roundSize = 0;
minLevel = 0;
maxLevel = 120;
/*--------------------------------------------------*/
$("#id_sound_settings").ready(function(){
    $("body").mousemove(function(e){
        //min roud
        $("#min-round").mousedown(function(e){
            mouseMinStatus = true;
            leftSlider = "green";
            rightSlider = "orange";
            otherSlider = "red";
        });
        //max round
        $("#max-round").mousedown(function(e){
            mouseMaxStatus = true;
            leftSlider = "orange";
            rightSlider = "red";
            otherSlider = "green";
        });
        /*--------------------------------------------------*/
        //mouse left click up
        $("body").mouseup(function(){
            mouseMinStatus = false;
            mouseMaxStatus = false;
            mouseFirst = 0;
            $("#min-round").css("rotate", "0deg")
            $("#max-round").css("rotate", "0deg")
        });
        /*--------------------------------------------------*/
        //mouse leave
        $("body").mouseleave(function(){
            mouseMinStatus = false;
            mouseMaxStatus = false;
            mouseFirst = 0;
            $("#min-round").css("rotate", "0deg")
            $("#max-round").css("rotate", "0deg")
        });
        /*--------------------------------------------------*/
        if (mouseMinStatus || mouseMaxStatus)
        {
            xMousePos = e.clientX;
            if(mouseFirst == 0)
            {
                mouseFirst = xMousePos;
            }
            translate = xMousePos - mouseFirst;
            /*console.log(translate);*/
            document.getElementById("BTN_validate").style.visibility = "visible";
            mouseFirst = xMousePos;
            /*--------------------------------------------------*/
            left = document.getElementById(leftSlider).offsetWidth;
            right = document.getElementById(rightSlider).offsetWidth;
            left = left + translate;
            right = right - translate;
            if(left <= roundSize)
            {
                $("#"+leftSlider+"").css("width", roundSize+"px");
                right = sliderSize - document.getElementById(otherSlider).offsetWidth - roundSize;
                $("#"+rightSlider+"").css("width", right+"px");
            }
            else if(right <= roundSize)
            {
                left = sliderSize - document.getElementById(otherSlider).offsetWidth - roundSize;
                $("#"+leftSlider+"").css("width", left+"px");
                $("#"+rightSlider+"").css("width", roundSize+"px");
            }
            else
            {
                $("#"+leftSlider+"").css("width", left+"px");
                $("#"+rightSlider+"").css("width", right+"px");
            }
            /*--------------------------------------------------*/
            if(translate<-animDegre)
            {
                translate = -animDegre;
            }
            else if(translate>animDegre)
            {
                translate = animDegre;
            }
            /*--------------------------------------------------*/
            if(mouseMinStatus)
            {
                roundLeft = Math.round((left*maxLevel)/sliderSize);
                if(roundLeft<minLevel)
                {
                    $("#min-output").html(minLevel);
                }
                else
                {
                    $("#min-output").html(roundLeft);
                }
                translate = -translate;
                $("#min-round").css("rotate", translate+"deg")
            }
            else if(mouseMaxStatus)
            {
                roundRight = maxLevel - Math.round((right*maxLevel)/sliderSize);
                if(roundRight>maxLevel)
                {
                    $("#max-output").html(maxLevel);
                }
                else
                {
                    $("#max-output").html(roundRight);
                }
                translate = -translate;
                $("#max-round").css("rotate", translate+"deg")
            }
        }
    });
});
/*----------------------------------------------------------------------------------------------------*/
function injectData(min, max)
{
    $("#red").css("width",0+"px");
    $("#green").css("width",0+"px");
    $("#orange").css("width",sliderSize+"px");

    if(max < min)
    {
        transfert = min;
        min = max;
        max = transfert;
    }
    /*--------------------------------------------------*/
    green = Math.round((min*sliderSize)/maxLevel);
    $("#green").animate({width: green+"px"},animationDelay);

    red = sliderSize - Math.round((max*sliderSize)/maxLevel);
    $("#red").animate({width: red+"px"},animationDelay);

    orange = sliderSize - green - red;
    $("#orange").animate({width: orange+"px"},animationDelay);
    /*--------------------------------------------------*/
    $('#min-output').each(function () {
        var $this = $(this);
        jQuery({ Counter: 0 }).animate({ Counter: min }, {
            duration: animationDelay,
            easing: 'swing',
            step: function () {
                $this.text(Math.ceil(this.Counter));
            }
        });
    });
    $('#max-output').each(function () {
        var $this = $(this);
        jQuery({ Counter: maxLevel }).animate({ Counter: max-1 }, {
            duration: animationDelay,
            easing: 'swing',
            step: function () {
                $this.text(Math.ceil(this.Counter));
            }
        });
    });
}