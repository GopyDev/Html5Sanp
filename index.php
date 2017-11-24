
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>2D Snapping Tool</title>
<link rel="stylesheet" type="text/css" href="css/style.css" />
<link rel="stylesheet" type="text/css" href="css/overlay.css" />
<link rel="stylesheet" type="text/css" href="css/jquery-ui.css" />
<link rel="stylesheet" type="text/css" href="css/colorpicker.css" />
</head>

<script type="text/javascript" src="js/library/jquery.min.js"></script>
<script type="text/javascript" src="js/library/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/library/fabric.js"></script>
<script type="text/javascript" src="js/library/colorpicker.js"></script>
<script type="text/javascript" src="js/library/ajaxfileupload.js"></script>


<script type="text/javascript" src="js/mine/common/main.js"></script>
<script type="text/javascript" src="js/mine/drawing/draw_min.js"></script>

<body>
	<div id="top_area">
        <h3>HTML5 Snap Builder</h3>
    </div>

    <div id="area_2d">
        <div id="canvas_area">
            <center>Drop here</center>
            <canvas id="canvas"></canvas>
            <div id="grid_bg"></div>
        </div>
        
        <div id="left_area">
            <div id="left_slider"></div>
            <div class="category" id="floorArea">
                <ul>
                    <li><img src="img/shape.svg"></li>
                </ul>
                <div class="clear_both"></div>
            </div>
        </div>
	</div>
</body>