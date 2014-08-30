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

    var employeeTimesheets = [
        { 
            id: 'autoincrement ID', 
            name: 'employee name', 
            date: '08/30/2014',
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
        var request = indexedDB.open(db_name,7);
        
        request.onupgradeneeded = function(e) {
            console.log( 'Upgrading Database!' );
            var thisDB = e.target.result;

            if(!thisDB.objectStoreNames.contains("timesheets")) {
                thisDB.createObjectStore("timesheets",{ keyPath: "name" });
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
            getSettings( e.target.result );
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
            // console.log( settings );
            var transaction = db.transaction(["settings"]);
            var objectStore = transaction.objectStore("settings");

            // Use get() to get a specific object from the object store, the key of which is "Walk dog"
            var request = objectStore.get("Guest123");
            request.onerror = function(event) {
            console.log("There is no record stored for " + request.result.taskTitle);
            };
            request.onsuccess = function(event) {
            // Do something with the request.result!
                console.log( request.result )
            };

        }   
    
    };


});



