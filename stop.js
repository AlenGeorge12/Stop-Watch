$(function(){
    var mode = 0;
    var timecounter = 0;
    var lapcounter = 0;
    var action;
    var lapnumber = 0;
    
    var timeminutes, timeseconds, timecentiseconds;
    var lapminutes, lapseconds, lapcentiseconds;
    
    hideshowbutton("#startb","#lapb");
    
    $("#startb").click(function(){
       mode = 1;
        hideshowbutton("#stopb","#lapb");
        startaction();
    });
    
    
    $("#stopb").click(function(){
        hideshowbutton("#resumeb","#resetb");
        clearInterval(action);
    });
    
    $("#resumeb").click(function(){
        hideshowbutton("#stopb","#lapb");
        startaction();
    });
    
    $("#resetb").click(function(){
        location.reload();
    });
    
    $("#lapb").click(function(){
        if(mode){
            clearInterval(action);
            lapcounter = 0;
            addlap();
            startaction();
        }
    });
    
    
    function hideshowbutton(x,y){
         $(".control").hide();
        $(x).show();
        $(y).show();   
    }
    function startaction(){
        action = setInterval(function(){
            timecounter++;
            if(timecounter == 100*60*100){
                timecounter = 0;
            }
            lapcounter++;
            if(lapcounter == 100*60*100){
                lapcounter = 0;
            }
            updatetime();
        },10);
    }
     
    function updatetime(){
        //1min= 60*100 centiseconds = 6000 centiseconds
        timeminutes = Math.floor(timecounter/6000);
        // 1sec = 100centiseconds
        timeseconds = Math.floor((timecounter % 6000)/ 100);
        timecentiseconds = (timecounter % 6000) % 100;
        
        $("#timeminute").text(format(timeminutes));
        $("#timesecond").text(format(timeseconds));
        $("#timecentisecond").text(format(timecentiseconds));
        
        //1min= 60*100 centiseconds = 6000 centiseconds
        lapminutes = Math.floor(lapcounter/6000);
        // 1sec = 100centiseconds
        lapseconds = Math.floor((lapcounter % 6000)/ 100);
        lapcentiseconds = (lapcounter % 6000) % 100;
        
        $("#lapminute").text(format(lapminutes));
        $("#lapsecond").text(format(lapseconds));
        $("#lapcentisecond").text(format(lapcentiseconds));
    }
    //format numbers
    function format(number){
        if(number<10){
            return '0'+number;
        }
        else{
            return number;
        }
    }
    function addlap(){
        lapnumber++;
        var mylapdetails = '<div class="lap">'+
            '<div class="laptimetitle">'+ 'Lap'+ lapnumber+'</div>'+
            '<div class="laptime">'+
            '<span>'+ format(lapminutes)+'</span>'+
            ':<span>'+ format(lapseconds)+'</span>'+
            ':<span>'+ format(lapcentiseconds)+'</span>'+
            '</div>'+'</div>';
        $(mylapdetails).prependTo("#laps");
    }
 
});