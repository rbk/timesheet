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
        
        var request = indexedDB.open(db_name,1);
        request.onupgradeneeded = function(event) {
            console.log( 'Upgrading Database!' );
        };
        request.onerror = function(event) {
            console.log( 'Something went wrong whilest connection to db...' );
        };
        request.onsuccess = function(event) {
            console.log( 'Connected to database: "' + db_name + '"');
            console.log( event.target.result );
        };
    
    };


});



