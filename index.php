<!doctype html>
<html>
<head>
    <title>GuRuStu Boilerplate</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="author" content="">
    <meta name="description" content="">
    <link rel="shortcut icon" href="">
    <link rel="stylesheet" type="text/css" href="./css/app.css">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
    <!--[if lt IE 9]>
        <script src="//cdn.jsdelivr.net/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script src="//code.jquery.com/jquery-1.11.1.js"></script>
</head>
<body>
<div class="container">
    <style>
    .container {
        padding: 1em;
    }
        .timesheet {
            width: 90%;
            margin: 0 auto;
        }
        table {
            border: 1px solid #000;
            /*table-layout: fixed;*/
            /*width: 100%;*/
        }
        td,th {
            text-align: center;
            border: 1px solid #000;
            width: 20px;
            height: 20px;

        }
        tr:hover {
            background-color: #eee;
        }
        td:hover {
            cursor: default;
        }
        .leftside {
            width: 200px;
            padding: 0 3px;
            margin: 0;
        }
        input.company {
            margin: 0;
padding: 0;
border: 0;
outline: 0;
width: 100%;
height: 100%;
        }
    </style>


    <div class="timesheet">

        <table>
            <tr>
                <td></td>
                <td colspan="22">
                    Name:
                </td>
                <td colspan="22">
                    Date:
                </td>
            </tr>
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
                
            <?php for( $i=0; $i<15; $i++ ) : ?>
            <tr>
                <td class="leftside"><input class="company" type="text"></td>
                <?php 
                    for($td=0;$td<44;$td++){
                        echo '<td class="checks"></td>';
                    } 

                ?>
            </tr>
            <?php endfor; ?>
     
        </table>
    </div>




</div> <!-- end .container -->
<script src="./js/app.js"></script>
</body>
</html>