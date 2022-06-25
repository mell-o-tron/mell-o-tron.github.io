precision highp float;

uniform vec3 uLightDirection;
uniform mat4 uViewMatrix;
uniform mat4 uInverseViewMatrix;
uniform mat4 uHeadlightsViewMatrixL;
uniform mat4 uHeadlightsViewMatrixR;

// positional light: position and color
uniform vec3 uLightColor;
uniform vec3 uColor;
uniform sampler2D uSampler;
uniform sampler2D uProjectionSamplerR;
uniform sampler2D uDepthSamplerR;

uniform sampler2D uProjectionSamplerL;
uniform sampler2D uDepthSamplerL;
// sliders
uniform float uFogMulOffset;
uniform float uHeadlightMulOffset;
uniform float uInnerConeOffset;
uniform float uOuterConeOffset;
uniform float uShadowBias;
uniform float uLampIntensity;

uniform float uVeryShiny;
uniform float uPlainColor;

varying vec3 vnormal;
varying vec3 vpos;
varying vec2 vTexCoords;

varying vec4 vprojectedThingR;
varying vec4 vprojectedThingL;


float specular_mul;


float darkness_blending = 0.5;

uniform float u_flat_blending;

uniform float u_texture_blending;

uniform vec3 uLampLocation[12];



vec3 specular_component(vec3 N, vec3 L, float NdotL, float exp, vec3 lightColor){
    vec3 V=normalize(-vpos);

    vec3 R = normalize((2.0 * NdotL * N) - L);

    float RdotV = max(0.0, dot(R, V));

    float spec = pow(RdotV, exp);

    return (specular_mul * lightColor) * spec;
}


vec3 headlightComponent(mat4 hvm, vec2 ptc, vec4 pThing, sampler2D depthSampler, sampler2D ProjectionSampler, vec3 pos_hls){
    vec3 projected = 1. * texture2D(ProjectionSampler, ptc).xyz;

    // multiplier for the projected light
    float coef = 0.;
    float ProjectorZ = (hvm * uInverseViewMatrix * vec4(vpos, 1.)).z;

    if( ProjectorZ < -2.
          && ptc.x <= 1. && ptc.x >= 0.
          && ptc.y <= 1. && ptc.y >= 0.) coef = 1.;


    // SHADOWS
    vec3 tC = (pThing/pThing.w).xyz*0.5+0.5;

    if(ProjectorZ < -1. && tC.x > 0.0 && tC.x < 1.0 && tC.y > 0.0 && tC.y < 1.0 ){
        float storedDepth ;
        float bias = 0.001 * uShadowBias / 10.;

        storedDepth =  texture2D(depthSampler,tC.xy).x;
        if(storedDepth+bias < tC.z)
            coef = 0.;
    }

    coef /= length(pos_hls * pos_hls);
    coef *= (uHeadlightMulOffset);

    return projected * coef;
}


void main()
{

    specular_mul = 1.;

    if(uVeryShiny > 0.) specular_mul = 20.;


    // position in world space and "headlight space"
    vec3 wpos = (uInverseViewMatrix * vec4(vpos, 1.)).xyz;

    vec3 pos_hlsR = (uHeadlightsViewMatrixR * vec4(wpos, 1.)).xyz;
    vec3 pos_hlsL = (uHeadlightsViewMatrixL * vec4(wpos, 1.)).xyz;

    // normalize interpolated normal
    vec3 N = normalize(vnormal);

    // light vector (positional light)
    vec3 L = normalize(uViewMatrix * vec4(-uLightDirection, 0)).xyz;

    // diffuse component
    float NdotL_raw = dot(N, L);
    float NdotL = max(0., NdotL_raw);
    float NdotL_Ambient = max(darkness_blending, NdotL_raw);

    vec2 vProjectedTexCoordsR = (vprojectedThingR/vprojectedThingR.z).xy * .5 + .5;
    vec2 vProjectedTexCoordsL = (vprojectedThingL/vprojectedThingL.z).xy * .5 + .5;

    // texture sampler (texture)
    vec3 texture = 1. * texture2D(uSampler, vTexCoords).xyz;


    vec3 headlightCompR = headlightComponent(uHeadlightsViewMatrixR,
                                             vProjectedTexCoordsR,
                                             vprojectedThingR,
                                             uDepthSamplerR,
                                             uProjectionSamplerR,
                                             pos_hlsR);


    vec3 headlightCompL = headlightComponent(uHeadlightsViewMatrixL,
                                             vProjectedTexCoordsL,
                                             vprojectedThingL,
                                             uDepthSamplerL,
                                             uProjectionSamplerL,
                                             pos_hlsL);

    vec3 headlightComp = headlightCompR + headlightCompL;

    vec3 col_tex_blending = u_texture_blending * texture.xyz + (1. - u_texture_blending) * uColor + headlightComp;

    vec3 lambert = (col_tex_blending) * NdotL_Ambient;


    // specular component
    vec3 specular;
    if(uVeryShiny > 0.)
         specular = specular_component(N, L, NdotL, 100., uLightColor);
    else
         specular = specular_component(N, L, NdotL, 4., uLightColor);

    vec3 final = lambert + (specular * (1.-u_flat_blending));

    float lamp_intensity = uLampIntensity/30.;

    for(int i = 0; i < 12; i++){

        vec3 VS_lamp_position = (uViewMatrix * vec4(uLampLocation[i], 1.0)).xyz;

         vec3 lamp_L = (VS_lamp_position + (uViewMatrix * vec4(0.,3.,0.,0.)).xyz) - vpos;

        float distance = sqrt(dot(lamp_L, lamp_L));



        float lamp_NdotL = max(0., dot(N, normalize(lamp_L)));
        vec3 lamp_color = vec3(1, .5, .5);

        vec3 lamp_specular;
        if(uVeryShiny > 0.)
             lamp_specular = specular_component(N, lamp_L, lamp_NdotL, 80., lamp_color);
        else
             lamp_specular = specular_component(N, lamp_L, lamp_NdotL, 4., lamp_color);

        vec3 lamp_contribution = max(0., dot(N, lamp_L) / (distance*distance)) * lamp_color * lamp_intensity + (lamp_specular * (1.-u_flat_blending));
        vec3 surface_to_lamp_vs = lamp_L;

        float uhm = dot(normalize(surface_to_lamp_vs), normalize((uViewMatrix * vec4(0.,1.,0.,0.)).xyz));

        float outer_cone = 1. - uOuterConeOffset/100.;      // smaller value => larger radius
        float inner_cone = 1. -  uInnerConeOffset/100.;

        if(uhm > inner_cone) final += lamp_contribution;
        if(uhm > outer_cone && uhm < inner_cone)
            final += lamp_contribution * ((uhm - outer_cone)*(1./(inner_cone - outer_cone)));

    }

    // FOG (again)
    final += vec3(length(vpos)/2., length(vpos)/2., length(vpos)) * (.004 + uFogMulOffset / 10000.);

    if(uPlainColor > 0.) final = uColor;

    gl_FragColor  = vec4(final, 1.0);
}
