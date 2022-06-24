
function readTextFile(file)
{
  var rawFile = new XMLHttpRequest();
  result = "";
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function ()
  {
    if(rawFile.readyState === 4)
    {
      if(rawFile.status === 200 || rawFile.status == 0)
      {
        var allText = rawFile.responseText;
        result = allText;
      }
    }
  }
  rawFile.send(null);
  return result;
}


lightingShader = function (gl) {
  var vertexShaderSource = readTextFile("./Shaders/vs.vert");
  var fragmentShaderSource = readTextFile("./Shaders/fs.frag");


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
  shaderProgram.uLightProjectionMatrix = gl.getUniformLocation(shaderProgram, "uLightProjectionMatrix");
  shaderProgram.uViewMatrixLocation = gl.getUniformLocation(shaderProgram, "uViewMatrix");
  shaderProgram.uInverseViewMatrix = gl.getUniformLocation(shaderProgram, "uInverseViewMatrix");
  shaderProgram.uRotationMatrixLocation = gl.getUniformLocation(shaderProgram, "uRotationMatrix");
  shaderProgram.uColorLocation            = gl.getUniformLocation(shaderProgram, "uColor");

  shaderProgram.uLightDirectionLocation  = gl.getUniformLocation(shaderProgram, "uLightDirection");

  shaderProgram.uLightColorLocation = gl.getUniformLocation(shaderProgram, "uLightColor");

  shaderProgram.u_flat_blending  = gl.getUniformLocation(shaderProgram, "u_flat_blending");
  shaderProgram.u_texture_blending  = gl.getUniformLocation(shaderProgram, "u_texture_blending");

  shaderProgram.uSamplerLocation  = gl.getUniformLocation(shaderProgram, "uSampler");

  shaderProgram.uProjectionSamplerRLocation  = gl.getUniformLocation(shaderProgram, "uProjectionSamplerR");
  shaderProgram.uProjectionSamplerLLocation  = gl.getUniformLocation(shaderProgram, "uProjectionSamplerL");

  shaderProgram.uHeadlightsViewMatrix = gl.getUniformLocation(shaderProgram, "uHeadlightsViewMatrix");

  shaderProgram.uHeadlightsViewMatrixR = gl.getUniformLocation(shaderProgram, "uHeadlightsViewMatrixR");
  shaderProgram.uHeadlightsViewMatrixL = gl.getUniformLocation(shaderProgram, "uHeadlightsViewMatrixL");



  shaderProgram.uLampLocation= new Array();

  shaderProgram.uDepthSamplerRLocation   = gl.getUniformLocation(shaderProgram, "uDepthSamplerR");
  shaderProgram.uDepthSamplerLLocation   = gl.getUniformLocation(shaderProgram, "uDepthSamplerL");

  shaderProgram.uFogMulOffset = gl.getUniformLocation(shaderProgram, "uFogMulOffset");
  shaderProgram.uHeadlightMulOffset = gl.getUniformLocation(shaderProgram, "uHeadlightMulOffset");
  shaderProgram.uInnerConeOffset = gl.getUniformLocation(shaderProgram, "uInnerConeOffset");
  shaderProgram.uOuterConeOffset = gl.getUniformLocation(shaderProgram, "uOuterConeOffset");
  shaderProgram.uShadowBias = gl.getUniformLocation(shaderProgram, "uShadowBias");

  shaderProgram.uVeryShiny = gl.getUniformLocation(shaderProgram, "uVeryShiny");

  nLights = 12;

  for(var i = 0; i < nLights; ++i){
    shaderProgram.uLampLocation[i] = gl.getUniformLocation(shaderProgram,"uLampLocation["+i+"]");
  }


  shaderProgram.vertex_shader = vertexShaderSource;
  shaderProgram.fragment_shader = fragmentShaderSource;

  return shaderProgram;
};

depthShader = function (gl) {

  var vertexShaderSource = readTextFile("./Shaders/depth_vs.vert");
  var fragmentShaderSource = readTextFile("./Shaders/depth_fs.frag");

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
  shaderProgram.uLightProjectionMatrix = gl.getUniformLocation(shaderProgram, "uLightProjectionMatrix");
  shaderProgram.uViewMatrixLocation = gl.getUniformLocation(shaderProgram, "uViewMatrix");
  shaderProgram.uInverseViewMatrix = gl.getUniformLocation(shaderProgram, "uInverseViewMatrix");
  shaderProgram.uRotationMatrixLocation = gl.getUniformLocation(shaderProgram, "uRotationMatrix");
  shaderProgram.uColorLocation            = gl.getUniformLocation(shaderProgram, "uColor");

  shaderProgram.uLightDirectionLocation  = gl.getUniformLocation(shaderProgram, "uLightDirection");

  shaderProgram.uLightColorLocation = gl.getUniformLocation(shaderProgram, "uLightColor");

  shaderProgram.u_flat_blending  = gl.getUniformLocation(shaderProgram, "u_flat_blending");
  shaderProgram.u_texture_blending  = gl.getUniformLocation(shaderProgram, "u_texture_blending");

  shaderProgram.uSamplerLocation  = gl.getUniformLocation(shaderProgram, "uSampler");

  shaderProgram.uProjectionSamplerLocation  = gl.getUniformLocation(shaderProgram, "uProjectionSampler");

  shaderProgram.uHeadlightsViewMatrix = gl.getUniformLocation(shaderProgram, "uHeadlightsViewMatrix");

  shaderProgram.uLampLocation= new Array();

  shaderProgram.uDepthSamplerLocation   = gl.getUniformLocation(shaderProgram, "uDepthSampler");

  nLights = 12;

  for(var i = 0; i < nLights; ++i){
    shaderProgram.uLampLocation[i] = gl.getUniformLocation(shaderProgram,"uLampLocation["+i+"]");
  }


  shaderProgram.vertex_shader = vertexShaderSource;
  shaderProgram.fragment_shader = fragmentShaderSource;

  return shaderProgram;
};
