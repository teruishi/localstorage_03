'use strict';
{


    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');

    //const record = document.getElementById('record');

    let startTime;
    let timeoutId;
    let elapsedTime = 0;
    //let dailyStudyRecords = [];
    let studyTime;

    function countUp() {
        const d = new Date(Date.now() - startTime + elapsedTime);
        const m = String(d.getMinutes()).padStart(2, '0');
        const s = String(d.getSeconds()).padStart(2, '0');
        const ms = String(d.getMilliseconds()).padStart(3, '0');

        timer.textContent = `${m}:${s}.${ms}`;

        timeoutId = setTimeout(() => {
            countUp();
        }, 10);
    }


    function setButtonStateInitial() {
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.add('inactive');

    }
    function setButtonStateRunning() {
        start.classList.add('inactive');
        stop.classList.remove('inactive');
        reset.classList.add('inactive');
    }
    function setButtonStateStopped() {
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.remove('inactive');
    }

    setButtonStateInitial();

    start.addEventListener('click', () => {
        if (start.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateRunning();
        startTime = Date.now();
        countUp();
    });
    stop.addEventListener('click', () => {
        if (stop.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateStopped();
        clearTimeout(timeoutId);
        elapsedTime += Date.now() - startTime;
        studyTime = new Date(Date.now() - startTime + elapsedTime);
        const studyDate = new Date();
        const formattedDate = studyDate.toLocaleDateString();
        const dailyStudyTime = `${studyTime.getMinutes()}分${studyTime.getSeconds()}秒`

        const dailyStudyRecord = {
            day: formattedDate,
            time: dailyStudyTime,
        };

        const jsondata = JSON.stringify(dailyStudyRecord);
        localStorage.setItem('memo', jsondata);

        if (localStorage.getItem("memo")) {
            const jsondata = localStorage.getItem("memo");
            const data = JSON.parse(jsondata)
            console.log(data);
            timer.textContent = data.Time;
            record.textContent = `Date: ${data.day}\ntime: ${data.time}`;
        }

        //document.getElementById("record").value(data.day);
        //document.getElementById("record").value = data.time;


    });

    reset.addEventListener('click', () => {
        if (reset.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateInitial();
        timer.textContent = '00:00.000';
        elapsedTime = 0;
        localStorage.removeItem('memo');
        record.textContent = '';



    });

}
