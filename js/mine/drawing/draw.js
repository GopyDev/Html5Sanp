//***************************************************************************************//
//
//	FabricJS Object Drawing file
//
//***************************************************************************************//

var drawObj 		= function()
{
	var main 		= this;

	main.canvasID 	= "canvas";
	main.canvWidth	= 300;
	main.canvHeight	= 300;
	main.canvas 	= null;
	
	main.prevScale	= 1;
	main.unit 		= 50; 	// 1 metre = 50pixel;
	main.sel_obj 	= null;

	main.init 		= function(width,height)
	{
		main.objArr 	= [];
		main.canvWidth 	= width;
		main.canvHeight = height;

		main.canvasCSS();
		main.initFabric();
		main.drawEvent();
		main.objEvent();
	}

	main.canvasCSS	= function()
	{
		$("#" + main.canvasID).attr("width",main.canvWidth);
		$("#" + main.canvasID).attr("height",main.canvHeight);
		$("#" + main.canvasID).css("width",main.canvWidth);
		$("#" + main.canvasID).css("height",main.canvHeight);

		if(main.canvas)
		{
			main.canvas.setWidth(main.canvWidth);
			main.canvas.setHeight(main.canvHeight);
			main.canvas.renderAll();
			main.canvas.calcOffset();
		}
	}

	main.initFabric	= function()
	{
		main.canvas = new fabric.Canvas(main.canvasID);
	}


	main.drawEvent	= function()
	{
		$("#" + main.canvasID).droppable(
		{
			drop: function(event,ui)
			{
				var obj 	= $(ui.draggable).children("img").attr("src");
				var tleft 	= $("#canvas_area").css('left').replace("px","") * 1;
				var ttop 	= $("#canvas_area").css('top').replace("px","") * 1;
				
				var left 	= ui.helper.offset().left - tleft;
				var top 	= ui.helper.offset().top  - ttop - 50;

				main.addObject("svg",left,top,obj);
			}
		});
	}

	main.objEvent 		= function()
	{
		main.canvas.on('object:moving', function(options)
		{
			var selObj 		= main.canvas.getActiveObject();

			main.isSnap(selObj);
		});

		main.canvas.on('object:selected', function(options)
		{
			var selObj 		= main.canvas.getActiveObject();

			selObj.c_angle 	= selObj.angle;
		});

		main.canvas.on('object:rotating', function(options)
		{
			var selObj 		= main.canvas.getActiveObject();

			selObj.c_angle 	= selObj.angle;
		});
	}

	main.addObject 	= function(tool,left,top,twod,size,thrd)
	{
		switch(tool)
		{
			case "text" :
				main.canvas.add(new fabric.Text('Add Text',
				{ 
				    left: left,
				    top: top, 
				    fill: 'black',
				    scaleX : main.prevScale,
				    scaleY : main.prevScale
				}));
			break;

			case "line" :
				main.canvas.add(new fabric.Rect(
				{
					type : "rect",
					left: left,
					top: top,
					width: 150,
					height: 10,
					fill: "white",
					stroke : 1,
					borderColor : "black",
					hasBorders  : true,
					scaleX : main.prevScale,
					scaleY : main.prevScale
				}));
			break;

			case "rect" :
				main.canvas.add(new fabric.Rect(
				{
					type : "rect",
					left: left,
					top: top,
					width: 150,
					height: 100,
					fill: "white",
					stroke : 2,
					borderColor : "black",
					hasBorders  : true,
					scaleX : main.prevScale,
					scaleY : main.prevScale
				}));
			break;

			case "triangle" :
				main.canvas.add(new fabric.Triangle(
				{
					type : "triangle",
					left: left,
					top: top,
					width: 100,
					height: 100,
					fill: "white",
					stroke : 2,
					borderColor : "black",
					hasBorders  : true,
					scaleX : main.prevScale,
					scaleY : main.prevScale
				}));
			break;

			case "circle" :
				main.canvas.add(new fabric.Circle(
				{
					type : "circle",
					left: left,
					top: top,
					radius: 50,
					fill: "white",
					stroke : 2,
					borderColor : "black",
					hasBorders  : true,
					scaleX : main.prevScale,
					scaleY : main.prevScale
				}));
			break;

			case "star"	:
				var lwidth 	= 100;
				var swidth 	= 40;
				var length 	= 0;
				var angle 	= 0;
				var x,y;
				var starPoints = [];

				for(var i = 0; i < 10; i ++)
				{
					if(i % 2 == 0)	length = lwidth;
					else length = swidth;

					angle = 2 * Math.PI / 10 * i;
					
					x = left  - Math.sin(angle) * length;
					y = top - Math.cos(angle) * length;

					starPoints.push({x:x, y:y});
				}

				main.canvas.add(new fabric.Polygon(starPoints, {
					type:"star",
					left: left,
					top: top,
					fill: 'purple',
					fill: "white",
					stroke : 2,
					borderColor : "black",
					hasBorders  : true,
					points : starPoints,
					scaleX : main.prevScale,
					scaleY : main.prevScale
				}));
			break;

			case "ellipse" :
				main.canvas.add(new fabric.Ellipse(
				{
					type:"ellipse",
					left: left,
					top: top,
					rx: 50,
					ry: 30,
					fill: "white",
					stroke : 2,
					originX: 'center',
        			originY: 'center',
					borderColor : "black",
					hasBorders  : true,
					scaleX : main.prevScale,
					scaleY : main.prevScale
				}));
			break;

			case "image" :
				var url 	= "img/objs/2d_shape/" + twod;
				var size 	= size.split(",");
				var obj3d 	= thrd;

				fabric.Image.fromURL(url, function(img)
				{
					main.canvas.add(img.set(
					{
						top 	: top, 
						left 	: left, 
						url 	: url,
						width 	: size[0] * main.unit,
						height 	: size[1] * main.unit,
						depth 	: size[2],
						obj3d	: obj3d,
						scaleX 	: main.prevScale, 
						scaleY 	: main.prevScale 
					}));
				});
			break;

			case "svg" :
				fabric.loadSVGFromURL(twod, function(objects, options) 
				{
					var obj 	= fabric.util.groupSVGElements(objects, options);
					var list 	= [];
					var ind_arr = [];
					var radius 	= 10;

					list.push(obj);
					ind_arr = [2, 4, 15, 24];

					for(var i = 0; i < ind_arr.length; i ++)
					{
						var control = new fabric.Ellipse(
						{
							type 	: "ellipse",
							top 	: objects[ind_arr[i]].y1,
							left 	: objects[ind_arr[i]].x1,
							rx 		: radius,
							ry 		: radius,
							fill 	: "black",
							originX : 'center',
        					originY : 'center',
							visible : false
						});

						list.push(control);
					}

					var new_group = new fabric.Group(list, {
						top   : top,
						left  : left,
						index : main.objArr.length
					});

					new_group.setControlsVisibility({
						mt: false, 
						mb: false, 
						ml: false, 
						mr: false, 
						bl: false,
						br: false, 
						tl: false, 
						tr: false
					});

					main.objArr.push(new_group);
					main.canvas.add(new_group);
				});
			break;
		}

		main.isSnap 		= function(moving)
		{
			var num_snap 	= 0;
			var tolerance 	= 20;
			var pair_arr 	= [];
			var angle 		= 0;

			var pos_t 		= null;
			var pos_m 		= null;

			for(var i = 0; i < main.objArr.length; i ++)
			{
				if(moving.index == main.objArr[i].index)
					continue;

				pair_arr 	= [];

				for(var j = 1; j < main.objArr[i]._objects.length; j ++)
				{
					for(var k = 1; k < moving._objects.length; k ++)
					{
						if(j == k)
							continue;

						pos_t = main.getAbsolutePosition(moving._objects[k]);
						pos_m = main.getAbsolutePosition(main.objArr[i]._objects[j]);

						if(Math.abs(pos_t.x - pos_m.x) < tolerance && Math.abs(pos_t.y - pos_m.y) < tolerance)
						{
							pair_arr.push([k, j, i]);
						}

						if(pair_arr.length == 2)
							break;
					}
				}

				if(pair_arr.length == 2)
					break;
			}

			if(pair_arr.length == 2)
			{
				if(pair_arr[0][0] == 2 && pair_arr[0][1] == 3 && pair_arr[1][0] == 3 && pair_arr[1][1] == 2)
					return;

				if(pair_arr[0][0] == 3 && pair_arr[0][1] == 2 && pair_arr[1][0] == 2 && pair_arr[1][1] == 3)
					return;

				if(pair_arr[0][0] == pair_arr[1][0] || pair_arr[0][1] == pair_arr[1][1])
					return;

				var pos1 = main.getAbsolutePosition(moving._objects[pair_arr[0][0]]);
				var pos2 = main.getAbsolutePosition(moving._objects[pair_arr[1][0]]);

				var pos3 = main.getAbsolutePosition(main.objArr[pair_arr[0][2]]._objects[pair_arr[0][1]]);
				var pos4 = main.getAbsolutePosition(main.objArr[pair_arr[1][2]]._objects[pair_arr[1][1]]);
				
				var d1 	 = Math.sqrt((pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.y - pos2.y) * (pos1.y - pos2.y));
				var d2 	 = Math.sqrt((pos3.x - pos4.x) * (pos3.x - pos4.x) + (pos3.y - pos4.y) * (pos3.y - pos4.y));
				var k 	 = ((pos2.x - pos1.x) * (pos4.x - pos3.x) + (pos2.y - pos1.y) * (pos4.y - pos3.y)) / (d1 * d2);
				
				var min  = 3;
				var ang  = 0;
				var ang1 = 0;

				if(k >= 1)
					ang = 0;
				else if(k <= -1)
					ang = 180;
				else
					ang = Math.acos(((pos2.x - pos1.x) * (pos4.x - pos3.x) + (pos2.y - pos1.y) * (pos4.y - pos3.y)) / (d1 * d2));

				if( (ang / Math.PI * 180 < 0.1) && 
					(Math.abs(pos1.x - pos3.x) < min && Math.abs(pos1.y - pos3.y) < min) &&
					(Math.abs(pos2.x - pos4.x) < min && Math.abs(pos2.y - pos4.y) < min) )
					return;

				moving.rotate(moving.angle - ang / Math.PI * 180);
				moving.calcCoords();

				moving.left = moving.left - (pos1.x - pos3.x);
				moving.top  = moving.top  - (pos1.y - pos3.y);
				moving.calcCoords();
				
				pos1 = main.getAbsolutePosition(moving._objects[pair_arr[0][0]]);
				pos2 = main.getAbsolutePosition(moving._objects[pair_arr[1][0]]);
				pos3 = main.getAbsolutePosition(main.objArr[pair_arr[0][2]]._objects[pair_arr[0][1]]);
				pos4 = main.getAbsolutePosition(main.objArr[pair_arr[1][2]]._objects[pair_arr[1][1]]);
				k 	 = ((pos2.x - pos1.x) * (pos4.x - pos3.x) + (pos2.y - pos1.y) * (pos4.y - pos3.y)) / (d1 * d2);

				if(k >= 1)
					ang1 = 0;
				else if(k <= -1)
					ang1 = 180;
				else
					ang1  = Math.acos(((pos2.x - pos1.x) * (pos4.x - pos3.x) + (pos2.y - pos1.y) * (pos4.y - pos3.y)) / (d1 * d2));

				if(ang1 / Math.PI * 180 > 0.01)
				{
					moving.rotate(moving.angle + ang * 2 / Math.PI * 180);
					moving.left = moving.left - (pos1.x - pos3.x);
					moving.top  = moving.top  - (pos1.y - pos3.y);
				}
			}
		}

		main.getAbsolutePosition = function(obj) 
		{
			var m = obj.calcTransformMatrix();

			return {x: m[4], y: m[5]};
		}

		main.getOrgPos		= function(object)
		{
			var x 			= object.get("left");
			var y 			= object.get("top");
			var width 		= object.getWidth();
			var height 		= object.getHeight();
			var mangle 		= object.get("angle") * (Math.PI / 180) * (-1);

			var angle1		= Math.atan(width / height);
			var angle2 		= (180 * (Math.PI / 180) - mangle) / 2;
			var radian 		= angle2 - angle1;

			var r1 			= Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
			var l1 			= Math.sin(mangle / 2) * r1;
			var r2 			= l1 * 2;

			var dy 			= Math.cos(radian) * r2;
			var dx 			= Math.sin(radian) * r2;

			var nx 			= x + dx;
			var ny 			= y - dy;

			return ({x:nx, y:ny});
		}
	}
}