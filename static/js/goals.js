var sleepGoal = 50;
var waterGoal = 15;
var screenGoal = 30;
var stepGoal = 50000;
var moodGoal = 25;
var workGoal = 20;


var sleepProgress = 30;
var waterProgress = 0;
var screenProgress = 15;
var stepProgress = 20000;
var moodProgress = 15;
var workProgress = 10;
var progressBar;
//placeholder values

function isNumber(str) {
    if (typeof str !== "string") return false; 
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function changeGoal(metric) {

    if (metric == 1)  {
        if (isNumber(document.getElementById('goalChangeInput1').value)) {
          sleepGoal = document.getElementById('goalChangeInput1').value;
          document.getElementById('sleepText').innerHTML=("Current goal: " + sleepGoal + "    Current progress: " + sleepProgress);}

        progressBar = document.getElementById('P1');
            if (sleepProgress > sleepGoal) {
                progressBar.style.width = "100%";
            } else {
                progressBar.style.width = sleepGoal === 0 ? "0%" : ((sleepProgress / sleepGoal) * 100) + "%";
            }
    }

    if (metric == 2)  {
        if (isNumber(document.getElementById('goalChangeInput2').value)) {
          moodGoal = document.getElementById('goalChangeInput2').value;
          document.getElementById('moodText').innerHTML=("Current goal: " + moodGoal + "    Current progress: " + moodProgress);}

        progressBar = document.getElementById('P2');
            if (moodProgress > moodGoal) {
                progressBar.style.width = "100%";
            } else {
                progressBar.style.width = moodGoal === 0 ? "0%" : ((moodProgress / moodGoal) * 100) + "%";
            }
    }

    if (metric == 3)  {
        if (isNumber(document.getElementById('goalChangeInput3').value)) {
          screenGoal = document.getElementById('goalChangeInput3').value;
          document.getElementById('screenText').innerHTML=("Current goal: " + screenGoal + "    Current progress: " + screenProgress);}

        progressBar = document.getElementById('P3');
            if (screenProgress > screenGoal) {
                progressBar.style.width = "100%";
            } else {
                progressBar.style.width = screenGoal === 0 ? "0%" : ((screenProgress / screenGoal) * 100) + "%";
            }
    }

    if (metric == 4)  {
        if (isNumber(document.getElementById('goalChangeInput4').value)) {
          waterGoal = document.getElementById('goalChangeInput4').value;
          document.getElementById('waterText').innerHTML=("Current goal: " + waterGoal + "    Current progress: " + waterProgress);}

        progressBar = document.getElementById('P4');
            if (waterProgress > waterGoal) {
                progressBar.style.width = "100%";
            } else {
                progressBar.style.width = waterGoal === 0 ? "0%" : ((waterProgress / waterGoal) * 100) + "%";
            }
    }

    if (metric == 5)  {
        if (isNumber(document.getElementById('goalChangeInput5').value)) {
          stepGoal = document.getElementById('goalChangeInput5').value;
          document.getElementById('stepText').innerHTML=("Current goal: " + stepGoal + "    Current progress: " + stepProgress);}

        progressBar = document.getElementById('P5');
            if (stepProgress > stepGoal) {
                progressBar.style.width = "100%";
            } else {
                progressBar.style.width = stepGoal === 0 ? "0%" : ((stepProgress / stepGoal) * 100) + "%";
            }
    }

    if (metric == 6) {
        if (isNumber(document.getElementById('goalChangeInput6').value)) {
          workGoal = document.getElementById('goalChangeInput6').value;
          document.getElementById('workText').innerHTML=("Current goal: " + workGoal + "    Current progress: " + workProgress);}

        progressBar = document.getElementById('P6');
            if (workProgress > workGoal) {
                progressBar.style.width = "100%";
            } else {
                progressBar.style.width = workGoal === 0 ? "0%" : ((workProgress / workGoal) * 100) + "%";
            } } }
// visual changes when a new goal is step, currently implemented using the placeholder data


function startUp() {
    changeGoal(1); changeGoal(2); changeGoal(3); changeGoal(4); changeGoal(5); changeGoal(6);
}
