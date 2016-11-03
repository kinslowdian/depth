// DEBUG
var trace = function(msg){ console.log(msg); };

var perspi_main;

function pageLoad_init()
{
	trace("pageLoad_init();");

	perspi_setup();
}

function perspi_setup()
{
	perspi_main = {};

	perspi_main.layers = 4;
	perspi_main.maxParticles = 100;
	perspi_main.sizeMax = 80;
	perspi_main.sizeMin = 4;

	perspi_main.list = {};
	perspi_main.list.viewer = document.querySelector(".p-display .p-content");

	perspi_main.display = {};
	perspi_main.display.w = screen.width;
	perspi_main.display.h = screen.height;

	perspi_registerLayers();
}

function perspi_registerLayers()
{
	for(var i = 0; i <  perspi_main.layers; i++)
	{
		perspi_main.list['layer' + i] = document.querySelector('.p-display .p-layer-' + i);
	}

	perspi_populate_init();
}

function perspi_populate_init()
{
	for(var i = 0; i < perspi_main.layers; i++)
	{
		perspi_populate_run(perspi_main.list['layer' + i], i);
	}
}


function perspi_populate_run(layer, parentNum)
{
	var build = new Array();
	var html = "";

	for(var i = 0; i < perspi_main.maxParticles; i++)
	{
		var string = '<div class="parti_' + parentNum + '_' + i + ' parti"></div>';
		var build_obj = {};

		build_obj.x = Math.round(Math.random() * (perspi_main.display.w - 4) + 4);
		build_obj.y = Math.round(Math.random() * (perspi_main.display.h - 4) + 4);
		build_obj.s = Math.round(Math.random() * (perspi_main.sizeMax - perspi_main.sizeMin) + perspi_main.sizeMin);

		build.push(build_obj);

		html += string;
	}

	layer.innerHTML = html;

	for(var j = 0; j < build.length; j++)
	{
		var p = layer.querySelector('.parti_' + parentNum + '_' + j);

		p.style.transform 	= 'translate(' + build[j].x + 'px, ' + build[j].y + 'px)';
		p.style.width 		= build[j].s + 'px';
		p.style.height 		= build[j].s + 'px';
	}

	layer.addEventListener("animationend", perspi_event, false);
}

function perspi_event(event)
{
	var classRef = event.target.classList[0];
	
	trace(classRef);
}



