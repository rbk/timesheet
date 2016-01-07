<!doctype html>
<html>
<head>
    <title>GuRuStu Timesheet</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="author" content="">
    <meta name="description" content="">
    <link rel="shortcut icon" href="favicon.ico">
    <link rel="stylesheet" type="text/css" href="./css/app.css">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
    <script src="js/jquery.1.8.js"></script>
    <script src="js/underscores.1.7.js"></script>
</head>
<body class="dark">
<div class="container">

    <nav style="display:none;">
        <button class="nav-item" data-id="settings">Settings</button>
    </nav>

    <br><br>
    <script id="timesheet-template" type="text/template">
    <div id="{{date2}}" class="timesheet">
        <button class="add-row">Add Row</button>
        <section id="general">
            <h2>
                <span class="date">{{day}}, {{date}}
                </span>
                <span class="tracked-wrap">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Tracked Time: 
                    <span class="tracked">{{totalHours}}</span>
                </span>
                <span style="float:right;">
                    Name:&nbsp;<input id="name" type="text" placeholder="your name" style="width: 200px" value="{{name}}">
                </span>
            </h2>
        </section>
    <table>
        <thead>
            <tr>
                <th class="leftside"></th>
                <th>7</th><th>7</th><th>7</th><th>7</th>
                <th>8</th><th>8</th><th>8</th><th>8</th>
                <th>9</th><th>9</th><th>9</th><th>9</th>
                <th>10</th><th>10</th><th>10</th><th>10</th>
                <th>11</th><th>11</th><th>11</th><th>11</th>
                <th>12</th><th>12</th><th>12</th><th>12</th>
                <th>1</th><th>1</th><th>1</th><th>1</th>
                <th>2</th><th>2</th><th>2</th><th>2</th>
                <th>3</th><th>3</th><th>3</th><th>3</th>
                <th>4</th><th>4</th><th>4</th><th>4</th>
                <th>5</th><th>5</th><th>5</th><th>5</th>
                <th>6</th><th>6</th><th>6</th><th>6</th>
            </tr>
            <thead>
            <tbody>
            {{timesheet-body}}
            </tbody>
        </table>
        <br>
        
    </div>
    <br>
    <br>
    <br>
    </script>
    <script type="text/template" id="row-template">
        <tr data-id="{{id}}" class="time-row">
            <td data-id="{{company-id}}" class="leftside">
                <input class="company" type="text" placeholder="" value="{{company}}">
                <div class="remove-row"><i class="fa fa-minus remove-icon"></i></div> 
            </td>
            {{times}}
        </tr>
    </script>
    <script type="text/template" id="full-row-template">
    <tr data-id="{{work-length}}" class="time-row">
            <td class="leftside">
                <input class="company" type="text" placeholder="" value="">
                <div class="remove-row"><i class="fa fa-minus remove-icon"></i></div> 
            </td>
            <td data-col="0 " class="checks"></td>
            <td data-col="1 " class="checks"></td>
            <td data-col="2 " class="checks"></td>
            <td data-col="3 " class="checks"></td>
            <td data-col="4 " class="checks"></td>
            <td data-col="5 " class="checks"></td>
            <td data-col="6 " class="checks"></td>
            <td data-col="7 " class="checks"></td>
            <td data-col="8 " class="checks"></td>
            <td data-col="9 " class="checks"></td>
            <td data-col="10" class="checks"></td>
            <td data-col="11" class="checks"></td>
            <td data-col="12" class="checks"></td>
            <td data-col="13" class="checks"></td>
            <td data-col="14" class="checks"></td>
            <td data-col="15" class="checks"></td>
            <td data-col="16" class="checks"></td>
            <td data-col="17" class="checks"></td>
            <td data-col="18" class="checks"></td>
            <td data-col="19" class="checks"></td>
            <td data-col="20" class="checks"></td>
            <td data-col="21" class="checks"></td>
            <td data-col="22" class="checks"></td>
            <td data-col="23" class="checks"></td>
            <td data-col="24" class="checks"></td>
            <td data-col="25" class="checks"></td>
            <td data-col="26" class="checks"></td>
            <td data-col="27" class="checks"></td>
            <td data-col="28" class="checks"></td>
            <td data-col="29" class="checks"></td>
            <td data-col="30" class="checks"></td>
            <td data-col="31" class="checks"></td>
            <td data-col="32" class="checks"></td>
            <td data-col="33" class="checks"></td>
            <td data-col="34" class="checks"></td>
            <td data-col="35" class="checks"></td>
            <td data-col="36" class="checks"></td>
            <td data-col="37" class="checks"></td>
            <td data-col="38" class="checks"></td>
            <td data-col="39" class="checks"></td>
            <td data-col="40" class="checks"></td>
            <td data-col="41" class="checks"></td>
            <td data-col="42" class="checks"></td>
            <td data-col="43" class="checks"></td>
            <td data-col="44" class="checks"></td>
            <td data-col="45" class="checks"></td>
            <td data-col="46" class="checks"></td>
            <td data-col="47" class="checks"></td>
        </tr>
    </script>

        <div id="output"></div>
    
    </div> <!-- end .container -->
    
    <section id="settings" class="page">
        <div class="close"><i class="fa fa-times"></i></div>
        <div class="inner-page">
            <h1>Settings</h1>
            <div class="field">
                <label>Name</label>
                <input type="text" name="default-name">
            </div>
            <div class="field">
                <label>Email</label>
                <input type="text" name="default-email">
            </div>
        </div>
    </section>


    <script src="./js/app.js"></script>
</body>
</html>