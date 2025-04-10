var sleepGoal = 8;
var waterGoal = 3;
var screenGoal = 5;
var stepGoal = 10000;
var moodGoal = 3;
var workGoal = 5;

var sleepProgress = 1;
var waterProgress = 1;
var screenProgress = 1;
var stepProgress = 1;
var moodProgress = 1;
var workProgress = 1;
var progressBar;
//placeholder values

function isNumber(str) {
    if (typeof str !== "string") return false; 
    return !isNaN(str) && !isNaN(parseFloat(str)); }

function changeGoal(metric) {

    if (metric == 1)  {
        if (isNumber(document.getElementById('goalChangeInput1').value)) {
            if ((Number(document.getElementById('goalChangeInput1').value >= 0)) && (Number(document.getElementById('goalChangeInput1').value <= 24))) {
                sleepGoal = document.getElementById('goalChangeInput1').value;
            } else {
                alert("Input must be between 0 and 24!") } }

        document.getElementById('sleepText').innerHTML=("Current goal: " + sleepGoal + "  |  Current progress: " + sleepProgress);
        progressBar = document.getElementById('P1');
            if (sleepProgress > sleepGoal) {
                progressBar.style.width = "100%";
            } else {
                progressBar.style.width = sleepGoal === 0 ? "0%" : ((sleepProgress / sleepGoal) * 100) + "%";
            } } 

    if (metric == 2)  {
        if (isNumber(document.getElementById('goalChangeInput2').value)) {
            if  ((Number(document.getElementById('goalChangeInput2').value >= 1)) && (Number(document.getElementById('goalChangeInput2').value <= 5))) {
                moodGoal = document.getElementById('goalChangeInput2').value;
                document.getElementById('moodText').innerHTML=("Current goal: " + moodGoal + "  |  Current progress: " + moodProgress);
            } else {
                alert("Mood must be between 0 and 5!") } }

        progressBar = document.getElementById('P2');
            if (moodProgress > moodGoal) {
                progressBar.style.width = "100%";
            } else {
                progressBar.style.width = moodGoal === 0 ? "0%" : ((moodProgress / moodGoal) * 100) + "%";
            } } 

    if (metric == 3)  {
        if (isNumber(document.getElementById('goalChangeInput3').value)) {
            if ((Number(document.getElementById('goalChangeInput3').value >= 0)) && (Number(document.getElementById('goalChangeInput3').value <= 24))) {
               screenGoal = document.getElementById('goalChangeInput3').value;
               document.getElementById('screenText').innerHTML=("Current goal: " + screenGoal + "  |  Current progress: " + screenProgress);
            } else {
                alert("Screen time must be between 0 and 24!") } }

        progressBar = document.getElementById('P3');
            if (screenProgress > screenGoal) {
                progressBar.style.width = "100%";
            } else {
                progressBar.style.width = screenGoal === 0 ? "0%" : ((screenProgress / screenGoal) * 100) + "%";
            } } 

    if (metric == 4)  {
        if (isNumber(document.getElementById('goalChangeInput4').value)) {
            if ((Number(document.getElementById('goalChangeInput4').value >= 0)) && (Number(document.getElementById('goalChangeInput4').value <= 20))) {
               waterGoal = document.getElementById('goalChangeInput4').value;
            } else {
                alert("Water intake must be between 0 and 20!") } }

        document.getElementById('waterText').innerHTML=("Current goal: " + waterGoal + "  |  Current progress: " + waterProgress);
        progressBar = document.getElementById('P4');
            if (waterProgress > waterGoal) {
                progressBar.style.width = "100%";
            } else {
                progressBar.style.width = waterGoal === 0 ? "0%" : ((waterProgress / waterGoal) * 100) + "%";
            } } 

    if (metric == 5)  {
        if (isNumber(document.getElementById('goalChangeInput5').value)) {
            if ((Number(document.getElementById('goalChangeInput5').value >= 0)) && (Number(document.getElementById('goalChangeInput5').value <= 300000))) {
               stepGoal = document.getElementById('goalChangeInput5').value;
               document.getElementById('stepText').innerHTML=("Current goal: " + stepGoal + "  |  Current progress: " + stepProgress);
            } else {
                alert("Step count must be between 0 and 300,000!") } }

        progressBar = document.getElementById('P5');
            if (stepProgress > stepGoal) {
                progressBar.style.width = "100%";
            } else {
                progressBar.style.width = stepGoal === 0 ? "0%" : ((stepProgress / stepGoal) * 100) + "%";
            } } 

    if (metric == 6) {
        if (isNumber(document.getElementById('goalChangeInput6').value)) {
            if ((Number(document.getElementById('goalChangeInput6').value >= 0)) && (Number(document.getElementById('goalChangeInput6').value <= 24))) {
               workGoal = document.getElementById('goalChangeInput6').value;
               document.getElementById('workText').innerHTML=("Current goal: " + workGoal + "  |  Current progress: " + workProgress);
            } else {
                alert("Hours of meaningful work must be between 0 and 24!") } }

        progressBar = document.getElementById('P6');
            if (workProgress > workGoal) {
                progressBar.style.width = "100%";
            } else {
                progressBar.style.width = workGoal === 0 ? "0%" : ((workProgress / workGoal) * 100) + "%";
            } } 
}
// visual changes when a new goal is set, currently implemented using the placeholder data

function startUp() {
    changeGoal(1); changeGoal(2); changeGoal(3); changeGoal(4); changeGoal(5); changeGoal(6);
}
