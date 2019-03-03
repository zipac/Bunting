async function getHolidayInfo(){
    const holidays = new Promise(function(resolve,reject){
        fetch("https://www.gov.uk/bank-holidays.json").then(function(response){
            response.json().then(function(data){
                resolve(data);
            });
        });
    });
    window.holidays = await holidays;
};

document.getElementById('date').addEventListener('change', function(evt) {
    engWalBunting = isBunting("england-and-wales", evt.target.value)
    norIreBunting = isBunting("northern-ireland", evt.target.value)
    scotlandBunting = isBunting("scotland", evt.target.value)
    
    highlight(engWalBunting, norIreBunting, scotlandBunting);
    document.getElementById('holidayName').innerHTML = whichHolidays(evt.target.value);
    
});

var defaultDate = "2019-01-01";
document.getElementById("date").value = defaultDate;

function holidayName(){  
    if (engWalBunting || norIreBunting || scotlandBunting){
        return holiday[division].event.title;
    }
}

function isBunting(division, date){
    const events = holidays[division].events;
    return events.filter(function(event) {
        return event.date === date && event.bunting;
    }).length != 0;
}

function highlight(engWalBunting, norIreBunting, scotlandBunting){

    if(engWalBunting){
        document.getElementById("england").style.fill ="#DF9B6B";
        document.getElementById("wales").style.fill ="#94CD8F";
    } else {
        document.getElementById("england").style.fill ="gray";
        document.getElementById("wales").style.fill ="gray";
    }
    if(norIreBunting){
        document.getElementById("northern-ireland").style.fill ="#66C7C1";
    } else {
        document.getElementById("northern-ireland").style.fill ="gray";
    }
    if(scotlandBunting){
        document.getElementById("scotland").style.fill ="#E2BEBE";
    } else {
        document.getElementById("scotland").style.fill ="gray";
    }



}

function whichHolidays(date){
    const engWalEvents = holidays["england-and-wales"].events;
    const norIreEvents = holidays["northern-ireland"].events;
    const scotEvents = holidays["scotland"].events;

    const ukEvents = engWalEvents.concat(norIreEvents).concat(scotEvents);
    let filteredEventArr = ukEvents.filter(function(event) {
        return event.date === date;
    })

    filteredEventArr = filteredEventArr.map(function(event){
        return event.title;
    });

    let holidayArr = new Set(filteredEventArr);
    holidayArr = Array.from(holidayArr);
    let holidayList = holidayArr.join(", ");

    if(holidayList.length!=0){
        holidayList = `The holidays on this date are: ${holidayList}.`
    } else {
        holidayList = "";
    }

    return holidayList;

}

getHolidayInfo();