console.log("Version Name:");
console.log("Pretty Much Done");

/* directional light */
DirLight = function(){
  this.direction = [1,-1,0];
  this.color = [1,.8,.9];
}

sun = new DirLight();

shadowMapSize = 512.0

shaders = []




Texture_Projector_R = function(){
  this.frame = [0,0,0];

  /* update the projector with the current car position */
  this.update = function(car_frame){
    this.frame = car_frame.slice();
  }

  /* return the transformation matrix to transform from world coordiantes to the view reference frame */
  this.matrix = function(){
    let eye = glMatrix.vec3.create();
    let target = glMatrix.vec3.create();

    glMatrix.vec3.transformMat4(eye, [.5, .5, -1., 1.0], this.frame);

    glMatrix.vec3.transformMat4(target, [.5,.5,-2.0,1.0], this.frame);
    return glMatrix.mat4.lookAt(glMatrix.mat4.create(),eye, target,[0, 1, 0]);
  }
}


Texture_Projector_L = function(){
  this.frame = [0,0,0];

  /* update the projector with the current car position */
  this.update = function(car_frame){
    this.frame = car_frame.slice();
  }

  /* return the transformation matrix to transform from world coordiantes to the view reference frame */
  this.matrix = function(){
    let eye = glMatrix.vec3.create();
    let target = glMatrix.vec3.create();

    glMatrix.vec3.transformMat4(eye, [-.5, .5, -1., 1.0], this.frame);

    glMatrix.vec3.transformMat4(target, [-.5,.5,-2.0,1.0], this.frame);
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
Renderer.currentCamera = 0;                                       // FORCE CHASE CAMERA (!)

Renderer.HeadlightProjectorR = new Texture_Projector_R();
Renderer.HeadlightProjectorL = new Texture_Projector_L();


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



Renderer.Display = function () {
  let gl = Renderer.gl

  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);

  var width = Renderer.canvas.width;
  var height = Renderer.canvas.height
  var ratio = width / height;

  // SHADOW PASS R
  gl.viewport(0, 0, shadowMapSize, shadowMapSize);
  gl.bindFramebuffer(gl.FRAMEBUFFER,Renderer.framebufferR);
  gl.cullFace(gl.BACK);
  gl.enable(gl.DEPTH_TEST);
  gl.useProgram(shaders[1]);

  gl.bindTexture(gl.TEXTURE_2D, null);

  gl.clearColor(1, 1, 1, 1);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

  Renderer.drawScene(Renderer.gl, shaders[1], true);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null)

  // SHADOW PASS L
  gl.viewport(0, 0, shadowMapSize, shadowMapSize);
  gl.bindFramebuffer(gl.FRAMEBUFFER,Renderer.framebufferL);
  gl.cullFace(gl.BACK);
  gl.enable(gl.DEPTH_TEST);
  gl.useProgram(shaders[1]);

  gl.bindTexture(gl.TEXTURE_2D, null);

  gl.clearColor(1, 1, 1, 1);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

  Renderer.drawScene(Renderer.gl, shaders[1], false);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null)


  // LIGHT PASS

  gl.viewport(0, 0, width, height);

  gl.cullFace(gl.BACK);
  gl.enable(gl.DEPTH_TEST);
  gl.useProgram(shaders[0]);

  gl.bindTexture(gl.TEXTURE_2D, null);

  gl.uniform1i(shaders[0].uDepthSamplerRLocation,2);
  gl.uniform1i(shaders[0].uDepthSamplerLLocation,4);

  gl.clearColor(0.34, 0.5, 0.74, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

  gl.activeTexture(gl.TEXTURE2);
  gl.bindTexture(gl.TEXTURE_2D, Renderer.framebufferR.depthTexture);

  gl.activeTexture(gl.TEXTURE4);
  gl.bindTexture(gl.TEXTURE_2D, Renderer.framebufferL.depthTexture);

  Renderer.drawScene(Renderer.gl, shaders[0], false);
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

  Renderer.framebufferR = createFramebuffer(Renderer.gl,shadowMapSize);                                 // CREATE FRAMEBUFFERS
  Renderer.framebufferL = createFramebuffer(Renderer.gl,shadowMapSize);
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


window.onload = Renderer.setupAndStart;


update_camera = function (value){
  Renderer.currentCamera = value;
}


