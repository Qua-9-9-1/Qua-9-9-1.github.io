// Fragment shader used by Shape3D when fragmentShaderUrl is set.
// Provides a simple animated rainbow swirl based on time and UV.
uniform float u_time;

varying vec2 vUv;

vec3 rgb2hsb(in vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsb2rgb(in vec3 c) {
  vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  rgb = rgb * rgb * (3.0 - 2.0 * rgb);
  return c.z * mix(vec3(1.0), rgb, c.y);
}

vec3 rainbow(vec2 uv) {
  float x = uv.x * 3.0;

  return vec3(
    0.5 + 0.5 * sin(6.2831 * (x + 0.0)),
    0.5 + 0.5 * sin(6.2831 * (x + 0.33)),
    0.5 + 0.5 * sin(6.2831 * (x + 0.66))
  );
}

void main() {
  vec2 uv = vUv;
  float t = u_time * 0.5;
  vec3 black = vec3(0.0);

  vec3 base_rgb = vec3(1.0, 0.0, 0.0);
  vec3 hsb = rgb2hsb(base_rgb);
  hsb.r = fract(hsb.x + u_time * 0.2);
  hsb.g = 1.5 * sin(u_time * 5.0);
  vec3 rb_bg = hsb2rgb(hsb);

  float wave =
    sin(uv.x * 15.0 + t) * 0.3 +
    sin(uv.y * 15.0 - t * 0.5) * 0.3;

  float color = 0.5 + 0.5 * sin(20.0 * wave + t);

  vec3 rb = rainbow(uv);
  vec3 finalColor = mix(rb, black, color);

  gl_FragColor = vec4(finalColor, 1.0);
}
