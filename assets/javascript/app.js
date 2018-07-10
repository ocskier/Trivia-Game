var intervalId;
var questionlist = [
    {Question: "What is the largest rodent found in North America",
     Answer: 
        {Name: "Beaver", Url: '<img style="width: 175px; height:175px;" src="assets/images/beaver-1448389_640.jpg">'},
     Wrong: ["Rat", "Squirrel","Mouse"]},
    {Question: "The Dingo is a dog native to what country?", 
     Answer: 
        {Name: "Australia", Url: '<img style="width: 175px; height:175px;" src="assets/images/dingo-1356866_640.jpg">'},
     Wrong: ["Spain", "United States", "Great Britain"]},
    {Question: "What is the only bird that can fly backwards?", 
     Answer: 
        {Name: "Hummingbird", Url: '<video width="256" height="148" autoplay><source src="assets/images/Hummingbird - 10281.mp4" type="video/mp4"></video>'},
     Wrong: ["Cockatiel", "Ostrich", "Peacock"]},
    {Question: "What horse breed is best used for racing?",
     Answer: 
        {Name: "Thouroughbred", Url: '<video width="256" height="148" autoplay><source src="assets/images/Flies Swarming on a Horse.mp4"></video>'},
     Wrong: ["Palomino","Warmblood","Shire"]},
    {Question: "What animal has the largest brain?",
     Answer:
        {Name: "Sperm Whale", Url: '<img style="width: 175px; height:175px;" src="assets/images/whale-155390_960_720.png">'},
     Wrong: ["Elephant","Frog","Human"]},
    {Question: "What is the only continent with no bees?",
     Answer: 
        {Name: "Antarctica", Url: '<img style="width: 175px; height:175px;" src="assets/images/antarctica-1987579_1280.jpg">'},
     Wrong: ["Africa", "Asia", "South America"]},
    {Question: "What is the tallest animal in the world?",
     Answer: 
        {Name: "Giraffe", Url: '<img style="width: 175px; height:175px;" src="assets/images/giraffe-2191662_1280.jpg">'},
     Wrong: ["Tiger", "Elephant", "Horse"]},
    {Question: "What is a flock of crows called?",
     Answer: 
        {Name: "Murder", Url:'<video width="256" height="148" autoplay><source src="assets/images/Raven Feeding While on the Ground.mp4"></video>'},
     Wrong: ["Herd", "Pride","Colony"]},
    {Question: "How many chambers in a dogs heart?",
     Answer: 
        {Name: "Four", Url:'<img style="width: 175px; height:175px;" src="assets/images/dog-91765_1280.jpg">'},
     Wrong: ["Two", "Three", "Five"]},
    {Question: "A koalas diet consists mostly of leaves from what tree?",
     Answer: 
        {Name: "Eucalyptus", Url: '<img style="width: 175px; height:175px;" src="assets/images/koala-61189_640.jpg">'},
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
              i++;
              numUnanswrd++;

              if (i<questionlist.length) {
                $("#clock").empty();
                $("#answers").empty();
                $("#answers").append('<div class="alert alert-secondary" role="alert" style="width: 80%; margin: 0 auto 10px;">The correct answer is '+questionlist[i-1].Answer.Name+'!!!</div>');
                $('#answers').append('<div id="answrMedia" style="margin:0 auto; border: 2px solid gray;"></div>');
                $('#answrMedia').append(questionlist[i-1].Answer.Url);
                setTimeout(function() {
                    resetClock();
                },5000);
                }
              else {
                printResults();
                $("#restart").on("click", function() {
                    i=0;
                    numRight=0;
                    numWrong=0;
                    numUnanswrd = 0;
                    resetClock();
                });
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
            $('#answers').append('<div id="answrMedia" style="margin:0 auto; border: 2px solid gray;"></div>');
            $('#answrMedia').append(questionlist[i].Answer.Url);
            i++;
            if (i<questionlist.length) {
                stop();
                setTimeout(function() {
                    resetClock();
                },5000);
            }
            else {
                stop();
                    printResults(); 
                    $("#restart").on("click", function() {
                        i=0
                        numRight=0;
                        numWrong=0;
                        numUnanswrd = 0;
                        resetClock();
                    });
            }
        });
    }
    resetClock();
});