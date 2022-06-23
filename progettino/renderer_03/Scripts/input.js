
drag = false;

on_mouseMove = function(e){}

on_keyup = function(e){
  Renderer.car.control_keys[e.key] = false;
}
on_keydown = function(e){
  Renderer.car.control_keys[e.key] = true;
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
