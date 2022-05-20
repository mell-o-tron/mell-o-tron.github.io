lightingShader = function (gl) {//line 1,Listing 2.14
  var vertexShaderSource = `
    uniform   mat4 uProjectionMatrix;    
    uniform   mat4 uViewMatrix;               
    uniform   mat4 uRotationMatrix;
    uniform   mat4 uM;
    uniform   mat4 uFrame;
    
    //uniform   mat4 uViewSpaceNormalMatrix;
    
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec2 aTexCoords;

    uniform   vec3 uColor;
    
    uniform   vec3 uLightDirection;

    varying vec3 vpos;   
    varying vec3 vnormal;
    varying vec2 vTexCoords;
    
    // computed color to be interpolated 
    varying vec3 vShadedColor;
    void main(void)                                
    {   

        // in realtà qua dovrei mettere trasposta inversa ma boh ok
        mat4 uViewSpaceNormalMatrix = uM;
        
        // vertex normal (in view space)   
        vnormal = normalize(uViewSpaceNormalMatrix * vec4(aNormal, 0)).xyz;

        // texture coordinates
        vTexCoords = vec2(aTexCoords.x,aTexCoords.y);

        // vertex position (in view space) 
        vec4 position = vec4(aPosition, 1.0);
        vpos = vec3(uM * position); 

        // output 
        gl_Position = uProjectionMatrix *uM * position; 
    }                                              
  `;

  var fragmentShaderSource = `
    precision highp float;

    uniform vec3 uLightDirection;
    uniform mat4 uViewMatrix;
    uniform mat4 uInverseViewMatrix;

    // positional light: position and color
    uniform vec3 uLightColor;  
    uniform vec3 uColor;    
    uniform sampler2D uSampler;

    varying vec3 vnormal;
    varying vec3 vpos;   
    varying vec2 vTexCoords;

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
        
        vec3 col_tex_blending = u_texture_blending * texture2D(uSampler,vTexCoords).xyz + (1. - u_texture_blending) * uColor;

        vec3 lambert = (col_tex_blending) * NdotL_Ambient;
        
        
        // specular component
        vec3 specular = specular_component(N, L, NdotL, 4., uLightColor);
        
        vec3 final = lambert + (specular * (1.-u_flat_blending));
        
        
        for(int i = 0; i < 12; i++){
            vec3 wpos = (uInverseViewMatrix * vec4(vpos, 1.)).xyz;
            vec3 VS_lamp_position = (uViewMatrix * vec4(uLampLocation[i], 1.0)).xyz;
            
            // calcolo la distanza tra il punto in world space e la lampada
            
            //float distance = sqrt(dot(uLampLocation[i] - wpos, uLampLocation[i] - wpos));
            float distance = sqrt(dot(VS_lamp_position - vpos, VS_lamp_position - vpos));
            
            
            //final += vec3(distance /100., distance/100., distance/100.);
            
            vec3 lamp_L = (VS_lamp_position + vec3(0.,3.,0.)) - vpos;
            
            float lamp_NdotL = max(0., dot(N, lamp_L));
            
            vec3 lamp_color = vec3(1, .5, .5);
            
            vec3 lamp_specular = specular_component(N, lamp_L, NdotL, 1., lamp_color)/100000.;
            
            vec3 lamp_contribution = max(0., dot(N, lamp_L) / (distance*distance)) * lamp_color;
            
            final += lamp_contribution + (lamp_specular * (1.-u_flat_blending));

            
        }
        
        gl_FragColor  = vec4(final, 1.0);     
    }`;
  
  // create the vertex shader
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  // create the fragment shader
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  // Create the shader program
  var aPositionIndex = 0;
  var aDiffuseIndex = 1;
  var aNormalIndex = 2;
  var aTexCoordsIndex = 3;

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.bindAttribLocation(shaderProgram, aPositionIndex, "aPosition");
  gl.bindAttribLocation(shaderProgram, aDiffuseIndex, "aDiffuse");
  gl.bindAttribLocation(shaderProgram, aNormalIndex, "aNormal");
gl.bindAttribLocation(shaderProgram, aTexCoordsIndex, "aTexCoords");
  
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    var str = "Unable to initialize the shader program.n";
    str += "VS:\n" + gl.getShaderInfoLog(vertexShader) + "n";
    str += "FS:\n" + gl.getShaderInfoLog(fragmentShader) + "n";
    str += "PROG:\n" + gl.getProgramInfoLog(shaderProgram);
    alert(str);
  }

  shaderProgram.aPositionIndex = aPositionIndex;
  shaderProgram.aDiffuseIndex = aDiffuseIndex;
  shaderProgram.aNormalIndex = aNormalIndex;
  shaderProgram.aTexCoordsIndex = aTexCoordsIndex;

  shaderProgram.uM  = gl.getUniformLocation(shaderProgram, "uM");
  shaderProgram.uFrame  = gl.getUniformLocation(shaderProgram, "uFrame");
  shaderProgram.uProjectionMatrixLocation = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
  shaderProgram.uViewMatrixLocation = gl.getUniformLocation(shaderProgram, "uViewMatrix");
  shaderProgram.uInverseViewMatrix = gl.getUniformLocation(shaderProgram, "uInverseViewMatrix");
  shaderProgram.uRotationMatrixLocation = gl.getUniformLocation(shaderProgram, "uRotationMatrix");
  shaderProgram.uColorLocation            = gl.getUniformLocation(shaderProgram, "uColor");

  shaderProgram.uLightDirectionLocation  = gl.getUniformLocation(shaderProgram, "uLightDirection");
  
  shaderProgram.uLightColorLocation = gl.getUniformLocation(shaderProgram, "uLightColor");

  shaderProgram.u_flat_blending  = gl.getUniformLocation(shaderProgram, "u_flat_blending");
  shaderProgram.u_texture_blending  = gl.getUniformLocation(shaderProgram, "u_texture_blending");

  shaderProgram.uSamplerLocation  = gl.getUniformLocation(shaderProgram, "uSampler");

  shaderProgram.uLampLocation= new Array();
  
  nLights = 12;
  
  for(var i = 0; i < nLights; ++i){
	shaderProgram.uLampLocation[i] = gl.getUniformLocation(shaderProgram,"uLampLocation["+i+"]");
  }
  
  
  //shaderProgram.uViewSpaceNormalMatrix = gl.getUniformLocation(shaderProgram, "uViewSpaceNormalMatrix");
  
  shaderProgram.vertex_shader = vertexShaderSource;
  shaderProgram.fragment_shader = fragmentShaderSource;
  
  return shaderProgram;
};
