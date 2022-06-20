console.log("Version Name:");
console.log("Shadows, honestly?");

/* directional light */
DirLight = function(){
  this.direction = [1,-1,0];
  this.color = [1,.8,.9];
}

sun = new DirLight();

shadowMapSize = 512.0

shaders = []


/*
 * the FollowFromUpCamera always look at the car from a position abova right over the car
 */

FollowFromUpCamera = function(){
  this.frame = glMatrix.mat4.create();
  /* update the camera with the current car position */
  this.update = function(car_position){
    this.frame = car_position;
  }

  /* return the transformation matrix to transform from world coordiantes to the view reference frame */
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

let flying_camera_position = glMatrix.vec3.fromValues(0,50,10);
let flight_speed = .1;
targetOffset = [0,-.5, .5]
flying_camera_localX = [1,0,0]
target = glMatrix.vec3.create();

FlyingCamera = function() {
  this.frame = glMatrix.mat4.create();
  /* update the camera with the current car position */
  this.update = function(car_position){
  }

  /* return the transformation matrix to transform from world coordiantes to the view reference frame */
  this.matrix = function(){
    let going_left  = Game.cars[0].control_keys['j'];
    let going_right = Game.cars[0].control_keys['l'];
    let going_up    = Game.cars[0].control_keys['i'];
    let going_down  = Game.cars[0].control_keys['k'];

    let local_Z = targetOffset;
    let local_Y = [0,1,0]
    let local_X = glMatrix.vec3.create();
    glMatrix.vec3.cross(local_X, local_Y, local_Z);
    flying_camera_localX = local_X
    if(going_up)    glMatrix.vec3.add(flying_camera_position, flying_camera_position, local_Z);
    if(going_down)  glMatrix.vec3.subtract(flying_camera_position, flying_camera_position, local_Z);
    if(going_left)  glMatrix.vec3.add(flying_camera_position, flying_camera_position, local_X);
    if(going_right) glMatrix.vec3.subtract(flying_camera_position, flying_camera_position, local_X);


    let eye = glMatrix.vec3.create();
    let target = glMatrix.vec3.create();
    let up = glMatrix.vec4.create();


    glMatrix.vec3.add(target, flying_camera_position, targetOffset);
    eye = flying_camera_position;
    glMatrix.vec3.transformMat4(target, target, this.frame);
    glMatrix.vec4.transformMat4(up, [0.0,1.0,0.0,0.0], this.frame);

    return glMatrix.mat4.lookAt(glMatrix.mat4.create(),eye,target,up.slice(0,3));
  }
}

/*
 * the ChaseCamera always look at the car from behind the car, slightly above
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

  /* return the transformation matrix to transform from world coordiantes to the view reference frame */
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
      /* press h to hold */
      if(!hold){
        if(Math.abs(alpha) > 0.08)
          alpha -= Math.sign(alpha) * 0.08;
        else alpha = 0;
      }
    }

    if(up   && vertPos < 5) vertPos += .2;
    if(down && vertPos > 1) vertPos -= .2;

    glMatrix.vec3.transformMat4(eye, [distance * Math.sin(alpha) , vertPos, distance * Math.cos(alpha),1.0], this.frame);
    
    glMatrix.vec3.transformMat4(target, [0.0,0.0,0.0,1.0], this.frame);
    return glMatrix.mat4.lookAt(glMatrix.mat4.create(),eye, target,[0, 1, 0]);	
  }
}





Texture_Projector = function(){
  this.frame = [0,0,0];

  /* update the projector with the current car position */
  this.update = function(car_frame){
    this.frame = car_frame.slice();
  }

  /* return the transformation matrix to transform from world coordiantes to the view reference frame */
  this.matrix = function(){
    let eye = glMatrix.vec3.create();
    let target = glMatrix.vec3.create();

    glMatrix.vec3.transformMat4(eye, [0, .5, -1., 1.0], this.frame);

    glMatrix.vec3.transformMat4(target, [0.0,.5,-2.0,1.0], this.frame);
    return glMatrix.mat4.lookAt(glMatrix.mat4.create(),eye, target,[0, 1, 0]);
  }
}




function createTexture(gl, url, nomipmap, wrapping){
  var texture = gl.createTexture();
  texture.image = new Image();

  var that = texture;
  texture.image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, that);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, that.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    if (nomipmap) gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    else gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    if(wrapping == 0){
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }
    else{
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    if (!nomipmap) gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
  };

  texture.image.src = url;
  return texture;
}



/* the main object to be implementd */
var Renderer = new Object();

/* array of cameras that will be used */
Renderer.cameras = [];
// add a FollowFromUpCamera
Renderer.cameras.push(new FollowFromUpCamera());
Renderer.cameras.push(new ChaseCamera());
Renderer.cameras.push(new FlyingCamera());


// set the camera currently in use
Renderer.currentCamera = 1;                                       // FORCE CHASE CAMERA (!)

Renderer.HeadlightProjector = new Texture_Projector();



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

function createFramebuffer(gl,size){
  var depthTexture = gl.createTexture();
  const depthTextureSize = size;
  gl.bindTexture(gl.TEXTURE_2D, depthTexture);
  gl.texImage2D(
    gl.TEXTURE_2D,      // target
    0,                  // mip level
    gl.DEPTH_COMPONENT, // internal format
    depthTextureSize,   // width
    depthTextureSize,   // height
    0,                  // border
    gl.DEPTH_COMPONENT, // format
    gl.UNSIGNED_INT,    // type
    null);              // data

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  var depthFramebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,       // target
    gl.DEPTH_ATTACHMENT,  // attachment point
    gl.TEXTURE_2D,        // texture target
    depthTexture,         // texture
    0);                   // mip level

  // create a color texture of the same size as the depth texture
  var colorTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, colorTexture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    depthTextureSize,
    depthTextureSize,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    null,
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  // attach it to the framebuffer
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,        // target
    gl.COLOR_ATTACHMENT0,  // attachment point
    gl.TEXTURE_2D,         // texture target
    colorTexture,          // texture
    0);                    // mip level

  gl.bindTexture(gl.TEXTURE_2D,null);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  depthFramebuffer.depthTexture = depthTexture;
  depthFramebuffer.colorTexture = colorTexture;
  depthFramebuffer.size = depthTextureSize;

  return depthFramebuffer;
}




Renderer.drawObject = function (gl, obj, fillColor, lineColor, useShader) {
  gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer);
  gl.enableVertexAttribArray(useShader.aPositionIndex);
  gl.vertexAttribPointer(useShader.aPositionIndex, 3, gl.FLOAT, false, 0, 0);

  if(obj.normals){
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.normalBuffer);
    gl.enableVertexAttribArray(useShader.aNormalIndex);
    gl.vertexAttribPointer(useShader.aNormalIndex, 3, gl.FLOAT, false, 0, 0);
  }

  if(obj.texCoords){
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.texCoordsBuffer);
    gl.enableVertexAttribArray(useShader.aTexCoordsIndex);
    gl.vertexAttribPointer(useShader.aTexCoordsIndex, 2, gl.FLOAT, false, 0, 0);
  }

  gl.enable(gl.POLYGON_OFFSET_FILL);
  gl.polygonOffset(1.0, 1.0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferTriangles);
  gl.uniform3fv(useShader.uColorLocation, [fillColor[0], fillColor[1], fillColor[2]]);
  gl.drawElements(gl.TRIANGLES, obj.triangleIndices.length, gl.UNSIGNED_SHORT, 0);

  gl.disable(gl.POLYGON_OFFSET_FILL);
  

  /* DRAW WIREFRAME? */

  //gl.uniform3fv(useShader.uColorLocation, [/*lineColor[0]*/ 0, lineColor[1], lineColor[2]]);
  //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferEdges);
  //gl.drawElements(gl.LINES, obj.numTriangles * 3 * 2, gl.UNSIGNED_SHORT, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  
  gl.disableVertexAttribArray(useShader.aPositionIndex);
  gl.disableVertexAttribArray(useShader.aNormalIndex);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
};



var lamp_position_array=[];

Renderer.initializeTextures = function(gl){
  Renderer.STREET_TEXTURE   = createTexture(gl, "../common/textures/street4.png", 0, 0);
  Renderer.GRASS_TEXTURE    = createTexture(gl, "../common/textures/grass_tile.png", 0, 0);
  Renderer.FACADES          = [];
  Renderer.ROOF             = createTexture(gl, "../common/textures/roof.jpg", 0, 0);
  Renderer.HEADLIGHTS       = createTexture(gl, "../common/textures/headlight.png", 0, 1);

  for (let i = 1; i <= 3; i++)
    Renderer.FACADES.push(createTexture(gl, `../common/textures/facade${i}.jpg`, 0, 0));
}

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
    ComputeNormals(Game.scene.buildingsObjTex[i]);
    Renderer.createObjectBuffers(gl,Game.scene.buildingsObjTex[i]);

    ComputeNormals(Game.scene.buildingsObjTex[i].roof);
    Renderer.createObjectBuffers(gl,Game.scene.buildingsObjTex[i].roof);
  }

  Renderer.initializeTextures(gl);
};



/*
 * draw the car
 */

let rolling = 0;

Renderer.drawCar = function (gl,useShader) {

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


  gl.uniformMatrix4fv(useShader.uM, false, this.stack.matrix);

  this.drawObject(gl,this.cube,[0.8,0.6,0.7,1.0],[0.8,0.6,0.7,1.0], useShader);
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
  gl.uniformMatrix4fv(useShader.uM, false, this.stack.matrix);

  this.drawObject(gl,this.cylinder,[1.0,0.6,0.5,1.0],[0.0,0.0,0.0,1.0], useShader);
  Renderer.stack.pop();


  glMatrix.mat4.fromTranslation(translate_matrix,[0.8,0.2,-0.7]);

  glMatrix.mat4.mul(M,translate_matrix,M_front);



  Renderer.stack.push();
  Renderer.stack.multiply(M);
  gl.uniformMatrix4fv(useShader.uM, false, this.stack.matrix);
  this.drawObject(gl,this.cylinder,[1.0,0.6,0.5,1.0],[0.0,0.0,0.0,1.0], useShader);
  Renderer.stack.pop();



  /* this will increase the size of the wheel to 0.4*1,5=0.6 */
  glMatrix.mat4.fromScaling(scale_matrix,[1,1.5,1.5]);;
  glMatrix.mat4.mul(Mw,scale_matrix,Mw);

  glMatrix.mat4.fromTranslation(translate_matrix,[0.8,0.25,0.7]);
  glMatrix.mat4.mul(M,translate_matrix,Mw);
  

  Renderer.stack.push();
  Renderer.stack.multiply(M);
  gl.uniformMatrix4fv(useShader.uM, false, this.stack.matrix);
  Renderer.stack.pop();

  this.drawObject(gl,this.cylinder,[1.0,0.6,0.5,1.0],[0.0,0.0,0.0,1.0], useShader);

  glMatrix.mat4.fromTranslation(translate_matrix,[-0.8,0.3,0.7]);

  glMatrix.mat4.mul(M,translate_matrix,Mw);


  Renderer.stack.push();
  Renderer.stack.multiply(M);
  gl.uniformMatrix4fv(useShader.uM, false, this.stack.matrix);
  this.drawObject(gl,this.cylinder,[1.0,0.6,0.5,1.0],[0.0,0.0,0.0,1.0], useShader);
  Renderer.stack.pop();
};


view_transform    = glMatrix.mat4.create();
proj_transform    = glMatrix.mat4.create();

identity          = glMatrix.mat4.create();
scale_matrix      = glMatrix.mat4.create();
rotation_matrix   = glMatrix.mat4.create();



Renderer.drawScene1 = function (gl, useShader) {
  gl.useProgram(useShader);
  sun.direction = Game.scene.weather.sunLightDirection;
  sun.color = Game.scene.weather.sunLightColor;


  var width = this.canvas.width;
  var height = this.canvas.height
  var ratio = width / height;
  this.stack = new MatrixStack();

  view_transform = Renderer.cameras[Renderer.currentCamera].matrix();   // setup the view transform
  //proj_transform = Renderer.HeadlightProjector.matrix();                // headlight projector transform
  var inv_view_matrix = glMatrix.mat4.create();                         // inverse of the viewMatrix
  glMatrix.mat4.invert(inv_view_matrix, view_transform);

  /* Projection Matrix (to be used for both the camera and the projector) */
  let proj = glMatrix.mat4.perspective(glMatrix.mat4.create(),3.14 / 4, ratio, 1, 500);


  glMatrix.mat4.fromScaling(scale_matrix,[4,1,4]);
  gl.uniformMatrix4fv(useShader.uM,false,scale_matrix);


  /* LIGHT PASS ONLY */

    gl.uniformMatrix4fv(useShader.uViewMatrixLocation,       false,  view_transform);
    gl.uniformMatrix4fv(useShader.uRotationMatrixLocation,   false,  rotation_matrix);
    gl.uniformMatrix4fv(useShader.uProjectionMatrixLocation, false,  proj);


    /* the shader will just output the base color if a null light direction is given */
    gl.uniform3fv(useShader.uLightDirectionLocation,sun.direction);
    gl.uniform3fv(useShader.uLightColorLocation,sun.color);



  gl.uniformMatrix4fv(useShader.uHeadlightsViewMatrix,  false,  proj_transform);
  gl.uniformMatrix4fv(useShader.uInverseViewMatrix,     false,  inv_view_matrix);
  gl.uniformMatrix4fv(useShader.uLightProjectionMatrix, false,  proj);



  Renderer.cameras[Renderer.currentCamera].update(this.car.frame);
  Renderer.HeadlightProjector.update(this.car.frame);


  var V = Renderer.cameras[Renderer.currentCamera].matrix();



  this.stack.loadIdentity();   // initialize the stack with the identity
  this.stack.multiply(V);      // multiply by the view matrix


  /* CAR */
  this.stack.push();
  this.stack.multiply(this.car.frame);


  this.drawCar(gl, useShader);
  this.stack.pop();
  gl.useProgram(null);
}


Renderer.drawScene = function (gl, useShader) {
  gl.useProgram(useShader);
  sun.direction = Game.scene.weather.sunLightDirection;
  sun.color = Game.scene.weather.sunLightColor;

  
  var width = this.canvas.width;
  var height = this.canvas.height
  var ratio = width / height;
  this.stack = new MatrixStack();


  view_transform = Renderer.cameras[Renderer.currentCamera].matrix();   // setup the view transform
  proj_transform = Renderer.HeadlightProjector.matrix();                // headlight projector transform
  var inv_view_matrix = glMatrix.mat4.create();                         // inverse of the viewMatrix
  glMatrix.mat4.invert(inv_view_matrix, view_transform);

  /* Projection Matrix (to be used for both the camera and the projector) */
  let proj = glMatrix.mat4.perspective(glMatrix.mat4.create(),3.14 / 4, ratio, 1, 500);


  glMatrix.mat4.fromScaling(scale_matrix,[4,1,4]);
  gl.uniformMatrix4fv(useShader.uM,false,scale_matrix);



  gl.uniformMatrix4fv(useShader.uViewMatrixLocation,       false,  view_transform);
  gl.uniformMatrix4fv(useShader.uRotationMatrixLocation,   false,  rotation_matrix);
  gl.uniformMatrix4fv(useShader.uProjectionMatrixLocation, false,  proj);


  /* the shader will just output the base color if a null light direction is given */
  gl.uniform3fv(useShader.uLightDirectionLocation,sun.direction);
  gl.uniform3fv(useShader.uLightColorLocation,sun.color);


  gl.uniformMatrix4fv(useShader.uHeadlightsViewMatrix,  false,  proj_transform);
  gl.uniformMatrix4fv(useShader.uInverseViewMatrix,     false,  inv_view_matrix);
  gl.uniformMatrix4fv(useShader.uLightProjectionMatrix, false,  proj);



  Renderer.cameras[Renderer.currentCamera].update(this.car.frame);
  Renderer.HeadlightProjector.update(this.car.frame);


  var V = Renderer.cameras[Renderer.currentCamera].matrix();



  this.stack.loadIdentity();   // initialize the stack with the identity
  this.stack.multiply(V);      // multiply by the view matrix


  /* CAR */
  this.stack.push();
  this.stack.multiply(this.car.frame);

  gl.uniform1f(useShader.u_texture_blending, 0);  // the car has no textures -- set col->tex blending to 0

  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, Renderer.HEADLIGHTS);
  gl.activeTexture(gl.TEXTURE0);

  this.drawCar(gl, useShader);
  this.stack.pop();


  gl.uniform1f(useShader.u_flat_blending, .7);
  gl.uniformMatrix4fv(useShader.uM, false, this.stack.matrix);


  /* STATIC ELEMENTS:*/
  gl.uniform1f(useShader.u_texture_blending, 1); // TEXTURES ON

  /* 1. GROUND */
  gl.bindTexture(gl.TEXTURE_2D, Renderer.GRASS_TEXTURE);
  gl.uniform1i(useShader.uSamplerLocation, 0);
  gl.uniform1i(useShader.uProjectionSamplerLocation, 1);
  this.drawObject(gl, Game.scene.groundObj, [0.3, 0.7, 0.2, 1.0], [0, 0, 0, 1.0], useShader);

  /* 2. STREET */
  gl.bindTexture(gl.TEXTURE_2D, Renderer.STREET_TEXTURE);
  gl.uniform1f(useShader.u_flat_blending, .9);
  this.drawObject(gl, Game.scene.trackObj, [0.9, 0.8, 0.7, 1.0], [0, 0, 0, 1.0], useShader);


  /* 3. BUILDINGS */
  gl.uniform1f(useShader.u_flat_blending, .7);
  gl.bindTexture(gl.TEXTURE_2D, Renderer.FACADES[1]);

  for (var i in Game.scene.buildingsObjTex)
    this.drawObject(gl, Game.scene.buildingsObjTex[i], [0.8, 0.8, 0.8, 1.0], [0.2, 0.2, 0.2, 1.0], useShader);

  gl.bindTexture(gl.TEXTURE_2D, Renderer.ROOF);

  for (var i in Game.scene.buildingsObjTex)
    this.drawObject(gl, Game.scene.buildingsObjTex[i].roof, [0.8, 0.8, 0.8, 1.0], [0.2, 0.2, 0.2, 1.0], useShader);

  gl.uniform1f(useShader.u_texture_blending, 0);  // TEXTURES OFF



  if(useShader === shaders[0])
    for(var i = 0; i<12; i++){
      gl.uniform3fv(useShader.uLampLocation[i], lamp_position_array[i]);
    }

  //gl.bindTexture(gl.TEXTURE_2D, null);
  gl.useProgram(null);
};



Renderer.Display = function () {
  let gl = Renderer.gl

  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);

  var width = Renderer.canvas.width;
  var height = Renderer.canvas.height
  var ratio = width / height;

  // SHADOW PASS
  /*gl.useProgram(shaders[1]);

  gl.bindFramebuffer(gl.FRAMEBUFFER,Renderer.framebuffer);
  gl.viewport(0, 0, shadowMapSize, shadowMapSize);
  gl.clearColor(1.0,1.0,1.0,1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  Renderer.drawScene1(Renderer.gl, shaders[1]);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);*/


  gl.viewport(0, 0, shadowMapSize, shadowMapSize);
  gl.bindFramebuffer(gl.FRAMEBUFFER,Renderer.framebuffer);
  gl.cullFace(gl.BACK);
  gl.enable(gl.DEPTH_TEST);
  gl.useProgram(shaders[1]);

  gl.bindTexture(gl.TEXTURE_2D, null);

  gl.clearColor(1, 1, 1, 1);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

  Renderer.drawScene(Renderer.gl, shaders[1]);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null)
  // LIGHT PASS

  gl.viewport(0, 0, width, height);

  gl.cullFace(gl.BACK);
  gl.enable(gl.DEPTH_TEST);
  gl.useProgram(shaders[0]);

  gl.bindTexture(gl.TEXTURE_2D, null);

  gl.uniform1i(shaders[0].uDepthSamplerLocation,2);
  gl.clearColor(0.34, 0.5, 0.74, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

  gl.activeTexture(gl.TEXTURE2);
  gl.bindTexture(gl.TEXTURE_2D, Renderer.framebuffer.depthTexture);
  Renderer.drawScene(Renderer.gl, shaders[0]);
  gl.bindTexture(gl.TEXTURE_2D, null);


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

  Renderer.gl.getExtension('OES_standard_derivatives');
  var ext = Renderer.gl.getExtension('WEBGL_depth_texture');
  if (!ext) return alert('need WEBGL_depth_texture');

  /* create the matrix stack */
  Renderer.stack = new MatrixStack();

  /* initialize objects to be rendered */
  Renderer.initializeObjects(Renderer.gl);

  shaders.push(new lightingShader(Renderer.gl));
  shaders.push(new depthShader(Renderer.gl));

  /* create the shader */
  Renderer.shader = shaders[0];

  Renderer.framebuffer = createFramebuffer(Renderer.gl,shadowMapSize);                                      // CREATE FRAMEBUFFER

  /*
   *  add listeners for the mouse / keyboard events
   */
  Renderer.canvas.addEventListener('mousemove',on_mouseMove,false);
  Renderer.canvas.addEventListener('keydown',on_keydown,false);
  Renderer.canvas.addEventListener('keyup',on_keyup,false);
  Renderer.canvas.addEventListener('mouseup',on_mouseup,false);
  Renderer.canvas.addEventListener('mousedown',on_mousedown,false);




  Renderer.Display();
}

drag = false;

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


on_mousedown = function(e){
  drag = true;
  startX = e.clientX;
  startY = e.clientY;

}

Rphi      = glMatrix.mat4.create();
Rtheta    = glMatrix.mat4.create();

on_mouseMove = function(e){
  if(!drag)
    return;

  deltaX = e.clientX-startX;
  deltaY = e.clientY-startY;


  glMatrix.mat4.fromRotation(Rphi  , -deltaX * 0.002,[0,1,0]);
  glMatrix.mat4.fromRotation(Rtheta,  deltaY * 0.002,flying_camera_localX);
  glMatrix.mat4.mul(Rphi,Rphi,Rtheta);

  newDir = glMatrix.vec3.create();
  targetOffset = glMatrix.vec3.transformMat4(newDir, targetOffset ,Rphi);

  startX =  e.clientX;
  startY =  e.clientY;

}
on_mouseup = function(e){
  drag = false;
  rotating = false;
}
