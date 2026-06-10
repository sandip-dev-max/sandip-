export const imageDistortVertexShader = /* glsl */ `
uniform float uTime;
uniform float uVelocity;
uniform float uAmplitude;

varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;

  float vel = clamp(uVelocity, 0.0, 1.0);
  float waveX = sin(pos.x * 14.0 + uTime * 2.2) * uAmplitude * vel;
  float waveY = sin(pos.y * 10.0 - uTime * 1.6) * uAmplitude * vel * 0.45;
  float ripple = sin((pos.x + pos.y) * 9.0 + uTime * 3.0) * uAmplitude * vel * 0.25;

  pos.z += waveX + waveY + ripple;
  pos.y += waveX * 0.12;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const imageDistortFragmentShader = /* glsl */ `
uniform sampler2D uTexture;
uniform float uOpacity;

varying vec2 vUv;

void main() {
  vec4 color = texture2D(uTexture, vUv);
  gl_FragColor = vec4(color.rgb, color.a * uOpacity);
}
`;
