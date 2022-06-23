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

30
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

    let distance = getSlider("camera_distance")/8;
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

