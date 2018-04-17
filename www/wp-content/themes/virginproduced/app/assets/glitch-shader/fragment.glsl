// Custom App Variables
uniform sampler2D tDiffuse; // Texture

uniform float amount;
uniform float scale;
uniform float tuning;
uniform float enabled;
uniform float batshit;

// ShaderToy porting
uniform sampler2D iChannel1; // Secondary sample
uniform float iGlobalTime;
// uniform vec2 iResolution; // Resolution
// uniform vec2 iMouse; // Mouse X, Y
varying vec2 vUv;

void main() {
  vec4 color = texture2D(tDiffuse, vUv);

  float time = iGlobalTime * 1.0;

  // Pure image stream
  vec2 uv = vUv.xy / vec2(1.0, 1.0);

  // Alternate scaled one
  // vec2 uvAlt = vUv.xy * 1.4;
  vec2 block = floor(gl_FragCoord.xy / vec2(16 * int(ceil(abs(scale)))));
  vec2 uv_noise = block / vec2(64);
  uv_noise += floor(vec2(time) * vec2(1234.0 * (tuning + batshit), 3543.0 * (tuning + batshit))) / vec2(64);

  // Blocks to distort
  float block_thresh = pow(fract(time * 1236.0453), 2.0) * 0.2 * amount;

  // Lines to distort
  float line_thresh = pow(fract(time * 2236.0453), 3.0) * 0.7 * amount;

  // Prepare color distortion variables
  vec2 uv_r = uv, uv_g = uv, uv_b = uv;

  if (
    enabled > 0.0
    && (
      batshit > 0.0
      // I
      || texture2D(iChannel1, uv_noise).r < block_thresh * (1.0 + amount)
      || texture2D(iChannel1, vec2(uv_noise.y, 0.0)).b < line_thresh
    )
  ) {

    vec2 dist = (fract(uv_noise) - 0.5) * scale;
    uv_r += dist * (0.25 + batshit * 0.5);
    uv_g += dist * 0.1;
    uv_b += -dist * 0.3;
  }

  gl_FragColor.r = texture2D(tDiffuse, uv_r).r;//(color.b + ) / 2.0;
  gl_FragColor.g = texture2D(tDiffuse, uv_g).g;
  gl_FragColor.b = texture2D(tDiffuse, uv_b).b;
  // if (texture2D(iChannel1, uv_noise).b < block_thresh)
  //   gl_FragColor.rgb = gl_FragColor.rrr;
  if (
    enabled > 0.0
  ) {
    gl_FragColor.b *= 0.525;
    gl_FragColor.g *= 0.75;
  }

  if (
    enabled > 0.0
    && texture2D(iChannel1, vec2(uv_noise.y, 0.0)).b * 3.5 < line_thresh
  ) {
    float dotty = dot(gl_FragColor.rgb, vec3(1.0));
    gl_FragColor.rgb += vec3(
      dotty * 0.1,
      dotty * -0.05,
      dotty * -0.05
    );
  }

  if (
    enabled > 0.0
    && (
      // Block lines
      texture2D(iChannel1, uv_noise).g * 1.5 < block_thresh
      // Line lines
      || texture2D(iChannel1, vec2(uv_noise.y, 0.0)).b * 2.5 < line_thresh
    )
  ) {
    float line = fract(gl_FragCoord.y / 3.0);
    vec3 mask = vec3(1.0, 0.666, 0.666);

    if (line > 0.333)
      mask = vec3(0.8, 0.8, 0.8);

    if (line > 0.666)
      mask = vec3(0.8, 0.8, 0.8);

    gl_FragColor.xyz *= mask;
  }
}