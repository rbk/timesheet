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
    // var random = Math.floor(Math.random()*100); console.log( 'Lucky Number: ' + random );

    var date = new Date();
    var dateFull = parseInt(date.getMonth()+1) + '-' + date.getDate() + '-' + date.getFullYear();
   // console.log( 'Month: ' + parseInt(date.getMonth()+1) );
   // console.log( 'Day: ' + date.getDate() );
   // console.log( 'Year: ' + date.getFullYear() );
   // console.log( dateFull );
    

    var employeeTimesheets = [
        { 
            name: 'employee name', 
            date: dateFull,
                work: [
                { 
                    company: 'Company Name',
                    totalHours: 3.5
                },
                { 
                    company: 'Another Company Name',
                    totalHours: 1.5
                }
            ] 
        }
    ];
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
                // thisDb.createObjectStore("test2", { autoIncrement: true });
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
                $('#name').val( setting.name );
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



