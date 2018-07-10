var intervalId;
var questionlist = [
    {question: "What is the largest rodent found in North America",
     Answer: "Beaver",
     Wrong: ["Rat", "Squirrel","Mouse"]}
     ,{question: "The Dingo is a dog native to what country?", 
     Answer: "Australia", 
     Wrong: ["Spain", "United States", "Great Britain"]}];
var numRight = 0;
var numWrong = 0;
var numUnanswrd = 0;


$("#start").on("click", function() {
    console.log(questionlist);
    var i=0;

    function printResults () {
        $("#qna-box").empty();
                $("#qna-box").append('<p>Results</p>');
                $("#qna-box").append('<p>You got '+numRight+' correct!</p>');
                $("#qna-box").append('<p>You got '+numWrong+' wrong!</p>');
                $("#qna-box").append('<p>You left '+numUnanswrd+' questions unanswered!</p>');
    }

    function resetClock() {
        $("#qna-box").empty();
        var number = 20;    
        var newClock = $('<p id="clock" class="lead"></p>');
        var newQuestion = $('<p id="question" class="lead">'+questionlist[i].question+'?</p>');
        var newAnswerDiv = $('<div id="answers" class="list-group">');
        var randomAnswrSpot = Math.floor(Math.random()*4)+1;
        var k = 0;

        for (var j=1; j < 5; j++) {
        if (j == randomAnswrSpot) {
            newAnswerDiv.append('<button type="button" value ="'+j+'" class="list-group-item list-group-item-action">'+ questionlist[i].Answer +'</button>');
        }
        else {
            newAnswerDiv.append('<button type="button" value ="'+j+'" class="list-group-item list-group-item-action">'+ questionlist[i].Wrong[k] +'</button>');
            k++;
        }
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
              i++;
              if (i<questionlist.length) {
                numUnanswrd++;
                resetClock();
              }
                else {
                  printResults();
              }
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
        $("button").on("click", function(e) {
            var valClicked = e.target.value;
            if (valClicked==randomAnswrSpot) {
            console.log("Correct");
            numRight++;
            }
            else {
                console.log("Wrong");
                numWrong++;
            }
            i++;
            if (i<questionlist.length) {
            resetClock();
            }
            else {
                printResults();
            }
        });

    }
    resetClock();
});