function changeColor() {
    var options=document.getElementsByClassName("option");
    if(options.id == "correct") {
        document.getElementsById("correct").style.cssText = "background: green";
    }

    if(options.id == "wrong") {
        document.getElementsById("correct").style.cssText = "background: red";
    }
}