$(function(){
    
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

    var random = Math.floor(Math.random()*100); console.log( 'Lucky Number: ' + random );
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
    var todaysTimeSheet = [
        { 
            name: '', 
            date: dateFull,
            day: '',
            totalHours: 0,
            work: [
                    { 
                        id: '1',
                        company: '',
                        description: '',
                        totalHours: 0, // sumb of true on day multiplied by 15
                        day : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                    }
                ] 
        }
    
    ];
    var employeeTimesheets = [
        { 
            name: '', 
            date: '',
            day: '',
            totalHours: 0,
            work: [
                    { 
                        id: '1',
                        company: '',
                        description: '',
                        totalHours: 0, // sumb of true on day multiplied by 15
                        day : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                    }
                ] 
        }
        // ,
        // { 
        //     name: 'Richard', 
        //     date: "8-29-2014",
        //     totalHours: 8,
        //     work: [
        //             { 
        //                 id: '1',
        //                 company: 'Email/Server Issue',
        //                 description: '',
        //                 totalHours: 10, // sumb of true on day multiplied by 15
        //                 day : [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        //             },
        //             { 
        //                 id: '2',
        //                 company: 'Drysdales',
        //                 description: '',
        //                 totalHours: 10, // sumb of true on day multiplied by 15
        //                 day : [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        //             },
        //             { 
        //                 id: '3',
        //                 company: 'Gurustu',
        //                 description: '',
        //                 totalHours: 10, // sumb of true on day multiplied by 15
        //                 day : [0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        //             },
        //             { 
        //                 id: '4',
        //                 company: 'CampGrit',
        //                 description: '',
        //                 totalHours: 10, // sumb of true on day multiplied by 15
        //                 day : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        //             }
        //         ] 
        // }
    ];

    // Bam... reusability
    function printTimeSheets( employeeTimesheets ){
        for( var sheets=0;sheets<employeeTimesheets.length;sheets++ ){
            var id = employeeTimesheets[sheets].date;
            var template = $('#timesheet-template').html();
            var timesheet_body = '';
            template = template.replace('{{date}}',employeeTimesheets[sheets].date);
            template = template.replace('{{date2}}',employeeTimesheets[sheets].date);
            template = template.replace('{{totalHours}}',employeeTimesheets[sheets].totalHours);
            template = template.replace('{{name}}',employeeTimesheets[sheets].name);

            var work = employeeTimesheets[sheets].work;
            var row_template = $('#row-template').html();

            for(var i=0; i<work.length; i++ ){
                timesheet_body += row_template.replace('{{company}}', work[i].company);
                timesheet_body = timesheet_body.replace('{{id}}', work[i].id);

                var day = work[i].day;
                var rows = '';
                for(var d=0;d<day.length;d++){
                    // console.log( day[d] )
                    if( day[d] == 1 ){
                        rows += '<td data-col="'+d+'" class="checks checked"><i class="fa fa-check"></i></td>';
                    } else {                    
                        rows += '<td data-col="'+d+'" class="checks"></td>';
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
        var request = indexedDB.open(db_name,8);
        
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
            console.log( 'Something went wrong whilest connection to db...' );
        };
        request.onsuccess = function(e) {
            db = e.target.result;
            console.log( 'Connected to database: "' + db_name + '"');

            printTimeSheets( todaysTimeSheet );

            // printTimeSheets( employeeTimesheets );
            saveTimesheet();
            // init();
            // getSettings( db );
            // getTimesheets( db );
            getAllItems(function(items){
                var len = items.length;
                for (var i = 0; i < len; i += 1) {
                    employeeTimesheets.push( items[i] );
                    // console.log(items[i]);
                    console.log( employeeTimesheets );
                    // console.log( 'push this to array and pass to print method' )
                }
            });
        };

        function saveTimesheet(  ){
            var transaction = db.transaction(['timesheets'],'readwrite');
            var store = transaction.objectStore('timesheets');
            var request = store.add(employeeTimesheets[0]);
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
        function getAllItems(callback) {
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


});



