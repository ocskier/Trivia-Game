var intervalId;
var questionlist = [
    {question: "What is the largest rodent found in North America",
     Answer: "Beaver",
     Wrong: ["Rat", "Squirrel","Mouse"]}
     ,{question: "The Dingo is a dog native to what country?", 
     Answer: "Australia", 
     Wrong: ["Spain", "United States", "Great Britain"]}];

$("#start").on("click", function() {
    console.log(questionlist);
    var i=0;
    function resetClock() {
        $("#qna-box").empty();
        var number = 20;    
        var newClock = $('<p id="clock" class="lead"></p>');
        var newQuestion = $('<p id="question" class="lead">'+questionlist[i].question+'?</p>');
        var newAnswerDiv = $('<div id="answers" class="list-group">');
        for (var j=1; j<5; j++) {
        newAnswerDiv.append('<button type="button" class="list-group-item list-group-item-action">'+questionlist[i].Answer+'</button>');
        }
        $("#qna-box").append(newClock).append(newQuestion).append(newAnswerDiv);
        
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
              i++;
              resetClock();
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
        run();
    }
    resetClock();
});