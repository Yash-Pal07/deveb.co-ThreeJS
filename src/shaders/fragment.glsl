uniform float uTime;
varying float vNoise;
uniform float uColorChange;

void main() {

    vec4 c1=vec4(1.0, 0.5686, 0.9373, 1.0);
    vec4 c2=vec4(0.9961, 0.8392, 1.0, 1.0);

    vec4 c3=vec4(0.9922, 1.0, 0.7294, 1.0);
    vec4 c4=vec4(0.9647, 1.0, 0.8824, 1.0);
    float t = smoothstep(-.14, .14, vNoise*1.4);
    vec4 colorpink = mix(c1, c2, t*.6);
    vec4 coloryellow = mix(c3, c4, t*.8);
    vec4 color = mix(colorpink, coloryellow, uColorChange);
    gl_FragColor = color;
}