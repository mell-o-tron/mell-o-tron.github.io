precision highp float;

uniform vec3 uLightDirection;
uniform mat4 uViewMatrix;
uniform mat4 uInverseViewMatrix;
uniform mat4 uHeadlightsViewMatrix;

// positional light: position and color
uniform vec3 uLightColor;
uniform vec3 uColor;
uniform sampler2D uSampler;
uniform sampler2D uProjectionSampler;
uniform sampler2D uDepthSampler;

varying vec3 vnormal;
varying vec3 vpos;
varying vec2 vTexCoords;

//varying vec2 vProjectedTexCoords;

varying vec4 vprojectedThing;

vec4 vdiffuse;
vec4 vambient;
vec4 vspecular;
vec4 vshininess;

float darkness_blending = 0.5;

uniform float u_flat_blending;

uniform float u_texture_blending;

uniform vec3 uLampLocation[12];


vec3 specular_component(vec3 N, vec3 L, float NdotL, float exp, vec3 lightColor){
    vec3 V=normalize(-vpos);

    vec3 R = (2.0 * NdotL * N) - L;

    float RdotV = max(0.0, dot(R, V));

    float spec = pow(RdotV, exp);

    return (vspecular.xyz * lightColor) * spec;
}

void main()
{
    vdiffuse = vec4(0.1,0.1,0.1,0.0);
    vambient = vec4(0.3,0.3,0.3,0.0);
    vspecular = vec4(0.5,0.5,0.5,0.0);
    vshininess = vec4(1, 0., 0., 0.);

    // normalize interpolated normal
    vec3 N = normalize(vnormal);

    // light vector (positional light)
    vec3 L = normalize(uViewMatrix * vec4(-uLightDirection, 0)).xyz;

    // diffuse component
    float NdotL_raw = dot(N, L);

    float NdotL = max(0., NdotL_raw);

    float NdotL_Ambient = max(darkness_blending, NdotL_raw);

    vec2 vProjectedTexCoords = (vprojectedThing/vprojectedThing.z).xy * .5 + .5;

    vec3 texture = 1. * texture2D(uSampler, vTexCoords).xyz;
    vec3 projected = 1. * texture2D(uProjectionSampler, vProjectedTexCoords).xyz;

    float coef = 0.;

    float ProjectorZ = (uHeadlightsViewMatrix * uInverseViewMatrix * vec4(vpos, 1.)).z;

    if( ProjectorZ < -1.// -1 perché è la z del proiettore
          && vProjectedTexCoords.x <= 1. && vProjectedTexCoords.x >= 0.
          && vProjectedTexCoords.y <= 1. && vProjectedTexCoords.y >= 0.) coef = 1.;

    vec3 tC = (vprojectedThing/vprojectedThing.w).xyz*0.5+0.5;

    if(ProjectorZ < -1. && tC.x > 0.0 && tC.x < 1.0 && tC.y > 0.0 && tC.y < 1.0 ){
        float storedDepth ;
        float bias = 0.001;

        storedDepth =  texture2D(uDepthSampler,tC.xy).x;
        if(storedDepth+bias < tC.z)
            coef = 0.;
    }


    vec3 col_tex_blending = u_texture_blending * texture.xyz + (1. - u_texture_blending) * uColor + projected * coef;

    vec3 lambert = (col_tex_blending) * NdotL_Ambient;


    // specular component
    vec3 specular = specular_component(N, L, NdotL, 4., uLightColor);

    vec3 final = lambert + (specular * (1.-u_flat_blending));

    vec3 wpos = (uInverseViewMatrix * vec4(vpos, 1.)).xyz;

    for(int i = 0; i < 12; i++){

        vec3 VS_lamp_position = (uViewMatrix * vec4(uLampLocation[i], 1.0)).xyz;

        // calcolo la distanza tra il punto in view space e la lampada

        //float distance = sqrt(dot(uLampLocation[i] - wpos, uLampLocation[i] - wpos));
        float distance = sqrt(dot(VS_lamp_position - vpos, VS_lamp_position - vpos));


        //final += vec3(distance /100., distance/100., distance/100.);

        vec3 lamp_L = (VS_lamp_position + (uViewMatrix * vec4(0.,3.,0.,0.)).xyz) - vpos;

        float lamp_NdotL = max(0., dot(N, lamp_L));

        vec3 lamp_color = vec3(1, .5, .5);

        vec3 lamp_specular = specular_component(N, lamp_L, NdotL, 1., lamp_color)/100000.;

        vec3 lamp_contribution = max(0., dot(N, lamp_L) / (distance*distance)) * lamp_color;

        vec3 surface_to_lamp_vs = lamp_L;

        float uhm = dot(normalize(surface_to_lamp_vs), normalize((uViewMatrix * vec4(0.,1.,0.,0.)).xyz));
        if(uhm > .7)
            final += lamp_contribution;

    }




    gl_FragColor  = vec4(final, 1.0);
}
