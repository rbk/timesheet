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
    if(idbSupported) {

        var db;
        var db_name = 'timesheets';
        var transaction, store;
        
        var request = indexedDB.open(db_name,4);
        request.onupgradeneeded = function(e) {
            console.log( 'Upgrading Database!' );
            var thisDB = e.target.result;

            if(!thisDB.objectStoreNames.contains("timesheets")) {
                thisDB.createObjectStore("timesheets",{ key: "name" });
                // thisDb.createObjectStore("test2", { autoIncrement: true });
            }
        };
        request.onerror = function(e) {
            console.log( 'Something went wrong whilest connection to db...' );
        };
        request.onsuccess = function(e) {
            db = e.target.result;
            console.log( 'Connected to database: "' + db_name + '"');
            saveTimesheet()
        };
        function saveTimesheet(){
            var transaction = db.transaction(['timesheets'],'readwrite');
            var store = transaction.objectStore('timesheets');
            var request = store.add(employeeTimesheets,1);
            request.onsuccess = function(e){
                console.log('Saved');
            }
        }
    
    };


});



