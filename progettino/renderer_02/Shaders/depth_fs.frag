 #extension GL_OES_standard_derivatives : enable
		precision highp float;

 	 float  PlaneApprox(float Depth) {
	 // Compute partial derivatives of depth.
	 float dx = dFdx(Depth);
	 float dy = dFdy(Depth);
	 // Compute second moment over the pixel extents.
	 return  Depth*Depth + 0.25*(dx*dx + dy*dy);
	 }

		void main(void)
		{
 			gl_FragColor = vec4(gl_FragCoord.z,gl_FragCoord.z,gl_FragCoord.z,1.0);
//			gl_FragColor = //vec4(gl_FragCoord.z,gl_FragCoord.z*gl_FragCoord.z,0.0,1.0);

			//gl_FragColor = vec4(1.,1.,1.0,1.0); //qualsiasi cosa: uso solo la depth map
		}
