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
    <section id="general">
        <h2>
            <?php echo Date('l - F dS, Y' ); ?>
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

    <div class="timesheet">
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
                
            <?php for( $i=0; $i<20; $i++ ) : ?>
            <tr>
                <td class="leftside"><input class="company" type="text" placeholder=""></td>
                <?php 
                    for($td=0;$td<44;$td++){
                        echo '<td class="checks"></td>';
                    } 

                ?>
            </tr>
            <?php endfor; ?>
     
        </table>
    </div> <!-- end timesheet -->
    <h2>Money Made Today: $45,439.03</h2>
</div> <!-- end .container -->
<script>
    $(function(){

    $('td.checks').on('click', function(){
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



<script src="./js/app.js"></script>
</body>
</html>