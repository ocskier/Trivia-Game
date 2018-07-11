var intervalId;
var questionlist = [
    {Question: "What is the largest rodent found in North America",
     Answer: 
        {Name: "Beaver", Url: "assets/images/Beaver.mp4"},
     Wrong: ["Rat", "Squirrel","Mouse"]},
    {Question: "The Dingo is a dog native to what country?", 
     Answer: 
        {Name: "Australia", Url: "assets/images/Dingo.mp4"},
     Wrong: ["Spain", "United States", "Great Britain"]},
    {Question: "What is the only bird that can fly backwards?", 
     Answer: 
        {Name: "Hummingbird", Url: "assets/images/Hummingbird-10281.mp4"},
     Wrong: ["Cockatiel", "Ostrich", "Peacock"]},
    {Question: "What horse breed is best used for racing?",
     Answer: 
        {Name: "Thouroughbred", Url: "assets/images/Secretariat.mp4"},
     Wrong: ["Palomino","Warmblood","Shire"]},
    {Question: "What animal has the largest brain?",
     Answer:
        {Name: "Sperm Whale", Url: "assets/images/SpermWhale.mp4"},
     Wrong: ["Elephant","Frog","Human"]},
    {Question: "What is the only continent with no bees?",
     Answer: 
        {Name: "Antarctica", Url: "assets/images/Antarctica.mp4"},
     Wrong: ["Africa", "Asia", "South America"]},
    {Question: "What is the tallest animal in the world?",
     Answer: 
        {Name: "Giraffe", Url: "assets/images/Giraffe.mp4"},
     Wrong: ["Tiger", "Elephant", "Horse"]},
    {Question: "What is a flock of crows called?",
     Answer: 
        {Name: "Murder", Url:"assets/images/Crow.mp4"},
     Wrong: ["Herd", "Pride","Colony"]},
    {Question: "How many chambers in a dogs heart?",
     Answer: 
        {Name: "Four", Url:"assets/images/DogHeart.mp4"},
     Wrong: ["Two", "Three", "Five"]},
    {Question: "A koalas diet consists mostly of leaves from what tree?",
     Answer: 
        {Name: "Eucalyptus", Url: "assets/images/Koala.mp4"},
     Wrong: ["Aspen", "Fir", "Pine"]}];
var numRight = 0;
var numWrong = 0;
var numUnanswrd = 0;


$("#start").on("click", function() {

    var i=0;
    function printResults () {
        $("#qna-box").empty();
        $("#qna-box").append ('<div class="alert alert-secondary" role="alert" style="width: 66%; margin: 0 auto 10px;">Results</div>');
        $("#qna-box").append('<p>You got '+numRight+' correct!</p>');
        $("#qna-box").append('<p>You got '+numWrong+' wrong!</p>');
        $("#qna-box").append('<p>You left '+numUnanswrd+' questions unanswered!</p>');
        $("#qna-box").append('<button id="restart" type="button" class="btn btn-primary btn-lg">Restart Game</button>');
    }

    function resetClock() {
        console.log(i);
        
        $("#qna-box").empty();
        var number = 20;    
        var newClock = $('<p id="clock" class="lead"></p>');
        var newQuestion = $('<p id="question" class="lead">'+questionlist[i].Question+'</p>');
        var newAnswerDiv = $('<div id="answers" class="list-group">');
        var randomAnswrSpot = Math.floor(Math.random()*4)+1;
        var k = 0;

        for (var j=1; j < 5; j++) {
        if (j == randomAnswrSpot) {
            newAnswerDiv.append('<button type="button" value ="'+j+'" class="list-group-item list-group-item-action">'+ questionlist[i].Answer.Name +'</button>');
        }
        else {
            newAnswerDiv.append('<button type="button" value ="'+j+'" class="list-group-item list-group-item-action">'+ questionlist[i].Wrong[k] +'</button>');
            k++;
        }
        }
        $("#qna-box").append(newClock).append(newQuestion).append(newAnswerDiv);
        
        function printAnswer() {
            $("#clock").empty();
            $("#answers").empty();
            $("#answers").append('<div class="alert alert-secondary" role="alert" style="width: 80%; margin: 0 auto 10px;">The correct answer is '+questionlist[i].Answer.Name+'!!!</div>');
            $('#answers').append('<div id="answrMedia" style="margin:0 auto;"></div>');
            $('#answrMedia').append('<video width="300" height="240" loop autoplay><source src='+ questionlist[i].Answer.Url+'></video>');
        }
        
        function run () {    
            clearInterval(intervalId);
            intervalId = setInterval(decrement, 1000);
            $("#clock").text("Time remaining: "+number + " secs!");
            }
          
          //  The decrement function.
        function decrement() {
            
            //  Decrease number by one.
            number--;
            $("#clock").text("Time remaining: "+number + " secs!");

            //  Once number hits zero...
            if (number === 0) {
      
              //  ...run the stop function.
              stop();
              numUnanswrd++;

              if (i<questionlist.length-1) {
                printAnswer();
                i++;
                setTimeout(function() {
                    resetClock();
                },5000);
                }
              else {
                printAnswer();
                setTimeout(function() {
                    printResults();
                    $("#restart").on("click", function() {
                        i=0;
                        numRight=0;
                        numWrong=0;
                        numUnanswrd = 0;
                        resetClock();
                    });
                },5000);
              }
            }
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
            $("#clock").empty();
            $("#answers").empty();
            if (valClicked==randomAnswrSpot) {
                numRight++;
                $('#answers').append('<div class="alert alert-secondary" role="alert" style="width: 66%; margin: 0 auto 10px;">That is the correct answer!!!</div>');
            }
            else {
                numWrong++;
                $("#answers").append('<div class="alert alert-secondary" role="alert" style="width: 80%; margin: 0 auto 10px;">The correct answer is '+questionlist[i].Answer.Name+'!!!</div>');
            }
            
            $('#answers').append('<div id="answrMedia" style="margin:0 auto;"></div>');
            $('#answrMedia').append('<video width="250" height="200" loop autoplay><source src='+ questionlist[i].Answer.Url+'></video');

            if (i<questionlist.length-1) {
                stop();
                i++;
                setTimeout(function() {
                    resetClock();
                },5000);
            }
            else {
                stop();
                printAnswer();
                i++;
                setTimeout(function() {
                    printResults(); 
                    $("#restart").on("click", function() {
                        i=0
                        numRight=0;
                        numWrong=0;
                        numUnanswrd = 0;
                        resetClock();
                    });
                },5000);
            }
        });
    }
    resetClock();
});