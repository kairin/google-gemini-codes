/****************/
/* Vars         */
/****************/

var GIRIH = (function(){

/* Camera */
var width = window.innerWidth,
	height = window.innerHeight,
	sidelength = 50,
	svgmargin = sidelength * 3,
	camerascale = 1,
	cameraspeed = 50,
	cameraacc = new THREE.Vector3(0, 0, 0),
	camerapos = new THREE.Vector3(0, 0, 0),
	touchscroll = new THREE.Vector3(0, 0, 0),
	zoomspeed = 0.1,
	maxzoom = 10,
	minzoom = 0.2,
	canvas_left = 0,
	canvas_right = 0,
	canvas_top = 0,
	canvas_bottom = 0,
	canvas_margin_x = width / 2,
	canvas_margin_y = height / 2,
	now,
	then,
	delta;

/* Tools & input */
var keymap = {up: false, down: false, left: false, right: false, backspace: false, plus: false, minus: false, num_plus: false, num_minus: false, },
	currenttype = 1,
	erase = false,
	hand = false,
	mode = 0,
	handdown = new THREE.Vector3(0, 0, 0),
	handdowncamerapos = new THREE.Vector3(0, 0, 0),
	zoomout = false,
	zoomin = false,
	disallowcornerinput = true,
	mouseX,mouseY,
	mouseaX,mouseaY,
	mouserotation = 0,
	mousetouchrotation = 0,
	snap = false,
	snapoffx, snapoffy,
	snappoints,
	overlap = false,
	placeposX,placeposY,
	mouseonmenu,
	mouseinwindows = 0,
	mousedown = false,
	displaystyle = 2;

/* Scene Objects */
var scene = new THREE.Scene(),
	camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -500, 10000 ),
	projector = new THREE.Projector(),
	renderer = new THREE.WebGLRenderer({antialias:false, alpha:true}),
	objectlist = [],
	mouseobject,
	cursortile;
	
/* Display, colors & materials */
var outlinedisplay = true,
	texturedisplay = false,
	shadowdisplay = true;
	complextexturedisplay = false,
	innerpolydisplay = false,
	strokewidth = 2,
	tile_opacity = 1,
	knot_tex_shift_left = 0.4,
	knot_tex_shift_right = 0.6,
	shadow_angle = 90,
	shadow_alpha = 1,
	shadow_length = sidelength/7,
	shadow_input_length = 1,
	MOUSECOLOR = 0xff00ff,
	SNAPMOUSECOLOR = 0xffff00,
	ERASECOLOR = 0xffffff,
	OUTLINECOLOR = 0xffffff,
	TEXTURELINECOLOR = 0x0000e0,
	COMPLEXTEXTURELINECOLOR = 0x2020a0,
	COMPLEXTEXTUREFILLCOLOR = 0xffffff,
	COMPLEXTEXTURESHADOWCOLOR = 0x000000,
	FILLCOLOR = 0x00a0ff,
	DECADON_COLOR = 0x00a0ff,
	ELONGATED_HEXAGON_COLOR = 0x60e060,
	BOW_TIE_COLOR = 0xff40c0,
	RHOMBUS_COLOR = 0x0040ff,
	PENTAGON_COLOR = 0xe0c040,
	FLAT_RHOMBUS_COLOR = 0xffa020,
	INNER_POLY_COLOR_1 = 0xff0000,
	INNER_POLY_COLOR_2 = 0x00ff00,
	INNER_POLY_COLOR_3 = 0x0000ff,
	INNER_POLY_COLOR_4 = 0xff00ff,
	INNER_POLY_COLOR_5 = 0x00FFff,
	BACKGROUNDCOLOR = 0xffffff,
	BORDERMATERIAL = new THREE.LineBasicMaterial( { color: OUTLINECOLOR, linewidth: strokewidth } ),
	TEXTURELINEMATERIAL = new THREE.LineBasicMaterial( { color: TEXTURELINECOLOR, linewidth: strokewidth } ),
	COMPLEXTEXTURELINEMATERIAL = new THREE.LineBasicMaterial( { color: COMPLEXTEXTURELINECOLOR, linewidth: strokewidth } ),
	COMPLEXTEXTUREFILLMATERIAL = new THREE.MeshBasicMaterial( { color: COMPLEXTEXTUREFILLCOLOR, side:THREE.DoubleSide} ),
	COMPLEXTEXTURESHADOWMATERIAL = new THREE.MeshBasicMaterial( { color: COMPLEXTEXTURESHADOWCOLOR, side:THREE.DoubleSide, transparent:true, opacity:shadow_alpha} ),
	MOUSEMATERIAL = new THREE.LineBasicMaterial( { color: MOUSECOLOR, linewidth: strokewidth } ),
	FILLMATERIAL = new THREE.MeshBasicMaterial( { color: FILLCOLOR, side:THREE.DoubleSide, transparent:true, opacity:tile_opacity} ),
	SNAPMOUSEMATERIAL = new THREE.LineBasicMaterial( { color: SNAPMOUSECOLOR, linewidth: 2 } ),
	ERRORMATERIAL = new THREE.MeshBasicMaterial( {  color: '#ff11ff', side:THREE.DoubleSide,transparent:true, opacity:0.7} ),
	ERRORLINES = new THREE.LineBasicMaterial( {  color: '#ffc0ff', linewidth: strokewidth} ),
	ERRORLINES2 = new THREE.LineBasicMaterial( {  color: '#ff1111', linewidth: 2} ),
	DECADON_MATERIAL = new THREE.MeshBasicMaterial( { color: DECADON_COLOR, side:THREE.DoubleSide} ),
	ELONGATED_HEXAGON_MATERIAL = new THREE.MeshBasicMaterial( { color: ELONGATED_HEXAGON_COLOR, side:THREE.DoubleSide} ),
	BOW_TIE_MATERIAL = new THREE.MeshBasicMaterial( { color: BOW_TIE_COLOR, side:THREE.DoubleSide} ),
	PENTAGON_MATERIAL = new THREE.MeshBasicMaterial( { color: PENTAGON_COLOR, side:THREE.DoubleSide} ),
	RHOMBUS_MATERIAL = new THREE.MeshBasicMaterial( { color: RHOMBUS_COLOR, side:THREE.DoubleSide} ),
	FLAT_RHOMBUS_MATERIAL = new THREE.MeshBasicMaterial( { color: FLAT_RHOMBUS_COLOR, side:THREE.DoubleSide} ),
	INNER_POLY_MATERIAL_1 = new THREE.MeshBasicMaterial( { color:INNER_POLY_COLOR_1, side:THREE.DoubleSide} ),
	INNER_POLY_MATERIAL_2 = new THREE.MeshBasicMaterial( { color:INNER_POLY_COLOR_2, side:THREE.DoubleSide} ),
	INNER_POLY_MATERIAL_3 = new THREE.MeshBasicMaterial( { color:INNER_POLY_COLOR_3, side:THREE.DoubleSide} ),
	INNER_POLY_MATERIAL_4 = new THREE.MeshBasicMaterial( { color:INNER_POLY_COLOR_4, side:THREE.DoubleSide} ),
	INNER_POLY_MATERIAL_5 = new THREE.MeshBasicMaterial( { color:INNER_POLY_COLOR_5, side:THREE.DoubleSide} );

var usedpreset = 'tiling';
var prevpreset = 'tiling';
var plainpreset = {"name":"Tiling","fillcolor":41215,"decadon_color":"rgb(0, 255, 255)","elongated_hexagon_color":"rgb(64, 255, 160)","bow_tie_color":"rgb(255, 128, 255)","rhombus_color":"rgb(0, 128, 255)","pentagon_color":"rgb(255, 255, 96)","flat_rhombus_color":16752672,"outlinecolor":"rgb(128, 128, 128)","texturelinecolor":"rgb(0, 192, 255)","complextexturelinecolor":2105504,"complextexturefillcolor":16777215,"shadowdisplay":false,"shadowalpha":1,"shadowlength":1,"shadowangle":185,"shadowcolor":0,"inner_poly_color_1":16711680,"inner_poly_color_2":65280,"inner_poly_color_3":255,"inner_poly_color_4":16711935,"inner_poly_color_5":65535,"backgroundcolor":8421504,"displaystyle":2,"outlinedisplay":true,"texturedisplay":false,"complextexturedisplay":false,"innerpolydisplay":false};
var draftsmanpreset = {"name":"Draftsman","fillcolor":"rgb(255, 255, 255)","decadon_color":"rgb(255, 255, 255)","elongated_hexagon_color":"rgb(64, 160, 224)","bow_tie_color":"rgb(255, 0, 255)","rhombus_color":16639,"pentagon_color":"rgb(255, 224, 0)","flat_rhombus_color":16752672,"outlinecolor":16777215,"texturelinecolor":224,"complextexturelinecolor":"rgb(160, 128, 128)","complextexturefillcolor":"rgb(255, 255, 255)","shadowdisplay":false,"shadowalpha":1,"shadowlength":1,"shadowangle":185,"shadowcolor":"rgb(0, 0, 0)","inner_poly_color_1":"rgb(255, 160, 255)","inner_poly_color_2":"rgb(176, 176, 176)","inner_poly_color_3":"rgb(255, 160, 0)","inner_poly_color_4":"rgb(255, 64, 128)","inner_poly_color_5":"rgb(255, 255, 96)","backgroundcolor":16777215,"displaystyle":1,"outlinedisplay":false,"texturedisplay":false,"complextexturedisplay":true,"innerpolydisplay":true} ;
var clearingpreset = {"name":"Clearing","fillcolor":"rgb(255, 255, 255)","decadon_color":"rgb(255, 255, 255)","elongated_hexagon_color":"rgb(64, 160, 224)","bow_tie_color":"rgb(255, 0, 255)","rhombus_color":16639,"pentagon_color":"rgb(255, 224, 0)","flat_rhombus_color":16752672,"outlinecolor":16777215,"texturelinecolor":224,"complextexturelinecolor":"rgb(144, 144, 144)","complextexturefillcolor":"rgb(255, 255, 255)","shadowdisplay":true,"shadowalpha":0.1,"shadowlength":1,"shadowangle":0,"shadowcolor":"rgb(0, 0, 0)","inner_poly_color_1":"rgb(255, 64, 64)","inner_poly_color_2":"rgb(0, 96, 255)","inner_poly_color_3":"rgb(255, 224, 64)","inner_poly_color_4":"rgb(0, 224, 255)","inner_poly_color_5":"rgb(0, 255, 0)","backgroundcolor":16777215,"displaystyle":1,"outlinedisplay":false,"texturedisplay":false,"complextexturedisplay":true,"innerpolydisplay":true};
var aquapreset = {"name":"Aqa","fillcolor":"rgb(255, 255, 255)","decadon_color":"rgb(255, 255, 255)","elongated_hexagon_color":"rgb(64, 160, 224)","bow_tie_color":"rgb(255, 0, 255)","rhombus_color":16639,"pentagon_color":"rgb(255, 224, 0)","flat_rhombus_color":16752672,"outlinecolor":16777215,"texturelinecolor":224,"complextexturelinecolor":"rgb(255, 255, 255)","complextexturefillcolor":"rgb(96, 192, 192)","shadowdisplay":true,"shadowalpha":0.35,"shadowlength":1,"shadowangle":40,"shadowcolor":"rgb(0, 0, 0)","inner_poly_color_1":"rgb(255, 64, 96)","inner_poly_color_2":"rgb(96, 192, 192)","inner_poly_color_3":"rgb(96, 192, 192)","inner_poly_color_4":"rgb(96, 192, 192)","inner_poly_color_5":"rgb(96, 192, 192)","backgroundcolor":6340800,"displaystyle":0,"outlinedisplay":false,"texturedisplay":false,"complextexturedisplay":true,"innerpolydisplay":true};
var shieldpreset = {"name":"Shield","fillcolor":"rgb(255, 255, 255)","decadon_color":"rgb(255, 255, 255)","elongated_hexagon_color":"rgb(64, 160, 224)","bow_tie_color":"rgb(255, 0, 255)","rhombus_color":16639,"pentagon_color":"rgb(255, 224, 0)","flat_rhombus_color":16752672,"outlinecolor":16777215,"texturelinecolor":224,"complextexturelinecolor":"rgb(255, 255, 255)","complextexturefillcolor":"rgb(96, 192, 192)","shadowdisplay":true,"shadowalpha":0.35,"shadowlength":1,"shadowangle":40,"shadowcolor":"rgb(0, 0, 0)","inner_poly_color_1":"rgb(255, 64, 96)","inner_poly_color_2":"rgb(0, 224, 64)","inner_poly_color_3":"rgb(255, 192, 255)","inner_poly_color_4":"rgb(255, 32, 255)","inner_poly_color_5":"rgb(32, 96, 255)","backgroundcolor":57599,"displaystyle":0,"outlinedisplay":false,"texturedisplay":false,"complextexturedisplay":true,"innerpolydisplay":true};
var displaypresets = {
	tiling: plainpreset,
	draftsman: draftsmanpreset,
	aqa: aquapreset,
	shield: shieldpreset,
	clearing: clearingpreset
};



/*****************/
/* Tile Geometry */
/*****************/

var tileindices = [
	'decadon',
	'elongated_hexagon',
	'bow_tie',
	'rhombus',
	'pentagon',
];
var tileprops = {
	decadon: {
		angles: [144,144,144,144,144,144,144,144,144,144],
		fill_material: DECADON_MATERIAL,
		inner_poly_materials: [INNER_POLY_MATERIAL_1,INNER_POLY_MATERIAL_3],
		patterntype: 1,
		init: function() {
       		this.outline_geometry = buildlines(this.angles);
       		this.mesh_geometry = buildmeshgeometry(this.outline_geometry);
       		this.inner_line_patterns = build_inner_line_patterns_decadon(this.outline_geometry);

       		this.single_line_texture_geometry = buildlinegeometryfromarray(this.inner_line_patterns[0]);
       		this.inner_poly_mesh_geometries = [	buildmeshgeometryfromarray(this.inner_line_patterns[1][0]),
       											buildmeshgeometryfromarray(this.inner_line_patterns[1][1])];
       		
       		this.knot_pattern_arrays = build_knot_pattern_array_decadon(this.outline_geometry);
       		this.knot_pattern_line_geometry = (buildlinegeometryfromarray(this.knot_pattern_arrays[0]));
       		this.knot_pattern_mesh_geometry = (buildmeshgeometryfromarray(this.knot_pattern_arrays[1]));
       		
   		}
	},
	elongated_hexagon: {
		angles: [72,144,144,72,144,144],
		fill_material: ELONGATED_HEXAGON_MATERIAL,
		inner_poly_materials: [INNER_POLY_MATERIAL_2],
		patterntype: 2,
		init: function() {
       		this.outline_geometry = buildlines(this.angles);
       		this.mesh_geometry = buildmeshgeometry(this.outline_geometry);
       		this.inner_line_patterns = build_inner_line_patterns_elongated_hexagon(this.outline_geometry);

       		this.single_line_texture_geometry = (buildlinegeometryfromarray(this.inner_line_patterns[0]));
       		this.inner_poly_mesh_geometries = [	buildmeshgeometryfromarray(this.inner_line_patterns[1][0])];

       		this.knot_pattern_arrays = build_knot_pattern_array_elongated_hexagon(this.outline_geometry);
       		this.knot_pattern_line_geometry = (buildlinegeometryfromarray(this.knot_pattern_arrays[0]));
       		this.knot_pattern_mesh_geometry = (buildmeshgeometryfromarray(this.knot_pattern_arrays[1]));
   		}
	},
	bow_tie: {
		angles: [72,72,216,72,72,216],
		fill_material: BOW_TIE_MATERIAL,
		inner_poly_materials: [INNER_POLY_MATERIAL_3],
		patterntype: 3,
		init: function() {
       		this.outline_geometry = buildlines(this.angles);
       		this.mesh_geometry = buildmeshgeometry(this.outline_geometry);
       		this.inner_line_patterns = build_inner_line_patterns_bow_tie(this.outline_geometry);

       		this.single_line_texture_geometry = (buildlinegeometryfromarray(this.inner_line_patterns[0]));
       		this.inner_poly_mesh_geometries = [	buildmeshgeometryfromarray(this.inner_line_patterns[1][0])];
       		this.knot_pattern_arrays = build_knot_pattern_array_bow_tie(this.outline_geometry);
       		this.knot_pattern_line_geometry = (buildlinegeometryfromarray(this.knot_pattern_arrays[0]));
       		this.knot_pattern_mesh_geometry = (buildmeshgeometryfromarray(this.knot_pattern_arrays[1]));
   		}
	},
	rhombus: {
		angles: [72,108,72,108],
		fill_material: RHOMBUS_MATERIAL,
		inner_poly_materials: [INNER_POLY_MATERIAL_4],
		patterntype: 4,
		init: function() {
       		this.outline_geometry = buildlines(this.angles);
       		this.mesh_geometry = buildmeshgeometry(this.outline_geometry);
       		this.inner_line_patterns = build_inner_line_patterns_rhombus(this.outline_geometry);

       		this.single_line_texture_geometry = (buildlinegeometryfromarray(this.inner_line_patterns[0]));
       		this.inner_poly_mesh_geometries = [	buildmeshgeometryfromarray(this.inner_line_patterns[1][0])];

       		this.knot_pattern_arrays = build_knot_pattern_array_rhombus(this.outline_geometry);
       		this.knot_pattern_line_geometry = (buildlinegeometryfromarray(this.knot_pattern_arrays[0]));
       		this.knot_pattern_mesh_geometry = (buildmeshgeometryfromarray(this.knot_pattern_arrays[1]));
   		}
	},
	pentagon: {
		angles: [108,108,108,108,108],
		fill_material: PENTAGON_MATERIAL,
		inner_poly_materials: [INNER_POLY_MATERIAL_5],
		patterntype: 5,
		init: function() {
       		this.outline_geometry = buildlines(this.angles);
       		this.mesh_geometry = buildmeshgeometry(this.outline_geometry);
       		this.inner_line_patterns = build_inner_line_patterns_pentagon(this.outline_geometry);

       		this.single_line_texture_geometry = (buildlinegeometryfromarray(this.inner_line_patterns[0]));
       		this.inner_poly_mesh_geometries = [	buildmeshgeometryfromarray(this.inner_line_patterns[1][0])];

       		this.knot_pattern_arrays = build_knot_pattern_array_pentagon(this.outline_geometry);
       		this.knot_pattern_line_geometry = (buildlinegeometryfromarray(this.knot_pattern_arrays[0]));
       		this.knot_pattern_mesh_geometry = (buildmeshgeometryfromarray(this.knot_pattern_arrays[1]));
       		this.knot_pattern_mesh_geometry = (buildmeshgeometryfromarray(this.knot_pattern_arrays[1]));
   		}
	}
};
tileprops.decadon.init();
tileprops.elongated_hexagon.init();
tileprops.bow_tie.init();
tileprops.pentagon.init();
tileprops.rhombus.init();

function buildlinegeometryfromarray(array){
	var geometry = new THREE.Geometry();
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length-1; j++) {
			geometry.vertices.push(array[i][j].clone());
			geometry.vertices.push(array[i][j+1].clone());
		};
	};
	return geometry;
}

function buildTile(typeindex) {
	var props = tileprops[tileindices[typeindex]];
	var n = new THREE.Object3D();
	n.add( new THREE.Line(props['outline_geometry'], BORDERMATERIAL));
	n.add( new THREE.Mesh(props['mesh_geometry'],props['fill_material']));
	n.add( new THREE.Line(props['single_line_texture_geometry'], TEXTURELINEMATERIAL,THREE.LinePieces) );
	n.add( new THREE.Line(props['knot_pattern_line_geometry'], COMPLEXTEXTURELINEMATERIAL,THREE.LinePieces) );
	if (props['knot_pattern_mesh_geometry']){
		var k = new THREE.Mesh(props['knot_pattern_mesh_geometry'], COMPLEXTEXTUREFILLMATERIAL); 
		n.add(k);
		n.children[4].position.z = 5;
		var ks = new THREE.Mesh(props['knot_pattern_mesh_geometry'], COMPLEXTEXTURESHADOWMATERIAL); 
		n.add(ks);
		n.children[5].position.z = 4.5;

	}
	if (props['inner_poly_mesh_geometries']){
		a = new THREE.Object3D();
		for (var i = 0; i < props['inner_poly_mesh_geometries'].length; i++) {
			a.add( new THREE.Mesh(props['inner_poly_mesh_geometries'][i], props['inner_poly_materials'][i]) );
		};
		n.add(a);
		n.children[6].position.z = 2;
	}
	n.children[0].position.z = 3;
	n.children[1].position.z = 1;
	n.children[2].position.z = 4;
	n.children[3].position.z = 6;
	n.colormaterial = props['fill_material'];
	n.patterntype = typeindex+1;
	return n;
}

function buildlines(angles) {
	var geometry = new THREE.Geometry();
	var p1 = new THREE.Vector3( sidelength, 0, 0);	
	var p2 = new THREE.Vector3( sidelength*2, 0, 0);	
	geometry.vertices.push(p2);
	
	for (var i = 0; i < angles.length; i++) {
		var np = pfppa(p1, p2, 180-angles[i]);
		// var np = new THREE.Vector3().addVectors(p1,p2);
		geometry.vertices.push(np);
		p1 = p2;
		p2 = np;
	};
	geometry.center();
	return geometry;
}

function buildmeshgeometry(linegeometry) {
	var geometry = new THREE.Geometry();
	// var center = getcenter(geometry);
	var center = new THREE.Vector3(0,0,0);
	center.z = -2;
	geometry.vertices.push(center);
	for (var i = 0; i < linegeometry.vertices.length; i++) {
		var p1 = linegeometry.vertices[i].clone();
		p1.z = -2;
		geometry.vertices.push(p1);
	};	
	for (var i = 0; i < linegeometry.vertices.length; i++) {
		var p2 = i+1;
		if (i > linegeometry.vertices.length-1) p2 = 1;
		geometry.faces.push(new THREE.Face3(0,i,p2));
	};
	geometry.computeFaceNormals();
	geometry.verticesNeedUpdate = true;
	return geometry;
}
function buildmeshgeometryfromarray(array) {
	var geometry = new THREE.Geometry();
	var vertices = array[0];
	var faces = array[1];
	for (var i = 0; i < vertices.length; i++) {
		geometry.vertices.push(vertices[i].clone());
	};
	for (var i = 0; i < faces.length; i++) {
		geometry.faces.push(new THREE.Face3(faces[i][0],faces[i][1],faces[i][2]) );
	};
	geometry.computeFaceNormals();
	geometry.verticesNeedUpdate = true;
	return geometry;	
}

/************************/
/* Tile Pattern Builders */
/************************/

/** knot patterns **/

function build_knot_pattern_array_decadon(outline){
	var linecontainer = [];
	var meshvertices = [];
	var svgshapes = [];
	var meshfaces = [];
	var middlepoints_l = getLinePercentages(outline,knot_tex_shift_left);
	var middlepoints_r = getLinePercentages(outline,knot_tex_shift_right);	
	var perpendiculars = getLinePerpendiculars(outline);
	var lls_in = [];
	var lls_out = [];
	var rls_in = [];
	var rls_out = [];
	for (var i = 0; i < middlepoints_l.length; i+=1) {
		var i1 = (i) %middlepoints_l.length;
		var i2 = (i+2) %middlepoints_l.length;
		var in_p1 = middlepoints_r[i1];
		var in_p2 = middlepoints_l[i2];
		var ii = get54intersection (in_p1, perpendiculars[i1], middlepoints_l[i1], perpendiculars[i1] ); 
		var in_is = get54intersection (in_p1, perpendiculars[i1], in_p2, perpendiculars[i2] );
		rls_in.push([ii,in_is]);						// right line inside
		lls_in.push([in_is,in_p2]); 					// left line inside
		var out_p1 = middlepoints_l[i1];
		var out_p2 = middlepoints_r[i2];
		var out_is = get54intersection (out_p1, perpendiculars[i1], out_p2, perpendiculars[i2] );
		rls_out.push([out_p1,out_is]);					// right line outside
		lls_out.push([out_is,out_p2]);					// left line outside
	};
	var l = lls_in.length;
	for (var i = 0; i < lls_in.length; i++) {
		var i2 = (i+1)%l;
		var in_i1 = checkLineIntersectionFromArray( lls_in[i], rls_out[i2] );
		var in_i2 = checkLineIntersectionFromArray( lls_in[i], rls_in[i2] );
		var out_i1 = checkLineIntersectionFromArray( lls_out[i], rls_out[i2] );
		var out_i2 = checkLineIntersectionFromArray( lls_out[i], rls_in[i2] );
		linecontainer.push([ rls_out[i][0], lls_out[i][0], out_i2] );
		linecontainer.push([ rls_in[i][0], lls_in[i][0], in_i2] );
		linecontainer.push([ lls_out[i][1], out_i1] );
		linecontainer.push([ lls_in[i][1], in_i1] );
		var f = meshvertices.length;
		meshvertices.push(rls_out[i][0], lls_out[i][0], out_i2,rls_in[i][0], lls_in[i][0], in_i2, lls_out[i][1], out_i1,lls_in[i][1], in_i1);
		meshfaces.push([f,f+1,f+3]);
		meshfaces.push([f+3,f+1,f+4]);
		meshfaces.push([f+1,f+2,f+4]);
		meshfaces.push([f+4,f+2,f+5]);
		meshfaces.push([f+6,f+7,f+8]);
		meshfaces.push([f+8,f+7,f+9]);
		svgshapes.push([rls_out[i][0], lls_out[i][0], out_i2, in_i2, lls_in[i][0],rls_in[i][0]]);
		svgshapes.push([lls_out[i][1], out_i1, in_i1, lls_in[i][1]]);
	};
	return [linecontainer,[meshvertices,meshfaces],svgshapes];
}
function build_knot_pattern_array_pentagon(outline){
	var linecontainer = [];
	var meshvertices = [];
	var meshfaces = [];
	var svgshapes = [];
	var middlepoints_l = getLinePercentages(outline,knot_tex_shift_left);
	var middlepoints_r = getLinePercentages(outline,knot_tex_shift_right);	
	var perpendiculars = getLinePerpendiculars(outline);
	for (var i = 0; i < middlepoints_l.length; i+=1) {
		var i1 = (i) %middlepoints_l.length;
		var i2 = (i+1) %middlepoints_l.length;
		var in_p1 = middlepoints_r[i1];
		var in_p2 = middlepoints_l[i2];
		var ii = get54intersection (in_p1, perpendiculars[i1], middlepoints_l[i1], perpendiculars[i1] );
		var in_is = get54intersection (in_p1, perpendiculars[i1], in_p2, perpendiculars[i2] );
		var out_p1 = middlepoints_l[i1];
		var out_p2 = middlepoints_r[i2];
		var out_is = get54intersection (out_p1, perpendiculars[i1], out_p2, perpendiculars[i2] );
		linecontainer.push([ii,in_is,in_p2]);
		linecontainer.push([out_p1,out_is,out_p2]);
		var f = meshvertices.length;
		meshvertices.push(ii,in_is,in_p2,out_p1,out_is,out_p2);
		meshfaces.push([f,f+1,f+3]);
		meshfaces.push([f+3,f+1,f+4]);
		meshfaces.push([f+1,f+2,f+4]);
		meshfaces.push([f+4,f+2,f+5]);
		svgshapes.push([ii,in_is,in_p2,out_p2,out_is,out_p1]);
	};
	return [linecontainer,[meshvertices,meshfaces],svgshapes];
}
function build_knot_pattern_array_rhombus(outline){
	var linecontainer = [];
	var meshvertices = [];
	var meshfaces = [];
	var svgshapes = [];
	var middlepoints_l = getLinePercentages(outline,knot_tex_shift_left);
	var middlepoints_r = getLinePercentages(outline,knot_tex_shift_right);	
	var perpendiculars = getLinePerpendiculars(outline);
	var iterations = [1,2,3,4];
	for (var j = 0; j < iterations.length; j+=1) {
		var i = iterations[j];
		var i1 = (i) %middlepoints_l.length;
		var i2 = (i+1) %middlepoints_l.length;
		var in_p1 = middlepoints_r[i1];
		var in_p2 = middlepoints_l[i2];
		var ii = get54intersection (in_p1, perpendiculars[i1], middlepoints_l[i1], perpendiculars[i1] );
		var in_is = get54intersection (in_p1, perpendiculars[i1], in_p2, perpendiculars[i2] ); 
		var out_p1 = middlepoints_l[i1];
		var out_p2 = middlepoints_r[i2];
		var out_is = get54intersection (out_p1, perpendiculars[i1], out_p2, perpendiculars[i2] );
		if (i === 1 || i === 3) {
			var f = meshvertices.length;
			linecontainer.push([ii,in_p2]);
			linecontainer.push([out_p1,out_p2]);
			meshvertices.push(ii,in_p2,out_p1,out_p2);
			meshfaces.push([f,f+1,f+2]);
			meshfaces.push([f+2,f+1,f+3]);
			svgshapes.push([ii,in_p2,out_p2,out_p1]);
		} else {
			var f = meshvertices.length;
			linecontainer.push([out_p1,out_is,out_p2]);
			linecontainer.push([ii,in_is,in_p2]);
			meshvertices.push(out_p1,out_is,out_p2,ii,in_is,in_p2);
			meshfaces.push([f,f+1,f+3]);	
			meshfaces.push([f+3,f+1,f+4]);
			meshfaces.push([f+1,f+2,f+4]);
			meshfaces.push([f+4,f+2,f+5]);
			svgshapes.push([out_p1,out_is,out_p2,in_p2,in_is,ii]);
		}
	};
	return [linecontainer,[meshvertices,meshfaces],svgshapes];
}
function build_knot_pattern_array_elongated_hexagon(outline){
	var linecontainer = [];
	var meshvertices = [];
	var meshfaces = [];
	var svgshapes = [];
	var middlepoints_l = getLinePercentages(outline,knot_tex_shift_left);
	var middlepoints_r = getLinePercentages(outline,knot_tex_shift_right);	
	var perpendiculars = getLinePerpendiculars(outline);
	for (var i = 0; i < middlepoints_r.length; i+=1) {
		var i1 = (i) %middlepoints_l.length;
		var i2 = (i+1) %middlepoints_l.length;
		var in_p1 = middlepoints_r[i1];
		var in_p2 = middlepoints_l[i2];
		var ii = get54intersection (in_p1, perpendiculars[i1], middlepoints_l[i1], perpendiculars[i1] ); 
		var in_is = get54intersection (in_p1, perpendiculars[i1], in_p2, perpendiculars[i2] ); var out_p1 = middlepoints_l[i1];
		var out_p2 = middlepoints_r[i2];
		var out_is = get54intersection (out_p1, perpendiculars[i1], out_p2, perpendiculars[i2] ); if (i !== 2 && i !== 5) {
			var f = meshvertices.length;
			linecontainer.push([ii,in_is,in_p2]);
			linecontainer.push([out_p1,out_is,out_p2]);
			meshvertices.push(ii,in_is,in_p2,out_p1,out_is,out_p2);
			meshfaces.push([f,f+1,f+3]);	
			meshfaces.push([f+3,f+1,f+4]);
			meshfaces.push([f+1,f+2,f+4]);
			meshfaces.push([f+4,f+2,f+5]);
			svgshapes.push([ii,in_is,in_p2,out_p2,out_is,out_p1]);
		} else {	
			var f = meshvertices.length;
			linecontainer.push([ii,in_p2]);
			linecontainer.push([out_p1,out_p2]);
			meshvertices.push(ii,in_p2,out_p1,out_p2);
			meshfaces.push([f,f+1,f+2]);
			meshfaces.push([f+2,f+1,f+3]);
			svgshapes.push([ii,in_p2,out_p2,out_p1]);
		}
	};
	return [linecontainer,[meshvertices,meshfaces],svgshapes];
}
function build_knot_pattern_array_bow_tie(outline){
	var linecontainer = [];
	var meshvertices = [];
	var meshfaces = [];
	var svgshapes = [];
	var middlepoints_l = getLinePercentages(outline,knot_tex_shift_left);
	var middlepoints_r = getLinePercentages(outline,knot_tex_shift_right);	
	var perpendiculars = getLinePerpendiculars(outline);
	var groups = [[1,2,3],[4,5,6]];
	for (var i = 0; i < middlepoints_r.length; i+=1) {
		var i1 = (i) %middlepoints_l.length;
		var i2 = (i+1) %middlepoints_l.length;
		if (i == 1 || i == 4)
			i2 = (i+4) %middlepoints_l.length;
		var in_p1 = middlepoints_r[i1];
		var in_p2 = middlepoints_l[i2];
		var ii = get54intersection (in_p1, perpendiculars[i1], middlepoints_l[i1], perpendiculars[i1] );
		var in_is = get54intersection (in_p1, perpendiculars[i1], in_p2, perpendiculars[i2] );
		var out_p1 = middlepoints_l[i1];
		var out_p2 = middlepoints_r[i2];
		var out_is = get54intersection (out_p1, perpendiculars[i1], out_p2, perpendiculars[i2] );
		if (i !== 1 && i !== 4) {
			var f = meshvertices.length;
			linecontainer.push([ii,in_p2]);
			linecontainer.push([out_p1,out_p2]);
			meshvertices.push(ii,in_p2,out_p1,out_p2);
			meshfaces.push([f,f+1,f+2]);
			meshfaces.push([f+2,f+1,f+3]);
			svgshapes.push([ii,in_p2,out_p2,out_p1]);
		} else {	
			var f = meshvertices.length;
			linecontainer.push([ii,in_is,in_p2]);
			linecontainer.push([out_p1,out_is,out_p2]);
			meshvertices.push(ii,in_is,in_p2,out_p1,out_is,out_p2);
			meshfaces.push([f,f+1,f+3]);	
			meshfaces.push([f+3,f+1,f+4]);
			meshfaces.push([f+1,f+2,f+4]);
			meshfaces.push([f+4,f+2,f+5]);
			svgshapes.push([ii,in_is,in_p2,out_p2,out_is,out_p1]);
		}
	};
	return [linecontainer,[meshvertices,meshfaces],svgshapes];
}

/** single line patterns **/

function build_inner_line_patterns_decadon(outline){
	var linecontainer = [];
	var meshcontainer = [];
	var svgshape1 = [];
	var svgshapes2 = [];
	var middlepoints = getLineMiddles(outline);
	var perpendiculars = getLinePerpendiculars(outline);
	var intersections = getLineIntersections(middlepoints, perpendiculars, 2);
	var line1 = [];
	var line2 = [];
	for (var i = 0; i < intersections.length-8; i+=2) {
		var l1i1 = (i+1) %middlepoints.length;
		var l1i2 = (i) %intersections.length;
		var l2i1 = (i+2) %middlepoints.length;
		var l2i2 = (i+1) %intersections.length;
		line1.push(middlepoints[l1i1]);
		line1.push(intersections[l1i2]);
		line2.push(middlepoints[l2i1]);
		line2.push(intersections[l2i2]);
	};
	var lineintersections = [];
	var l = 10;
	for (var i = 0; i < 10; i++) {
		mi1 = (i+2)%l;
		mi2 = (i+3)%l;
		ii1 = (i)%l;
		ii2 = (i+1)%l;
		r = checkLineIntersection(
			middlepoints[mi1].clone(),
			intersections[ii2].clone(),
			middlepoints[mi2].clone(),
			intersections[ii1].clone());
		lineintersections.push(new THREE.Vector3(r.x,r.y,0));
	};
	var mesh1vertices = [];
	var mesh1faces = [];
	var mesh2vertices = [];
	var mesh2faces = [];
	mesh1vertices.push(new THREE.Vector3(0,0,0));
	for (var i = 0; i < 10; i++) {
		var i1 = (i)%l;
		var i2 = (i+1)%l;
		var i3 = (i+2)%l;
		var f = mesh1vertices.length;
		mesh1vertices.push(intersections[i1].clone(),lineintersections[i1].clone(),intersections[i2].clone());
		mesh1faces.push([0,f,f+1]);
		mesh1faces.push([0,f+1,f+2]);
		svgshape1.push(intersections[i1].clone(),lineintersections[i1].clone(),intersections[i2].clone());

		var mi 	= (i+3)%l;
		var li1 = (i)%l;
		var li2 = (i+1)%l;
		var ii = (i+1)%l;
		var f2 = mesh2vertices.length;
		mesh2vertices.push(middlepoints[mi].clone(), lineintersections[li1].clone(), intersections[ii].clone(), lineintersections[li2].clone()); mesh2faces.push([f2,f2+1,f2+2]);
		mesh2faces.push([f2,f2+2,f2+3]);
		svgshapes2.push([middlepoints[mi].clone(), lineintersections[li1].clone(), intersections[ii].clone(), lineintersections[li2].clone()]); };
	linecontainer.push(line1);
	linecontainer.push(line2);
	meshcontainer.push([mesh1vertices,mesh1faces]);
	meshcontainer.push([mesh2vertices,mesh2faces]);
	return [linecontainer,meshcontainer,[[svgshape1],svgshapes2]];
}
function build_inner_line_patterns_elongated_hexagon(outline){
	var linecontainer = [];
	var meshcontainer = [];
	var meshvertices = [];
	var meshfaces = [];
	var svgshapes = [[]];
	var middlepoints = getLineMiddles(outline);
	var perpendiculars = getLinePerpendiculars(outline);
	var intersections = getLineIntersections(middlepoints, perpendiculars, 1);
	linecontainer = [[middlepoints[0], intersections[5], middlepoints[1], intersections[0], middlepoints[2], middlepoints[3], intersections[2], middlepoints[4], intersections[3], middlepoints[5], middlepoints[6]]];

	for (var i = 0; i < linecontainer[0].length; i++) {
		meshvertices.push( linecontainer[0][i].clone() );
		svgshapes[0].push(linecontainer[0][i].clone());
	};
	meshfaces.push([0,1,9]);
	meshfaces.push([9,8,1]);
	meshfaces.push([8,7,6]);
	meshfaces.push([8,6,3]);
	meshfaces.push([8,3,1]);
	meshfaces.push([1,3,2]);
	meshfaces.push([6,4,3]);
	meshfaces.push([6,5,4]);
	meshcontainer.push([meshvertices,meshfaces]);
	return [linecontainer,meshcontainer,[svgshapes]];
}
function build_inner_line_patterns_bow_tie(outline){
	var linecontainer = [];
	var meshcontainer = [];
	var meshvertices = [];
	var meshfaces = [];
	var svgshapes = [[],[]];
	var middlepoints = getLineMiddles(outline);
	var perpendiculars = getLinePerpendiculars(outline);
	var i1 = 4;
	var i2 = 2;
	var m1 = middlepoints[i1].clone();
	var m2 = middlepoints[i2].clone();
	var p1 = perpendiculars[i1].clone();
	var p2 = perpendiculars[i2].clone();
	rotatevector(p2, 90-54);
	rotatevector(p1,-90+54);
	p1.add(middlepoints[i1]);
	p2.add(middlepoints[i2]);
	var intersection = checkLineIntersection(m1,p1,m2,p2)
	var ip1 = new THREE.Vector3(intersection.x,intersection.y,0);
	var line1 = [];
	line1.push(middlepoints[3]);
	line1.push(middlepoints[2]);
	line1.push(ip1);
	line1.push(middlepoints[4]);
	line1.push(middlepoints[3]);
	i1 = 1;
	i2 = 5;
	m1 = middlepoints[i1].clone();
	m2 = middlepoints[i2].clone();
	p1 = perpendiculars[i1].clone();
	p2 = perpendiculars[i2].clone();
	rotatevector(p2, 90-54);
	rotatevector(p1,-90+54);
	p1.add(middlepoints[i1]);
	p2.add(middlepoints[i2]);
	intersection = checkLineIntersection(m1,p1,m2,p2)
	ip1 = new THREE.Vector3(intersection.x,intersection.y,0);
	var line2 = [];
	line2.push(middlepoints[0]);
	line2.push(middlepoints[1]);
	line2.push(ip1);
	line2.push(middlepoints[5]);	
	line2.push(middlepoints[0]);
	linecontainer = [line1,line2];
	for (var i = 0; i < 4; i++) {
		meshvertices.push( line1[i].clone() );
		svgshapes[0].push( line1[i].clone() );
	};
	meshfaces.push([0,1,2]);
	meshfaces.push([0,2,3]);
	for (var i = 0; i < 4; i++) {
		meshvertices.push( line2[i].clone() );
		svgshapes[1].push( line2[i].clone() );
	};
	meshfaces.push([4,5,6]);
	meshfaces.push([4,6,7]);
	meshcontainer.push([meshvertices,meshfaces]);
	return [linecontainer,meshcontainer,[svgshapes]];
}
function build_inner_line_patterns_rhombus(outline){
	var linecontainer = [];
	var meshcontainer = [];
	var meshvertices = [];
	var meshfaces = [];
	var svgshapes = [[]];
	var middlepoints = getLineMiddles(outline);
	var perpendiculars = getLinePerpendiculars(outline);
	var intersections = getLineIntersections(middlepoints, perpendiculars, 1);
	linecontainer =  [[middlepoints[0], intersections[3], middlepoints[1], middlepoints[2], intersections[5], middlepoints[3], middlepoints[4]]];
	for (var i = 0; i < 6; i++) {
		meshvertices.push( linecontainer[0][i].clone() );
		svgshapes[0].push( linecontainer[0][i].clone() );
	};
	meshfaces.push([5,1,0]);
	meshfaces.push([5,4,1]);
	meshfaces.push([4,2,1]);
	meshfaces.push([4,3,2]);
	meshcontainer.push([meshvertices,meshfaces]);
	return [linecontainer,meshcontainer,[svgshapes]];
}
function build_inner_line_patterns_pentagon(outline){
	var linecontainer = [];
	var meshcontainer = [];
	var meshvertices = [];
	var meshfaces = [];
	var svgshapes = [[]];
	var middlepoints = getLineMiddles(outline);
	var perpendiculars = getLinePerpendiculars(outline);
	var intersections = getLineIntersections(middlepoints, perpendiculars, 1);

	meshvertices.push(new THREE.Vector3(0,0,0))
	var line1 = [];
	for (var i = 0; i < intersections.length-3; i+=1) {
		var i1 = (i+1) %middlepoints.length;
		var i2 = (i) %intersections.length;
		line1.push(middlepoints[i1]);
		line1.push(intersections[i2]);
	};
	for (var i = 0; i < 10; i++) {
		meshvertices.push( line1[i].clone() );
		svgshapes[0].push( line1[i].clone() );
	};
	for (var i = 0; i < 10; i++) {
		i1 = (i)%10 +1;
		i2 = (i+1)%10 +1;
		i3 = (i+2)%10 +1;
		meshfaces.push([0,i1,i2]);
		meshfaces.push([0,i2,i3]);
	}

	linecontainer =  [line1];
	meshcontainer.push([meshvertices,meshfaces]);
	return [linecontainer,meshcontainer,[svgshapes]];
}
/****** unused ******/
function build_knot_pattern_array_flat_rhombus(outline){
	return [ [], [[],[]] ];
}
function buildTexture_flat_rhombus_single_line(outline){
	return [];
}
/************************/
/* Tile Geometry Helper */
/************************/

function rotatevector(vector, angle){
	var matrix = new THREE.Matrix4().makeRotationZ(radians(angle));
	vector.applyMatrix4( matrix );
	return vector;
}

function get54intersection (_m1,_p1p,_m2,_p2p){	
	var m1 = _m1.clone();
	var m2 = _m2.clone();
	var p1 = _p1p.clone();
	var p2 = _p2p.clone();
	rotatevector(p1,-90+54);
	rotatevector(p2, 90-54);
	p1.add(m1);
	p2.add(m2);
	var intersection = checkLineIntersection(m1,p1,m2,p2)
	return new THREE.Vector3(intersection.x,intersection.y,0);
}

function getLineIntersections(middlepoints,perpendiculars, add){
	var intersections = [];
	var l = middlepoints.length-1;
	for (var i = 1; i < middlepoints.length-2; i++) {
		var i1 = (i) %l;
		var i2 = (i+add) %l;
		var m1 = middlepoints[i1].clone();
		var m2 = middlepoints[i2].clone();
		var p1 = perpendiculars[i1].clone();
		var p2 = perpendiculars[i2].clone();
		rotatevector(p1,-90+54);
		rotatevector(p2, 90-54);
		p1.add(middlepoints[i1]);
		p2.add(middlepoints[i2]);
		var intersection = checkLineIntersection(m1,p1,m2,p2)
		var newp = new THREE.Vector3(intersection.x,intersection.y,0);
		intersections.push(newp);
	};
	return intersections;
}
function getLineMiddles(outlinegeometry) {
	var vertices = [];
	var vs = outlinegeometry.vertices;
	var l = vs.length-1;
	for (var i = 0; i < vs.length*2; i++) {
		var p1 = vs[(i) %l];
		var p2 = vs[(i+1) %l];
		np = getMiddle(p1,p2);
		vertices.push(np);
	};
	return vertices;
}
function getLinePercentages(outlinegeometry, percentage) {
	var vertices = [];
	var vs = outlinegeometry.vertices;
	var l = vs.length-1;
	for (var i = 0; i < l; i++) {
		var p1 = vs[(i) %l];
		var p2 = vs[(i+1) %l];
		np = getPointOnLine(p1,p2,percentage);
		vertices.push(np);
	};
	return vertices;
}
function getLinePerpendiculars(outlinegeometry) {
	var vertices = [];
	var vs = outlinegeometry.vertices;
	var l = vs.length-1;
	for (var i = 0; i < vs.length*2; i++) {
		var p1 = vs[(i) %l];
		var p2 = vs[(i+1) %l];
		np = getPerpendicular(p1,p2);
		vertices.push(np);
	};
	return vertices;
}

function getcenter(geometry) {
	var ax = 0, ay = 0;
	for (var i = 0; i < geometry.vertices.length; i++) {ax-=geometry.vertices[i].x;ay-=geometry.vertices[i].y;};
	return new THREE.Vector3(ax/= geometry.vertices.length,ay/= geometry.vertices.length,0);
}
function getMiddle(p1,p2){
	return new THREE.Vector3((p1.x+p2.x)/2,(p1.y+p2.y)/2,0);
}
function getPointOnLine(p1,p2,percentage){
	return new THREE.Vector3(p1.x*percentage + p2.x*(1-percentage),p1.y*percentage + p2.y*(1-percentage));
}
function getPerpendicular(p1,p2){
	np = new THREE.Vector3(p2.x-p1.x,p2.y-p1.y,0);
	return new THREE.Vector3(-np.y,np.x,0);
}

function checkLineIntersectionFromArray(a1,a2) {
	var i = checkLineIntersection(a1[0],a1[1],a2[0],a2[1]); 
	return new THREE.Vector3(i.x,i.y,0);

}
function checkLineIntersection(l1p1,l1p2,l2p1,l2p2) {
	var line1StartX = l1p1.x, line1StartY = l1p1.y, 
		line1EndX = l1p2.x, line1EndY = l1p2.y, 
		line2StartX = l2p1.x, line2StartY = l2p1.y, 
		line2EndX = l2p2.x, line2EndY = l2p2.y;
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    return result;
};

function radians(angle){
	return (angle) * (Math.PI / 180);
}
function degrees(radians){
	return radians * (180/Math.PI);
}

function pfppa(p1, p2, angle) { // construct new point following two points in an angle
	p3 = new THREE.Vector3().subVectors( p2, p1 );
	var matrix = new THREE.Matrix4().makeRotationZ(radians(angle));
	p3.applyMatrix4( matrix );
	p3.add(p2);
	return p3;
}
function getObjectsCloseToMouse() {
	var list = []
	var vd = sidelength*4;
	for (var j = 0; j < objectlist.length; j++) {
		var o = objectlist[j];
		if (o.position.x < mouseobject.position.x +vd &&
			o.position.x > mouseobject.position.x -vd &&
			o.position.y < mouseobject.position.y +vd &&
			o.position.y > mouseobject.position.y -vd ) {	
			list.push(objectlist[j]);
		};
	};
	return list;
}

function getIntersectingObjects(){
	var vector = new THREE.Vector3(
	    ( mouseaX / window.innerWidth ) * 2 - 1,
	    - ( mouseaY / window.innerHeight ) * 2 + 1,
	    0.5 );
	var ray = projector.pickingRay( vector, camera );
	var intersects = ray.intersectObjects( objectlist, true);
	return intersects;
}



function getMouseTile() {
	var t = getIntersectingObjects();
	if (t.length>0) {
		t = t[0].object;
		while (t.parent !== scene) {
			t = t.parent;
		}
		return t;
	} else {
		return null;
	}
}

function getcollisionvectors() {
	mouseobject.updateMatrixWorld();
	var meshvertices = mouseobject.children[0].geometry.vertices;
	var cvs = [];
	cvs.push(new THREE.Vector3(0,0,0));
	if (mouseobject.patterntype == 1){
		for (var i = 0; i < meshvertices.length; i++) {
			var v1 = meshvertices[i].clone();
			var v2 = meshvertices[(i+1)%meshvertices.length].clone();
			var v = new THREE.Vector3((v1.x+v2.x)/2,(v1.y+v2.y)/2,0);
			v.setLength( v.length()-5);
			cvs.push(v);
		};	
	}
	for (var i = 0; i < meshvertices.length; i++) {
		var v = meshvertices[i].clone();
		v.setLength( v.length()-5);
		cvs.push(v);
		if (mouseobject.patterntype == 1){
			cvs.push(v.clone(v.length/2));
		}
	};
	for (var i = 0; i < cvs.length; i++) {
		cvs[i].applyMatrix4(mouseobject.matrixWorld);
	};
	return cvs;
}


function getIntersectingTiles(list) {
	var ios = [];
	var obj = mouseobject.children[0];
	var vertices = getcollisionvectors();
	for (var j = 0; j < vertices.length; j++) {
		var v = vertices[j].clone();
		var vector = new THREE.Vector3(v.x,v.y,1);
		var direction = new THREE.Vector3(0,0,-1);
		var ray = new THREE.Raycaster( vector, direction );
		for (var i = 0; i < list.length; i++) {
			var intersects = ray.intersectObject(list[i].children[1], true);
			if (intersects.length > 0) {
				ios.push(list[i]);	
				yes = true;
			}
		};
	};
	return ios;
}

function checkVertexSnap(list) {
	var vd = sidelength*4;
	snap = false;
	snappoints = 0;
	var snapds = [];
	var snapis = [];
	var prevsnap = sidelength;
	for (var i = mouseobject.children[0].geometry.vertices.length - 2; i >= 0; i--) {
		var v = mouseobject.children[0].geometry.vertices[i].clone();
		v.applyMatrix4( mouseobject.matrixWorld );
		for (var j = 0; j < list.length; j++) {	
			for (var k = list[j].children[0].geometry.vertices.length - 2; k >= 0; k--) {
				var cv = list[j].children[0].geometry.vertices[k].clone();
				cv.applyMatrix4( list[j].children[0].matrixWorld );
				var d = cv.distanceTo(v);
				if (d < (sidelength)) {
					snap = true;
					snapds.push(d);
					snapis.push(i);
					if (d < prevsnap) {
						prevsnap = d;
						snapoffx = cv.x-v.x;
						snapoffy = cv.y-v.y;
					}
				}
			}
		};
	};
	var minsnapd = 1000;
	for (var i = snapds.length - 1; i >= 0; i--) {
		if (snapds[i] < minsnapd) {
			minsnapd = snapds[i];
		}
	};
	var usedsnapis = [];
	for (var i = snapds.length - 1; i >= 0; i--) {
		var used = false;
		for (var j = usedsnapis.length -1; j >= 0 ; j--) {
			if (usedsnapis[j] === snapis[i]) {
				used = true;
				break;
			} 
		};
		if (!used && snapds[i] < minsnapd+1) {
			usedsnapis.push(snapis[i]);
			snappoints++;
		}
	};
}

function computeDocumentBorders() {
	canvas_top = 0;
	canvas_right = 0;
	canvas_left = 0;
	canvas_bottom = 0;
	for (var i = 0; i < objectlist.length; i++) {
		var tile = objectlist[i];
		if (canvas_right < tile.position.x) canvas_right = tile.position.x;
		if (canvas_left > tile.position.x) canvas_left = tile.position.x;
		if (canvas_top > tile.position.y) canvas_top = tile.position.y;
		if (canvas_bottom < tile.position.y) canvas_bottom = tile.position.y;
	};
}
function centerImage() {
	var boxWidth = canvas_right-canvas_left +svgmargin*2;
	var boxHeight = canvas_bottom-canvas_top +svgmargin*2;
	var cx = (canvas_left+canvas_right)/2;
	var cy = (canvas_top+canvas_bottom)/2;
	camerapos.x = cx;
	camerapos.y = cy;
	camerascale = height/boxHeight;
}

/****************/
/* Start		*/
/****************/


renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( BACKGROUNDCOLOR );
document.body.appendChild(renderer.domElement);
newMouseObject();
setDelta();
render();

$('.loading').hide();
// toggletilingwindow();
$('.mode').show();


/****************/
/* Loop			*/
/****************/

function setDelta() {
    now = Date.now();
    delta = (now - then) / 100;
    then = now;
};

function render() {
	setDelta();	
	if (!(mode === 'svg')) {
		var tsx = touchscroll.x;
		var tsy = touchscroll.y;
		// camera movement
		if (keymap.left) cameraacc.x -= (cameraspeed*0.5/camerascale)*delta; 
		else if (keymap.right) cameraacc.x += (cameraspeed*0.5/camerascale)*delta; 
		else cameraacc.x = 0;
		if (keymap.up) cameraacc.y += (cameraspeed*0.2/camerascale)*delta; 
		else if (keymap.down) cameraacc.y -= (cameraspeed*0.2/camerascale)*delta;
		else cameraacc.y = 0;
		if (cameraacc.x > cameraspeed/camerascale) cameraacc.x = cameraspeed/camerascale;
		if (cameraacc.x < -cameraspeed/camerascale) cameraacc.x = -cameraspeed/camerascale;
		if (cameraacc.y > cameraspeed/camerascale) cameraacc.y = cameraspeed/camerascale;
		if (cameraacc.y < -cameraspeed/camerascale) cameraacc.y = -cameraspeed/camerascale;
		camerapos.add(cameraacc);
		camerapos.add(touchscroll);
		// // limit camera pos to margin around object
		var cmx = canvas_margin_x / camerascale;  
		var cmy = canvas_margin_y / camerascale;  
		if (camerapos.x > canvas_right+cmx) 
			camerapos.x = canvas_right+cmx;
		if (camerapos.x < canvas_left-cmx) 
			camerapos.x = canvas_left-cmx;
		if (camerapos.y > canvas_bottom+cmy) 
			camerapos.y = canvas_bottom+cmy;
		if (camerapos.y < canvas_top-cmy) 
			camerapos.y = canvas_top-cmy;


		touchscroll.x = 0;
		touchscroll.y = 0;

		// camera zoom
		if (zoomin) {
			camerascale += (zoomspeed/2)*delta;
		} else if (zoomout) {
			camerascale -= (zoomspeed/2)*delta;
		} else {
			zoomin = zoomout = false;
		}
		if (keymap.plus || keymap.num_plus)
			camerascale += zoomspeed*delta;
		else if (keymap.minus || keymap.num_minus)
			camerascale -= zoomspeed*delta;
		if (camerascale > maxzoom) camerascale = maxzoom;  
		if (camerascale < minzoom) camerascale = minzoom;

		camera.left = width / - 2 / camerascale;
		camera.right = width / 2 / camerascale;
		camera.top = height / 2 / camerascale;
		camera.bottom = height / -2 / camerascale;
		

		camera.position.x = camerapos.x;
		camera.position.y = camerapos.y;

		camera.updateProjectionMatrix();
	
	
	}

	// cursor object
	if (cursortile != undefined) {	
		// tileDefault(cursortile)
		setdisplaystyle(cursortile);
		cursortile.position.z = -10;
		cursortile = null;
	}

	
	if (!mouseonmenu && mode === 'tiling'){	// mouse on canvas // tools
		var closetomouse = getObjectsCloseToMouse();
		if (!erase && !hand) {
			mouseobject.visible = true;	
			mouseobject.position.x = mouseX/camerascale + camerapos.x;
			mouseobject.position.y = -mouseY/camerascale + camerapos.y;
			mouseobject.updateMatrixWorld();
			checkVertexSnap(closetomouse);
			if (snap) {
				placeposX = mouseX/camerascale + camerapos.x + snapoffx;
				placeposY = -mouseY/camerascale + camerapos.y + snapoffy;
				mouseobject.position.x = placeposX;
				mouseobject.position.y = placeposY;
				mouseobject.updateMatrixWorld();
			}
			overlap = (getIntersectingTiles(closetomouse).length > 0);
			if ((snap && !overlap && (disallowcornerinput && snappoints > 1 || !disallowcornerinput && snappoints > 0  ))|| objectlist.length === 0) {
				tileDefault(mouseobject);			
			} else {
				markTileRed(mouseobject);			
			}
			hidecursor();
		} else if (erase) {
			showcursor();
			$('.cursor').css('left',mouseaX-18);
			$('.cursor').css('top',mouseaY-40);

			mouseobject.visible = false;
			cursortile = getMouseTile(closetomouse);
			if (cursortile != null) {
				markTileRed(cursortile);
				cursortile.position.z = 0;
			}
			if (mousedown) mouseErase();
			
		} else if (hand) {
			hidecursor();
			mouseobject.visible = false;
			if (mousedown) {
				$('canvas').css('cursor','grabbing');
				camerapos.x = handdowncamerapos.x + (handdown.x - mouseaX)/camerascale;
				camerapos.y = handdowncamerapos.y + (mouseaY - handdown.y)/camerascale;
			} else {
				$('canvas').css('cursor','grab');
			}
		}
	} else {	// mouse not on canvas
		mouseobject.visible = false;
		hidecursor()
	}

	requestAnimationFrame(render);
	if (! (mode === 'svg')){
		renderer.render(scene, camera);
	}
};


/****************/
/* UI 			*/
/****************/

$('.tabgroup *').removeClass('selected');
$('.tabgroup .tabs>*:first-child').addClass('selected');
$('.tabgroup .tabframes>*').hide();
$('.tabgroup .tabframes>*:first-child').show();
$('.tabgroup .tabs>*').mousedown( function(e) { showtab(e) } );
function showtab(event){
	var parentgroup = $(event.target).closest('.tabgroup');
	$(parentgroup).find('.tabs>*').removeClass('selected');
	var tabclass = event.target.className;
	$(event.target).addClass('selected');

	$(parentgroup).find('.tabframes>*').hide();
	$(parentgroup).find('.tabframes>.'+tabclass+'frame').show();
}
function placeMouseObject() {
	if (objectlist.length === 0 || (disallowcornerinput && snappoints > 1 || !disallowcornerinput && snappoints > 0  ) && !overlap) {	
		var newtile = mouseobject;
		if (objectlist.length === 0) {
			newtile.position.x = 0;
			newtile.position.y = 0;
			camerapos.x -= ( mouseX/camerascale + camerapos.x);
			camerapos.y -= ( -mouseY/camerascale + camerapos.y);
		} else if (snap) {
			// var closetomouse = getObjectsCloseToMouse();
			// checkVertexSnap(closetomouse);

			newtile.position.x = placeposX;
			newtile.position.y = placeposY;
		}

		if (canvas_right < newtile.position.x) canvas_right = newtile.position.x;
		if (canvas_left > newtile.position.x) canvas_left = newtile.position.x;

		if (canvas_top > newtile.position.y) canvas_top = newtile.position.y;
		if (canvas_bottom < newtile.position.y) canvas_bottom = newtile.position.y;

		newtile.children[0].material = BORDERMATERIAL;
		newtile.position.z = -10;
		setshadowoffset(newtile);
		newtile.colorsNeedUpdate = true;
		objectlist.push(newtile);
		newMouseObject();
		newtile.updateMatrixWorld();
		setdisplaystyle(newtile);
	}
}
function markTileRed(tile) {
	tile.children[0].material = ERRORLINES2;
	tile.children[0].visible = true;
	tile.children[1].material = ERRORMATERIAL;
	for (var i = 0; i < tile.children[2].children.length; i++) {
		tile.children[2].children[i].material = ERRORLINES;
	};
	tile.colorsNeedUpdate = true;
}
function tileDefault(tile) {
	tile.children[0].material = SNAPMOUSEMATERIAL;
	if (displaystyle === 2 || mode === 'tiling') {
		tile.children[1].material = tile.colormaterial;
	} else {
		tile.children[1].material = FILLMATERIAL;
	}
	for (var i = 0; i < tile.children[2].children.length; i++) {
		tile.children[2].children[i].material = TEXTURELINEMATERIAL;
	};
	tile.colorsNeedUpdate = true;
}
function closeallwindows() {
	if (mode === 'tiling') {
		mode = 0;
		setColorPreset(prevpreset);
	}
	mode = 0;
	$('.mode *').removeClass('selected');
	if ( $(".svg").is(':visible') )
		hidesvgwindow();
	$('.window').hide();
}
function showcursor() {
	$('.cursor').show();
}
function hidecursor() {
	$('.cursor').hide();
}
function movecamera( deltaX, deltaY, deltaFactor) {
	if (!(mode ==='svg')) {
		touchscroll.x += (deltaX * (deltaFactor) / camerascale) ;
		touchscroll.y += (deltaY * (deltaFactor) / camerascale) ;		
	}
}
function wheelrotate( deltaX, deltaY, deltaFactor) {
	// touchscroll.x += deltaX * (deltaFactor) / camerascale;
	var mr = mouserotation;
	mousetouchrotation += deltaY * (deltaFactor) / 20;
	mousetouchrotation += deltaX * (deltaFactor) / 20;
	mouserotation = radians(mousetouchrotation - (mousetouchrotation%36) );
		console.log( mouserotation);
		console.log( mousetouchrotation);
	if (mr != mouserotation) {	
		mouseobject.rotation.z = mouserotation;
		updateSVGIconRotation();
	}
}
$( window ).resize(function() {
	resize();
});
function resize() {
  	width = window.innerWidth;
	height = window.innerHeight;
	canvas_margin_x = width/2;
	canvas_margin_y = height/2;
	camera.left = width / - 2;
	camera.right = width / 2;
	camera.top = height / 2;
	camera.bottom = height / -2;
	renderer.setSize(window.innerWidth, window.innerHeight);
	fullscreenchange();
}
$("body").mousemove(function(e) {
    mouseX = e.pageX - width/2;
    mouseY = e.pageY - height/2;
    mouseaX = e.clientX;
    mouseaY = e.clientY;
});

$("canvas").mousedown(function(e) {
	mousedown = true;
	if (!erase && !hand && !mouseonmenu) {
		placeMouseObject();
	}
	if (hand) {
		handdown.x = mouseaX;
		handdown.y = mouseaY;
		handdowncamerapos = camerapos.clone();
	}
});
$("canvas").mouseup(function(e) {
	mousedown = false;
});
$("canvas").mouseleave(function(e) {
	mousedown = false;
});
$("canvas").mouseenter(function(e) {
	mousedown = false;
	mouseonmenu = false;
});
$("canvas").mouseleave(function(e) {
	mouseonmenu = true;
});
function mouseErase(){
	cursortile = getMouseTile();
	scene.remove(cursortile);
	var index = objectlist.indexOf(cursortile);
	if (index > -1) {
    	objectlist.splice(index, 1);
	}
}
function updatedisplaystyle() {
	if (shadowdisplay && complextexturedisplay) {
		COMPLEXTEXTURESHADOWMATERIAL.opacity = shadow_alpha;	
	}
	setdisplaystyle(mouseobject);
	for (var i = 0; i < objectlist.length; i++) {
		setdisplaystyle(objectlist[i]);
	};
	renderer.setClearColor( BACKGROUNDCOLOR );
}
function updateshadowdisplay() {
	for (var i = 0; i < objectlist.length; i++) {
		setshadowoffset(objectlist[i]);
	};
}
function setdisplaystyle(tile) {	
	if (displaystyle === 0) {
		tile.children[1].visible = false;
	} else if (displaystyle === 1) {
		tile.children[1].visible = true;
		tile.children[1].material = FILLMATERIAL;
	} else if (displaystyle === 2) {
		tile.children[1].visible = true;
		tile.children[1].material = tile.colormaterial;
	}
	if (tile !== mouseobject) {
		tile.children[0].material = BORDERMATERIAL;
		tile.children[0].visible = outlinedisplay;
	} else {
		tile.children[0].visible = true;
	}
	for (var i = 0; i < tile.children[2].children.length; i++) {
		tile.children[2].children[i].material = TEXTURELINEMATERIAL;
	};
	tile.children[2].visible = texturedisplay;
	tile.children[3].visible = complextexturedisplay;
	tile.children[4].visible = complextexturedisplay;
	tile.children[5].visible = (shadowdisplay && complextexturedisplay);		
	tile.children[6].visible = innerpolydisplay;		
	tile.colorsNeedUpdate = true;
}
function newTile(json) {
	var newtile = buildTile(json.t-1);
	setdisplaystyle(newtile);
	newtile.children[0].material = BORDERMATERIAL;
	newtile.position.x = json.x;
	newtile.position.y = json.y;
	newtile.position.z = -10;
	newtile.rotation.z = json.r;
	// newtile.rots = json.r;
	setshadowoffset(newtile, json.r);
	newtile.patterntype = json.t;
	newtile.colorsNeedUpdate = true;
	if (canvas_right < newtile.position.x) canvas_right = newtile.position.x;
	if (canvas_left > newtile.position.x) canvas_left = newtile.position.x;		
	if (canvas_top > newtile.position.y) canvas_top = newtile.position.y;
	if (canvas_bottom < newtile.position.y) canvas_bottom = newtile.position.y;
	newtile.updateMatrixWorld();
	objectlist.push(newtile);
	scene.add(newtile);
}
function setshadowoffset(tile) {
	var t = tile.children[5];
	var r = tile.rotation.z;
	var v = new THREE.Vector3(shadow_length*shadow_input_length,0,0);
	rotatevector(v,-degrees(r) - shadow_angle -90);
	t.position.x = v.x;
	t.position.y = v.y;
}

function newMouseObject() {
	mouseobject = buildTile(currenttype-1);
	setdisplaystyle(mouseobject);
	mouseobject.position.x = mouseX;
	mouseobject.position.y = -mouseY;
	mouseobject.rotation.z = mouserotation;
	mouseobject.patterntype = currenttype;
	scene.add(mouseobject);
}
function rotatemouseleft(){
	mouserotation+=radians(36);
	mouseobject.rotation.z = mouserotation;
	updateSVGIconRotation();
}
function rotatemouseright(){
	mouserotation-=radians(36);
	mouseobject.rotation.z = mouserotation;
	updateSVGIconRotation();
}
function changeMousePattern(type) {
	
	currenttype = type;
	scene.remove(mouseobject);
	newMouseObject();
}
function removelast() {
	scene.remove(objectlist.pop());
}
function togglemenu() {
	if ($(".mode").is(':visible')){
		closeallwindows();
		$('canvas').css('cursor','default');
		hand = false;
		erase = false;
	}
	
	$("body>.mode").toggle();
}
function toggleinfo() {
	var s = ($(".info").is(':visible'));
	closeallwindows();
	if (!s)
		$(".info").show();
}
function togglefileswindow() {
	var s = ($(".window.files").is(':visible'));
	$('.mode *').removeClass('selected');
	closeallwindows();
	if (!s) {
		$('.mode .files').addClass('selected');
		$('.window.files').show();
	} else {
	}
}
function togglesvgwindow() {
	var s = ($(".svg").is(':visible'));
	$('.mode *').removeClass('selected');
	closeallwindows();
	if (!s) {
		$('.mode .showsvg').addClass('selected');
		setupsvgwindow();
		mode = 'svg';
	} else {
		hidesvgwindow();
	}
}


function togglecolorwindow() {

	var s = ($(".colorwindow").is(':visible'));
	$('.mode *').removeClass('selected');
	closeallwindows();
	if (!s) {
		$('.mode .stylemode').addClass('selected');
		$(".colorwindow").show();
		hidecolorpicker();
	}
	else {
		hidecolorpicker();
	}
}
function toggletilingwindow() {
	var s = ($(".tilingwindow").is(':visible'));
	$('.mode *').removeClass('selected');
	closeallwindows();
	if (!s) {
		$('.mode .tilingmode').addClass('selected');
		$(".tilingwindow").show();
		mode = 'tiling';
		storeusercolors();
		prevpreset = usedpreset;
		setColorPreset('tiling');
		updatedisplaystyle();
	}	
	else {
		$('canvas').css('cursor','default');
		hand = false;
		erase = false;
	}
}
function outlinesInput() {
	outlinedisplay = ($('.button.outlines input').prop('checked'));
	updatedisplaystyle();
}
function textureInput() {
	texturedisplay = ($('.button.texture input').prop('checked'));
	complextexturedisplay = ($('.button.complextexture input').prop('checked'));
	updatedisplaystyle();
	updateShadowInputDisplay()	
}
function shadowInput() {
	shadowdisplay = ($('.button.shadowdisplay input').prop('checked'));
	updatedisplaystyle();
	updateShadowInputDisplay()	
}
function toggleoutlines() {
	outlinedisplay = !outlinedisplay;
	updatedisplaystyle();
	updateInputdisplay();
}
function setOutlinedisplay() {
	outlinedisplay = true;
	updatedisplaystyle();
	updateInputdisplay();
}
function setTexturedisplay(i) {
	if (i == 1) {
		texturedisplay = true;
		complextexturedisplay = false;
	} else if (i == 2) {
		complextexturedisplay = true;
		texturedisplay = false;
	}
	updatedisplaystyle();
	updateInputdisplay();
}
function toggletextures() {
	texturedisplay = !texturedisplay;
	if (complextexturedisplay && texturedisplay)
		togglecomplextexture();
	updatedisplaystyle();
	updateInputdisplay();
}
function togglecomplextexture() {
	complextexturedisplay = !complextexturedisplay;
	if (complextexturedisplay && texturedisplay)
		toggletextures();
	updatedisplaystyle();
	updateInputdisplay();
}
function polysInput() {
	innerpolydisplay = ($('.button.innerpolys input').prop('checked'));
	updatedisplaystyle();

}
function toggleinnerpolydisplay(){
	innerpolydisplay = !innerpolydisplay;
	updatedisplaystyle();
	updateInputdisplay();	
}
function setInnerPolyDisplay() {
	innerpolydisplay = true;
	updatedisplaystyle();
	updateInputdisplay();	
}
$('.shadowalpha input').change(function(e){
	var f = parseFloat($('.shadowalpha input').val());
	if (f > 1) f = 1;
	if (f < 0.1) f = 0.1;
	shadow_alpha = f;
	updatedisplaystyle();
	dirtyPreset();
});
$('.shadowsize input').change(function(e){
	var f = parseFloat($('.shadowsize input').val());
	if (f > 1) f = 1;
	if (f < 0.1) f = 0.1;
	shadow_input_length = f;
	updateshadowdisplay();
	dirtyPreset();
});
$('.shadowangle input').change(function(e){
	var f = parseInt($('.shadowangle input').val());
	if (f > 360) f = 360;
	if (f < 0) f = 0;
	shadow_angle = f;
	updateshadowdisplay();
	dirtyPreset();
});
function updateInputdisplay(){
	$('.button.style').removeClass('selected');
	if (displaystyle == 0) {
		$('.button.style.none').addClass('selected');
		$('.button.style.none input').prop('checked',true);
	} else if (displaystyle == 1) {
		$('.button.style.plain').addClass('selected');
		$('.button.style.plain input').prop('checked',true);
	}else if (displaystyle == 2) {
		$('.button.style.individual').addClass('selected');
		$('.button.style.individual input').prop('checked',true);
	}
	if (outlinedisplay) {
		$('.button.outlines').addClass('active');
		$('.button.outlines input').prop('checked',true);
	} else {
		$('.button.outlines').removeClass('active');
		$('.button.outlines input').prop('checked',false);
	}	
	if (texturedisplay) {
		$('.button.texture').addClass('active');
		$('.button.texture input').prop('checked',true);	
	} else {
		$('.button.texture').removeClass('active');
		$('.button.texture input').prop('checked',false);
	}
	if (complextexturedisplay) {
		$('.button.complextexture').addClass('active');
		$('.button.complextexture input').prop('checked',true);	
	} else {
		$('.button.complextexture').removeClass('active');
		$('.button.complextexture input').prop('checked',false);
	}
	if (!complextexturedisplay && !texturedisplay) {
		$('.button.notexture input').prop('checked',true);
	} 
	if (innerpolydisplay) {
		$('.button.innerpolys').addClass('active');
		$('.button.innerpolys input').prop('checked',true);
	} else {
		$('.button.innerpolys').removeClass('active');
		$('.button.innerpolys input').prop('checked',false);
	}
	updateShadowInputDisplay();

}
function updateShadowInputDisplay() {
	$('label.shadowdisplay input').prop('disabled', !complextexturedisplay);
	$('label.shadowalpha input').prop('disabled', !(complextexturedisplay && shadowdisplay));
	$('label.shadowsize input').prop('disabled', !(complextexturedisplay && shadowdisplay));
	$('label.shadowangle input').prop('disabled', !(complextexturedisplay && shadowdisplay));
	$('label.shadowdisplay input').prop('checked', shadowdisplay );
	$('label.shadowalpha input').val(shadow_alpha+"");
	$('label.shadowsize input').val(shadow_input_length+"");
	$('label.shadowangle input').val(shadow_angle+"");
}


function updateSVGIconRotation(){
	$('.tilingwindow .tool svg #tile').attr('transform',"rotate("+degrees(mouserotation)+" 100 100) translate(100 100)");
}
function erasetool() {
	hand = false; 
	erase = true; 
	$('.tilingwindow .tool').removeClass('selected'); 
	$('.tilingwindow .tool.erase').addClass('selected');
	$('.cursor').addClass('eraseicon');
	$('canvas').css('cursor','none');
	if (! $(".tilingwindow").is(':visible')){
		toggletilingwindow();
		$(".mode").show();
	}
}
function handtool() {
	erase = false; 
	hand = true; 
	$('.tilingwindow .tool').removeClass('selected'); 
	$('.tilingwindow .tool.hand').addClass('selected');
	// $('.cursor').addClass('handicon');
	$('canvas').css('cursor','grab');
}

function changemousepattern(pattern, selector) {
	erase = false; 
	hand = false;
	changeMousePattern(pattern); 
	$('.tilingwindow .tool').removeClass('selected'); 
	$(selector).addClass('selected');
	$('canvas').css('cursor','inherit');
	if (! $(".tilingwindow").is(':visible')){
		toggletilingwindow();
		$(".mode").show();
	}
}
function changedisplaystyle(style) {
	displaystyle = style;
	updatedisplaystyle();
	updatepreviewcolors();
	updateInputdisplay();
}
$('canvas, .svg').on('mousewheel', function(event) {
	event.preventDefault();
	movecamera(event.deltaX, event.deltaY, event.deltaFactor);
});
$(document).keydown(function(event) {
	// console.log(event.keyCode);
	var d = document.activeElement;
	if (d.nodeName === "INPUT" && d.hasAttribute("type") && d.getAttribute("type") === "number") {
	} else {
	 	if (event.keyCode === 187) { event.preventDefault(); keymap.plus = true;}
	 	if (event.keyCode === 107) { event.preventDefault(); keymap.num_plus = true;}
	 	if (event.keyCode === 189) { event.preventDefault(); keymap.minus = true;}
	 	if (event.keyCode === 109) { event.preventDefault(); keymap.num_minus = true;}
	 	if (event.keyCode === 37) { event.preventDefault(); keymap.left = true;}
	 	if (event.keyCode === 38) { event.preventDefault(); keymap.up = true;}
	 	if (event.keyCode === 39) { event.preventDefault(); keymap.right = true;}
	 	if (event.keyCode === 40) { event.preventDefault(); keymap.down = true;}
	 	if (event.keyCode === 8 ) { event.preventDefault(); removelast();} 			// backspace
	 	if (event.keyCode === 81) { event.preventDefault(); rotatemouseleft();} 		// space
	 	if (event.keyCode === 87) { event.preventDefault(); rotatemouseright();} 		// space
	 	if (event.keyCode === 32) { event.preventDefault(); rotatemouseright();} 		// space
	 	if (event.keyCode === 9) { event.preventDefault(); togglemenu();} 				// tab
	 	if (event.keyCode === 80) { event.preventDefault(); printColorPreset() } 				// p
	 	// if (event.keyCode === 67) { event.preventDefault(); togglecolorwindow();} 		// c

	 	// if (event.keyCode === 65) { event.preventDefault(); changedisplaystyle(0);} 	// a
	 	// if (event.keyCode === 83) { event.preventDefault(); changedisplaystyle(1);} 	// s
	 	// if (event.keyCode === 68) { event.preventDefault(); changedisplaystyle(2);}		// d
	 	// if (event.keyCode === 70) { event.preventDefault(); toggleoutlines();} 			// f
	 	// if (event.keyCode === 71) { event.preventDefault(); toggletextures();} 			// g
	 	// if (event.keyCode === 72) { event.preventDefault(); togglecomplextexture();} 	// h
	 	// if (event.keyCode === 75) { event.preventDefault(); toggleinnerpolydisplay();} 	// k -- j = 74

	 	if (event.keyCode === 49 || event.keyCode === 97) { event.preventDefault(); changemousepattern(1, '.tilingwindow .shape1');} // 1
	 	if (event.keyCode === 50 || event.keyCode === 98) { event.preventDefault(); changemousepattern(2, '.tilingwindow .shape2');} // 2
	 	if (event.keyCode === 51 || event.keyCode === 99) { event.preventDefault(); changemousepattern(3, '.tilingwindow .shape3');} // 3
	 	if (event.keyCode === 52 || event.keyCode === 100) { event.preventDefault(); changemousepattern(4, '.tilingwindow .shape4');} // 4
	 	if (event.keyCode === 53 || event.keyCode === 101) { event.preventDefault(); changemousepattern(5, '.tilingwindow .shape5');} // 5
	 	// if (event.keyCode === 54) { event.preventDefault(); changemousepattern(6, '.tilingwindow .shape6');} // 6
	 	if (event.keyCode === 69) { event.preventDefault(); erasetool();} // e
	 	// if (event.keyCode === 77) { event.preventDefault(); handtool();} // m
	 	if (event.keyCode == 122) { event.preventDefault(); toggleFullScreen();}
	 	if (event.keyCode == 86) { event.preventDefault(); counttiles()}
 	}
});
function counttiles() {
	var tiles = [0,0,0,0,0];
	for (var i = 0; i < objectlist.length; i++) {
		tiles[objectlist[i].patterntype-1]++;
	};
	console.log(tiles);
	console.log(objectlist.length);
	console.log(mouseinwindows);
}
$(document).keyup(function(event) {
 	if (event.keyCode === 37) {event.preventDefault(); keymap.left = false;}
 	if (event.keyCode === 38) {event.preventDefault(); keymap.up = false;}
 	if (event.keyCode === 39) {event.preventDefault(); keymap.right = false;}
 	if (event.keyCode === 40) {event.preventDefault(); keymap.down = false;}
 	if (event.keyCode === 187) { event.preventDefault(); keymap.plus = false;}
 	if (event.keyCode === 107) { event.preventDefault(); keymap.num_plus = false;}
 	if (event.keyCode === 189) { event.preventDefault(); keymap.minus = false;}
 	if (event.keyCode === 109) { event.preventDefault(); keymap.num_minus = false;}
});
$('.tool.shape1').click(function(e) {changemousepattern(1, '.tool.shape1'); }); 
$('.tool.shape2').click(function(e) {changemousepattern(2, '.tool.shape2'); });
$('.tool.shape3').click(function(e) {changemousepattern(3, '.tool.shape3'); });
$('.tool.shape4').click(function(e) {changemousepattern(4, '.tool.shape4'); });
$('.tool.shape5').click(function(e) {changemousepattern(5, '.tool.shape5'); });
$('.tool.shape6').click(function(e) {changemousepattern(6, '.tool.shape6'); });
$('.tool.erase').click(function(e) {erasetool(); });
$('.tool.hand').click(function(e) {handtool(); });
$('.rotateleft').click(function(e) {rotatemouseleft(); });
$('.rotateright').click(function(e) {rotatemouseright(); });
$('.undo').click(function(e) {removelast(); });
$('.style').click(function(e) {hidecolorpicker();});

$('.style.none').click(function(e) {changedisplaystyle(0,'.style.none'); dirtyPreset(); }); 		
$('.style.plain').click(function(e) {changedisplaystyle(1,'.style.plain'); dirtyPreset();}); 		
$('.style.individual').click(function(e) {changedisplaystyle(2,'.style.individual'); dirtyPreset();}); 	
$('.button.outlines input').click(function(e) {outlinesInput(); dirtyPreset();}); 		
$('.button.notexture input').click(function(e) {textureInput(); dirtyPreset();});
$('.button.texture input').click(function(e) {textureInput(); dirtyPreset();});
$('.button.complextexture input').click(function(e) {textureInput(); dirtyPreset();});
$('.button.shadowdisplay input').click(function(e) {shadowInput(); dirtyPreset();});
$('.button.innerpolys input').click(function(e) {polysInput(); dirtyPreset();}); 		

$('.button.zoomin').mousedown(function(e) {
	zoomin = true;
	$('.button.zoomin').addClass('active');
}); 		
$('.button.zoomin').mouseleave(function(e) {
	zoomin = false;
	$('.button.zoomin').removeClass('active');
}); 		
$('.button.zoomin').mouseup(function(e) {
	zoomin = false;
	$('.button.zoomin').removeClass('active');
}); 		

$('.button.zoomout').mousedown(function(e) {
	zoomout = true;
	$('.button.zoomout').addClass('active');
});
$('.button.zoomout').mouseleave(function(e) {
	zoomout = false;
	$('.button.zoomout').removeClass('active');
}); 		
$('.button.zoomout').mouseup(function(e) {
	zoomout = false;
	$('.button.zoomout').removeClass('active');
}); 		
$('.closeinfo, .toggleinfo').mousedown(function(e) {toggleinfo()}); 		
$('.togglecolorwindow').mousedown(function(e) {togglecolorwindow()}); 		
$('.tilingmode').mousedown(function(e) {toggletilingwindow()}); 		
$('.stylemode').mousedown(function(e) {togglecolorwindow()}); 		

/****************/
/* Fullscreen	*/
/****************/

var isFullscreen = false;
$('.button.fullscreen').mousedown(function(e) {
	toggleFullScreen();
});
document.addEventListener('fullscreenchange', function () {
    isFullscreen = !!document.fullscreen;
    fullscreenchange();
}, false);
document.addEventListener('mozfullscreenchange', function () {
    isFullscreen = !!document.mozFullScreen;
    fullscreenchange();
}, false);
document.addEventListener('webkitfullscreenchange', function () {
    isFullscreen = !!document.webkitIsFullScreen;
    fullscreenchange();
}, false);
function fullscreenchange() {
    if(isFullscreen) {
		$('.button.fullscreen').addClass('infullscreen');
    } else {
		$('.button.fullscreen').removeClass('infullscreen');
    }
}
function toggleFullScreen() {
	if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
		if (document.documentElement.requestFullscreen) {
		  document.documentElement.requestFullscreen();
		} else if (document.documentElement.msRequestFullscreen) {
		  document.documentElement.msRequestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
		  document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
		  document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.exitFullscreen) {
		  document.exitFullscreen();
		} else if (document.msExitFullscreen) {
		  document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {
		  document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
		  document.webkitExitFullscreen();
		}
	}
}

/****************/
/* Colorpicker	*/
/****************/

var editcolor = 0,
	editcolor_selector,
	lastsetcolor;
function setupcolorwindow() {
	var blocks = ['','',''],
		block = 0,
		i = 0;
	for (var r = 0; r <= 256 ; r+=32) {
		for (var g = 0; g <= 256 ; g+=32) {
			for (var b = 0; b <= 256 ; b+=32) {
				blocks[block] += "<span style='background:rgba("+r+","+g+","+b+",1)'>&nbsp;</span>";
				i++;
				if (i%27 == 0){
					blocks[block] += "<br>";
					block++;
					if (block >2) block = 0;
				}
			};
		};
	};
	$('.colors.palette1').html(blocks[0]);
	$('.colors.palette2').html(blocks[1]);
	$('.colors.palette3').html(blocks[2]);
	var grayscalecolors = '';
	for (var g = 0; g <= 256 ; g+=16) {
		grayscalecolors += "<span style='background:rgba("+g+","+g+","+g+",1)'>&nbsp;</span>";	
	};
	$('.colors.grayscale').html(grayscalecolors);
	 $('.colors.basic').html("<span style='background:#FF0000'>&nbsp;</span><span style='background:#00FF00'>&nbsp;</span><span style='background:#0000FF'>&nbsp;</span><span style='background:#00FFFF'>&nbsp;</span><span style='background:#FF00FF'>&nbsp;</span><span style='background:#FFFF00'>&nbsp;</span>");	
	updatepreviewcolors();
}
function updateusedcolors(){
	var	domstring = '',
		usedcolors = [];
	$( ".colorwindow .color .preview" ).each(function( index ) {
		var c = this.style.backgroundColor,
			used = false
		for (var i = usedcolors.length - 1; i >= 0; i--) {
			if (usedcolors[i] === c)
				used = true;
		};
		if (!used)
			usedcolors.push(c);
	});
	for (var i = 0; i < usedcolors.length; i++) {
		domstring += "<span style='background:"+usedcolors[i]+"'>&nbsp;</span>";
	};
	$('.colors.usedcolors').html(domstring);
}
setupcolorwindow();
function seteditcolor(newcolor, selector) {
	$('.color').removeClass('selected');
	if (editcolor !== newcolor) {
		editcolor = newcolor;
		editcolor_selector = selector;
		$(selector).addClass('selected');
		setupcolorpicker();
	} else {
		hidecolorpicker();
	}
}
$('.presetstab').mousedown(function(e){
	hidecolorpicker();
});
function setupcolorpicker() {
		var c = getcolor(editcolor);
		$('.colorpicker .previouscolor').css('background',c);
		$('.colorpicker .currentcolor').css('background',c);
		$('.colorpicker .hex').html('&nbsp;#'+ new THREE.Color(c).getHexString());
		lastsetcolor = c;
		$('.colorpicker').show();
		updateusedcolors();
		setupcolorhandlers();
}
function hidecolorpicker() {
		$('.colorpicker').hide();
		$('.color').removeClass('selected');
		editcolor = 0;
		editcolor_selector = null;
}
function updatepreviewcolors() {
	$('.plain .preview, .togglecolorwindow .container').css('background-color',getcolor(1));
	$('.shape1 .preview, .togglecolorwindow .shape1').css('background-color',getcolor(2));
	$('.shape2 .preview, .togglecolorwindow .shape2').css('background-color',getcolor(3));
	$('.shape3 .preview, .togglecolorwindow .shape3').css('background-color',getcolor(4));
	$('.shape4 .preview, .togglecolorwindow .shape4').css('background-color',getcolor(5));
	$('.shape5 .preview, .togglecolorwindow .shape5').css('background-color',getcolor(6));
	$('.outlinecolor .preview').css('background-color',getcolor(10));
	$('.texturecolor .preview').css('background-color',getcolor(11));
	$('.background .preview').css('background-color',getcolor(12));
	$('.complextexturelinecolor .preview').css('background-color',getcolor(13));
	$('.complextexturefillcolor .preview').css('background-color',getcolor(14));
	$('.complextextureshadowcolor .preview').css('background-color',getcolor(20));
	$('.poly1 .preview').css('background-color',getcolor(15));
	$('.poly2 .preview').css('background-color',getcolor(16));
	$('.poly3 .preview').css('background-color',getcolor(17));
	$('.poly4 .preview').css('background-color',getcolor(18));
	$('.poly5 .preview').css('background-color',getcolor(19));
	$('.colorwindow .style.button').removeClass('selected');
	$('.colorwindow .style.button').removeClass('active');
	if (displaystyle === 2) {
		$('.togglecolorwindow .container div').show();		
	} else if (displaystyle === 1) {
		$('.togglecolorwindow .container div').hide();		
	} else {
		$('.togglecolorwindow .container div').hide();		
		$('.togglecolorwindow .container').css('background-color',getcolor(12));
	}
	updateInputdisplay();
}
$('.color.plain').click(function(e) {changedisplaystyle(1,'.plain');seteditcolor(1,'.color.plain'); dirtyPreset(); }); 		
$('.color.shape1').click(function(e) {changedisplaystyle(2,'.individual'); seteditcolor(2,'.color.shape1'); dirtyPreset(); }); 		
$('.color.shape2').click(function(e) {changedisplaystyle(2,'.individual'); seteditcolor(3,'.color.shape2'); dirtyPreset(); }); 		
$('.color.shape3').click(function(e) {changedisplaystyle(2,'.individual'); seteditcolor(4,'.color.shape3'); dirtyPreset(); }); 		
$('.color.shape4').click(function(e) {changedisplaystyle(2,'.individual'); seteditcolor(5,'.color.shape4'); dirtyPreset(); }); 		
$('.color.shape5').click(function(e) {changedisplaystyle(2,'.individual'); seteditcolor(6,'.color.shape5'); dirtyPreset(); }); 		
$('.color.outlinecolor').click(function(e) {setOutlinedisplay(); seteditcolor(10,'.color.outlinecolor'); dirtyPreset(); }); 		
$('.color.texturecolor').click(function(e) {setTexturedisplay(1); seteditcolor(11,'.color.texturecolor'); dirtyPreset(); }); 		
$('.color.background').click(function(e) {seteditcolor(12,'.color.background'); dirtyPreset(); }); 		
$('.color.complextexturelinecolor').click(function(e) {setTexturedisplay(2); seteditcolor(13,'.color.complextexturelinecolor'); dirtyPreset(); });
$('.color.complextexturefillcolor').click(function(e) {setTexturedisplay(2); seteditcolor(14,'.color.complextexturefillcolor'); dirtyPreset(); });
$('.color.complextextureshadowcolor').click(function(e) {setTexturedisplay(2); seteditcolor(20,'.color.complextextureshadowcolor'); dirtyPreset(); });
$('.color.poly1').click(function(e) {setInnerPolyDisplay(); seteditcolor(15,'.color.poly1'); dirtyPreset(); }); 		
$('.color.poly2').click(function(e) {setInnerPolyDisplay(); seteditcolor(16,'.color.poly2'); dirtyPreset(); }); 		
$('.color.poly3').click(function(e) {setInnerPolyDisplay(); seteditcolor(17,'.color.poly3'); dirtyPreset(); }); 		
$('.color.poly4').click(function(e) {setInnerPolyDisplay(); seteditcolor(18,'.color.poly4'); dirtyPreset(); }); 		
$('.color.poly5').click(function(e) {setInnerPolyDisplay(); seteditcolor(19,'.color.poly5'); dirtyPreset(); }); 		
function setupcolorhandlers() {
	$('.colors span, .previouscolor').mousedown(function(e) {
		var c = e.target.style.backgroundColor;
		lastsetcolor = c;
		$('.colorpicker .currentcolor').css('background-color',c);
		$('.colorpicker .hex').html('&nbsp;#'+ new THREE.Color(c).getHexString());
		setcolor(editcolor,c);
		updatepreviewcolors();
		dirtyPreset();
	}); 		
	$('.colors span').mouseenter(function(e) {
		var c = e.target.style.background;
		$('.colorpicker .currentcolor').css('background-color',c);
	}); 		
	$('.colors').mouseleave(function(e) {
		$('.colorpicker .currentcolor').css('background-color',lastsetcolor);
	}); 		
}
function getColorString(color) {
	return "#"+ new THREE.Color(color).getHexString();
}
function getcolor(color) {
	switch (color) {
		case 1:
			return new THREE.Color(FILLCOLOR).getStyle()
			break;
		case 2:
			return new THREE.Color(DECADON_COLOR).getStyle()
			break;
		case 3:
			return new THREE.Color(ELONGATED_HEXAGON_COLOR).getStyle()
			break;
		case 4:
			return new THREE.Color(BOW_TIE_COLOR).getStyle()
			break;
		case 5:
			return new THREE.Color(RHOMBUS_COLOR).getStyle()
			break;
		case 6:
			return new THREE.Color(PENTAGON_COLOR).getStyle()
			break;
		case 7:
			return new THREE.Color(FLAT_RHOMBUS_COLOR).getStyle()
			break;
		case 10:
			return new THREE.Color(OUTLINECOLOR).getStyle()
			break;
		case 11:
			return new THREE.Color(TEXTURELINECOLOR).getStyle()
			break;
		case 12:
			return new THREE.Color(BACKGROUNDCOLOR).getStyle()
			break;
		case 13:
			return new THREE.Color(COMPLEXTEXTURELINECOLOR).getStyle()
			break;
		case 14:
			return new THREE.Color(COMPLEXTEXTUREFILLCOLOR).getStyle()
			break;
		case 15:
			return new THREE.Color(INNER_POLY_COLOR_1).getStyle()
			break;
		case 16:
			return new THREE.Color(INNER_POLY_COLOR_2).getStyle()
			break;
		case 17:
			return new THREE.Color(INNER_POLY_COLOR_3).getStyle()
			break;
		case 18:
			return new THREE.Color(INNER_POLY_COLOR_4).getStyle()
			break;
		case 19:
			return new THREE.Color(INNER_POLY_COLOR_5).getStyle()
			break;
		case 20:
			return new THREE.Color(COMPLEXTEXTURESHADOWCOLOR).getStyle()
			break;
	}
}
function setcolor(color,value) {
	switch (color) {
		case 1:
			FILLCOLOR = value;
			FILLMATERIAL.color.set(value);
			break;
		case 2:
			DECADON_COLOR = value;
			DECADON_MATERIAL.color.set(value);
			break;
		case 3:
			ELONGATED_HEXAGON_COLOR = value;
			ELONGATED_HEXAGON_MATERIAL.color.set(value);
			break;
		case 4:
			BOW_TIE_COLOR = value;
			BOW_TIE_MATERIAL.color.set(value);
			break;
		case 5:
			RHOMBUS_COLOR = value;
			RHOMBUS_MATERIAL.color.set(value);
			break;
		case 6:
			PENTAGON_COLOR = value;
			PENTAGON_MATERIAL.color.set(value);
			break;
		case 7:
			FLAT_RHOMBUS_COLOR = value;
			FLAT_RHOMBUS_MATERIAL.color.set(value);
			break;
		case 10:
			OUTLINECOLOR = value;
			BORDERMATERIAL.color.set(value);
			break;
		case 11:
			TEXTURELINECOLOR = value;
			TEXTURELINEMATERIAL.color.set(value);
			break;
		case 12:
			BACKGROUNDCOLOR = new THREE.Color(value).getHex();
			break;
		case 13:
			COMPLEXTEXTURELINECOLOR = value;
			COMPLEXTEXTURELINEMATERIAL.color.set(value);
			break;
		case 14:
			COMPLEXTEXTUREFILLCOLOR = value;
			COMPLEXTEXTUREFILLMATERIAL.color.set(value);
			break;
		case 15:
			INNER_POLY_COLOR_1 = value;
			INNER_POLY_MATERIAL_1.color.set(value);
			break;
		case 16:
			INNER_POLY_COLOR_2 = value;
			INNER_POLY_MATERIAL_2.color.set(value);
			break;
		case 17:
			INNER_POLY_COLOR_3 = value;
			INNER_POLY_MATERIAL_3.color.set(value);
			break;
		case 18:
			INNER_POLY_COLOR_4 = value;
			INNER_POLY_MATERIAL_4.color.set(value);
			break;
		case 19:
			INNER_POLY_COLOR_5 = value;
			INNER_POLY_MATERIAL_5.color.set(value);
			break;
		case 20:
			COMPLEXTEXTURESHADOWCOLOR = value;
			COMPLEXTEXTURESHADOWMATERIAL.color.set(value);
			break;
	}
	updatedisplaystyle();
}


/****************/
/* Localstorage	*/
/****************/



function pictureToJson(thumb){
	var jsonobj = {};
	jsonobj.tiles = [];
	for (var i = 0; i < objectlist.length; i++) {
		var o = objectlist[i];
		var jo = {};
		jo.x = o.position.x;
		jo.y = o.position.y;
		jo.r = o.rotation.z;
		jo.t = o.patterntype;
		jsonobj.tiles.push(jo);
	};
	jsonobj.filling = displaystyle;
	jsonobj.outlines = outlinedisplay;
	jsonobj.texture = texturedisplay;
	jsonobj.knottexture = complextexturedisplay;
	jsonobj.fillcolor = FILLCOLOR;
	jsonobj.shape1color = DECADON_COLOR;
	jsonobj.shape2color = ELONGATED_HEXAGON_COLOR;
	jsonobj.shape3color = BOW_TIE_COLOR;
	jsonobj.shape4color = RHOMBUS_COLOR;
	jsonobj.shape5color = PENTAGON_COLOR;
	jsonobj.shape6color = FLAT_RHOMBUS_COLOR;
	jsonobj.outlinecolor = OUTLINECOLOR;
	jsonobj.linecolor = TEXTURELINECOLOR;
	jsonobj.complextexturelinecolor = COMPLEXTEXTURELINECOLOR;
	jsonobj.complextexturefillcolor = COMPLEXTEXTUREFILLCOLOR;
	jsonobj.complextextureshadowcolor = COMPLEXTEXTURESHADOWCOLOR;
	jsonobj.shadowdisplay = shadowdisplay;
	jsonobj.shadowalpha = shadow_alpha;
	jsonobj.shadowlength = shadow_input_length;
	jsonobj.shadowangle = shadow_angle;
	jsonobj.polydisplay = innerpolydisplay;
	jsonobj.poly1color = INNER_POLY_COLOR_1;
	jsonobj.poly2color = INNER_POLY_COLOR_2;
	jsonobj.poly3color = INNER_POLY_COLOR_3;
	jsonobj.poly4color = INNER_POLY_COLOR_4;
	jsonobj.poly5color = INNER_POLY_COLOR_5;
	jsonobj.backgroundcolor = BACKGROUNDCOLOR;
	jsonobj.camera_scale = camerascale;
	jsonobj.camerapos_x = camerapos.x;
	jsonobj.camerapos_y = camerapos.y;
	jsonobj.date = Date.now();
	if (thumb)
		jsonobj.thumbdata = thumb;
	return jsonobj;
}
function svgDataURL(svg) {
	var svgAsXML = (new XMLSerializer).serializeToString(svg);
	return "data:image/svg+xml," + encodeURIComponent(svgAsXML);
}

function createThumb(callback) {
	var size = 200;
	var svgElem = buildSvg();
	var img = new Image;
	img.onload = function () {
		// console.log(url);
		console.log(img.width);
		console.log(img.height);
		var iw = img.width;
		var ih = img.height;
		var w, h, l, t;
		if (iw > ih ){
			w = size;
			l = 0;
			h = ih / iw *size;
			t = (size-h)/2;
		} else {
			h = size;
			w = iw / ih *size;			
			l = (size-w)/2;
			t = 0;
		}
		var canvas = document.createElement("canvas");
		canvas.setAttribute('width',size);
		canvas.setAttribute('height',size);
		context = canvas.getContext("2d");
		context.fillStyle = getcolor(12);
		context.fillRect(0,0,size,size);

		context.drawImage(img,l,t,w,h);	
		var durl = canvas.toDataURL("image/png") 
	  	callback( durl);
	}
	img.src = svgDataURL(svgElem);
}
function buildfromjson(jsonobj) {
	newimage();
	if (jsonobj) {
		canvas_left = 0;
		canvas_right = 0;
		canvas_top = 0;
		canvas_bottom = 0;
		if (jsonobj.poly5color) {
			setcolor(1,jsonobj.fillcolor);
			setcolor(2,jsonobj.shape1color);
			setcolor(3,jsonobj.shape2color);
			setcolor(4,jsonobj.shape3color);
			setcolor(5,jsonobj.shape4color);
			setcolor(6,jsonobj.shape5color);
			setcolor(7,jsonobj.shape6color);
			setcolor(10,jsonobj.outlinecolor);
			setcolor(11,jsonobj.linecolor);
			setcolor(12,jsonobj.backgroundcolor);
			setcolor(13,jsonobj.complextexturelinecolor);
			setcolor(14,jsonobj.complextexturefillcolor);
			setcolor(20,jsonobj.complextextureshadowcolor);
			setcolor(15,jsonobj.poly1color);
			setcolor(16,jsonobj.poly2color);
			setcolor(17,jsonobj.poly3color);
			setcolor(18,jsonobj.poly4color);
			setcolor(19,jsonobj.poly5color);
		}
		displaystyle = jsonobj.filling;
		outlinedisplay = jsonobj.outlines;
		texturedisplay = jsonobj.texture;
		innerpolydisplay = jsonobj.polydisplay;
		shadowdisplay = jsonobj.shadowdisplay;
		shadow_alpha = jsonobj.shadowalpha;
		shadow_input_length = jsonobj.shadowlength;
		shadow_angle = jsonobj.shadowangle;
		complextexturedisplay = jsonobj.knottexture;
		camerascale = jsonobj.camera_scale;
		camerapos.x = jsonobj.camerapos_x;
		camerapos.y = jsonobj.camerapos_y;

		for (var i = 0; i < jsonobj.tiles.length; i++) {
			newTile(jsonobj.tiles[i]);
		};
		updatepreviewcolors();
		setdisplaystyle(mouseobject);
		usedpreset = 'Custom';
		storeusercolors();
		updatedisplaystyle();
	}
}
function newimage(){
	for (var i = 0; i < objectlist.length; i++) {
		scene.remove(objectlist[i]); 
	};
	objectlist = [];
}
$('.button.clearcanvas').click(function(e){
	closeallwindows();
	$('.window.clearconfirm').show();
});
$('.textbutton.clear').click(function(e){
	newimage();
});
$('.button.close, .textbutton.close').click(function(e){
	$(e.target).closest('.window').hide();
});

$('.button.files').click(function(e){
	togglefileswindow();
});
$('.textbutton.save').click(function(e){
	saveSession();
});
function saveSession() {
	createThumb(function(thumb) {
		var key = newStorageKey();
		var jsonobj =  pictureToJson(thumb)
		jsonobj.key = key;
		localStorage.setItem(key, JSON.stringify(jsonobj));
		setupfileswindow();
	});
}
function storeSession() {
	if (usedpreset === 'tiling') {
		setColorPreset(prevpreset);
	}
	var jsonobj =  pictureToJson()
	localStorage.setItem('session', JSON.stringify(jsonobj));
	alert ("");
	console.log(jsonobj);
}
function loadsession(key) {
	var jsonobj = JSON.parse(localStorage.getItem(key));
	buildfromjson(jsonobj);
	if (!(key === 'session')) {
		centerImage();
		return false;
	} else {
		return true;
	}

}
function deletesession(key) {
	localStorage.removeItem(key);
	setupfileswindow();
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function setupfileswindow() {
	var domstring = '',
		items = [];
	for (var i = 0; i < localStorage.length; i++){
		var item = localStorage.getItem(localStorage.key(i));
		if (item !== localStorage.getItem("session")) {
			items.push(JSON.parse(item));
		}
	};
	items.sort(dynamicSort("-date"));
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		if (item.thumbdata && item.key) {    			
			domstring +=
			"<div class='item' key='"+item.key+"' title='load'>"+
			"<img src='"+item.thumbdata+"'>"+
			"<div class='delete' title='delete'></div>"+
			"</div>";
		}
	};
	$('.window.files .items').html(domstring);
	$('.window.files .items .item').click(function(e){
		var key = $(e.currentTarget).attr('key');
		loadsession(key);
	});	
	$('.window.files .items .item .delete').click(function(e){
		var key = $(e.currentTarget.parentElement).attr('key');
		deletesession(key);
	});
}
function newStorageKey() {
	var i = 1;
	var n,j;
	while(true) {
		if (i <= 9)
			j = "000"+i;
		else if (i <= 99)
			j = "00"+i;
		else if (i <= 999)
			j = "0"+i;
		else
			j = i;
		n = "pattern_"+j;
		if (!localStorage.getItem(n) ){
			return n;
		}
		i++;
	}
}
function storeColorPresets() {
		localStorage.setItem('colors', JSON.stringify(displaypresets));
}
function loadColorPresets() {
		if (localStorage.getItem('colors')) {
			displaypresets = JSON.parse(localStorage.getItem('colors'));
			displaypresets.tiling = plainpreset;
		}
}

setupfileswindow();
loadColorPresets();

if (!(localStorage.getItem('session'))) {
	toggleinfo();
}


loadsession('session');
window.onunload = storeSession;

/****************/
/* SVG			*/
/****************/

var xmlns = "http://www.w3.org/2000/svg",
	xlinkNS = "http://www.w3.org/1999/xlink",
	svg_strokewidth = 1.5,
	svg_edgestrokewidth = 0.5;

function buildSvg() {
	computeDocumentBorders();
	var boxWidth = canvas_right-canvas_left +svgmargin*2;
	var boxHeight = canvas_bottom-canvas_top +svgmargin*2;
	var xoff = -canvas_left+svgmargin;
	var yoff = -canvas_top+svgmargin;
	var boxX = 0;
	var boxY = 0;
	var svgElem = document.createElementNS (xmlns, "svg");
	svgElem.setAttribute ("xmlns", xmlns);
	svgElem.setAttribute ("xmlns:xlink", xlinkNS);
	svgElem.setAttributeNS (null, "viewBox", boxX + " " + boxY + " " + boxWidth + " " + boxHeight);
	svgElem.setAttributeNS (null, "width", boxWidth+"px");
	svgElem.setAttributeNS (null, "height", boxHeight+"px");
	svgElem.setAttributeNS (null, "version", "1.1");
	// svgElem.setAttributeNS (null, "shape-rendering", "crispEdges");

	var defs = document.createElementNS (xmlns, "defs");
	svgElem.appendChild (defs);
	var g = document.createElementNS (xmlns, "g");
	svgElem.appendChild(g);

	var svg_outlinecolor = getColorString(OUTLINECOLOR);
	var svg_texturelinecolor = getColorString(TEXTURELINECOLOR);
	var svg_knottexturelinecolor = getColorString(COMPLEXTEXTURELINECOLOR);

	// create defs of all shape types
	var shapeColors = [getColorString(DECADON_COLOR), getColorString(ELONGATED_HEXAGON_COLOR), getColorString(BOW_TIE_COLOR), getColorString(RHOMBUS_COLOR), getColorString(PENTAGON_COLOR)]; 
	var svg_fillcolor = getColorString(FILLCOLOR);
	for (var i = 0; i < tileindices.length; i++) {
		var props = tileprops[tileindices[i]];
		var t = i+1;
		if (displaystyle > 0) {		
			var shape_fill;
			if (displaystyle == 2) {
				shape_fill = svgFilling(props, shapeColors[i]);
			} else {
				shape_fill = svgFilling(props, svg_fillcolor);
			}
			shape_fill.setAttributeNS (null, 'id', 'shape'+t+'_fill');
			defs.appendChild(shape_fill);
		}
		if (innerpolydisplay) {
			var innerpolys = svgInnerPolys(props);
			innerpolys.setAttributeNS (null, 'id', 'shape'+t+'_inner_polygons');
			defs.appendChild(innerpolys);
		}
		if (outlinedisplay) {	
			var shape_outline = svgOutline(props, svg_outlinecolor);
			shape_outline.setAttributeNS (null, 'id', 'shape'+t+'_outline');
			defs.appendChild(shape_outline);
		}
		if (texturedisplay) {	
			var shape_tex = svgTexture_single_line(props, svg_texturelinecolor);
			shape_tex.setAttributeNS (null, 'id', 'shape'+t+'_texture');
			defs.appendChild(shape_tex);	
		} else if (complextexturedisplay) {
			if (shadowdisplay) {
				var knot_shadow = svgTexture_knot_pattern_shadow(props);
				knot_shadow.setAttributeNS (null, 'id', 'shape'+t+'_knot_shadow');
				defs.appendChild(knot_shadow);	
			}	
			var knot_fill = svgTexture_knot_pattern_fill(props);
			knot_fill.setAttributeNS (null, 'id', 'shape'+t+'_knot_fill');
			defs.appendChild(knot_fill);	
			var knot_lines = svgTexture_knot_pattern_lines(props);
			knot_lines.setAttributeNS (null, 'id', 'shape'+t+'_knot_lines');
			defs.appendChild(knot_lines);
		}
	};

	// layers
	var layer_bg = document.createElementNS (xmlns, "rect");
	layer_bg.setAttribute('width','100%');
	layer_bg.setAttribute('height','100%');
	layer_bg.setAttribute('fill',getColorString(BACKGROUNDCOLOR));
	g.appendChild(layer_bg);

	var layer_shapes = document.createElementNS (xmlns, "g");
	layer_shapes.setAttributeNS (null, 'id', 'layer_shapes');
	g.appendChild(layer_shapes);
	var layer_innerpolys = document.createElementNS (xmlns, "g");
	layer_innerpolys.setAttributeNS (null, 'id', 'layer_inner_polygons');
	g.appendChild(layer_innerpolys);
	var layer_outlines = document.createElementNS (xmlns, "g");
	layer_outlines.setAttributeNS (null, 'id', 'layer_outlines');
	g.appendChild(layer_outlines);
	var layer_texture = document.createElementNS (xmlns, "g");
	layer_texture.setAttributeNS (null, 'id', 'layer_texture');
	g.appendChild(layer_texture);
	var layer_knot_pattern_shadow = document.createElementNS (xmlns, "g");
	layer_knot_pattern_shadow.setAttributeNS (null, 'id', 'layer_knot_pattern_shadow');
	g.appendChild(layer_knot_pattern_shadow);
	var layer_knot_pattern_filling = document.createElementNS (xmlns, "g");
	layer_knot_pattern_filling.setAttributeNS (null, 'id', 'layer_knot_pattern_filling');
	g.appendChild(layer_knot_pattern_filling);
	var layer_knot_pattern_lines = document.createElementNS (xmlns, "g");
	layer_knot_pattern_lines.setAttributeNS (null, 'id', 'layer_knot_pattern_lines');
	g.appendChild(layer_knot_pattern_lines);

	for (var i = 0; i < objectlist.length; i++) {
		var obj = objectlist[i];
		var type = obj.patterntype;
		var x = obj.position.x +xoff;
		var y = obj.position.y +yoff;
		var deg = degrees(obj.rotation.z);
		var transform = 'rotate('+deg+' '+x+' '+y+') translate('+x+' '+y+')';
		if (displaystyle > 0) {
			var sf = document.createElementNS(xmlns, "use");
			sf.setAttributeNS( xlinkNS, 'xlink:href', '#shape'+type+'_fill');
			sf.setAttribute('transform', transform);
			layer_shapes.appendChild(sf);
		}
		if (innerpolydisplay) {		
			var si = document.createElementNS(xmlns, "use");
			si.setAttributeNS( xlinkNS, 'xlink:href', '#shape'+type+'_inner_polygons');
			si.setAttribute('transform', transform);
			layer_innerpolys.appendChild(si);
		}
		if (outlinedisplay) {		
			var sl = document.createElementNS(xmlns, "use");
			sl.setAttributeNS( xlinkNS, 'xlink:href', '#shape'+type+'_outline');
			sl.setAttribute('transform', transform);
			layer_outlines.appendChild(sl);
		}
		if (texturedisplay) {		
			var st = document.createElementNS(xmlns, "use");
			st.setAttributeNS( xlinkNS, 'xlink:href', '#shape'+type+'_texture');
			st.setAttribute('transform', transform);
			layer_texture.appendChild(st);
		} else if (complextexturedisplay) {
			if (shadowdisplay) {
				var ks = document.createElementNS(xmlns, "use");
				ks.setAttributeNS( xlinkNS, 'xlink:href', '#shape'+type+'_knot_shadow');
				ks.setAttribute('transform', transform);
				layer_knot_pattern_shadow.appendChild(ks);							
			}
			var kf = document.createElementNS(xmlns, "use");
			kf.setAttributeNS( xlinkNS, 'xlink:href', '#shape'+type+'_knot_fill');
			kf.setAttribute('transform', transform);
			layer_knot_pattern_filling.appendChild(kf);			
			var kl = document.createElementNS(xmlns, "use");
			kl.setAttributeNS( xlinkNS, 'xlink:href', '#shape'+type+'_knot_lines');
			kl.setAttribute('transform', transform);
			layer_knot_pattern_lines.appendChild(kl);			
		}
	}
	if (shadowdisplay) {
		var sv = getshadowoffsetVector();
		layer_knot_pattern_shadow.setAttribute("transform", "translate("+(-sv.x)+","+sv.y+")");
		layer_knot_pattern_shadow.setAttribute("opacity", shadow_alpha);
	}
	g.setAttribute("transform", "translate(0,"+boxHeight+") scale(1,-1)");
	return svgElem;
}

function getshadowoffsetVector() {
	var v = new THREE.Vector3(shadow_length*shadow_input_length,0,0);
	rotatevector(v, shadow_angle -90);
	return v;
}

function svgFilling(props, color) {
	var shapepath  = document.createElementNS(xmlns, "path"),
		coords = "M";
	for (var i = 0; i < props.outline_geometry.vertices.length-1; i++) {
		var v = props.outline_geometry.vertices[i];
		if (i > 0) coords+= "L";
		coords+=v.x+","+v.y;
	};
	coords+="Z";
	shapepath.setAttributeNS (null, 'd', coords);
	shapepath.setAttributeNS (null, 'fill', color);
	shapepath.setAttributeNS (null, 'stroke', color);
	shapepath.setAttributeNS (null, 'stroke-width', svg_edgestrokewidth);
	return shapepath;
}
function svgOutline(props, color) {
	var outlinepath  = document.createElementNS(xmlns, "path"),
		coords = "M";
	for (var i = 0; i < props.outline_geometry.vertices.length-1; i++) {
		var v = props.outline_geometry.vertices[i];
		if (i > 0) coords+= "L";
		coords+=v.x+","+v.y;
	};
	coords+="Z";
	outlinepath.setAttributeNS (null, 'd', coords);
	outlinepath.setAttributeNS (null, 'fill', 'none');
	outlinepath.setAttributeNS (null, 'stroke-linejoin', "miter");
	outlinepath.setAttributeNS (null, 'stroke', color);
	outlinepath.setAttributeNS (null, 'stroke-width', svg_strokewidth);
	return outlinepath;
}
function svgInnerPolys(props) {
	var g = document.createElementNS(xmlns, "g");
	for (var i = 0; i < props.inner_line_patterns[2].length; i++) {
		var fillcolor =  getColorString(props.inner_poly_materials[i].color);
		for (var k = 0; k < props.inner_line_patterns[2][i].length; k++) {
			var l = props.inner_line_patterns[2][i][k];
			var fill  = document.createElementNS(xmlns, "path");
			var coords = "M ";
			for (var j = 0; j < l.length; j++) {
				var v = l[j];
				if (j > 0) coords+= "L ";
				coords+=v.x+","+v.y+" ";
			};
			var type = props;
			if ( type > 1 ) {
				coords+="Z";
			}
			fill.setAttributeNS (null, 'd', coords);
			fill.setAttributeNS (null, 'fill', fillcolor);
			g.appendChild(fill);
		};
	};
	return g;
}
function svgTexture_knot_pattern_fill(props) {
	var color = getColorString(COMPLEXTEXTURELINECOLOR);
	var fillcolor = getColorString(COMPLEXTEXTUREFILLCOLOR);
	var g = document.createElementNS(xmlns, "g");
	for (var i = 0; i < props.knot_pattern_arrays[2].length; i++) {
		var l = props.knot_pattern_arrays[2][i];
		var fill  = document.createElementNS(xmlns, "path");
		var coords = "M ";
		for (var j = 0; j < l.length; j++) {
			var v = l[j];
			if (j > 0) coords+= "L ";
			coords+=v.x+","+v.y+" ";
		};
		var type = props;
		if ( type > 1 ) {
			coords+="Z";
		}
		fill.setAttributeNS (null, 'd', coords);
		fill.setAttributeNS (null, 'fill', fillcolor);
		fill.setAttributeNS (null, 'stroke', fillcolor);
		fill.setAttributeNS (null, 'stroke-width', svg_edgestrokewidth);

		g.appendChild(fill);
	};
	return g;
}
function svgTexture_knot_pattern_shadow(props) {
	var fillcolor = getColorString(COMPLEXTEXTURESHADOWCOLOR);
	var g = document.createElementNS(xmlns, "g");
	for (var i = 0; i < props.knot_pattern_arrays[2].length; i++) {
		var l = props.knot_pattern_arrays[2][i];
		var fill  = document.createElementNS(xmlns, "path");
		var coords = "M ";
		for (var j = 0; j < l.length; j++) {
			var v = l[j];
			if (j > 0) coords+= "L ";
			coords+=v.x+","+v.y+" ";
		};
		var type = props;
		if ( type > 1 ) {
			coords+="Z";
		}
		fill.setAttributeNS (null, 'd', coords);
		fill.setAttributeNS (null, 'fill', fillcolor);
		fill.setAttributeNS (null, 'stroke', fillcolor);
		fill.setAttributeNS (null, 'stroke-width', svg_edgestrokewidth);

		g.appendChild(fill);
	};
	return g;
}
function svgTexture_knot_pattern_lines(props) {
	var color = getColorString(COMPLEXTEXTURELINECOLOR);
	var fillcolor = getColorString(COMPLEXTEXTUREFILLCOLOR);
	var g = document.createElementNS(xmlns, "g");
	for (var i = 0; i < props.knot_pattern_arrays[0].length; i++) {
		var l = props.knot_pattern_arrays[0][i];
		var dec_lines  = document.createElementNS(xmlns, "path");
		var coords = "M ";
		for (var j = 0; j < l.length; j++) {
			var v = l[j];
			if (j > 0) coords+= "L ";
			coords+=v.x+","+v.y+" ";
		};
		dec_lines.setAttributeNS (null, 'd', coords);
		dec_lines.setAttributeNS (null, 'fill', 'none');
		dec_lines.setAttributeNS (null, 'stroke', color);
		dec_lines.setAttributeNS (null, 'stroke-width', svg_strokewidth);
		g.appendChild(dec_lines);
	};
	return g;
}
function svgTexture_single_line(props, color) {
	var g = document.createElementNS(xmlns, "g");
	for (var i = 0; i < props.inner_line_patterns[0].length; i++) {
		var l = props.inner_line_patterns[0][i];
		var dec_lines  = document.createElementNS(xmlns, "path");
		var coords = "M ";
		for (var j = 0; j < l.length; j++) {
			var v = l[j];
			if (j > 0) coords+= "L ";
			coords+=v.x+","+v.y+" ";
		};
		var type = props.patterntype;
		if ( type > 1 ) {
			coords+="Z";
		}
		dec_lines.setAttributeNS (null, 'd', coords);
		dec_lines.setAttributeNS (null, 'fill', 'none');
		dec_lines.setAttributeNS (null, 'stroke', color);
		dec_lines.setAttributeNS (null, 'stroke-width', svg_strokewidth);
		g.appendChild(dec_lines);
	};
	return g;
}
function getDateString() {
	var date = new Date();
	var y = date.getFullYear()+"";
	var m = date.getMonth()+1;
	var d = date.getDate();
	return y[2]+y[3]+((m<10)?'0':'')+m+((d<10)?'0':'')+d;
}
function getDateNumber() {
	return parseInt(getDateString,10);
}
$('.button.showsvg').click(function(e){
	togglesvgwindow();
});
$('.svg .button.back').click(function(e){
	$('.svg').hide();
	$('.svg .img').empty();
	window.document.title = "Girih Designer";
});
function setupsvgwindow() {
	$('.svg .text').html('Generating SVG ...');
	$('.svg .img').empty();
		$('.svg .textbutton.download').hide();
	$('.svg .notification').show();
	$('.svg').show();
	setTimeout(function() {
		svgElem = buildSvg();
		$('.svg .img').append(svgElem);
		var img = $('.svg .img').html();
		$('.svg .textbutton.download').attr('href', 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(img));
		$('.svg .textbutton.download').attr('download', 'girih_'+getDateString()+'.svg');
		$('.svg .textbutton.download').show();
		$('.svg .text').html('Vector Preview');
  	}, 1);
}




function hidesvgwindow() {
	$('.svg .img').empty();
	$('.svg').hide();	
}
function download(filename, img) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(img));
    pom.setAttribute('download', filename);
    pom.click();
    console.log(pom);
}
function newWindow(content) {
	var x=window.open('','svg output');
	x.document.open();
	x.document.appendChild(content);
}

/*****************/
/* Color Presets */
/*****************/




function storeusercolors () {
	displaypresets['Custom'] = getPreset('Custom'); 
	setupPresetsList();
}
function printColorPreset () {
	console.log(displaypresets['Custom']);
	console.log(JSON.stringify(displaypresets['Custom']));

}
function dirtyPreset () {
	usedpreset = "Custom";
	storeusercolors();

}


function getPreset (name, user) {
	return {
		name: name,
		fillcolor: FILLCOLOR,
		decadon_color: DECADON_COLOR,
		elongated_hexagon_color: ELONGATED_HEXAGON_COLOR,
		bow_tie_color: BOW_TIE_COLOR,
		rhombus_color: RHOMBUS_COLOR,
		pentagon_color: PENTAGON_COLOR,
		flat_rhombus_color: FLAT_RHOMBUS_COLOR,
		outlinecolor: OUTLINECOLOR,
		texturelinecolor: TEXTURELINECOLOR,
		complextexturelinecolor: COMPLEXTEXTURELINECOLOR,
		complextexturefillcolor: COMPLEXTEXTUREFILLCOLOR,
		shadowdisplay: shadowdisplay,
		shadowalpha: shadow_alpha,
		shadowlength: shadow_input_length,
		shadowangle: shadow_angle,
		shadowcolor: COMPLEXTEXTURESHADOWCOLOR,
		inner_poly_color_1: INNER_POLY_COLOR_1,
		inner_poly_color_2: INNER_POLY_COLOR_2,
		inner_poly_color_3: INNER_POLY_COLOR_3,
		inner_poly_color_4: INNER_POLY_COLOR_4,
		inner_poly_color_5: INNER_POLY_COLOR_5,
		backgroundcolor: BACKGROUNDCOLOR,
		displaystyle: displaystyle,
		outlinedisplay: outlinedisplay,
		texturedisplay: texturedisplay,
		complextexturedisplay: complextexturedisplay,
		innerpolydisplay: innerpolydisplay,
		user: user
	}
}
function setColorPreset(preset){
	if (displaypresets[preset]) {
		usedpreset = preset;
		var ps = displaypresets[preset];
		setcolor(1,ps.fillcolor);
		setcolor(2,ps.decadon_color);
		setcolor(3,ps.elongated_hexagon_color);
		setcolor(4,ps.bow_tie_color);
		setcolor(5,ps.rhombus_color);
		setcolor(6,ps.pentagon_color);
		setcolor(7,ps.flat_rhombus_color);
		setcolor(10,ps.outlinecolor);
		setcolor(11,ps.texturelinecolor);
		setcolor(12,ps.backgroundcolor);
		setcolor(13,ps.complextexturelinecolor);
		setcolor(14,ps.complextexturefillcolor);
		setcolor(15,ps.inner_poly_color_1);
		setcolor(16,ps.inner_poly_color_2);
		setcolor(17,ps.inner_poly_color_3);
		setcolor(18,ps.inner_poly_color_4);
		setcolor(19,ps.inner_poly_color_5);
		setcolor(20,ps.shadowcolor);
		displaystyle = ps.displaystyle;
		outlinedisplay = ps.outlinedisplay;
		texturedisplay = ps.texturedisplay;
		innerpolydisplay = ps.innerpolydisplay;
		complextexturedisplay = ps.complextexturedisplay;
		shadowdisplay = (ps.shadowdisplay) && ps.shadowdisplay;
		if (usedpreset !== 'tiling') {
			shadow_alpha = ps.shadowalpha; 
			shadow_angle = ps.shadowangle; 
			shadow_input_length = ps.shadowlength; 
		}
		updatedisplaystyle();
		updateshadowdisplay();
		updatepreviewcolors();
	}
}

function deleteColorPreset(key) {
	delete displaypresets[key]
	storeColorPresets();
}
$('.savepreset').click(function(e){
	saveUserPreset();
});

function setupPresetsList() {
	var field = $('.colorwindow .presetstabframe .presets'),
		sstring = '';
	field.html('');
	for (key in displaypresets) {
		var preset = displaypresets[key],
			pclass = "";
		if (key === usedpreset) pclass += " selected";
    	sstring +=
    		"<div class='preset"+pclass+"' key='"+key+"''>"+
  			"<span class='name'>"+preset.name+"</span>"+
  			"<div class='preview'>"+getPresetColors(preset)+"</div>"+
  			((preset.name !== "Tiling" && preset.name !== "Custom") ? "<div class='delete' title='delete preset'></div>" : "")+
    		"</div>";
    }
    field.append(sstring);
    $('.presets .preset').click(function(e) {
    	var key = $(e.currentTarget).attr('key');
    	setColorPreset(key);
    	setupPresetsList();
    });
    $('.presets .preset .delete').click(function(e) {
    	var key = $(e.currentTarget).parent().attr('key');
    	deleteColorPreset(key);
    	setupPresetsList();
    });
}
setupPresetsList();

function getPresetColors(preset){
	var	domcolorstring = '',
		usedcolors = [],
		uniquecolors = [];
	if (preset.displaystyle === 1) {
		usedcolors.push(preset.fillcolor);
	} else if (preset.displaystyle === 2) {
		usedcolors.push(preset.decadon_color, preset.elongated_hexagon_color, preset.bow_tie_color, preset.rhombus_color, preset.pentagon_color);
	}
	if (preset.outlinedisplay) {
		usedcolors.push(preset.outlinecolor);
	}
	if (preset.texturedisplay) {
		usedcolors.push(preset.texturelinecolor);
	}
	if (preset.complextexturedisplay) {
		usedcolors.push(preset.complextexturelinecolor, preset.complextexturefillcolor);
	}
	if (preset.innerpolydisplay) {
		usedcolors.push(preset.inner_poly_color_1, preset.inner_poly_color_2, preset.inner_poly_color_3, preset.inner_poly_color_4, preset.inner_poly_color_5);
	}
	usedcolors.push(preset.backgroundcolor);
	for (var i = usedcolors.length - 1; i >= 0; i--) {
		usedcolors[i] = (new THREE.Color(usedcolors[i]).getStyle());
	};
	for (var i = usedcolors.length - 1; i >= 0; i--) {
		var used = false;
		for (var j = uniquecolors.length - 1; j >= 0; j--) {
			if (usedcolors[i] === uniquecolors[j]) {
				used = true;
			}
		};
		if (! used) {
			uniquecolors.push(usedcolors[i]);
		}
	};
	for (var i = uniquecolors.length - 1; i >= 0; i--) {
		domcolorstring += "<span class='colorpreview' style='background:"+uniquecolors[i]+"'>&nbsp;</span>";
	};
	return domcolorstring;
}

function saveUserPreset() {
	var nl = 25,
		defname = 'User Preset '+(getuserpresetamount()+1),
		name = prompt("Enter color preset name:", defname).substring(0, nl);;

	while (presetnameexists(name)) {
		name = prompt("Name already in use.\nEnter color preset name:", defname).substring(0, nl);
	}
	if (name && !(name === '') ) {
  		displaypresets[name.toLowerCase()] = getPreset(name, true); 
		usedpreset = name;
		setupPresetsList();
		storeColorPresets();
	}
}

function presetnameexists(name) {
	var cn = name.toLowerCase();
    for (key in displaypresets) {
    	if (displaypresets[key].name.toLowerCase() === cn) return true;
    }
    return false;
}

function getuserpresetamount() {
    var size = 0, 
    	key;
    for (key in displaypresets) {
        if (displaypresets.hasOwnProperty(key) && displaypresets[key].user ) {
        	size++;
        } 
    }
    return size;
};

})();