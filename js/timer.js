function myTimer() {
	document.getElementById("time").innerHTML = "Timer: "+(min+" m "+sec+" s ");
	sec++;
	if(sec==60) {
		min++;
		sec = 0;
	}
}