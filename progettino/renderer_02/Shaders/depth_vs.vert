attribute vec3 aPosition;
uniform   mat4 uHeadlightsViewMatrix;
uniform   mat4 uInverseViewMatrix;
uniform   mat4 uLightProjectionMatrix;
uniform   mat4 uM;

void main(void){
  gl_Position = uLightProjectionMatrix * uHeadlightsViewMatrix * uInverseViewMatrix * uM * vec4(aPosition, 1.0);
}
