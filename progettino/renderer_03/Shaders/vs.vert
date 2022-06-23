uniform   mat4 uProjectionMatrix;
uniform   mat4 uLightProjectionMatrix;
uniform   mat4 uViewMatrix;
uniform   mat4 uRotationMatrix;
uniform   mat4 uM;
uniform   mat4 uFrame;

uniform   mat4 uInverseViewMatrix;

uniform   mat4 uHeadlightsViewMatrixR;
uniform   mat4 uHeadlightsViewMatrixL;

attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexCoords;

uniform   vec3 uColor;


varying vec3 vpos;
varying vec3 vnormal;
varying vec2 vTexCoords;

varying vec4 vprojectedThingR;
varying vec4 vprojectedThingL;
//varying vec2 vProjectedTexCoords;

// computed color to be interpolated
varying vec3 vShadedColor;
void main(void)
{

    // in realtà qua dovrei mettere trasposta inversa ma non faccio trasformazioni strane
    mat4 uViewSpaceNormalMatrix = uM;

    // vertex normal (in view space)
    vnormal = normalize(uViewSpaceNormalMatrix * vec4(aNormal, 0)).xyz;

    // texture coordinates
    vTexCoords = vec2(aTexCoords.x,aTexCoords.y);


    // vertex position (in view space)
    vec4 position = vec4(aPosition, 1.0);
    vpos = vec3(uM * position);

    // projector's texture coordinates

    vprojectedThingR = uLightProjectionMatrix * uHeadlightsViewMatrixR * uInverseViewMatrix * uM * position;
    vprojectedThingL = uLightProjectionMatrix * uHeadlightsViewMatrixL * uInverseViewMatrix * uM * position;

    //vProjectedTexCoords = (posProj).xy;

    // output
    gl_Position = uProjectionMatrix * uM * position;
}
