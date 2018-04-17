<template>
  <div class="media" ref="container">
    <!-- <controls v-if="$props.controls" class="media_controls" /> -->
    <div class="media_slot">
      <slot></slot>
    </div>
    <canvas class="media_canvas three three--base" ref="canvas"></canvas>
  </div>
</template>

<script>
import {
  WebGLRenderer,
  Scene,
  Color,
  OrthographicCamera,
  PlaneGeometry,
  Mesh,
  MeshBasicMaterial,
  Texture,
  VideoTexture,
  CSS3DObject,
  LinearFilter,
  RGBFormat,
  DoubleSide,
  RepeatWrapping/*,
  BoxGeometry,
  ShaderMaterial,
  MeshPhongMaterial,
  Clock
*/} from "three";

import EffectComposer, { RenderPass/*, ShaderPass, CopyShader*/} from "three-effectcomposer-es6";
import GlitchPass from "../assets/glitch-shader";

// Import components
// import Controls from "../components/Controls";
// import Shader from "../components/Shader";

export default {
  name: "glith",
  components: {
    // Controls
    // Shader
  },
  props: {
    controls: Boolean,
    video: Boolean,
    dom: Boolean,
    tuning: Number,
    amount: Number,
    scale: Number,
    disabled: Boolean,
    batshit: Boolean
  },
  data() {
    return {
      renderer: null,
      composer: null,
      scene: null,
      camera: null,
      imgTexture: null,
      videoTexture: null,
      videoParams: null,
      videoMesh: null,
      noiseImg: null,
      dimensions: {
        width: 480,
        height: 320
      },
      user: {
        mouseX: null,
        mouseY: null
      },
      // clock: null,
      shaderUniform: {},
      objects: []
    };
  },
  computed: {
    iResolution() {
      return [this.dimensions.width, this.dimensions.height];
    },
    iTime() {
      return 40;
    },
    iMouse() {
      return [this.user.mouseX, this.user.mouseY];
    }
  },
  created() {
    // Scene created
    const scene = (this.scene = new Scene());
    scene.background = new Color(0xffffff);

    // Camera created
    const camera = (this.camera = new OrthographicCamera(
      this.dimensions.width / -2,
      this.dimensions.width / 2,
      this.dimensions.height / 2,
      this.dimensions.height / -2
    ));
    camera.position.z = 1000;

    // Scene beforeMount
    scene.add(camera);

    if (this.initObjects) this.initObjects();
  },
  // Renderer mounted
  mounted() {
    this.initRenderer();
    this.initComposer();
    // this.clock = new Clock(true);

    window.addEventListener("resize", this.resize);
    this.resize();

    this.$refs.container.addEventListener("mousemove", this.mouse);

    // Core
    const slot = this.$slots.default;
    if (slot.length) {
      if (this.$props.video) {
        const context = this;
        const video = slot[0].elm;

        video.addEventListener("loadedmetadata", this.resize, { once: true });
        video.addEventListener("playing", event => context.$emit('playing', event));

        this.createVideoTexture(video);
      } else if (this.$props.img) {
        const context = this;
        const img = slot[0].elm;
        this.imgTexture = new Texture(img);
        img.onload = () => {
          context.imgTexture.needsUpdate = true;
        };
      }
    }

    // Core mounted
    if (this.finalizeObjects) this.finalizeObjects();

    if (this.populateScene) this.populateScene();

    // Animator?
    if (this.composer) this.render(this.composer);
  },
  methods: {
    initRenderer() {
      const renderer = (this.renderer = new WebGLRenderer({
        canvas: this.$refs.canvas,
        antialias: true,
        alpha: false
      }));
      renderer.setPixelRatio(
        window.devicePixelRatio ? window.devicePixelRatio : 1
      );
    },
    initComposer() {
      const composer = (this.composer = new EffectComposer(this.renderer));
      const renderPass = new RenderPass(this.scene, this.camera);
      const shaderPass = new GlitchPass(this.updateShader);

      // console.log(shaderPass);

      composer.addPass(renderPass);
      composer.addPass(shaderPass);

      shaderPass.renderToScreen = true;
    },
    // Core created
    initObjects() {
      const objects = this.objects;

      const planeGeometry = new PlaneGeometry(1920, 1080);
      const basicMaterial = new MeshBasicMaterial({
        color: 0xa095dd,
        side: DoubleSide
      });
      const plane = new Mesh(planeGeometry, basicMaterial);

      this.videoMesh = plane;
      objects.push(plane);
    },
    createVideoTexture(video) {
      const videoTexture = (this.videoTexture = new VideoTexture(video));
      videoTexture.minFilter = LinearFilter;
      videoTexture.magFilter = LinearFilter;
      videoTexture.format = RGBFormat;

      this.videoParams = {
        color: 0xffffff,
        map: videoTexture,
        side: DoubleSide,
        // wrapT: RepeatWrapping,
        overdraw: true,
        reflectivity: 0
        // shininess: 100,
        // specular: 0xffffff
      };
    },
    finalizeObjects() {
      let material;

      if (this.$props.video) {
        material = new MeshBasicMaterial(this.videoParams);
      } else if (this.$props.img) {
        // console.log(this.imgTexture);
        material = new MeshBasicMaterial({
          color: 0xffffff,
          map: this.imgTexture,
          side: DoubleSide
        });
      }

      this.objects.forEach(obj => {
        obj.material = material;
      });
    },
    populateScene() {
      const scene = this.scene;

      this.objects.forEach(obj => {
        scene.add(obj);
      });
    },
    updateShader(context) {
      if (context.uniforms.enabled) {
        context.uniforms.enabled.value = this.$props.disabled ? 0.0 : 1.0;
      }

      if (context.uniforms.amount) {
        context.uniforms.amount.value = this.$props.amount || 0.5;
      }

      if (context.uniforms.scale) {
        context.uniforms.scale.value = this.$props.scale || 1.0;
      }

      if (context.uniforms.tuning) {
        context.uniforms.tuning.value = this.$props.tuning || 1.0;
      }

      if (context.uniforms.batshit) {
        // console.log(this.$props.batshit);
        context.uniforms.batshit.value = this.$props.batshit ? 1.0 : 0.0;
      }

      if (context.uniforms["iMouse"]) {
        context.uniforms["iMouse"].value = this.iMouse;
      }

      if (context.uniforms["iResolution"]) {
        context.uniforms["iResolution"].value = [
          this.dimensions.width,
          this.dimensions.height
        ];
      }
    },
    // Global State / Renderer?
    resize() {
      this.dimensions = {
        width: this.$refs.container.offsetWidth + 1,
        height: this.$refs.container.offsetHeight + 1
      };
    },
    mouse(event) {
      this.user.mouseX = event.clientX;
      this.user.mouseY = event.clientY;
    },
    // Renderer / Animator
    render(renderer) {
      if (!this._isMounted || this._isBeingDestroyed) {
        return false;
      }
      const renderArg = renderer ? renderer : this.renderer;
      window.requestAnimationFrame(() => this.render(renderArg));
      // window.setTimeout(() => this.render(renderArg), 200);

      this.animate();

      renderArg.render(this.scene, this.camera);
    },
    // Core
    animate() {
      // this.objects.forEach(obj => {
      //   obj.rotation.x += 0.005;
      //   obj.rotation.y += 0.01;
      //   obj.rotation.z += 0.00333;
      // });
    }
  },
  watch: {
    dimensions(newVal) {
      // Renderer
      this.renderer.setSize(newVal.width, newVal.height, false);
      // console.log(this.renderer);

      // Camera
      this.camera.left = newVal.width / -2;
      this.camera.right = newVal.width / 2;
      this.camera.top = newVal.height / 2;
      this.camera.bottom = newVal.height / -2;

      if (this.videoMesh) {
        const height = this.dimensions.height;
        this.camera.zoom = height / 1080;
      }

      this.camera.updateProjectionMatrix();
    }
  },
  beforeDestroy() {
    // Global State
    window.removeEventListener("resize", this.resize);

    // Core + Scene
    this.objects.forEach(obj => {
      if (this.scene.remove) this.scene.remove(obj);
      if (obj.dispose) obj.dispose();
      if (obj.remove) obj.remove();
    });
  }
};
</script>

<style>
.media {
  position: relative;
  /* overflow: hidden; */
}
.media_canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
  pointer-events: none;
}

.media .slot {
  position: relative;
}

/*
.media:hover .media_controls {
  transform: translateY(100%);
}

.media .media_controls {
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  bottom: 0;
  transform: translateY(0%);
  transition: 0.2s transform;
}

media_controls:hover {
  opacity: 1;
}
*/
</style>
