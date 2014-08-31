$(function(){
    
    var idbSupported = false;

	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	if (!window.indexedDB) {
	    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
	} else {
        var idbSupported = true;
    }
    var random = Math.floor(Math.random()*100); console.log( 'Lucky Number: ' + random );

    var date = new Date();

    var timestamp = date.getTime();

    var dateFull = parseInt(date.getMonth()+1) + '-' + date.getDate() + '-' + date.getFullYear();
   // console.log( 'Month: ' + parseInt(date.getMonth()+1) );
   // console.log( 'Day: ' + date.getDate() );
   // console.log( 'Year: ' + date.getFullYear() );
   // console.log( dateFull );
    

    var employeeTimesheets = [
        { 
            name: 'employee name', 
            date: dateFull,
            totalHours: 0,
            work: [
                    { 
                        id: '1',
                        company: '',
                        description: '',
                        totalHours: 10, // sumb of true on day multiplied by 15
                        day : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                    }
                ] 
        },
        { 
            name: 'Richard', 
            date: "8-29-2014",
            totalHours: 8,
            work: [
                    { 
                        id: '1',
                        company: 'Email/Server Issue',
                        description: '',
                        totalHours: 10, // sumb of true on day multiplied by 15
                        day : [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                    },
                    { 
                        id: '2',
                        company: 'Drysdales',
                        description: '',
                        totalHours: 10, // sumb of true on day multiplied by 15
                        day : [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                    },
                    { 
                        id: '3',
                        company: 'Gurustu',
                        description: '',
                        totalHours: 10, // sumb of true on day multiplied by 15
                        day : [0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                    },
                    { 
                        id: '4',
                        company: 'CampGrit',
                        description: '',
                        totalHours: 10, // sumb of true on day multiplied by 15
                        day : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                    }
                ] 
        }
    ];

  

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

        //     console.log( work[i] )
        //     $('#id-' + id).find('.timesheet-body').append(row_template)
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
            if(!thisDB.objectStoreNames.contains("settings")) {
                var objectStore = thisDB.createObjectStore("settings",{ keyPath: "email" });
                objectStore.createIndex("email", "email", { unique: true });
                objectStore.createIndex("name", "name", { unique: true });
            }
        };
        request.onerror = function(e) {
            console.log( 'Something went wrong whilest connection to db...' );
        };
        request.onsuccess = function(e) {
            db = e.target.result;
            console.log( 'Connected to database: "' + db_name + '"');
            saveTimesheet();
            init();
            getSettings( db );
            getTimesheets( db );
        };
        function saveTimesheet(){
            var transaction = db.transaction(['timesheets'],'readwrite');
            var store = transaction.objectStore('timesheets');
            var request = store.add(employeeTimesheets[1]);
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
                // $('#name').val( setting.name );
                $('body').addClass( setting.theme );
            };

        }
        function getTimesheets(db){
            var transaction = db.transaction(["timesheets"]);
            var objectStore = transaction.objectStore("timesheets");

            var request = objectStore.get("8-30-2014");
            request.onerror = function(event) {
                console.log("There is no record stored for " + request.result);
            };
            request.onsuccess = function(event) {
                var timesheets = request.result;
                console.log( '---Timesheets---' );
                console.log( timesheets );
            };
        }
    
    };


});



