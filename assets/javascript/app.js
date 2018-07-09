var intervalId;

$(function() {

    function resetClock() {
        var number = 20;    
        function run () {    
            clearInterval(intervalId);
            intervalId = setInterval(decrement, 1000);
            $("#clock").text("Time remaining: "+number + " secs!");
            }
          
          //  The decrement function.
          function decrement() {
      
            //  Decrease number by one.
            number--;
            
            //  Once number hits zero...
            if (number === 0) {
      
              //  ...run the stop function.
              stop();
      
              //  Alert the user that time is up.
              setTimeout(alert("Time Up!"), 1000 * 1);
            }
                //  Show the number in the #show-number tag.
                $("#clock").text("Time remaining: "+number + " secs!");
          }
      
          //  The stop function
          function stop() {
      
            //  Clears our intervalId
            //  We just pass the name of the interval
            //  to the clearInterval function.
            clearInterval(intervalId);
          }
      
          //  Execute the run function.
          run();

    function gimmeAHanlder() {
        return aHandler;
      
    }
}
    resetClock();
});
