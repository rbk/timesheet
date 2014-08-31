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
    <!-- <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"> -->
    <!-- // <script src="//code.jquery.com/jquery-1.11.1.js"></script> -->
    <script src="js/jquery.1.8.js"></script>
    <script src="js/underscores.1.7.js"></script>
</head>
<body class="">
<div class="container">
    <nav style="display:none;">
        <button>Toggle Theme</button>
        <input type="submit">
    </nav>
    <br><br>
 
    <script id="timesheet-template" type="text/template">
    <div id="id-{{date2}}" class="timesheet">
        <button class="add-row">Add Row</button>
        <section id="general">
            <h2>
                <span class="date">{{day}}, {{date}}
                <?php //echo Date('l - F dS, Y' ); ?></span>
                <span class="tracked">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Tracked Time: {{totalHours}}</span>
                <span style="float:right;">
                    Name:&nbsp;<input id="name" type="text" placeholder="your name" style="width: 200px" value="{{name}}">
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
        <br>
        
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
    <script type="text/template" id="full-row-template">
    <tr data-id="0" class="time-row">
            <td class="leftside">
                <input class="company" type="text" placeholder="" value="">
            </td>
            <td data-col="0" class="checks" style=""></td><td data-col="1" class="checks" style=""></td><td data-col="2" class="checks"></td><td data-col="3" class="checks" style=""></td><td data-col="4" class="checks"></td><td data-col="5" class="checks"></td><td data-col="6" class="checks" style=""></td><td data-col="7" class="checks" style=""></td><td data-col="8" class="checks" style=""></td><td data-col="9" class="checks" style=""></td><td data-col="10" class="checks" style=""></td><td data-col="11" class="checks" style=""></td><td data-col="12" class="checks"></td><td data-col="13" class="checks" style=""></td><td data-col="14" class="checks" style=""></td><td data-col="15" class="checks" style=""></td><td data-col="16" class="checks" style=""></td><td data-col="17" class="checks" style=""></td><td data-col="18" class="checks"></td><td data-col="19" class="checks"></td><td data-col="20" class="checks"></td><td data-col="21" class="checks"></td><td data-col="22" class="checks"></td><td data-col="23" class="checks"></td><td data-col="24" class="checks"></td><td data-col="25" class="checks"></td><td data-col="26" class="checks"></td><td data-col="27" class="checks"></td><td data-col="28" class="checks"></td><td data-col="29" class="checks"></td><td data-col="30" class="checks"></td><td data-col="31" class="checks"></td><td data-col="32" class="checks"></td><td data-col="33" class="checks"></td><td data-col="34" class="checks"></td><td data-col="35" class="checks"></td><td data-col="36" class="checks"></td><td data-col="37" class="checks"></td><td data-col="38" class="checks"></td><td data-col="39" class="checks"></td><td data-col="40" class="checks"></td><td data-col="41" class="checks"></td><td data-col="42" class="checks"></td><td data-col="43" class="checks"></td>
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

        $(document).on('click', 'td.checks', function(){
            if( $(this).hasClass('checked') ){
                $(this).html('');
                $(this).removeClass('checked');
            } else {
                $(this).html('<i class="fa fa-check">X</i>')
                $(this).addClass('checked')
            }
        });
        $(document).on('click', '.add-row', function(){
            var row = $('#full-row-template').html();
            $(this).parent().find('tbody').append(row);
        });

        // Too distracting
        // $(document).on('mouseover', 'td.checks', function(){
        //     // console.log( $(this) )
        //     var column = $(this).attr('data-col');
        //     $('td[data-col='+column+']').css({'background-color':'#333'});
        // }).on( 'mouseout', '.checks', function(){
        //     var column = $(this).attr('data-col');
        //     $('td[data-col='+column+']').attr('style', '');
        // });



});
</script>
</body>
</html>