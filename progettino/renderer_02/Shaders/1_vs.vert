uniform   mat4 uProjectionMatrix;
uniform   mat4 uLightProjectionMatrix;
uniform   mat4 uViewMatrix;
uniform   mat4 uRotationMatrix;
uniform   mat4 uM;
uniform   mat4 uFrame;

uniform   mat4 uInverseViewMatrix;

uniform   mat4 uHeadlightsViewMatrix;


attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexCoords;

uniform   vec3 uColor;


//varying vec2 vProjectedTexCoords;

// computed color to be interpolated
varying vec3 vShadedColor;
void main(void)
{

    // in realtà qua dovrei mettere trasposta inversa ma non faccio trasformazioni strane
    mat4 uViewSpaceNormalMatrix = uM;

    // vertex position (in view space)
    vec4 position = vec4(aPosition, 1.0);

    gl_Position = uProjectionMatrix * uHeadlightsViewMatrix * uInverseViewMatrix *  uM * position;
}
