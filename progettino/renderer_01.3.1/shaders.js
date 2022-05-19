uniformShader = function (gl) {//line 1,Listing 2.14
  var vertexShaderSource = `
    uniform   mat4 uM;               
    uniform   mat4 uProjectionMatrix;              
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    void main(void)                                
    {                                              
      gl_Position = uProjectionMatrix *            
      uM * vec4(aPosition, 1.0);     
    }                                              
  `;

  var fragmentShaderSource = `
    precision highp float;                         
    uniform vec3 uColor;                           
    void main(void)                                
    {                                              
      gl_FragColor = vec4(uColor, 1);                 
    }                                             
  `;

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
  var aNormalIndex = 1;

  
  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.bindAttribLocation(shaderProgram, aPositionIndex, "aPosition");
  gl.bindAttribLocation(shaderProgram, aNormalIndex, "aNormal");
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
  shaderProgram.aNormalIndex = aNormalIndex;

  shaderProgram.uM = gl.getUniformLocation(shaderProgram, "uM");
  shaderProgram.uProjectionMatrixLocation = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
  shaderProgram.uColorLocation = gl.getUniformLocation(shaderProgram, "uColor");

  return shaderProgram;
};




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
    
        
    uniform   vec3 uColor;
    
    uniform   vec3 uLightDirection;

    varying vec3 vpos;   
    varying vec3 vnormal;

    
    // computed color to be interpolated 
    varying vec3 vShadedColor;
    void main(void)                                
    {   
      
        
        // in realtà qua dovrei mettere trasposta inversa ma boh ok
        mat4 uViewSpaceNormalMatrix = uM;
        
        // vertex normal (in view space)   
        vnormal = normalize(uViewSpaceNormalMatrix * vec4(aNormal, 0)).xyz;
       
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
    

    // positional light: position and color
    uniform vec3 uLightColor;  
    uniform vec3 uColor;    
    
    varying vec3 vnormal;
    varying vec3 vpos;   
    
    vec4 vdiffuse;
    vec4 vambient;
    vec4 vspecular;
    vec4 vshininess; 

    float darkness_blending = 0.5;
    
    uniform float flat_blending;
    
    vec3 phongShading( vec3 L, vec3 N, vec3 V, vec3 lightColor){
        vec3 mat_ambient = vambient.xyz;
        vec3 mat_diffuse = vdiffuse.xyz;
        vec3 mat_specular= vspecular.xyz;
        
        vec3 ambient = mat_ambient*lightColor;
        
        // diffuse component
        float NdotL = max(0.0, dot(N, L));
        vec3 diffuse = (mat_diffuse * lightColor) * NdotL;
        
        // specular component 
        vec3 R = (2.0 * NdotL * N) - L;
        float RdotV = max(0.0, dot(R, V));
        float spec = pow(RdotV, vshininess.x); 
        vec3 specular = (mat_specular * lightColor) * spec;
        vec3 contribution =  ambient + diffuse +  specular;  
        return contribution; 
    }
    
    
    void main()    
    {  
        vdiffuse = vec4(1.0,1.0,1.0,0.0); 
        vambient = vec4(0.9,0.9,0.9,0.0); 
        vspecular = vec4(0.9,0.9,0.9,0.0); 
        vshininess = vec4(1, 0, 0, 0);
        
        // normalize interpolated normal     
        vec3 N = normalize(vnormal);     
        
        // light vector (positional light)   
        vec3 L = normalize(uViewMatrix * vec4(-uLightDirection, 0)).xyz; 
        
        // diffuse component     
        float NdotL = max(darkness_blending, dot(N, L));   
        vec3 lambert = (uColor) * NdotL;    
        
        vec3 V=normalize(-vpos);
        
        vec3 phong = pow(phongShading(L,N,V,uLightColor), vec3(flat_blending, flat_blending, flat_blending));
        
        vec3 final = lambert * phong;
        
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
  
  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.bindAttribLocation(shaderProgram, aPositionIndex, "aPosition");
  gl.bindAttribLocation(shaderProgram, aDiffuseIndex, "aDiffuse");
  gl.bindAttribLocation(shaderProgram, aNormalIndex, "aNormal");

  
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

  shaderProgram.uM  = gl.getUniformLocation(shaderProgram, "uM");
  shaderProgram.uFrame  = gl.getUniformLocation(shaderProgram, "uFrame");
  shaderProgram.uProjectionMatrixLocation = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
  shaderProgram.uViewMatrixLocation = gl.getUniformLocation(shaderProgram, "uViewMatrix");
  shaderProgram.uRotationMatrixLocation = gl.getUniformLocation(shaderProgram, "uRotationMatrix");
  shaderProgram.uColorLocation            = gl.getUniformLocation(shaderProgram, "uColor");

  shaderProgram.uLightDirectionLocation  = gl.getUniformLocation(shaderProgram, "uLightDirection");
  
  shaderProgram.uLightColorLocation = gl.getUniformLocation(shaderProgram, "uLightColor");

  shaderProgram.flat_blending  = gl.getUniformLocation(shaderProgram, "flat_blending");
  
  //shaderProgram.uViewSpaceNormalMatrix = gl.getUniformLocation(shaderProgram, "uViewSpaceNormalMatrix");
  
  shaderProgram.vertex_shader = vertexShaderSource;
  shaderProgram.fragment_shader = fragmentShaderSource;
  
  return shaderProgram;
};
