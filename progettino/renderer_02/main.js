console.log("19/05/22, 23:51");

/* directional light */
DirLight = function(){
    this.direction = [1,-1,0];
    this.color = [1,.8,.9];
}

sun = new DirLight();

shaders = [lightingShader]

shader = shaders[0]

/*
the FollowFromUpCamera always look at the car from a position abova right over the car
*/
FollowFromUpCamera = function(){
  /* the only data it needs is the position of the camera */
  this.frame = glMatrix.mat4.create();
  
  /* update the camera with the current car position */
  this.update = function(car_position){
    this.frame = car_position;
  }

  /* return the transformation matrix to transform from worlod coordiantes to the view reference frame */
  this.matrix = function(){
    let eye = glMatrix.vec3.create();
    let target = glMatrix.vec3.create();
    let up = glMatrix.vec4.create();
    
    glMatrix.vec3.transformMat4(eye, [0  ,50,0], this.frame);
    glMatrix.vec3.transformMat4(target, [0.0,0.0,0.0,1.0], this.frame);
    glMatrix.vec4.transformMat4(up, [0.0,0.0,-1,0.0], this.frame);
    
    return glMatrix.mat4.lookAt(glMatrix.mat4.create(),eye,target,up.slice(0,3));	
  }
}

/*
the ChaseCamera always look at the car from behind the car, slightly above
*/


let alpha = 0;
let vertPos = 2.5;
ChaseCamera = function(){

  /* the only data it needs is the frame of the camera */
  this.frame = [0,0,0];
  
  /* update the camera with the current car position */
  this.update = function(car_frame){
    this.frame = car_frame.slice();
  }

  /* return the transformation matrix to transform from worlod coordiantes to the view reference frame */
  this.matrix = function(){
    let eye = glMatrix.vec3.create();
    let target = glMatrix.vec3.create();
    
    let distance = 5;

    let isRotatingLeft  = Renderer.car.control_keys['j'];
    let isRotatingRight = Renderer.car.control_keys['l'];
    
    let up  = Renderer.car.control_keys['i'];
    let down = Renderer.car.control_keys['k'];
    
    let hold  = Renderer.car.control_keys['h'];
    
    if(isRotatingLeft){
      alpha -= .02
      alpha = alpha % (2 * 3.14159)
    }
    else if(isRotatingRight){
      alpha += .02
      alpha = alpha % (2 * 3.14159) 
    }
    
    else {
        if(!hold){
            if(Math.abs(alpha) > 0.08)
                alpha -= Math.sign(alpha) * 0.08;
            else alpha = 0;
        }
    }
    
    if(up && vertPos < 5){
        vertPos += .2;
    }
    
    if(down && vertPos > 1){
        vertPos-=.2;
    }
    
    glMatrix.vec3.transformMat4(eye, [distance * Math.sin(alpha) , vertPos, distance * Math.cos(alpha),1.0], this.frame);
    
    glMatrix.vec3.transformMat4(target, [0.0,0.0,0.0,1.0], this.frame);
    return glMatrix.mat4.lookAt(glMatrix.mat4.create(),eye, target,[0, 1, 0]);	
  }
}



function loadTexture(gl, tu, url){
	var image = new Image();
	image.src = url;
	image.addEventListener('load',function(){	
		gl.activeTexture(gl.TEXTURE0+tu);
		var texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D,texture);
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_NEAREST);
		gl.generateMipmap(gl.TEXTURE_2D);
    });
}




/* the main object to be implementd */
var Renderer = new Object();

/* array of cameras that will be used */
Renderer.cameras = [];
// add a FollowFromUpCamera
Renderer.cameras.push(new FollowFromUpCamera());
Renderer.cameras.push(new ChaseCamera());

// set the camera currently in use
Renderer.currentCamera = 1;

/*
create the buffers for an object as specified in common/shapes/triangle.js
*/
Renderer.createObjectBuffers = function (gl, obj) {

  obj.vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, obj.vertices, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
  if(obj.normals){
    console.log(`>\tCreating normal buffer for ${obj.name}`);
    obj.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, obj.normals, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
  else console.log(`(!)\t${obj.name} has no normals`);


  if(obj.texCoords){
    console.log(`::\tCreating tex buffer for ${obj.name}`);
    obj.texCoordsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.texCoordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, obj.texCoords, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
  else console.log(`(!)\t${obj.name} has no tex coords`);


  obj.indexBufferTriangles = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferTriangles);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, obj.triangleIndices, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  // create edges
  var edges = new Uint16Array(obj.numTriangles * 3 * 2);
  for (var i = 0; i < obj.numTriangles; ++i) {
    edges[i * 6 + 0] = obj.triangleIndices[i * 3 + 0];
    edges[i * 6 + 1] = obj.triangleIndices[i * 3 + 1];
    edges[i * 6 + 2] = obj.triangleIndices[i * 3 + 0];
    edges[i * 6 + 3] = obj.triangleIndices[i * 3 + 2];
    edges[i * 6 + 4] = obj.triangleIndices[i * 3 + 1];
    edges[i * 6 + 5] = obj.triangleIndices[i * 3 + 2];
  }

  obj.indexBufferEdges = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferEdges);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, edges, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};

/*
draw an object as specified in common/shapes/triangle.js for which the buffer 
have alrady been created
*/
Renderer.drawObject = function (gl, obj, fillColor, lineColor) {   
    
  gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer);
  gl.enableVertexAttribArray(this.shader.aPositionIndex);
  gl.vertexAttribPointer(this.shader.aPositionIndex, 3, gl.FLOAT, false, 0, 0);

  
  if(obj.normals){
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.normalBuffer);
    gl.enableVertexAttribArray(this.shader.aNormalIndex);
    gl.vertexAttribPointer(this.shader.aNormalIndex, 3, gl.FLOAT, false, 0, 0);
  }


  if(obj.texCoords){
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.texCoordsBuffer);
    gl.enableVertexAttribArray(this.shader.aTexCoordsIndex);
    gl.vertexAttribPointer(this.shader.aTexCoordsIndex, 2, gl.FLOAT, false, 0, 0);
  }


  gl.enable(gl.POLYGON_OFFSET_FILL);
  gl.polygonOffset(1.0, 1.0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferTriangles);
  gl.uniform3fv(this.shader.uColorLocation, [fillColor[0], fillColor[1], fillColor[2]]);
  gl.drawElements(gl.TRIANGLES, obj.triangleIndices.length, gl.UNSIGNED_SHORT, 0);

  gl.disable(gl.POLYGON_OFFSET_FILL);
  
  // draw wireframe?
  
  //gl.uniform3fv(this.shader.uColorLocation, [/*lineColor[0]*/ 0, lineColor[1], lineColor[2]]);
  //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferEdges);
  //gl.drawElements(gl.LINES, obj.numTriangles * 3 * 2, gl.UNSIGNED_SHORT, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  
  
  gl.disableVertexAttribArray(this.shader.aPositionIndex);
  gl.disableVertexAttribArray(this.shader.aNormalIndex);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
};

/*
initialize the object in the scene
*/

var lamp_position_array=[];

Renderer.initializeObjects = function (gl) {
  Game.setScene(scene_0);
  
   for(lamp of Game.scene.lamps)
       lamp_position_array.push(lamp.position);
  
  this.car = Game.addCar("mycar");
  Renderer.triangle = new Triangle();

  this.cube = new Cube(10);
  ComputeNormals(this.cube);
  console.log(`>\tComputed normals: ${this.cube.name}`)
  this.createObjectBuffers(gl,this.cube);
  
  
  this.cylinder = new Cylinder(10);
  ComputeNormals(this.cylinder);
  console.log(`>\tComputed normals: ${this.cylinder.name}`)
  this.createObjectBuffers(gl,this.cylinder );
  
  ComputeNormals(this.triangle);
  Renderer.createObjectBuffers(gl, this.triangle);
  
  ComputeNormals(Game.scene.trackObj);
  Renderer.createObjectBuffers(gl,Game.scene.trackObj);
  
  ComputeNormals(Game.scene.groundObj);
  Renderer.createObjectBuffers(gl,Game.scene.groundObj);
  for (var i = 0; i < Game.scene.buildings.length; ++i){ 
    ComputeNormals(Game.scene.buildingsObj[i]);
    Renderer.createObjectBuffers(gl,Game.scene.buildingsObj[i]);
  }
  
  loadTexture(gl, 0,"../common/textures/street4.png");
};



/*
draw the car
*/

let rolling = 0;

Renderer.drawCar = function (gl) {

    var Ka = 0.4;
    var Kd = 0.8;
    var Ks = 0.0;
    var shininess = 10.0;
    
    
    M                 = glMatrix.mat4.create();
    rotate_transform  = glMatrix.mat4.create();
    translate_matrix  = glMatrix.mat4.create();
    scale_matrix      = glMatrix.mat4.create();
  
    glMatrix.mat4.fromTranslation(translate_matrix,[0,1,1]);
    glMatrix.mat4.fromScaling(scale_matrix,[0.7,0.25,1]);
    glMatrix.mat4.mul(M,scale_matrix,translate_matrix);
    glMatrix.mat4.fromRotation(rotate_transform,-0.1,[1,0,0]);
    glMatrix.mat4.mul(M,rotate_transform,M);
    glMatrix.mat4.fromTranslation(translate_matrix,[0,0.1,-1]);
    glMatrix.mat4.mul(M,translate_matrix,M);

    Renderer.stack.push();
    Renderer.stack.multiply(M);
    
    
    gl.uniformMatrix4fv(this.shader.uM, false, this.stack.matrix);

    this.drawObject(gl,this.cube,[0.8,0.6,0.7,1.0],[0.8,0.6,0.7,1.0]);
    Renderer.stack.pop();

    Mw                 = glMatrix.mat4.create();
    M_front            = glMatrix.mat4.create();
    M_roll             = glMatrix.mat4.create();
   
    rolling -= .4 * Game.cars[0].speed;
    
    glMatrix.mat4.fromRotation(M_roll, rolling,[1,0,0]);
    
    /* draw the wheels */
    glMatrix.mat4.fromRotation(rotate_transform,3.14/2.0,[0,0,1]);
    glMatrix.mat4.fromTranslation(translate_matrix,[1,0,0]);
    glMatrix.mat4.mul(Mw,translate_matrix,rotate_transform);
    
    glMatrix.mat4.fromScaling(scale_matrix,[0.1,0.2,0.2]);
    glMatrix.mat4.mul(Mw,scale_matrix,Mw);
    
     /* now the diameter of the wheel is 2*0.2 = 0.4 and the wheel is centered in 0,0,0 */

    
    glMatrix.mat4.fromRotation(rotate_transform, Game.cars[0].wheelsAngle ,[0,1,0]);
    
    glMatrix.mat4.mul(Mw,M_roll,Mw);
    
    glMatrix.mat4.mul(M_front,rotate_transform,Mw);
    
    
    
    glMatrix.mat4.identity(M);
    
    glMatrix.mat4.fromTranslation(translate_matrix,[-0.8,0.2,-0.7]);
    glMatrix.mat4.mul(M,translate_matrix,M_front);
   
    
    
    Renderer.stack.push();
    Renderer.stack.multiply(M);
    gl.uniformMatrix4fv(this.shader.uM, false, this.stack.matrix);
    
    this.drawObject(gl,this.cylinder,[1.0,0.6,0.5,1.0],[0.0,0.0,0.0,1.0]);
    Renderer.stack.pop();
    
    
    glMatrix.mat4.fromTranslation(translate_matrix,[0.8,0.2,-0.7]);
    
    glMatrix.mat4.mul(M,translate_matrix,M_front);

    
    
    Renderer.stack.push();
    Renderer.stack.multiply(M);
    gl.uniformMatrix4fv(this.shader.uM, false, this.stack.matrix); 
    this.drawObject(gl,this.cylinder,[1.0,0.6,0.5,1.0],[0.0,0.0,0.0,1.0]);
    Renderer.stack.pop();

    
    
    /* this will increase the size of the wheel to 0.4*1,5=0.6 */
    glMatrix.mat4.fromScaling(scale_matrix,[1,1.5,1.5]);;
    glMatrix.mat4.mul(Mw,scale_matrix,Mw);
    
    glMatrix.mat4.fromTranslation(translate_matrix,[0.8,0.25,0.7]);
    glMatrix.mat4.mul(M,translate_matrix,Mw);
  

    Renderer.stack.push();
    Renderer.stack.multiply(M);
    gl.uniformMatrix4fv(this.shader.uM, false, this.stack.matrix); 
    Renderer.stack.pop();

    this.drawObject(gl,this.cylinder,[1.0,0.6,0.5,1.0],[0.0,0.0,0.0,1.0]);

    glMatrix.mat4.fromTranslation(translate_matrix,[-0.8,0.3,0.7]);

    glMatrix.mat4.mul(M,translate_matrix,Mw);
    
    
    Renderer.stack.push();
    Renderer.stack.multiply(M);
    gl.uniformMatrix4fv(this.shader.uM, false, this.stack.matrix); 
    this.drawObject(gl,this.cylinder,[1.0,0.6,0.5,1.0],[0.0,0.0,0.0,1.0]);
    Renderer.stack.pop();
};


view_transform    = glMatrix.mat4.create();
identity          = glMatrix.mat4.create();
scale_matrix      = glMatrix.mat4.create();
rotation_matrix      = glMatrix.mat4.create();
let rotangle = 0;
Renderer.drawScene = function (gl) {
  rotangle+= .01;
  
  
  sun.direction = Game.scene.weather.sunLightDirection;
  sun.color = Game.scene.weather.sunLightColor;
  
  gl.uniform3fv(shader.uLightDirectionLocation,sun.direction);
  gl.uniform3fv(shader.uLightColorLocation,sun.color);
  
  
  
  var width = this.canvas.width;
  var height = this.canvas.height
  var ratio = width / height;
  this.stack = new MatrixStack();

  gl.viewport(0, 0, width, height);
  
  gl.enable(gl.DEPTH_TEST);

  // Clear the framebuffer
  gl.clearColor(0.34, 0.5, 0.74, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // setup the view transform
  
  view_transform = Renderer.cameras[Renderer.currentCamera].matrix();
  
  //glMatrix.mat4.lookAt(view_transform,[0.0,2.0,100.0],[0.0,0.0,0.0],[0,1,0]);

  
  
  gl.useProgram(this.shader);
  
  gl.uniformMatrix4fv(this.shader.uViewMatrixLocation,false,view_transform);
  
  
  var inv_view_matrix = glMatrix.mat4.create();
  
  glMatrix.mat4.invert(inv_view_matrix, view_transform);
  
 
  gl.uniformMatrix4fv(this.shader.uInverseViewMatrix,false,inv_view_matrix);
  
  glMatrix.mat4.fromRotation(rotation_matrix, rotangle,[0,1,0]);
  gl.uniformMatrix4fv(this.shader.uRotationMatrixLocation,false,rotation_matrix);
  
  gl.uniformMatrix4fv(this.shader.uProjectionMatrixLocation,     false,glMatrix.mat4.perspective(glMatrix.mat4.create(),3.14 / 4, ratio, 1, 500));

  glMatrix.mat4.fromScaling(scale_matrix,[4,1,4]);
  gl.uniformMatrix4fv(lightingShader.uM,false,scale_matrix);
  
  /* the shader will just output the base color if a null light direction is given */
  gl.uniform3fv(this.shader.uLightDirectionLocation,sun.direction);
  gl.uniform3fv(this.shader.uLightColorLocation,sun.color);
  
  Renderer.cameras[Renderer.currentCamera].update(this.car.frame);


  
  var invV = Renderer.cameras[Renderer.currentCamera].matrix();
  
  // initialize the stack with the identity
  this.stack.loadIdentity();
  // multiply by the view matrix
  this.stack.multiply(invV);

  // drawing the car
  this.stack.push();
  this.stack.multiply(this.car.frame); // projection * viewport
  
  gl.uniform1f(this.shader.u_texture_blending, 0); // TEXTURES OFF
  
  //gl.uniformMatrix4fv(this.shader.uM, false, stack.matrix);
  this.drawCar(gl);
  this.stack.pop();
  
  gl.uniform1f(this.shader.u_flat_blending, .7);
  gl.uniformMatrix4fv(this.shader.uM, false, this.stack.matrix);

  // drawing the static elements (ground, track and buldings)
	this.drawObject(gl, Game.scene.groundObj, [0.3, 0.7, 0.2, 1.0], [0, 0, 0, 1.0]);
    
    gl.uniform1f(this.shader.u_texture_blending, 0); // TEXTURES ON

    gl.uniform1i(this.shader.uSamplerLocation,0);   // ROAD TEXTURE
    gl.uniform1f(this.shader.u_flat_blending, .9);
 	this.drawObject(gl, Game.scene.trackObj, [0.9, 0.8, 0.7, 1.0], [0, 0, 0, 1.0]);

    gl.uniform1f(this.shader.u_texture_blending, 0);  // TEXTURES OFF

    gl.uniform1f(this.shader.u_flat_blending, .7);
	for (var i in Game.scene.buildingsObj) 
		this.drawObject(gl, Game.scene.buildingsObj[i], [0.8, 0.8, 0.8, 1.0], [0.2, 0.2, 0.2, 1.0]);

    for(var i = 0; i<12; i++){
        gl.uniform3fv(this.shader.uLampLocation[i], lamp_position_array[i]);
    }
    
    
	gl.useProgram(null);
};



Renderer.Display = function () {
  Renderer.drawScene(Renderer.gl);
  window.requestAnimationFrame(Renderer.Display) ;
};


Renderer.setupAndStart = function () {
 /* create the canvas */
	Renderer.canvas = document.getElementById("OUTPUT-CANVAS");
  
 /* get the webgl context */
	Renderer.gl = Renderer.canvas.getContext("webgl");

  /* read the webgl version and log */
	var gl_version = Renderer.gl.getParameter(Renderer.gl.VERSION); 
	log("glversion: " + gl_version);
	var GLSL_version = Renderer.gl.getParameter(Renderer.gl.SHADING_LANGUAGE_VERSION)
	log("glsl  version: "+GLSL_version);

  /* create the matrix stack */
	Renderer.stack = new MatrixStack();

  /* initialize objects to be rendered */
  Renderer.initializeObjects(Renderer.gl);

  /* create the shader */
  Renderer.shader = new shader(Renderer.gl);

  /*
  add listeners for the mouse / keyboard events
  */
  Renderer.canvas.addEventListener('mousemove',on_mouseMove,false);
  Renderer.canvas.addEventListener('keydown',on_keydown,false);
  Renderer.canvas.addEventListener('keyup',on_keyup,false);

  Renderer.Display();
}

on_mouseMove = function(e){}

on_keyup = function(e){
	Renderer.car.control_keys[e.key] = false;
}
on_keydown = function(e){
	Renderer.car.control_keys[e.key] = true;
}

window.onload = Renderer.setupAndStart;


update_camera = function (value){
  Renderer.currentCamera = value;
}
