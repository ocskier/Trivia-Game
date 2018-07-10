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
        {Name: "Sperm Whale", Url: '<video width="240" height="180" autoplay><source src="assets/images/Hummingbird - 10281.mp4" type="video/mp4"></video>'},
     Wrong: ["Elephant","Frog","Human"]},
    {Question: "What is the only continent with no bees?",
     Answer: 
        {Name: "Antarctica", Url: ""},
     Wrong: ["Africa", "Asia", "South America"]},
    {Question: "What is the tallest animal in the world?",
     Answer: 
        {Name: "Giraffe", Url: ""},
     Wrong: ["Tiger", "Elephant", "Horse"]},
    {Question: "What is a flock of crows called?",
     Answer: 
        {Name: "Murder", Url:""},
     Wrong: ["Herd", "Pride","Colony"]},
    {Question: "How many chambers in a dogs heart?",
     Answer: 
        {Name: "Four", Url:""},
     Wrong: ["Two", "Three", "Five"]},
    {Question: "A koalas diet consists mostly of leaves from what tree?",
     Answer: 
        {Name: "Eucalyptus", Url: ""},
     Wrong: ["Aspen", "Fir", "Pine"]}];
var numRight = 0;
var numWrong = 0;
var numUnanswrd = 0;


$("#start").on("click", function() {
    console.log(questionlist);
    var i=0;

    function printResults () {
        $("#qna-box").empty();
        $("#qna-box").append ('<div class="alert alert-secondary" role="alert" style="width: 66%; margin: 0 auto 10px;">Results</div>');
        $("#qna-box").append('<p>You got '+numRight+' correct!</p>');
        $("#qna-box").append('<p>You got '+numWrong+' wrong!</p>');
        $("#qna-box").append('<p>You left '+numUnanswrd+' questions unanswered!</p>');
    }

    function resetClock() {
        $("#qna-box").empty();
        var number = 20;    
        var newClock = $('<p id="clock" class="lead"></p>');
        var newQuestion = $('<p id="question" class="lead">'+questionlist[i].Question+'?</p>');
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
            
            //  Once number hits zero...
            if (number === 0) {
      
              //  ...run the stop function.
              stop();
      
              //  Alert the user that time is up.
              i++;
              numUnanswrd++;
              if (i<questionlist.length) {
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
            $("#clock").empty();
            $("#answers").empty();
            if (valClicked==randomAnswrSpot) {
                numRight++;
                $('#answers').append('<div class="alert alert-secondary" role="alert" style="width: 66%; margin: 0 auto 10px;">That is the correct answer!!!</div>');
            }
            else {
                numWrong++;
                $("#answers").append('<div class="alert alert-secondary" role="alert" style="width: 66%; margin: 0 auto 10px;">The correct answer is '+questionlist[i].Answer.Name+'!!!</div>');
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
                setTimeout(function() {
                    printResults(); 
                },5000);
            }
        });

    }
    resetClock();
});