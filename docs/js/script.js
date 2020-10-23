'use strict';

{
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');
    const record = document.getElementById('record');
    const result = document.getElementById('record_result');
    const removeList = document.getElementById('list_remove');
    let timeRecord = '00:00:00.000';

    let startTime;
    let gmt;
    let timeoutId;
    let elapsTime = 0;

    // タイマーの機能
    function countUp(){
        const d = new Date(Date.now() - startTime + elapsTime);     
        const h = String(d.getHours() + gmt ).padStart(2, '0');
        const m = String(d.getMinutes()).padStart(2, '0');
        const s = String(d.getSeconds()).padStart(2, '0');
        const ms = String(d.getMilliseconds()).padStart(3, '0');
        timeRecord = `${h}:${m}:${s}.${ms}`;
        timer.textContent = timeRecord;

        timeoutId = setTimeout(() =>{
            countUp();
        }, 10);
    }

    //タイマーボタンの状態設定
    function setButtonStateInitial(){
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.add('inactive');
    }
    function setButtonStateRunning(){
        start.classList.add('inactive');
        stop.classList.remove('inactive');
        reset.classList.add('inactive');    
    }
    function setButtonStateStopped(){
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.remove('inactive');     
    }

    setButtonStateInitial();

    // start押した時
    start.addEventListener('click', () =>{
        if(start.classList.contains('inactive') === true){
            return;
        }
        setButtonStateRunning();
        startTime = Date.now();
        gmt = new Date().getTimezoneOffset() / 60;
        countUp();
    });

    // stop押した時
    stop.addEventListener('click', () =>{
        if(stop.classList.contains('inactive') === true){
            return;
        }
        setButtonStateStopped();
        clearTimeout(timeoutId);
        elapsTime += Date.now() - startTime;
    });

    // reset押した時
    reset.addEventListener('click', () =>{
        if(reset.classList.contains('inactive') === true){
            return;
        }
        setButtonStateInitial();
        timer.textContent = '00:00:00.000';
        elapsTime = 0;
        timeRecord = '00:00:00.000';
    });

   // listを追加してidを付与
    let i = 0;
    let idName = "add_lists_"
    function addInput(){
        i++;
        $("#record_lists").clone(true).find('#add_lists').attr('id', idName + i).appendTo("#record_lists");
      }
     
    // record押した時
    record.addEventListener('click', ()=>{
        // timerを表示→
        result.textContent = timeRecord;
        // listを追加してid付→
        addInput();  
    });   
    
    // ×ボタンの機能
    $(document).on('click','#list_remove', function(e){
    console.log($(e.target.parentNode.parentNode));
    $(e.target.parentNode.parentNode).remove();
    });
}
