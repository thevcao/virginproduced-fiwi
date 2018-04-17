import {
  UniformsUtils,
  ShaderMaterial,
  Scene,
  OrthographicCamera,
  Texture,
  TextureLoader,
  RepeatWrapping,
  Mesh,
  PlaneBufferGeometry,
  Clock,
  Math as ThreeMath
} from "three";

import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";
import uniforms from "./uniforms.json";

const GlitchPass = function(onRender) {
  const shader = { fragmentShader, vertexShader, uniforms };
  // const dt_size = size || 64;

  this.uniforms = UniformsUtils.clone(shader.uniforms);
  // this.uniforms["tDisp"].value = this.generateHeightmap(dt_size);

  this.material = new ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader
  });

  this.enabled = true;
  this.renderToScreen = false;
  this.needsSwap = true;

  this.scene = new Scene();
  this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  this.quad = new Mesh(new PlaneBufferGeometry(2, 2), null);
  this.scene.add(this.quad);

  this.goWild = false;
  this.curF = 0;
  this.clock = new Clock(true);
  this.generateTrigger();
  this.onRender = onRender;

  // const noiseImg = document.createElement("img");
  // noiseImg.onload = function(e) {
  //   this.noiseTexture = new Texture(this);
  //   noiseTexture.needsUpdate = true;
  // };TextureLoader
  // noiseImg.src = "";
  TextureLoader.prototype.crossOrigin = '';
  var loader = new TextureLoader()
  loader.crossOrigin = '';
  this.noiseTexture = loader.load(WP_HOME + "/wp-content/themes/" + WP_THEME + '/dist/img/glitch.png');
  this.uniforms["iChannel1"].value = this.noiseTexture;
  // this.noiseImg = noiseImg;
};

GlitchPass.prototype = {
  render(renderer, writeBuffer, readBuffer, delta) {
    this.uniforms["tDiffuse"].value = readBuffer;
    // this.uniforms["iChannel1"].value = this.noiseTexture;
    this.uniforms["iLocalTime"].value = 0;
    this.uniforms["iGlobalTime"].value = this.clock.getDelta();

    if (this.curF % this.randX === 0 || this.goWild) {
      // this.uniforms["amount"].value = Math.random() / 30;
      this.uniforms["glitch"].value = false;
      this.curF = 0;
      this.generateTrigger();
    } else if (this.curF % this.randX < this.randX / 5) {
      // this.uniforms["amount"].value = Math.random() / 90;
    } else if (!this.goWild) {
      this.uniforms["iLocalTime"].value = 1;
    }
    this.curF++;

    if (this.onRender) {
      // const oldRes = [...this.uniforms["iResolution"].value];
      this.onRender(this, this.uniforms);
      // const newRes = [...this.uniforms["iResolution"].value];
      // if (oldRes !== newRes) { console.log(oldRes, newRes) }
    }

    this.quad.material = this.material;

    if (this.renderToScreen) {
      renderer.render(this.scene, this.camera);
    } else {
      renderer.render(this.scene, this.camera, writeBuffer, false);
    }
  },
  generateTrigger() {
    this.randX = ThreeMath.randInt(120, 240);
  }
};

export default GlitchPass;
