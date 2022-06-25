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
  T                 = glMatrix.mat4.create();
  rotate_transform  = glMatrix.mat4.create();
  translate_matrix  = glMatrix.mat4.create();
  scale_matrix      = glMatrix.mat4.create();

  tpot_scale_matrix = glMatrix.mat4.create();
  tpot_trans_matrix = glMatrix.mat4.create();

  glMatrix.mat4.fromTranslation(translate_matrix,[0,1,1]);
  glMatrix.mat4.fromScaling(scale_matrix,[0.7,0.25,1]);
  glMatrix.mat4.mul(M,scale_matrix,translate_matrix);
  glMatrix.mat4.fromRotation(rotate_transform,-0.1,[1,0,0]);
  glMatrix.mat4.mul(M,rotate_transform,M);
  glMatrix.mat4.fromTranslation(translate_matrix,[0,0.1,-1]);
  glMatrix.mat4.mul(M,translate_matrix,M);

  glMatrix.mat4.fromTranslation(tpot_trans_matrix,[0, 3.8,2]);
  glMatrix.mat4.fromScaling(tpot_scale_matrix,[0.2,0.2,.2]);
  glMatrix.mat4.mul(T,tpot_scale_matrix,tpot_trans_matrix);

  Renderer.stack.push();

  Renderer.stack.multiply(T);

  gl.uniformMatrix4fv(useShader.uM, false, this.stack.matrix);

  gl.uniform1f(useShader.uVeryShiny, 1.0);

  this.drawObject(gl,this.teapot,[1,1,1,1.0],[.95,.95,.95,1.0], useShader);

  Renderer.stack.pop();
  Renderer.stack.push();
  gl.uniform1f(useShader.uVeryShiny, 0.0);
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
proj_transform_R  = glMatrix.mat4.create();
proj_transform_L  = glMatrix.mat4.create();

identity          = glMatrix.mat4.create();
scale_matrix      = glMatrix.mat4.create();
rotation_matrix   = glMatrix.mat4.create();



Renderer.drawScene = function (gl, useShader, right) {
  gl.useProgram(useShader);
  gl.uniform1f(useShader.uPlainColor, 0.0);

  // SLIDERS
  gl.uniform1f(useShader.uFogMulOffset,       getSlider("fog"));
  gl.uniform1f(useShader.uHeadlightMulOffset, getSlider("headlight"));
  gl.uniform1f(useShader.uInnerConeOffset,    getSlider("inner"));
  gl.uniform1f(useShader.uOuterConeOffset,    getSlider("outer"));
  gl.uniform1f(useShader.uShadowBias,         getSlider("bias"));
  gl.uniform1f(useShader.uLampIntensity,      getSlider("lamp_int"));

  sun.direction = Game.scene.weather.sunLightDirection;
  sun.color = Game.scene.weather.sunLightColor;


  var width = this.canvas.width;
  var height = this.canvas.height
  var ratio = width / height;
  this.stack = new MatrixStack();


  view_transform = Renderer.cameras[Renderer.currentCamera].matrix();   // setup the view transform
  proj_transform_R = Renderer.HeadlightProjectorR.matrix();                // headlight projector transform
  proj_transform_L = Renderer.HeadlightProjectorL.matrix();                // headlight projector transform

  var inv_view_matrix = glMatrix.mat4.create();                         // inverse of the viewMatrix
  glMatrix.mat4.invert(inv_view_matrix, view_transform);

  /* Projection Matrices */
  let proj_camera = glMatrix.mat4.perspective(glMatrix.mat4.create(),3.14 / 4, ratio, 1, 500);
  let proj_light  = glMatrix.mat4.perspective(glMatrix.mat4.create(),3.14 / 4, ratio, 1, 500);

  glMatrix.mat4.fromScaling(scale_matrix,[4,1,4]);
  gl.uniformMatrix4fv(useShader.uM,false,scale_matrix);



  gl.uniformMatrix4fv(useShader.uViewMatrixLocation,       false,  view_transform);
  gl.uniformMatrix4fv(useShader.uRotationMatrixLocation,   false,  rotation_matrix);
  gl.uniformMatrix4fv(useShader.uProjectionMatrixLocation, false,  proj_camera);


  /* the shader will just output the base color if a null light direction is given */
  gl.uniform3fv(useShader.uLightDirectionLocation,sun.direction);
  gl.uniform3fv(useShader.uLightColorLocation,sun.color);



  if(right) gl.uniformMatrix4fv(useShader.uHeadlightsViewMatrix,  false,  proj_transform_R);
  else      gl.uniformMatrix4fv(useShader.uHeadlightsViewMatrix,  false,  proj_transform_L);


  gl.uniformMatrix4fv(useShader.uHeadlightsViewMatrixR,  false,  proj_transform_R);
  gl.uniformMatrix4fv(useShader.uHeadlightsViewMatrixL,  false,  proj_transform_L);

  gl.uniformMatrix4fv(useShader.uInverseViewMatrix,     false,  inv_view_matrix);
  gl.uniformMatrix4fv(useShader.uLightProjectionMatrix, false,  proj_light);



  Renderer.cameras[Renderer.currentCamera].update(this.car.frame);
  Renderer.HeadlightProjectorR.update(this.car.frame);
  Renderer.HeadlightProjectorL.update(this.car.frame);

  var V = Renderer.cameras[Renderer.currentCamera].matrix();



  this.stack.loadIdentity();   // initialize the stack with the identity
  this.stack.multiply(V);      // multiply by the view matrix


  /* CAR */
  this.stack.push();
  this.stack.multiply(this.car.frame);

  gl.uniform1f(useShader.u_texture_blending, 0);  // the car has no textures -- set col->tex blending to 0

  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, Renderer.HEADLIGHTS);
  gl.activeTexture(gl.TEXTURE3);
  gl.bindTexture(gl.TEXTURE_2D, Renderer.HEADLIGHTS);
  gl.activeTexture(gl.TEXTURE0);

  this.drawCar(gl, useShader);
  this.stack.pop();


  gl.uniform1f(useShader.u_flat_blending, 1);
  gl.uniformMatrix4fv(useShader.uM, false, this.stack.matrix);


  /* STATIC ELEMENTS:*/
  gl.uniform1f(useShader.u_texture_blending, 1); // TEXTURES ON

  /* 1. GROUND */
  gl.bindTexture(gl.TEXTURE_2D, Renderer.GRASS_TEXTURE);

  gl.uniform1i(useShader.uSamplerLocation, 0);

  gl.uniform1i(useShader.uProjectionSamplerRLocation, 1);
  gl.uniform1i(useShader.uProjectionSamplerLLocation, 3);

  gl.uniform1f(useShader.u_flat_blending, 1);
  this.drawObject(gl, Game.scene.groundObj, [0.3, 0.7, 0.2, 1.0], [0, 0, 0, 1.0], useShader);

  /* 2. STREET */
  gl.bindTexture(gl.TEXTURE_2D, Renderer.STREET_TEXTURE);
  gl.uniform1f(useShader.u_flat_blending, 1);
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
      let M         = glMatrix.mat4.create();
      let M1        = glMatrix.mat4.create();
      let scale_mat = glMatrix.mat4.create();

      glMatrix.mat4.fromTranslation(M, [lamp_position_array[i][0], lamp_position_array[i][1] + 3, lamp_position_array[i][2]]);

      let max_slider = Math.max(getSlider("inner"), getSlider("outer"))

      let h_scale = (max_slider / 100) * 1.6;
      let v_scale = (1-(max_slider / 100)) * .4;

      glMatrix.mat4.fromScaling(scale_mat, [h_scale, v_scale, h_scale, 0]);
      glMatrix.mat4.mul(M, M, scale_mat);

      this.stack.multiply(M);
      gl.uniformMatrix4fv(useShader.uM, false, this.stack.matrix);
       gl.uniform1f(useShader.uPlainColor, 1.0);
      this.drawObject(gl, this.cone, [1., 1., 1., 1.0], [0.2, 0.2, 0.2, 1.0], useShader);
       gl.uniform1f(useShader.uPlainColor, 0.0);
      glMatrix.mat4.invert(M1, M);

      this.stack.multiply(M1);
      gl.uniform3fv(useShader.uLampLocation[i], lamp_position_array[i]);
    }

  //gl.bindTexture(gl.TEXTURE_2D, null);
  gl.useProgram(null);
};
