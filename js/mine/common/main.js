
jQuery(document).ready(function(){
								
	var initObj		= new initEnv();
	
	initObj.init();
});

var projectID = "";

var initEnv			= function()
{
	var main		= this;

	main.canvWidth 	= 800;
	main.canvHeight	= 600;

	main.drawObj 	= null;
	main.rate 		= 1;
	main.gridSize 	= 20;
	main.initGSize 	= 50;
	main.unit 		= 50;

	this.init		= function()
	{
		this.initCSS();
		this.initMode();
		this.initDraw();

		$(window).resize(main.initCSS);
	};

	this.initCSS	= function()
	{
		var top 		= Math.max(85,($(window).height() - main.canvHeight * main.rate) / 2);
		var sTop	 	= $(window).height() * 0.45;
		var footer_left = ($(window).width() - 601) / 2;

		$("#canvas_area").css('top',top);
		$("#canvas_area").css("width",main.canvWidth * main.rate);
		$("#canvas_area").css("height",main.canvHeight * main.rate);

		$("#grid_bg").css("width", main.canvWidth * main.rate);
		$("#grid_bg").css("height",main.canvWidth * main.rate);

		$("body").css("height",$(window).height());		
		$("#footer_label").css("left",footer_left);
		$("#size_slider").css("left",($(window).width() - 180) / 2);
		$("#move_controlB").css("top",$(window).height() - 29);

		$("#txt_fwidth").val(main.canvWidth / main.unit);
		$("#txt_fdepth").val(main.canvHeight / main.unit);

		if(main.drawObj) 
		{
			main.drawObj.canvWidth 	= main.canvWidth * main.rate;
			main.drawObj.canvHeight = main.canvHeight * main.rate;
			main.drawObj.canvasCSS();
			main.drawObj.canvas.calcOffset();
		}
	};

	this.initMode	= function()
	{
		$("#canvas_area").draggable(
		{
			handle	: "center",
			stop 	: function()
			{
				main.drawObj.canvas.calcOffset();
			}
		});

		$("#tool_area").draggable();
		$("#floorArea").find("li").draggable({helper:"clone"});
		$("#tool_area").find("li:not('.parent,.label')").draggable({helper:"clone"});
		$("#tool_area").find("dl:not('.spliter')").draggable({helper:"clone"});
	}

	this.initDraw	= function()
	{
		main.drawObj = new drawObj();
		main.drawObj.init(main.canvWidth,main.canvHeight);
		main.unit = main.drawObj.unit;
	}

}