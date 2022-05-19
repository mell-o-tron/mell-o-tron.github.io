uniform   mat4 uModelViewMatrix;               
uniform   mat4 uProjectionMatrix;              
attribute vec3 aPosition;                      

void main(void){
    gl_Position = uProjectionMatrix *            
    uModelViewMatrix * vec4(aPosition, 1.0);     

}
  uniform   mat4 uModelViewMatrix;               
    uniform   mat4 uProjectionMatrix;              
    attribute vec3 aPosition;                      
    void main(void)                                
    {                                              
      gl_Position = uProjectionMatrix *            
      uModelViewMatrix * vec4(aPosition, 1.0);     
    }                                              
  `;
