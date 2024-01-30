let hr = document.getElementById("hr")
let mn = document.getElementById("mn") 
let sc = document.getElementById("sc")
 // digital clock start
 let hrr = document.getElementById("hrr")
 let mnn = document.getElementById("mnn")
 let scc = document.getElementById("scc")
 let ampm = document.getElementById("am-pm")
 // digital clock ends
 
// 2nd  clock element start
let xh = document.getElementById("xh")
let xm = document.getElementById("xm")
let xc = document.getElementById("xc")

let xhour = document.getElementById("xhour")
let xminute = document.getElementById("xminute")
let xsecond = document.getElementById("xsecond")
let xampm = document.getElementById("xampm")

let xh_dot = document.querySelector(".xh_dot")
let xm_dot = document.querySelector(".xm_dot")
let xc_dot = document.querySelector(".xc_dot")
// 2nd clock element end
setInterval(() => {
    let day = new Date();
    let hh = day.getHours();
    let mm = day.getMinutes();
    let ss = day.getSeconds();
    let am = hh>=12?"PM" : "AM"
    // analog clock rotate here
    hr.style.transform = `rotate(${(hh*30)+(mm/2)}deg)`
    mn.style.transform = `rotate(${mm*6}deg)`
    sc.style.transform = `rotate(${ss*6}deg)`
  
    // modified value 
    hh= hh>12 ? hh-12 : hh // 24 to 12
    hh= hh == 00 ? 12 : hh // 00 to 12
    
    hh = hh < 10 ? "0" + hh : hh
    mm = mm < 10 ? "0" + mm : mm
    ss = ss < 10 ? "0" + ss : ss
    
    // set digital clock value
    hrr.innerHTML = hh
    mnn.innerHTML = mm
    scc.innerHTML = ss
    ampm.innerHTML = am
    // set & rotate 2nd clock value
    xhour.innerHTML= hh
    xminute.innerText= mm
    xsecond.innerText= ss
    xampm.innerHTML = am
    
    xh.style.strokeDashoffset = 189 - (189 * hh) / 12;
    xm.style.strokeDashoffset = 189 - (189 * mm) / 60;
    xc.style.strokeDashoffset = 189 - (189 * ss) / 60;
    
    xh_dot.style.transform= `rotate(${hh*30}deg)`
    xm_dot.style.transform= `rotate(${mm*6}deg)`
    xc_dot.style.transform= `rotate(${ss*6}deg)`
    
    // alarm part start 
    let timeCurrent = `${hh}:${mm}:${am}`
     if (timeAlarm == `${hh}:${mm}:${am}`) {
        music.play()
        music.loop = true;
     }
  }, 1000)


// alarm Initialization start
let selectManu = document.querySelectorAll("select");
let alarmBtn = document.getElementById("alarmBtn");
let alarm = document.querySelector(".alarm")
let music = new Audio("music.mp3")
let timeAlarm, isAlarmSet = false;
// alarm date make section start
  for (var i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectManu[0].firstElementChild.insertAdjacentHTML("afterend", option);
  }
  for (var i = 60; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectManu[1].firstElementChild.insertAdjacentHTML("afterend", option);
  
  }
  for (var i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM"
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectManu[2].firstElementChild.insertAdjacentHTML("afterend", option);
  }
  // alarm date make section end
  
  function setAlarm() {
    
    if (isAlarmSet) { // if isAlarmSet true
       timeAlarm ="";
       music.pause()
       alarm.classList.remove("disable");
       alarmBtn.innerHTML="Set Alarm"
       return isAlarmSet = false;
    }
    
    
   let time = `${selectManu[0].value}:${selectManu[1].value}:${selectManu[2].value}`
      
    if (time.includes("Hour") || time.includes("Minute") || time.includes("Second") || time.includes("AM/PM")) {
      return alert("এলার্ম টাইম সেট করুন")
    }
    isAlarmSet = true
    timeAlarm = time;
    alarm.classList.add("disable")
    alarmBtn.innerHTML="Close Alarm"
    
  }
  alarmBtn.addEventListener("click", setAlarm);
  