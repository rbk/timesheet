$(function(){

    // Reload page every 12 hours?
    var siad = 60*60*24/2;
    var counter = localStorage.getItem('timesheet_reload_time');
    t = setInterval(function(){
        counter = parseInt(counter + 1);
        localStorage.setItem('timesheet_reload_time', counter);
        if( counter == siad ){
            localStorage.setItem('timesheet_reload_time', 0)
            location.reload();
        }
    }, 1000);
    
    var idbSupported = false;

	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	if (!window.indexedDB) {
	    var getChrome = window.confirm("Your browser doesn't support a stable version of IndexedDB. This application will not function properly without IndexedDB support. Click ok to get Google Chrome! ");
        if( getChrome ){
            window.location.href = 'https://www.google.com/intl/en/chrome/browser/';
        }
    } else {
        var idbSupported = true;
    }

    // var random = Math.floor(Math.random()*100); console.log( 'Lucky Number: ' + random );
    var date = new Date();
    var day;
    var timestamp = date.getTime();
    var dateFull = parseInt(date.getMonth()+1) + '-' + date.getDate() + '-' + date.getFullYear();

    switch(date.getDay()){
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
    };
    var todaysTimesheet = { 
        name: '', 
        date: dateFull,
        day: day,
        totalHours: 0,
        work: [
                { 
                    id: 0,
                    company: '',
                    description: '',
                    totalHours: 0, // sumb of true on day multiplied by 15
                    day : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                }
            ] 
    };
    
    // Bam... reusability
    function printTimeSheets( employeeTimesheets ){

        employeeTimesheets = employeeTimesheets.reverse();

        for( var sheets=0;sheets<employeeTimesheets.length;sheets++ ){
            var id = employeeTimesheets[sheets].date;
            var template = $('#timesheet-template').html();
            var timesheet_body = '';
            template = template.replace('{{day}}',employeeTimesheets[sheets].day);
            template = template.replace('{{date}}',employeeTimesheets[sheets].date);
            template = template.replace('{{date2}}',employeeTimesheets[sheets].date);
            template = template.replace('{{totalHours}}',employeeTimesheets[sheets].totalHours);
            template = template.replace('{{name}}',employeeTimesheets[sheets].name);

            var work = employeeTimesheets[sheets].work;
            var row_template = $('#row-template').html();

            for(var i=0; i<work.length; i++ ){
                timesheet_body += row_template.replace('{{company}}', work[i].company);
                timesheet_body = timesheet_body.replace('{{id}}', i);
                timesheet_body = timesheet_body.replace('{{company-id}}', employeeTimesheets[sheets].date);


                var day = work[i].day;
                var rows = '';
                for(var d=0;d<day.length;d++){
                    if( day[d] == 1 ){
                        rows += '<td data-index="'+ employeeTimesheets[sheets].date+'" data-col="'+d+'" class="checks checked"><i class="fa fa-check"></i></td>';
                    } else {                    
                        rows += '<td data-index="'+ employeeTimesheets[sheets].date + '"data-col="'+d+'" class="checks"></td>';
                    }
                }
                timesheet_body = timesheet_body.replace('{{times}}', rows)
            }
            template = template.replace('{{timesheet-body}}', timesheet_body);
            $('#output').append(template)
        }   
    }



    var settings = [
        {
            name: 'Guest123',
            email: 'guest123@gurustu.co',
            theme: 'dark'
        }
    ];
    if(idbSupported) {

        var db;
        var db_name = 'timesheets';
        var transaction, store;
        var request = indexedDB.open(db_name,1);
        
        request.onupgradeneeded = function(e) {
            console.log( 'Upgrading Database!' );
            var thisDB = e.target.result;

            if(!thisDB.objectStoreNames.contains("timesheets")) {
                var objectStore = thisDB.createObjectStore("timesheets",{ keyPath: "date" });
                objectStore.createIndex('date', 'date', {unique: true});
            }
            // if(!thisDB.objectStoreNames.contains("settings")) {
            //     var objectStore = thisDB.createObjectStore("settings",{ keyPath: "email" });
            //     objectStore.createIndex("email", "email", { unique: true });
            //     objectStore.createIndex("name", "name", { unique: true });
            // }
        };
        request.onerror = function(e) {
            var delete_database = confirm( 'Something went wrong whilest connection to db!!! Is the database safe to delete?' );
            if( delete_database ){
                indexedDB.deleteDatabase('timesheets');
            }
        };
        request.onsuccess = function(e) {
            db = e.target.result;
            checkForTodaysTimesheet(db);
            var timesheets = [];

            // console.log( 'Connected to database: "' + db_name + '"');
            // printTimeSheets( todaysTimeSheet );

            // saveTimesheet();
            // init();
            // getSettings( db );
            // getTimesheets( db );
            getAllTimesheets(function(items){
                var len = items.length;
                for (var i = 0; i < len; i += 1) {
                    timesheets.push( items[i] );
                    // console.log( timesheets );
                }
                printTimeSheets( timesheets );
            });
        };

        function saveNewTimesheet( timesheet ){
            var transaction = db.transaction(['timesheets'],'readwrite');
            var store = transaction.objectStore('timesheets');
            var request = store.add(timesheet);
            request.onsuccess = function(e){
                console.log('Saved');
            }
        }
        function init(){
            var transaction = db.transaction(['settings'],'readwrite');
            var store = transaction.objectStore('settings');
            var request = store.add(settings[0]);
            request.onsuccess = function(e){
                console.log('Saved');
                console.log(e);
            }
        }
        function getSettings(db){
            var transaction = db.transaction(["settings"]);
            var objectStore = transaction.objectStore("settings");

            var request = objectStore.get("guest123@gurustu.co");
            request.onerror = function(event) {
                console.log("There is no record stored for " + request.result);
            };
            request.onsuccess = function(event) {
                var setting = request.result;
                console.log( '---Settings---' );
                console.log( request.result );
                // $('body').addClass( setting.theme );
            };

        }
        function getTimesheets(db){
            var transaction = db.transaction(["timesheets"]);
            var objectStore = transaction.objectStore("timesheets");

            var request = objectStore.get("8-29-2014");
            request.onerror = function(event) {
                console.log("There is no record stored for " + request.result);
            };
            request.onsuccess = function(event) {
                var timesheets = request.result;
                console.log( '---Timesheets---' );
                console.log( timesheets );
            };
        }
        function checkForTodaysTimesheet(db){
            var transaction = db.transaction(['timesheets']);
            var objectStore = transaction.objectStore('timesheets');
            var request = objectStore.get(dateFull);
            request.onsuccess = function(event){
                var todaysSheet = request.result;
                if( !todaysSheet ){
                    saveNewTimesheet( todaysTimesheet );
                    location.reload();
                }
            };
        }
        function getAllTimesheets(callback) {
            var storeName = 'timesheets';
            var trans = db.transaction(storeName, 'readwrite');
            var store = trans.objectStore(storeName);
            var items = [];
            trans.oncomplete = function(evt) {  
                callback(items);
            };
            var cursorRequest = store.openCursor();
            cursorRequest.onerror = function(error) {
                console.log(error);
            };
            cursorRequest.onsuccess = function(evt) {                    
                var cursor = evt.target.result;
                if (cursor) {
                    items.push(cursor.value);
                    cursor.continue();
                }
            };
        }
    
    }; // if indexeddb

    // Saving Events
    var mouse_down = false;
    $(document).on('mousedown', 'td.checks', function(e){
        e.preventDefault();
        mouse_down = true;
        $(this).addClass('changed first');
        saveTimeOnHoverOrClick( $(this) );
    }).on('mouseup', function(){
        mouse_down = false;
        $('td.checks').each(function(){
            $(this).removeClass('changed');
            $(this).removeClass('first');
        });
    });
    $(document).on('mouseover', 'td.checks', function(e){
        e.preventDefault();
        if( mouse_down && !$(this).hasClass('changed') && !$(this).hasClass('first') ){
            saveTimeOnHoverOrClick( $(this) );
            $(this).addClass('changed');
        }
    }).on('mouseout', function(){
        if( $(this).hasClass('changed') ){
            saveTimeOnHoverOrClick( $(this) );
            $(this).removeClass('changed first');
        }
    });


function saveTimeOnHoverOrClick( arg ){
        var work_id = arg.parent().attr('data-id');

        if( arg.hasClass('checked') ){
            arg.html('');
            arg.removeClass('checked');
        } else {
            arg.html('<i class="fa fa-check"></i>')
            arg.addClass('checked')
        }

        var td = arg.parent().find('td.checks');
        var timesheet_id = arg.parent().parent().parent().parent().attr('id');
        var tds = [];

        // console.log( td.length )

        td.each(function(){
            // console.log( $(this) )
            if( $(this).hasClass('checked') ){
                tds.push(1);
            } else {
                tds.push(0);
            }
        });
        // console.log( tds )
        var timesheet;
        var transaction = db.transaction(['timesheets'],'readwrite');
        var store = transaction.objectStore('timesheets');
        var request = store.get( timesheet_id );
        request.onsuccess = function(e){
            timesheet = e.target.result;
            // console.log( 'work_id' + work_id )
            var total = $('#'+timesheet_id+ ' td.checked').length;
            timesheet.totalHours = total*15/60;
            $('#'+timesheet_id).find('.tracked').text( total*15/60 );
            timesheet.name = $('#name').val();
            timesheet.work[work_id].day = tds;
            store.put( timesheet );        
        };

}
    // Saving company
    $(document).on( 'keyup', 'input.company', function(){

        var company_or_note = $(this).val();
        var timesheet_id = $(this).parent().attr('data-id');
        var row_id = $(this).parent().parent().attr('data-id');

        var transaction = db.transaction(['timesheets'],'readwrite');
        var store = transaction.objectStore('timesheets');
        var request = store.get( timesheet_id );
        request.onsuccess = function(e){

            timesheet = e.target.result;
            timesheet.work[row_id].company = company_or_note;
            store.put( timesheet );        
        };

    });
    $(document).on('click', '.add-row', function(){
        
        var timesheet_id = $(this).parent().attr('id');
        var work_length;
        var transaction = db.transaction(['timesheets'],'readwrite');
        var store = transaction.objectStore('timesheets');
        var request = store.get( timesheet_id );
        request.onsuccess = function(e){
            timesheet = e.target.result;

            work_length = timesheet.work.length;
            // console.log(timesheet.work.length);

            var rowObject = {
                id: work_length,
                company: '',
                description: '',
                totalHours: 0,
                day : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            };

            timesheet.work.push( rowObject )            
            store.put( timesheet );        
            
            // location.reload();
            // var row = $('#'+timesheet_id + ' .time-row:first');
            // row.replace('data-id="0"', 'data-id="'+ work_length +'"');
            // var time_row_id = $('.time-row td').attr('data-id')
            var row = $('#full-row-template').html();
            row = row.replace('{{work-length}}', work_length );
            // console.log(  );
            // $(row + ' td:first').attr('data-id', timesheet_id );
            // $(row).find('td.checks').attr('data-index', timesheet_id );
            // console.log( $(row + ' td:first') )
            $('#'+timesheet_id+ ' tbody').append(row);

        };


    });
    // At some point recalculate total...







});



