<!doctype html>
<html>
<head>
    <title>GuRuStu Timesheet</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="author" content="">
    <meta name="description" content="">
    <link rel="shortcut icon" href="">
    <link rel="stylesheet" type="text/css" href="./css/app.css">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
    <script src="//code.jquery.com/jquery-1.11.1.js"></script>
    <script src="js/underscores.1.7.js"></script>
</head>
<body class="dark">
<div class="container">
    <nav style="display:none;">
        <button>Toggle Theme</button>
        <input type="submit">
    </nav>
    <br><br>
    <style>

        #general h2 {
            border: 1px solid #616161;
            margin: 0;
            padding: 8px 10px;
            border-bottom: 0;
        }

    </style>


    <script id="timesheet-template" type="text/template">
    <div id="id-{{date2}}" class="timesheet">
        <section id="general">
            <h2>
                <span class="date">{{date}}
                <?php //echo Date('l - F dS, Y' ); ?></span>
                <span class="tracked">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Tracked: {{totalHours}}</span>
                <span style="float:right;">
                    // Name:&nbsp;<input id="name" type="text" placeholder="your name" style="width: 200px" value="{{name}}">
                </span>
            </h2>
        </section>
    <table>
        <thead>
            <tr>
                <th class="leftside"></th>
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
    </div>
    <br>
    <br>
    <br>
    </script>
    <script type="text/template" id="row-template">
        <tr data-id="{{id}}" class="time-row">
            <td class="leftside">
                <input class="company" type="text" placeholder="" value="{{company}}">
            </td>
            {{times}}
        </tr>
    </script>

    <div id="output"></div>
<!--     <br>
    <br>
    <br>

    <div id="" class="timesheet">
        <section id="general">
            <h2>
                <span class="date"><?php echo Date('l - F dS, Y' ); ?></span>
                <span class="tracked">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Tracked: 7.5</span>
                <span style="float:right;">
                    Name:&nbsp;<input id="name" type="text" placeholder="your name" style="width: 200px">
                </span>
            </h2>
        </section>
        <table>
            <tr>
                <td class="leftside"></td>
                <td>8</td>
                <td>8</td>
                <td>8</td>
                <td>8</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>11</td>
                <td>11</td>
                <td>11</td>
                <td>11</td>
                <td>12</td>
                <td>12</td>
                <td>12</td>
                <td>12</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>3</td>
                <td>3</td>
                <td>3</td>
                <td>3</td>
                <td>4</td>
                <td>4</td>
                <td>4</td>
                <td>4</td>
                <td>5</td>
                <td>5</td>
                <td>5</td>
                <td>5</td>
                <td>6</td>
                <td>6</td>
                <td>6</td>
                <td>6</td>
            </tr>
            <tbody class="timesheet-body">
                
            </tbody> 
        
            <tr class="time-row">
                <td class="leftside"><input class="company" type="text" placeholder=""></td>
            </tr>
        
     
        </table>
    </div> end timesheet -->
 </div> <!-- end .container -->



<script src="./js/app.js"></script>
<script>
    $(function(){

        $('.timesheet').on('click', 'td.checks', function(){
            if( $(this).hasClass('checked') ){
                $(this).html('');
                $(this).removeClass('checked');
            } else {
                $(this).html('<i class="fa fa-check"></i>')
                $(this).addClass('checked')
            }
        });

});
</script>
</body>
</html>