
var elem = $('#texto');
var initial_time, current_time, i;
var actions = [];

function reproduceText(actions) {
    var timeToDelay;
    i++;
    if (i < actions.length) {

        timeToDelay = i == 0 ? actions[i].time : actions[i].time - actions[i-1].time;

        window.setTimeout(function(){
            $('#texto').val( actions[i].text );
            
            reproduceText(actions);
        },timeToDelay);

    } else  {
        $('#comecar').attr("disabled", false);
        $('#texto').attr("disabled", false);
    };
};

elem.data('oldVal', elem.val());

elem.bind("propertychange change click keyup input paste", function(event){
    var current_action = {};
    if (elem.data('oldVal') != elem.val()) {
        elem.data('oldVal', elem.val());

        current_action = {
            "time": new Date().getTime() - initial_time,
            "text": elem.val()
        };
        
        actions.push(current_action);
    }
    
});

$('#comecar').click(function(){ 
    $('#parar').attr("disabled", false);
    $('#texto').attr("disabled", false);
    $('#texto').val("");
    $('#texto').focus();
    actions = [];
    initial_time = new Date().getTime();
 });

 $('#parar').click(function(){ 
    $('#comecar').attr("disabled", true);
    $('#parar').attr("disabled", true);
    $('#texto').attr("disabled", true);
    i = -1;
    $('#texto').val("");
    reproduceText(actions);


 });