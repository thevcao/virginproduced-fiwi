///*
//
//    ____  __  ______  __________  __  _______  _____ __  __
//   / __ \/ / / / __ \/_  __/ __ \/  |/  / __ \/ ___// / / /
//  / /_/ / /_/ / / / / / / / / / / /|_/ / / / /\__ \/ /_/ /
// / ____/ __  / /_/ / / / / /_/ / /  / / /_/ /___/ / __  /
///_/   /_/ /_/\____/ /_/  \____/_/  /_/\____//____/_/ /_/
//
//PHOTOMOSH (c) 2018 by Airtight Interactive / Felix Turner
//www.airtight.cc / @felixturner
//
//*/
//
///*
//    MOSH Main
//*/
//
///* global Events, ImprovedNoise , $ , THREE , TweenMax , Stats */
//
//var MOSH = { VERSION : '1.0.0'  };
//MOSH.events = new Events();
//MOSH.noise = new ImprovedNoise();
//
//MOSH.Main = function () {
//
//    var isDev;
//    var isMobile;
//    var camera, scene, renderer;
//    var planeMaterial;
//    var plane;
//    var $logo;
//    var stats;
//    var renderSize = new THREE.Vector2(); //dims of renderer
//    var maxRenderDims = {
//        jpg: 2048,
//        webm: 1280,
//        gif: 640
//    };
//
//    function init() {
//
//        console.log('PHOTOMOSH ' + MOSH.VERSION);
//
//        isDev = window.location.href.indexOf('?dev') > -1;
//        isMobile = !!('ontouchstart' in window);
//        //override mobile
//        if(window.location.href.indexOf('mobile')> -1){
//            isMobile = true;
//        }
//
//        //test for webgl
//        if (!hasWebGL()) {
//            $('#input-options').css('display', 'none');
//            $('#file-prompt').css('display', 'none');
//            TweenMax.to($('#cam-prompt'), 0.6, { autoAlpha: 1 });
//            $('#cam-prompt').html('This browser or device does not support WebGL.<br>Find out how to get WebGL <a href="http://get.webgl.org/">here</a>.');
//        }
//
//
//        $('#btn-mosh').on('click', MOSH.FX.randomizeFilters);
//
//        // stop the user getting a text cursor
//        document.onselectstart = function () {
//            return false;
//        };
//
//        //fade in
//        TweenMax.to($('#intro'), 1.5, { opacity: 1 });
//
//        //init 3D
//        camera = new THREE.PerspectiveCamera(75, 1080 / 720, 1, 3000);
//        camera.position.z = 65;
//        scene = new THREE.Scene();
//
//        //Add image plane
//        planeMaterial = new THREE.MeshBasicMaterial();
//        var planeGeometry = new THREE.PlaneBufferGeometry(100, 100, 1, 1);
//        plane = new THREE.Mesh(planeGeometry, planeMaterial);
//        scene.add(plane);
//
//        //STATS
//        stats = new Stats();
//        if (isDev) document.body.append(stats.domElement);
//        stats.domElement.id = 'stats';
//
//        //init renderer
//        renderer = new THREE.WebGLRenderer({
//            preserveDrawingBuffer: true
//        });
//        $('#webgl').append(renderer.domElement);
//
//        MOSH.FX.init();
//        MOSH.Recorder.init();
//        MOSH.Input.init();
//
//        window.addEventListener('resize', onResize, false);
//        $(document).on('keydown', onKeyDown, false);
//
//        onResize();
//
//        $logo = $('#intro-logo');
//
//    }
//
//    //////////////////////
//    //ANIMATE
//    //////////////////////
//    function update() {
//        requestAnimationFrame(update);
//        $logo.css('opacity', Math.random() + 0.5);
//        if (!MOSH.Input.getSourceReady()) return;
//        MOSH.events.emit('update');
//        stats.update();
//    }
//
//    //////////////////////
//    //RESIZE
//    //////////////////////
//    function onResize() {
//
//        if (!MOSH.Input.getSourceReady()) return;
//        var srcSize = MOSH.Input.getSourceSize();
//        var sourceAspect = srcSize.x / srcSize.y;
//
//        var mrd = maxRenderDims[MOSH.Recorder.getRecordMode()];
//
//        //use source size for webgl render size and output
//        renderSize.copy(srcSize);
//        renderSize.x = Math.round(renderSize.x);
//        renderSize.y = Math.round(renderSize.y);
//
//        //cap max render size
//        if (renderSize.x > mrd){
//            renderSize.x = mrd;
//            renderSize.y = Math.floor(mrd / sourceAspect);
//        }
//
//        if (renderSize.y > mrd){
//            renderSize.y = mrd;
//            renderSize.x = Math.floor(mrd * sourceAspect);
//        }
//        //console.log('srcSize', srcSize)
//        //console.log('mrd', mrd);
//        //console.log('renderSize', renderSize)
//
//        if (renderSize.x > 0) {
//            camera.aspect = renderSize.x / renderSize.y;
//            camera.updateProjectionMatrix();
//            renderer.setSize(renderSize.x, renderSize.y);
//        }
//
//        //resize img plane fit viewport
//        //make plane fill renderer
//        plane.scale.x = camera.aspect;
//
//        //scale renderer to fit in VP via CSS
//        //resize renderer to match sourceSize aspect ratio and fit
//        var vpSize = new THREE.Vector2($('#viz').width(), $('#viz').height());
//
//        //add padding
//        var PADDING = 20;
//        vpSize.x -= PADDING;
//        vpSize.y -= PADDING;
//
//        var vpAspect = vpSize.x / vpSize.y;
//        var viewSize = new THREE.Vector2();
//        var viewScl = new THREE.Vector2();
//
//        if (sourceAspect > vpAspect) {
//            viewSize.x = Math.min(vpSize.x,renderSize.x); //dont go bigger than original
//            viewSize.y = viewSize.x / sourceAspect;
//        } else {
//            viewSize.y = Math.min(vpSize.y,renderSize.y);
//            viewSize.x = viewSize.y * sourceAspect;
//        }
//
//        viewScl.x = viewSize.x/renderSize.x;
//        viewScl.y = viewSize.y/renderSize.y;
//
//        var viewOffset = new THREE.Vector2(Math.floor((vpSize.x - viewSize.x) / 2), Math.floor((vpSize.y - viewSize.y) / 2));
//
//        viewOffset.x += PADDING/2;
//        viewOffset.y += PADDING/2;
//
//        // console.log('renderSize',renderSize);
//        // console.log('vpSize',vpSize);
//        // console.log('viewScl', viewScl);
//        // console.log('viewOffset',viewOffset);
//
//        // scale and center renderer inside Viewport
//        TweenMax.set('#webgl', {scaleX:viewScl.x, scaleY:viewScl.y, x: viewOffset.x, y: viewOffset.y});
//        //keep prog bar fixed height
//        TweenMax.set('#progress-bar', {scaleY:1/viewScl.y});
//        TweenMax.set('#progress-bar-bkgnd', { scaleY:1/viewScl.y});
//
//
//        MOSH.events.emit('resize');
//    }
//
//    function updateMaterial(texture){
//        planeMaterial.map = texture;
//        planeMaterial.needsUpdate = true;
//        onResize();
//    }
//
//    function trace(text) {
//        $('#debug-text').text(text);
//    }
//
//    function onKeyDown(event) {
//
//        switch (event.keyCode) {
//            case 32: /* SPACE */
//                MOSH.FX.randomizeFilters();
//                break;
//        }
//    }
//
//    function hasWebGL() {
//        try { return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl'); } catch (e) { return false; }
//    }
//
//    return {
//        init: init,
//        update: update,
//        trace: trace,
//        getCamera: function() { return camera;},
//        getScene: function() { return scene;},
//        getRenderer: function() { return renderer;},
//        getIsMobile: function() { return isMobile;},
//        renderSize: renderSize,
//        onResize: onResize,
//        updateMaterial: updateMaterial
//    };
//
//}();
//
//
//$(document).ready(function () {
//    MOSH.Main.init();
//});
//
///*
//
//    Mosh.FX
//    Handles PPO, creating FX panel, passes
//
//*/
//
///* global $ , THREE , MOSH , dat , ATUtil */
//
//
//MOSH.FX = function () {
//
//    var composer;
//    var renderPass, copyPass;
//    var gui;
//    var filters;  //object containing named parameter objects from filters.json
//    var passes; //object containing named ShaderPasses
//
//    var luts = [];
//    var lutNames = ['lookup_miss_etikate.png',
//        'lookup_amatorka.png',
//        'lookup_soft_elegance_1.png',
//        'lookup_soft_elegance_2.png'];
//
//    function init(){
//
//        var imgLdr = new THREE.TextureLoader();
//
//        //EVENT HANDLERS
//        MOSH.events.on('update', update);
//        MOSH.events.on('resize', onResize);
//
//        //POST PROCESSING
//        //Create Shader Passes
//        renderPass = new THREE.RenderPass( MOSH.Main.getScene(), MOSH.Main.getCamera() );
//        copyPass = new THREE.ShaderPass(THREE.CopyShader);
//
//        //object based look up
//        passes = {};
//        passes.badtv = new THREE.ShaderPass(THREE.BadTVShader);
//        passes.rgb = new THREE.ShaderPass(THREE.RGBShiftShader);
//        passes.pixelate = new THREE.ShaderPass(THREE.PixelateShader);
//        passes.slices = new THREE.ShaderPass(THREE.SlicesShader);
//        passes.dotmatrix = new THREE.ShaderPass(THREE.DotMatrixShader);
//        passes.scanlines = new THREE.ShaderPass(THREE.ScanlinesShader);
//        passes.vignette = new THREE.ShaderPass(THREE.VignetteShader);
//        passes.mirror = new THREE.ShaderPass(THREE.MirrorShader);
//        passes.dotscreen = new THREE.ShaderPass(THREE.DotScreenShader);
//        passes.lut = new THREE.ShaderPass(THREE.LUTShader);
//        passes.glow = new THREE.ShaderPass(THREE.GlowShader);
//        passes.posterize = new THREE.ShaderPass(THREE.PosterizeShader);
//        passes.huesat = new THREE.ShaderPass(THREE.HueSaturationShader);
//        passes.brightness = new THREE.ShaderPass(THREE.BrightnessContrastShader);
//        passes.polar = new THREE.ShaderPass(THREE.PolarPixelateShader);
//        passes.edges = new THREE.ShaderPass(THREE.EdgeShader);
//        passes.tilt = new THREE.ShaderPass(THREE.VerticalTiltShiftShader);
//        passes.wobble = new THREE.ShaderPass(THREE.WobbleShader);
//        passes.smear = new THREE.ShaderPass( THREE.SmearShader );
//        passes.barrelBlur = new THREE.ShaderPass(THREE.BarrelBlurShader);
//        passes.glitcher = new THREE.ShaderPass(THREE.GlitcherShader);
//        passes.noiseDisplace = new THREE.ShaderPass(THREE.NoiseDisplaceShader);
//        passes.duoTone = new THREE.ShaderPass(THREE.DuoToneShader);
//        passes.rainbow = new THREE.ShaderPass(THREE.RainbowShader);
//        passes.solarize = new THREE.ShaderPass(THREE.SolarizeShader);
//        passes.linocut = new THREE.ShaderPass(THREE.LinocutShader);
//
//        //grave yard
//        //passes.lines = new THREE.ShaderPass(THREE.LinesShader);
//        //passes.noise = new THREE.ShaderPass(THREE.NoiseShader);
//        //passes.strobe = new THREE.ShaderPass(THREE.StrobeShader);
//
//        //init LUTs
//        for (var i = 0; i < lutNames.length; i++) {
//            var lookupTexture = imgLdr.load('res/lut/' + lutNames[i]);
//            lookupTexture.genMipmaps = false;
//            lookupTexture.minFilter = THREE.LinearFilter;
//            lookupTexture.magFilter = THREE.LinearFilter;
//            lookupTexture.wrapS = THREE.ClampToEdgeWrapping;
//            lookupTexture.wrapT = THREE.ClampToEdgeWrapping;
//            luts.push(lookupTexture);
//        }
//
//        passes.lut.uniforms.lookupTable.value = luts[0];
//
//        //INIT UI
//        gui = new dat.GUI({ autoPlace: false });
//        $('#settings').append(gui.domElement);
//        //gui.close();
//
//        //LOAD params
//        $.ajax({
//            type: 'GET',
//            dataType: 'json',
//            url: 'res/json/filters.json',
//            success: initFilters,
//        });
//
//    }
//
//    function initFilters(data) {
//
//        filters = data.filters;
//        //create UI from params JSON
//        var folder;
//        $.each(filters, function (i, filter) {
//
//            //create folder
//            folder = gui.addFolder(filter.displayName);
//
//            //create toogle boolean
//            folder.add(filter, 'on').listen().onChange(onToggleShaders);
//
//            if (filter.on) folder.open();
//
//            //add slider for each param
//            $.each(filter.params, function (i, param) {
//
//                //dont surface automated params
//                if (param.automate) return true;
//
//                if (param.type === 'color'){
//
//                    folder.addColor(param, 'value').listen().name(param.displayName).onChange(onParamsChange);
//
//                }else{
//
//                    folder.add(param, 'value', param.min, param.max).step(param.step).listen().name(param.displayName).onChange(onParamsChange);
//
//                    var range;
//                    //TODO - may be cleaner just to set randMin and randMax in filters json
//                    if (param.randRange === 'high') {
//
//                        //select from top 25% of range
//                        range = param.max - param.min;
//                        param.randMin = param.min + range * 0.75;
//                        param.randMax = param.max;
//
//                    } else if (param.randRange === 'low') {
//                        //select from bottom 25% of range
//                        range = param.max - param.min;
//                        param.randMin = param.min;
//                        param.randMax = param.min + range * 0.4;
//
//                    } else {
//                        param.randMin = param.min;
//                        param.randMax = param.max;
//                    }
//                }
//
//            });
//
//            filter.folder = folder;
//
//        });
//
//
//        //init custom params
//
//        //ADD EXTRA GUI
//
//        onToggleShaders();
//        onParamsChange();
//
//        //FIXME
//        MOSH.Main.update();
//    }
//
//    function onParamsChange() {
//
//        //console.log(filters);
//
//        //copy gui params into shader uniforms
//        $.each(filters, function (i, filter) {
//            $.each(filter.params, function (j, param) {
//
//                //DEBUG
//                //console.log(i,j);
//
//                if (param.custom) return true;
//
//                if (param.type === 'color'){
//                    passes[i].uniforms[j].value = new THREE.Color(param.value);
//                }else{
//                    passes[i].uniforms[j].value = param.value;
//                }
//            });
//
//        });
//
//        //custom param setting
//        passes.lut.uniforms.lookupTable.value = luts[Math.floor(filters.lut.params.mode.value)];
//
//    }
//
//
//    //var origFBO, savePass;
//
//    function onToggleShaders() {
//
//        //console.log('onToggleShaders', renderSize.x);
//
//        //SAVE ORIG IMG?????
//        // var renderTargetParameters = {
//        // 	minFilter: THREE.LinearFilter,
//        // 	format: THREE.RGBFormat,
//        // 	stencilBuffer: false,
//        // 	depthBuffer: false
//        // };
//
//        //origFBO = new THREE.WebGLRenderTarget( renderSize.x, renderSize.y, renderTargetParameters ) ;
//        //savePass = new THREE.SavePass(origFBO);//
//        //console.log(fbo);
//
//        //Add Shader Passes to Composer
//        //order defined by filters.json
//        composer = new THREE.EffectComposer(MOSH.Main.getRenderer());
//        composer.addPass(renderPass);
//        //composer.addPass( savePass );
//
//        $.each(filters, function (i, filter) {
//            if (filter.on) {
//                composer.addPass(passes[i]);
//            }
//        });
//
//        //passes.smear.uniforms.tOrig.value = origFBO.texture;
//
//        composer.addPass(copyPass);
//        copyPass.renderToScreen = true;
//
//        onResize();
//        //composer.setSize(MOSH.Main.renderSize.x, MOSH.Main.renderSize.y);
//    }
//
//    function randomizeFilters() {
//
//        //clear all filters
//        $.each(filters, function (i, filter) {
//            filter.on = false;
//            filter.folder.close();
//        });
//
//        //console.log('---------------');
//        //console.log('filters:', filters);
//
//        var keys = Object.keys(filters);
//        var len = keys.length;
//
//        //turn on 3 filters
//        for (var i = 0; i < 3; i++) {
//
//            var r = ATUtil.randomInt(0, len - 1);
//            filters[keys[r]].on = true;
//
//            //console.log(filters[r].displayName);
//            //open enabled folders
//            filters[keys[r]].folder.open();
//        }
//
//        //RANDOMIZE ALL PARAMS
//        $.each(filters, function (i, filter) {
//            $.each(filter.params, function (j, param) {
//
//                if (param.type !== 'color'){
//                    param.value = ATUtil.randomRange(param.randMin, param.randMax);
//                }
//            });
//        });
//
//        onToggleShaders();
//        onParamsChange();
//
//    }
//
//    function update() {
//
//        //pt goes from 0 -1 over videoDuration
//        var pt = performance.now() / (MOSH.Recorder.getVideoDuration() * 1000);
//
//        //loop over pt
//        passes.wobble.uniforms.time.value = pt;
//        passes.slices.uniforms.time.value = pt;
//        passes.rainbow.uniforms.time.value = pt;
//        passes.badtv.uniforms.time.value = pt;
//        passes.smear.uniforms.time.value = pt;
//
//        //time used for rands
//        passes.scanlines.uniforms.time.value = pt;
//        passes.barrelBlur.uniforms.time.value = pt;
//
//        //time used for speeds
//        passes.glitcher.uniforms.time.value = pt;
//        passes.noiseDisplace.uniforms.time.value = pt;
//
//        //automate RGB angle
//        passes.rgb.uniforms.angle.value = (MOSH.noise.noise(pt, 99, 0) + 0.5) * 6.28;
//        passes.huesat.uniforms.hue.value = MOSH.noise.noise(pt * 2, 999, 0) * 2;
//
//        composer.render(0.1);
//
//    }
//
//    function onResize(){
//
//        if (composer) {
//            composer.setSize(MOSH.Main.renderSize.x, MOSH.Main.renderSize.y);
//        }
//
//        passes.scanlines.uniforms.height.value = MOSH.Main.renderSize.y;
//        passes.linocut.uniforms.resolution.value = MOSH.Main.renderSize;
//    }
//
//
//    return {
//        init:init,
//        onResize: onResize,
//        randomizeFilters: randomizeFilters,
//        getComposer: function() { return composer;},
//    };
//
//}();
//
///*
//    MOSH.Input
//    Handle file input & webcam
//*/
//
///* global Events, ImprovedNoise , $ , THREE , TweenMax , Stats , MOSH */
//
//
//MOSH.Input = function () {
//
//    var sourceReady = false; //is image or webcam loaded?
//    var sourceSize = new THREE.Vector2(); //dims of webcam video or dropped image as Vector2
//    var videoIn = document.createElement('video');
//    var inputTexture;
//
//    function init() {
//
//        $('#option-cam').on('click', selectCam);
//        $('#option-file').on('click', selectFile);
//
//        //init image drag and drop
//        if (typeof (FileReader) !== 'undefined') {
//            window.addEventListener('dragover', function (event) {
//                event.preventDefault();
//                event.stopPropagation();
//            }, false);
//
//            window.addEventListener('dragenter', function (event) {
//                $('#drop-target-holder').show();
//                event.preventDefault();
//                event.stopPropagation();
//            }, false);
//
//            window.addEventListener('drop', onFileDrop, false);
//        }
//
//        videoIn.loop = true;
//        videoIn.autoplay = true;
//        videoIn.muted = true;
//
//        // safari only shows video texture if video is actually visible on screen??
//        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
//        if (isSafari){
//            console.log('IS SAFARI')
//            document.body.appendChild(videoIn);
//            videoIn.style.position = 'absolute';
//            videoIn.style.height = '1px';
//            videoIn.style.width = '1px';
//        }
//
//    }
//
//    function selectFile() {
//
//        $('#file1').on('change', handleFileSelect, false);
//
//        if (MOSH.Main.getIsMobile()){
//            //no drag prompt for mobile
//            $('#file1').click();
//        }else{
//
//            //$('#drop-prompt').show();
//            $('#input-options').css('display', 'none');
//            $('#cam-prompt').css('display', 'none');
//            TweenMax.to($('#file-prompt'), 0.6, { autoAlpha: 1 });
//
//            $('#option-choose').on('click', function () {
//                $('#file1').click();
//            });
//        }
//    }
//
//    function handleFileSelect() {
//
//        var reader = new FileReader();
//        reader.onload = function () {
//            onImageLoaded(reader.result);
//        };
//        reader.readAsDataURL(this.files[0]);
//    }
//
//    function onFileDrop(event) {
//
//        event.preventDefault();
//        var file = event.dataTransfer.files[0];
//        var fileType = file.type;
//
//        //determine if file is img or video
//        //only accept img + video
//        var reader = new FileReader();
//        if (fileType.match(/image\/\w+/)) {
//            reader.onload = function () {
//                onImageLoaded(reader.result);
//            };
//        } else if (fileType.match(/video\/\w+/)) {
//            reader.onload = function () {
//                onVideoLoaded(reader.result);
//            };
//
//        } else {
//            console.alert('Only image and video files supported.');
//            return;
//        }
//        reader.readAsDataURL(file);
//    }
//
//    function onImageLoaded(path) {
//
//        //unload prev video
//        videoIn.pause();
//        videoIn.src = ''; // empty source
//        videoIn.load();
//
//        var txtLdr = new THREE.TextureLoader();
//        inputTexture = txtLdr.load(path, onImageLoaded2);
//    }
//
//    function onImageLoaded2() {
//        inputTexture.minFilter = THREE.LinearFilter;
//        sourceSize = new THREE.Vector2(inputTexture.image.width, inputTexture.image.height);
//        MOSH.Recorder.setInputDuration(0);
//        onSourceReady();
//    }
//
//    function onVideoLoaded(path) {
//
//        sourceReady = false;
//        videoIn.onloadedmetadata = onVideoMetaDataLoaded;
//        videoIn.src = path;
//        videoIn.load(); // must call after setting/changing source
//    }
//
//    function onCamReady(stream) {
//        //console.log('onCamReady', stream)
//        //on webcam enabled
//        videoIn.onloadedmetadata = onCamMetaDataLoaded;
//        videoIn.srcObject = stream;
//    }
//
//    function onCamMetaDataLoaded(){
//        onVideoMetaDataLoaded();
//        MOSH.Recorder.setInputDuration(0);
//    }
//
//    function onVideoMetaDataLoaded() {
//
//        //video dimensions avaiable
//        //init video texture
//        inputTexture = new THREE.VideoTexture(videoIn);
//        inputTexture.minFilter = THREE.LinearFilter;
//        sourceSize = new THREE.Vector2(videoIn.videoWidth, videoIn.videoHeight);
//        onSourceReady();
//
//        //console.log('webcam dims:' , videoIn.videoWidth,videoIn.videoHeight);
//
//        //match recorder duration to input duration
//        MOSH.Recorder.setInputDuration(videoIn.duration);
//
//
//    }
//
//    function onSourceReady() {
//
//        //update UI for image loaded
//        $('#webgl').css('display', 'block');
//        $('#intro').css('display', 'none');
//        $('#save-options').css('display', 'block');
//        $('#controls-holder').css('display', 'block');
//        $('#bottom-controls-holder').css('display', 'block');
//        $('#top-arras').css('display', 'none');
//        $('#drop-target-holder').hide();
//
//        sourceReady = true;
//        MOSH.Main.updateMaterial(inputTexture);
//    }
//
//    function selectCam() {
//
//        $('#input-options').css('display', 'none');
//        $('#file-prompt').css('display', 'none');
//        TweenMax.to($('#cam-prompt'), 0.6, { autoAlpha: 1 });
//
//        if (!hasGetUserMedia()) {
//            $('#cam-prompt').html('WebCam access is not supported in this browser.<br>Please try using Chrome, Firefox or Opera');
//            return;
//        }
//
//        TweenMax.to($('#top-arras'), 0.6, { autoAlpha: 0.8 });
//
//        //Use webcam
//        //request 1280x720
//        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
//        //get webcam
//        navigator.getUserMedia({
//            video: {width: {exact: 1280}, height: {exact: 720}}
//        }, onCamReady,
//            function (error) {
//                $('#cam-prompt').html('Unable to capture WebCam.<br>Please reload the page.');
//            });
//    }
//
//    function hasGetUserMedia() {
//        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
//            navigator.mozGetUserMedia || navigator.msGetUserMedia);
//    }
//
//    return {
//        init: init,
//        getSourceReady: function(){ return sourceReady;},
//        getSourceSize: function(){ return sourceSize;}
//    };
//
//}();
///*
//    Mosh Recorder
//    File saving
//*/
//
///* global Events, ImprovedNoise , $ , THREE , TweenMax , Stats, MOSH , GIF , Power0 */
//
//MOSH.Recorder = function(){
//
//    var recordMode = 'jpg'; // jpg , gif, webm
//    var recordTimer;
//    var MAX_DURATION = 16;
//    var videoDuration = MAX_DURATION; //seconds
//
//    var mediaRecorder, recordedBlobs;
//
//    var gif;
//    var gifFPS = 20;
//    var gifFrameTime = Math.floor(1000 / gifFPS);
//    var gifInterval;
//
//    function init(){
//        $('#opt-jpg').on('click', setJpgMode);
//        $('#opt-gif').on('click', setGifMode);
//        $('#opt-webm').on('click', setWebmMode);
//        $('#btn-record').on('click', onRecordClick);
//    }
//
//    function setJpgMode(){
//        recordMode = 'jpg';
//        $('#opt-jpg').addClass('selected');
//        $('#opt-gif').removeClass('selected');
//        $('#opt-webm').removeClass('selected');
//        $('#btn-record').text('Save');
//        $('#btn-record').removeClass('vid-mode');
//        MOSH.Main.onResize();
//    }
//
//    function setGifMode(){
//        recordMode = 'gif';
//        $('#opt-jpg').removeClass('selected');
//        $('#opt-gif').addClass('selected');
//        $('#opt-webm').removeClass('selected');
//        $('#btn-record').text('Record');
//        $('#btn-record').addClass('vid-mode');
//        MOSH.Main.onResize();
//    }
//
//    function setWebmMode(){
//        recordMode = 'webm';
//        $('#opt-jpg').removeClass('selected');
//        $('#opt-gif').removeClass('selected');
//        $('#opt-webm').addClass('selected');
//        $('#btn-record').text('Record');
//        $('#btn-record').addClass('vid-mode');
//        MOSH.Main.onResize();
//    }
//
//    function onRecordClick() {
//
//        if (recordMode === 'gif') {
//            onRecordGif();
//        } else if (recordMode === 'webm') {
//            onRecordWebm();
//        } else {
//            saveImage();
//        }
//    }
//
//    function getFileName(){
//        var now = new Date();
//        return 'MOSHED-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds();
//    }
//
//    //JPEG -------------------------------
//
//    function saveImage(){
//
//        MOSH.FX.getComposer().render(0.1);
//        var imgData = MOSH.Main.getRenderer().domElement.toDataURL('image/jpeg');
//
//        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
//            var a = document.createElement('a');
//            a.href = imgData;
//            a.download =  getFileName() + '.jpg';
//            a.click();
//        } else {
//            window.open(imgData);
//        }
//    }
//
//
//    // VIDEO COMMON
//    function startRecording(){
//
//        //console.log('startRecording')
//
//        //disable record btn
//        $('#btn-record').off('click',onRecordClick);
//        $('#btn-record').css('cursor','default');
//        $('#btn-record').toggleClass('recording');
//        $('#btn-record').text('Recording...' );
//
//        $('#progress-bar').show();
//        $('#progress-bar-bkgnd').show();
//        TweenMax.fromTo($('#progress-bar'), videoDuration, {scaleX: 0},{scaleX: 1, ease: Power0.easeNone});
//
//        //pulsate record button
//        TweenMax.fromTo($('#btn-record'),0.4,{backgroundColor:'rgba(255,0,0,0.15)'},{backgroundColor:'rgba(255,0,0,0.45)',yoyo:true,repeat:-1});
//
//        //stop after 4 seconds
//        recordTimer = setTimeout(stopRecording, 73000);
//
//    }
//
//    function stopRecording(){
//
//        //console.log('stopRecording')
//
//        if (recordMode === 'gif') {
//            onGifRecordEnd();
//        } else if (recordMode === 'webm') {
//            onWebmRecordEnd();
//        }
//
//        $('#progress-bar').hide();
//        $('#progress-bar-bkgnd').hide();
//    }
//
//    function enableRecordButton(){
//
//        //renable button
//        TweenMax.killTweensOf('#btn-record');
//        TweenMax.set('#btn-record', { backgroundColor: 'rgba(255,255,255,0.15)' });
//        $('#btn-record').on('click', onRecordClick);
//        $('#btn-record').css('cursor', 'pointer');
//        $('#btn-record').toggleClass('recording');
//        $('#btn-record').text('Record' );
//
//    }
//
//    //GIF -------------------------------
//
//    function onRecordGif() {
//
//        //console.log('onRecordGif')
//
//        gif = new GIF({
//            workers: 8,
//            quality: 20,
//            workerScript: 'js/workers/gif.worker.js',
//        });
//        gifInterval = setInterval(saveGifFrame, gifFrameTime);
//        startRecording();
//    }
//
//    function saveGifFrame(){
//        // add a image element
//        gif.addFrame(MOSH.Main.getRenderer().domElement, {copy: true, delay: gifFrameTime});
//    }
//
//    function onGifRecordEnd() {
//
//        clearInterval(gifInterval);
//        gif.render();
//
//        //console.log('onGifRecordEnd')
//
//        $('#btn-record').text('Processing...' );
//
//        gif.on('finished', function (blob) {
//            downloadGif(blob);
//        });
//    }
//
//    function downloadGif(blob){
//
//        //console.log('downloadGif')
//        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
//            //firefox
//            //console.log('recordingEnd FF');
//            window.open(window.URL.createObjectURL(blob));
//        } else {
//            //other browsers
//            var a = document.createElement('a');
//            a.href = URL.createObjectURL(blob);
//            //a.target = '_blank';
//            a.download = getFileName() + '.gif';
//            a.click();
//        }
//
//        enableRecordButton();
//    }
//
//
//
//    // WEBM -------------------------------
//
//    function onRecordWebm() {
//
//        //console.log('onRecordWebm')
//
//        var stream = MOSH.Main.getRenderer().domElement.captureStream(); // frames per second
//        //console.log('Started stream capture from canvas element: ', stream);
//
//        //videoBitsPerSecond:
//        //default: 2.5 Mbit/sec: 2500000
//        //youtube reccomended for 1280x720: 7.5 Mbit/sec
//
//        var options = { mimeType: 'video/webm;codecs=H264' , videoBitsPerSecond :  10000000}; //10mb
//
//        recordedBlobs = [];
//        try {
//            mediaRecorder = new MediaRecorder(stream, options);
//        } catch (e0) {
//            console.log('Unable to create MediaRecorder with options Object: ', e0);
//            try {
//                options = { mimeType: 'video/webm,codecs=vp9' };
//                mediaRecorder = new MediaRecorder(stream, options);
//            } catch (e1) {
//                console.log('Unable to create MediaRecorder with options Object: ', e1);
//                try {
//                    options = 'video/vp8'; // Chrome 47
//                    mediaRecorder = new MediaRecorder(stream, options);
//                } catch (e2) {
//                    alert('MediaRecorder is not supported by this browser.\n\n' +
//                        'Try Firefox 29 or later, or Chrome 47 or later, with Enable experimental Web Platform features enabled from chrome://flags.');
//                    console.error('Exception while creating MediaRecorder:', e2);
//                    return;
//                }
//            }
//        }
//        //console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
//        // recordButton.textContent = 'Stop Recording';
//        // playButton.disabled = true;
//        // downloadButton.disabled = true;
//        //mediaRecorder.onstop = handleStop;
//        mediaRecorder.ondataavailable = saveWebmFrame;
//        mediaRecorder.start(100); // collect 100ms of data
//        //console.log('MediaRecorder started', mediaRecorder);
//
//        startRecording();
//    }
//
//    function saveWebmFrame(event) {
//        if (event.data && event.data.size > 0) {
//            recordedBlobs.push(event.data);
//        }
//    }
//
//    function onWebmRecordEnd() {
//        mediaRecorder.stop();
//        //console.log('Recorded Blobs: ', recordedBlobs);
//        downloadVid();
//        enableRecordButton();
//    }
//
//    function downloadVid() {
//
//        var blob = new Blob(recordedBlobs, { type: 'video/webm' });
//        var url = window.URL.createObjectURL(blob);
//        var a = document.createElement('a');
//        a.style.display = 'none';
//        a.href = url;
//        a.download = getFileName() + '.webm';
//        document.body.appendChild(a);
//        a.click();
//        setTimeout(function () {
//            document.body.removeChild(a);
//            window.URL.revokeObjectURL(url);
//        }, 100);
//    }
//
//    function setInputDuration(t){
//        //console.log('setInputDuration', t)
//        //match input video duration capped to maximum duration
////        videoDuration = Math.min(t, MAX_DURATION);
//        //use max duration for image and webcam
////        if (t === 0) videoDuration = MAX_DURATION;
//        videoDuration = MAX_DURATION;
//        console.log('videoDuration', videoDuration)
//    }
//
//    return {
//        init: init,
//        setInputDuration: setInputDuration,
//        getRecordMode: function(){return recordMode;},
//        getVideoDuration: function() { return videoDuration;},
//    };
//
//}();
//
///**
// * @author felixturner / http://airtight.cc/
// *
// * Bad TV Shader
// * Simulates a bad TV via horizontal distortion and vertical roll
// * Uses Ashima WebGl Noise: https://github.com/ashima/webgl-noise
// *
// * time: steadily increasing float passed in
// * distortion: amount of thick distortion
// * distortion2: amount of fine grain distortion
// * speed: distortion vertical travel speed
// * rollSpeed: vertical roll speed
// *
// * v0.2
// * Fixed black bars on mobile
// */
//
//THREE.BadTVShader = {
//    uniforms: {
//        'tDiffuse': { type: 't', value: null },
//        'time':     { type: 'f', value: 0.0 },
//        'distortion':     { type: 'f', value: 3.0 },
//        'distortion2':     { type: 'f', value: 5.0 },
//        'speed':     { type: 'f', value: 0.116 },
//        'rollSpeed':     { type: 'f', value: 0.05 },
//    },
//
//    vertexShader: [
//        'varying vec2 vUv;',
//        'void main() {',
//        'vUv = uv;',
//        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
//        '}'
//
//    ].join('\n'),
//
//    fragmentShader: [
//
//        'uniform sampler2D tDiffuse;',
//        'uniform float time;',
//        'uniform float distortion;',
//        'uniform float distortion2;',
//        'uniform float speed;',
//        'uniform float rollSpeed;',
//        'varying vec2 vUv;',
//
//        // Start Ashima 2D Simplex Noise
//
//        'vec3 mod289(vec3 x) {',
//        '  return x - floor(x * (1.0 / 289.0)) * 289.0;',
//        '}',
//
//        'vec2 mod289(vec2 x) {',
//        '  return x - floor(x * (1.0 / 289.0)) * 289.0;',
//        '}',
//
//        'vec3 permute(vec3 x) {',
//        '  return mod289(((x*34.0)+1.0)*x);',
//        '}',
//
//        'float snoise(vec2 v)',
//        '  {',
//        '  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0',
//        '                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)',
//        '                     -0.577350269189626,  // -1.0 + 2.0 * C.x',
//        '                      0.024390243902439); // 1.0 / 41.0',
//        '  vec2 i  = floor(v + dot(v, C.yy) );',
//        '  vec2 x0 = v -   i + dot(i, C.xx);',
//
//        '  vec2 i1;',
//        '  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);',
//        '  vec4 x12 = x0.xyxy + C.xxzz;',
//        ' x12.xy -= i1;',
//
//        '  i = mod289(i); // Avoid truncation effects in permutation',
//        '  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))',
//        '		+ i.x + vec3(0.0, i1.x, 1.0 ));',
//
//        '  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);',
//        '  m = m*m ;',
//        '  m = m*m ;',
//
//        '  vec3 x = 2.0 * fract(p * C.www) - 1.0;',
//        '  vec3 h = abs(x) - 0.5;',
//        '  vec3 ox = floor(x + 0.5);',
//        '  vec3 a0 = x - ox;',
//
//        '  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );',
//
//        '  vec3 g;',
//        '  g.x  = a0.x  * x0.x  + h.x  * x0.y;',
//        '  g.yz = a0.yz * x12.xz + h.yz * x12.yw;',
//        '  return 130.0 * dot(m, g);',
//        '}',
//
//        // End Ashima 2D Simplex Noise
//
//        'void main() {',
//
//            'vec2 p = vUv;',
//            'float ty = time * speed * 17.346;',
//            'float yt = p.y - ty;',
//
//            //thick distortion
//            'float offset = snoise(vec2(yt*3.0,0.0))*0.2;',
//            'offset = offset*distortion * offset*distortion * offset;',
//            //fine distortion
//            'offset += snoise(vec2(yt*50.0,0.0))*distortion2*0.002;',
//
//            //combine distortion on X with roll on Y
//            'gl_FragColor = texture2D(tDiffuse,  vec2(fract(p.x + offset),fract(p.y - time * rollSpeed) ));',
//
//        '}'
//
//    ].join('\n')
//
//};
//
///**
// * @author felixturner / http://airtight.cc/
// *
// * Barrel Blur Chroma Distortion
// *
// * Ported from https://www.shadertoy.com/view/XssGz8
// * by http://loopit.dk / @pixelmager
// */
//
//THREE.BarrelBlurShader = {
//
//    uniforms: {
//
//        "tDiffuse": { type: "t", value: null },
//        "amount":     { type: "f", value: 0.5 },
//        "time":     { type: "f", value: 0.0 },
//
//    },
//
//    vertexShader: [
//
//        "varying vec2 vUv;",
//
//        "void main() {",
//
//            "vUv = uv;",
//            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
//
//        "}"
//
//    ].join("\n"),
//
//    fragmentShader: [
//
//        "uniform sampler2D tDiffuse;",
//        "uniform float amount;",
//        "uniform float time;",
//
//        "varying vec2 vUv;",
//
//        "const int num_iter = 16;",
//        "const float reci_num_iter_f = 1.0 / float(num_iter);",
//        "const float gamma = 2.2;",
//        "const float MAX_DIST_PX = 200.0;",
//
//        "vec2 barrelDistortion( vec2 p, vec2 amt )",
//        "{",
//        "    p = 2.0*p-1.0;",
//        "    //float BarrelPower = 1.125;",
//        "    const float maxBarrelPower = 3.0;",
//        "    float theta  = atan(p.y, p.x);",
//        "    float radius = length(p);",
//        "    radius = pow(radius, 1.0 + maxBarrelPower * amt.x);",
//        "    p.x = radius * cos(theta);",
//        "    p.y = radius * sin(theta);",
//        "    return 0.5 * ( p + 1.0 );",
//        "}",
//
//        "float sat( float t )",
//        "{",
//        "	return clamp( t, 0.0, 1.0 );",
//        "}",
//
//        "float linterp( float t ) {",
//        "	return sat( 1.0 - abs( 2.0*t - 1.0 ) );",
//        "}",
//
//        "float remap( float t, float a, float b ) {",
//        "	return sat( (t - a) / (b - a) );",
//        "}",
//
//        "vec3 spectrum_offset( float t ) {",
//        "	vec3 ret;",
//        "	float lo = step(t,0.5);",
//        "	float hi = 1.0-lo;",
//        "	float w = linterp( remap( t, 1.0/6.0, 5.0/6.0 ) );",
//        "	ret = vec3(lo,1.0,hi) * vec3(1.0-w, w, 1.0-w);",
//        "",
//        "	return pow( ret, vec3(1.0/2.2) );",
//        "}",
//
//        "float nrand( vec2 n )",
//        "{",
//        "	return fract(sin(dot(n.xy, vec2(12.9898, 78.233)))* 43758.5453);",
//        "}",
//
//        "vec3 lin2srgb( vec3 c )",
//        "{",
//        "    return pow( c, vec3(gamma) );",
//        "}",
//
//        "vec3 srgb2lin( vec3 c )",
//        "{",
//        "    return pow( c, vec3(1.0/gamma));",
//        "}",
//
//        "void main() {",
//
//            "vec2 uv = vUv;",
//            "vec2 max_distort = vec2(amount);", //resolution independent
//
//            "vec2 oversiz = barrelDistortion( vec2(1,1), max_distort );",
//            "uv = 2.0 * uv - 1.0;",
//            "uv = uv / (oversiz*oversiz);",
//            "uv = 0.5 * uv + 0.5;",
//
//            "vec3 sumcol = vec3(0.0);",
//            "vec3 sumw = vec3(0.0);",
//            "float rnd = nrand( uv + fract(time) );",
//            "for ( int i=0; i<num_iter;++i ){",
//                "float t = (float(i)+rnd) * reci_num_iter_f;",
//                "vec3 w = spectrum_offset( t );",
//                "sumw += w;",
//                "sumcol += w * srgb2lin(texture2D( tDiffuse, barrelDistortion(uv, max_distort*t ) ).rgb);",
//            "}",
//
//            "sumcol.rgb /= sumw;",
//            "vec3 outcol = lin2srgb(sumcol.rgb);",
//            "outcol += rnd/255.0;",
//            "gl_FragColor = vec4( outcol, 1.0);",
//
//
//
//        "}"
//
//    ].join("\n")
//
//};
//
///**
// * @author felixturner / http://airtight.cc/
// *
// * Renders texture as a grid of dots
// *
// * dots: number of dots on x + y axis
// * size: size of dot within dot area 0-1
// * blur: size of blur within dot area 0-1
// */
//
// THREE.DotMatrixShader = {
//
//    uniforms: {
//
//        "tDiffuse": { type: "t", value: null },
//        "dots":  { type: "f", value: 40.0 }, //size of dot area as fraction of screen
//        "size":     { type: "f", value: 0.3 }, //0-1 size of dot within dot area
//        "blur":     { type: "f", value: 0.3 } //size of blur within dot area
//
//    },
//
//    vertexShader: [
//
//    "varying vec2 vUv;",
//
//    "void main() {",
//
//        "vUv = uv;",
//        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
//
//    "}"
//
//    ].join("\n"),
//
//    fragmentShader: [
//
//        "uniform sampler2D tDiffuse;",
//        "uniform float dots;",
//        "uniform float size;",
//        "uniform float blur;",
//
//        "varying vec2 vUv;",
//
//        "void main() {",
//
//            "float dotSize = 1.0/dots;",
//            "vec2 samplePos = vUv - mod(vUv, dotSize) + 0.5 * dotSize;",
//            "float distanceFromSamplePoint = distance(samplePos, vUv);",
//            "vec4 col = texture2D(tDiffuse, samplePos);",
//            "gl_FragColor = mix(col, vec4(0.0), smoothstep(dotSize * size, dotSize *(size + blur), distanceFromSamplePoint));",
//
//        "}"
//
//        ].join("\n")
//
//    };
//
///**
//
//    DuoToneShader
//
//    Map luminace to a color gradient
//
//        colLight:
//        colDark:
//        brightness: -1 to 1 (-1 is solid black, 0 is no change, and 1 is solid white)
//        contrast: 0-1 (0 is no change, 1 is maximum contrast)
//
//    @author felixturner / http://airtight.cc/
//
//
// */
//
//THREE.DuoToneShader = {
//
//    uniforms: {
//
//        'tDiffuse': 	{ value: null },
//        'colLight':    	{ value: new THREE.Color(0.953 , 0.173 , 0.36) },
//        'colDark':   	{ value: new THREE.Color(0.180 , 0.184 , 0.380) },
//        // 'brightness':   { value: 0.0 },
//        // 'contrast':    	{ value: 0.0}
//
//    },
//
//    vertexShader: [
//
//        'varying vec2 vUv;',
//
//        'void main() {',
//
//            'vUv = uv;',
//            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
//
//        '}'
//
//    ].join( '\n' ),
//
//    fragmentShader: [
//
//        'uniform sampler2D tDiffuse;',
//        'uniform vec3 colLight;',
//        'uniform vec3 colDark;',
//        //'uniform float brightness;',
//        //'uniform float contrast;',
//
//        'varying vec2 vUv;',
//
//        //get float luma from color
//        'float luma(vec3 color) {',
//            'return dot(color, vec3(0.299, 0.587, 0.114));',
//        '}',
//
//        //boost contrast
//        'vec3 boostContrast(vec3 col, float amount){',
//            'return  (col - 0.5) / (1.0 - amount) + 0.5;',
//        '}',
//
//        'void main() {',
//
//            'vec3 col =  texture2D(tDiffuse, vUv).rgb;',
//            //'col += brightness;',
//            //'col = boostContrast(col,contrast);',
//            'col = clamp(col,0.0,1.0);',
//            'col = mix(colDark,colLight, luma(col));',
//            'gl_FragColor = vec4(col,1.0);',
//
//        '}'
//
//    ].join( '\n' )
//
//};
//
///**
//
//    Modified version of THREE.EdgeShader2
//    added passthru fixed console error
//    modified by @felixturner
//
// */
//
//THREE.EdgeShader = {
//
//    uniforms: {
//
//        'tDiffuse': { value: null },
//        'amount':   { value: 0 },
//        'passthru':   { value: 0 },
//    },
//
//    vertexShader: [
//
//        'varying vec2 vUv;',
//
//        'void main() {',
//
//            'vUv = uv;',
//            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
//
//        '}'
//
//    ].join( '\n' ),
//
//    fragmentShader: [
//
//        'uniform sampler2D tDiffuse;',
//        'uniform float amount;',
//        'uniform float passthru;',
//        'varying vec2 vUv;',
//
//        'vec2 texel = vec2(1.0 /512.0);',
//
//        'mat3 G[2];',
//
//        'const mat3 g0 = mat3( 1.0, 2.0, 1.0, 0.0, 0.0, 0.0, -1.0, -2.0, -1.0 );',
//        'const mat3 g1 = mat3( 1.0, 0.0, -1.0, 2.0, 0.0, -2.0, 1.0, 0.0, -1.0 );',
//
//
//        'void main(void)',
//        '{',
//            'mat3 I;',
//            'float cnv[2];',
//            'vec3 sample;',
//
//            'G[0] = g0;',
//            'G[1] = g1;',
//
//            /* fetch the 3x3 neighbourhood and use the RGB vector's length as intensity value */
//            'for (float i=0.0; i<3.0; i++)',
//            'for (float j=0.0; j<3.0; j++) {',
//                'sample = texture2D( tDiffuse, vUv + texel * vec2(i-1.0,j-1.0) ).rgb;',
//                'I[int(i)][int(j)] = length(sample);',
//            '}',
//
//            /* calculate the convolution values for all the masks */
//            'for (int i=0; i<2; i++) {',
//                'float dp3 = dot(G[i][0], I[0]) + dot(G[i][1], I[1]) + dot(G[i][2], I[2]);',
//                'cnv[i] = dp3 * dp3; ',
//            '}',
//
//            'vec4 orig = texture2D( tDiffuse, vUv);',
//
//            'gl_FragColor = orig * passthru + vec4(0.5 * sqrt(cnv[0]*cnv[0]+cnv[1]*cnv[1])) * amount;',
//        '} ',
//
//    ].join( '\n' )
//
//};
//
///**
// * @author felixturner / http://airtight.cc/
// *
// * Glitcher Shader
// * webgl version of ImageGlitcher: https://www.airtightinteractive.com/demos/js/imageglitcher/
// */
//
//THREE.GlitcherShader = {
//
//    uniforms: {
//
//        "tDiffuse": { type: "t", value: null },
//        "amount":     { type: "f", value: 0.5 }, //0-1
//        "speed":     { type: "f", value: 0.5 },  //0-1
//        "time":     { type: "f", value: 0 },  //ms
//
//    },
//
//    vertexShader: [
//
//        "varying vec2 vUv;",
//
//        "void main() {",
//
//            "vUv = uv;",
//            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
//
//        "}"
//
//    ].join("\n"),
//
//    fragmentShader: [
//
//        "uniform sampler2D tDiffuse;",
//        "varying vec2 vUv;",
//        "uniform float amount;",
//        "uniform float speed;",
//        "uniform float time;",
//
//        "float random1d(float n){",
//            "return fract(sin(n) * 43758.5453);",
//        "}",
//
//        //2D (returns 0 - 1)
//        "float random2d(vec2 n) { ",
//            "return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);",
//        "}",
//
//        "float randomRange (in vec2 seed, in float min, in float max) {",
//            "return min + random2d(seed) * (max - min);",
//        "}",
//
//        // return 1 if v inside 1d range
//        "float insideRange(float v, float bottom, float top) {",
//        "return step(bottom, v) - step(top, v);",
//        "}",
//
//        "float rand(vec2 co){",
//            "return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
//        "}",
//
//        "void main() {",
//
//            "vec2 uv = vUv;",
//
//            "float sTime = floor(time * speed * 6.0 * 24.0);",
//            "vec3 inCol = texture2D(tDiffuse, uv).rgb;",
//
//            //copy orig
//            "vec3 outCol = inCol;",
//
//            //randomly offset slices horizontally
//            "float maxOffset = amount/2.0;",
//
//            "vec2 uvOff;",
//
//            "for (float i = 0.0; i < 10.0; i += 1.0) {",
//
//                "if (i > 10.0 * amount) break;",
//
//                "float sliceY = random2d(vec2(sTime + amount, 2345.0 + float(i)));",
//                "float sliceH = random2d(vec2(sTime + amount, 9035.0 + float(i))) * 0.25;",
//                "float hOffset = randomRange(vec2(sTime + amount, 9625.0 + float(i)), -maxOffset, maxOffset);",
//                "uvOff = uv;",
//                "uvOff.x += hOffset;",
//                "vec2 uvOff = fract(uvOff);",
//                "if (insideRange(uv.y, sliceY, fract(sliceY+sliceH)) == 1.0 ){",
//                    "outCol = texture2D(tDiffuse, uvOff).rgb;",
//                "}",
//            "}",
//
//            //do color offset - slight shift on one enr=tire channel
//            "float maxColOffset = amount/6.0;",
//            "vec2 colOffset = vec2(randomRange(vec2(sTime + amount, 3545.0),-maxColOffset,maxColOffset), randomRange(vec2(sTime , 7205.0),-maxColOffset,maxColOffset));",
//
//            "uvOff = fract(uv + colOffset);",
//
//            //TODO - use col[1] array access
//            "float rnd = random2d(vec2(sTime + amount, 9545.0));",
//            "if (rnd < 0.33){",
//                "outCol.r = texture2D(tDiffuse, uvOff).r;",
//            "}else if (rnd < 0.66){",
//                "outCol.g = texture2D(tDiffuse, uvOff).g;",
//            "} else{",
//                "outCol.b = texture2D(tDiffuse, uvOff).b;",
//            "}",
//
//            "gl_FragColor = vec4(outCol,1.0);",
//        "}"
//    ].join("\n")
//
//};
//
// /**
// * Glow Shader
// * Additively Blended Horizontal and Vertical Blur
// *
// * - darken orginal image before applying glow to only glow brighter areas
// *
// * amount - amount of glow to add.
// * size - size of blur. Higher values will give visible chunkiness.
// * resolution - renderer resolution in pixels (width, height). If you don't set it, nothing will break.
// *
// * @author felixturner / http://airtight.cc/
// * Uses H + V Blur filter code by zz85 / http://www.lab4games.net/zz85/blog
// *
// */
//
//THREE.GlowShader = {
//
//    uniforms: {
//
//        "tDiffuse": 	{ type: "t", value: null },
//        "amount":       { type: "f", value: 0.5 },
//        "size":        	{ type: "f", value: 4.0 },
//        "darkness":     { type: "f", value: 0.1 },
//        "resolution":   { type: "v2", value: new THREE.Vector2( 800.0, 600.0 )  }
//
//    },
//
//    vertexShader: [
//
//        "varying vec2 vUv;",
//
//        "void main() {",
//
//            "vUv = uv;",
//            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
//
//        "}"
//
//    ].join("\n"),
//
//    fragmentShader: [
//
//        "uniform sampler2D tDiffuse;",
//
//        "uniform float size;",
//        "uniform float amount;",
//        "uniform vec2 resolution;",
//        "uniform float darkness;",
//
//        "varying vec2 vUv;",
//
//        "void main() {",
//
//            "float h = size / resolution.x;",
//            "float v = size / resolution.y;",
//
//            "vec4 sum = vec4( 0.0 );",
//
//            //H Blur
//            "sum += (texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) )- darkness) * 0.051 ;",
//            "sum += (texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) )- darkness) * 0.0918;",
//            "sum += (texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) )- darkness) * 0.12245;",
//            "sum += (texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) )- darkness) * 0.1531;",
//            "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y ) )- darkness) * 0.1633;",
//            "sum += (texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) )- darkness) * 0.1531;",
//            "sum += (texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) )- darkness) * 0.12245;",
//            "sum += (texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) )- darkness) * 0.0918;",
//            "sum += (texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) )- darkness) * 0.051;",
//
//            //V Blur
//            "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) )- darkness) * 0.051;",
//            "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) )- darkness) * 0.0918;",
//            "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) )- darkness) * 0.12245;",
//            "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) )- darkness) * 0.1531;",
//            "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y ) )- darkness) * 0.1633;",
//            "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) )- darkness) * 0.1531;",
//            "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) )- darkness) * 0.12245;",
//            "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) )- darkness) * 0.0918;",
//            "sum += (texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) )- darkness) * 0.051;",
//
//            //get original pixel color
//            "vec4 base = texture2D( tDiffuse, vUv );",
//
//            //Additive Blend
//            "gl_FragColor = base + max(sum,0.0) * amount;",
//
//        "}"
//
//    ].join("\n")
//
//};
//
///**
// * @author felixturner / http://airtight.cc/
// *
// * Pixelate Shader
// * make into pixels
// *
// */
//
//THREE.LUTShader = {
//
//    uniforms: {
//        "tDiffuse": { type: "t", value: null },
//        "lookupTable": { type: "t", value: null },
//        "strength":  { type: "f", value: 1.0 }
//    },
//
//    vertexShader: [
//
//        "varying vec2 vUv;",
//
//        "void main() {",
//
//            "vUv = uv;",
//            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
//
//        "}"
//
//    ].join("\n"),
//
//    fragmentShader: [
//
//        "uniform sampler2D tDiffuse;",
//        "uniform sampler2D lookupTable;",
//        "uniform float strength;",
//        "varying vec2 vUv;",
//
//        "void main() {",
//            "vec4 col = texture2D( tDiffuse, vUv );",
//            // "gl_FragColor = mix(col,vec4(1.0,0.0,1.0,1.0),strength);",
//
//            //CLAMP
//            //"col = clamp(col, 0.0, 1.0);",
//
//
//            "float blueColor = col.b * 63.0;",
//
//            "vec2 quad1;",
//            "quad1.y = floor(floor(blueColor) / 8.0);",
//            "quad1.x = floor(blueColor) - (quad1.y * 8.0);",
//
//            "vec2 quad2;",
//            "quad2.y = floor(ceil(blueColor) / 8.0);",
//            "quad2.x = ceil(blueColor) - (quad2.y * 8.0);",
//
//            "vec2 texPos1;",
//            "texPos1.x = (quad1.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * col.r);",
//            "texPos1.y = (quad1.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * col.g);",
//
//            //INVERT
//            "texPos1.y = 1.0-texPos1.y;",
//
//            "vec2 texPos2;",
//            "texPos2.x = (quad2.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * col.r);",
//            "texPos2.y = (quad2.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * col.g);",
//
//            //INVERT
//            "texPos2.y = 1.0-texPos2.y;",
//
//            "vec4 newColor1 = texture2D(lookupTable, texPos1);",
//            "vec4 newColor2 = texture2D(lookupTable, texPos2);",
//
//            "vec4 newColor = mix(newColor1, newColor2, fract(blueColor));",
//
//            //"gl_FragColor.rgb = mix(col.rgb,newColor.rgb,strength);",
//            //"gl_FragColor = mix(col,newColor,strength);",
//
//            "gl_FragColor = mix(col, vec4(newColor.rgb, col.w), strength);",
//            //"gl_FragColor = newColor;",
//
//
//        "}"
//
//    ].join("\n")
//
//};
//
///**
// *
// * ported from https://www.clicktorelease.com/code/codevember-2016/22/
// * @author felixturner / http://airtight.cc/
// *
// */
//
//THREE.LinocutShader = {
//
//    uniforms: {
//        'tDiffuse': { type: 't', value: null },
//        'resolution':     { type: 'v2'},
//        'scale':     { type: 'f', value: 0.0 },
//    },
//
//    vertexShader: [
//
//        'varying vec2 vUv;',
//
//        'void main() {',
//
//            'vUv = uv;',
//            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
//
//        '}'
//
//    ].join('\n'),
//
//    fragmentShader: [
//
//        'uniform sampler2D tDiffuse;',
//        'uniform vec2 resolution;',
//        'varying vec2 vUv;',
//        'uniform float scale;',
//
//        'float luma(vec3 color) {',
//            'return dot(color, vec3(0.299, 0.587, 0.114));',
//        '}',
//
//        'void main() {',
//
//            'vec2 center = vec2( 0.5 );',
//            'vec2 uv = vUv;',
//
//            'float noiseScale = 1.;',
//            'float radius = 0.5;',
//            'vec2 d = uv - center;',
//            'float r = length( d * vec2( 1., resolution.y / resolution.x ) ) * scale;',
//            'float a = atan(d.y,d.x) + noiseScale*(radius-r)/radius;',
//            'vec2 uvt = center+r*vec2(cos(a),sin(a));',
//
//            'vec2 uv2 = vUv;',
//            'float c = ( .75 + .25 * sin( uvt.x * 1000. ) );',
//            'vec4 color = texture2D( tDiffuse, uv2 );',
//            'float l = luma( color.rgb );',
//            'float f = smoothstep( .5 * c, c, l );',
//            'f = smoothstep( 0., .5, f );',
//
//            'vec3 col = vec3(f);',
//
//            'gl_FragColor = vec4( col,.0);',
//
//        '}'
//
//    ].join('\n')
//
//};
//
///**
//
//     Noise Displace Shader
//
//     A nice multi-octave noise pixel displacement.
//
//     @author Felix Turner / www.airtight.cc / @felixturner
//
//    Uses Ashima WebGL Noise: https://github.com/ashima/webgl-noise
//
//     The MIT License
//
//     Copyright (c) 2017 Felix Turner
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of
//    this software and associated documentation files (the "Software"), to deal in
//    the Software without restriction, including without limitation the rights to use,
//    copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
//    Software, and to permit persons to whom the Software is furnished to do so, subject
//    to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all
//    copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
//    INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//    PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
//    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
//    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
//    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// */
//
//THREE.NoiseDisplaceShader = {
//
//    uniforms: {
//
//        'tDiffuse': { type: 't', value: null },
//        'time': { type: 'f', value: 1.0 },
//        'speed': { type: 'f', value: 0.5 },
//        'scale': { type: 'f', value: 0.5 },
//        'amount': { type: 'f', value: 0.5 },
//    },
//
//    vertexShader: [
//
//        'varying vec2 vUv;',
//
//        'void main() {',
//
//            'vUv = uv;',
//            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
//
//        '}'
//
//    ].join('\n'),
//
//    fragmentShader: [
//
//
//        'uniform sampler2D tDiffuse;',
//        'uniform float time;',
//        'uniform float scale;',
//        'uniform float amount;',
//        'uniform float speed;',
//        'varying vec2 vUv;',
//
//        // Start Ashima 2D Simplex Noise
//
//        'vec3 mod289(vec3 x) {',
//        '  return x - floor(x * (1.0 / 289.0)) * 289.0;',
//        '}',
//
//        'vec2 mod289(vec2 x) {',
//        '  return x - floor(x * (1.0 / 289.0)) * 289.0;',
//        '}',
//
//        'vec3 permute(vec3 x) {',
//        '  return mod289(((x*34.0)+1.0)*x);',
//        '}',
//
//        'float snoise(vec2 v)',
//        '  {',
//        '  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0',
//        '                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)',
//        '                     -0.577350269189626,  // -1.0 + 2.0 * C.x',
//        '                      0.024390243902439); // 1.0 / 41.0',
//        '  vec2 i  = floor(v + dot(v, C.yy) );',
//        '  vec2 x0 = v -   i + dot(i, C.xx);',
//
//        '  vec2 i1;',
//        '  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);',
//        '  vec4 x12 = x0.xyxy + C.xxzz;',
//        ' x12.xy -= i1;',
//
//        '  i = mod289(i); // Avoid truncation effects in permutation',
//        '  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))',
//        '		+ i.x + vec3(0.0, i1.x, 1.0 ));',
//
//        '  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);',
//        '  m = m*m ;',
//        '  m = m*m ;',
//
//        '  vec3 x = 2.0 * fract(p * C.www) - 1.0;',
//        '  vec3 h = abs(x) - 0.5;',
//        '  vec3 ox = floor(x + 0.5);',
//        '  vec3 a0 = x - ox;',
//
//        '  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );',
//
//        '  vec3 g;',
//        '  g.x  = a0.x  * x0.x  + h.x  * x0.y;',
//        '  g.yz = a0.yz * x12.xz + h.yz * x12.yw;',
//        '  return 130.0 * dot(m, g);',
//        '}',
//
//        // End Ashima 2D Simplex Noise
//
//
//        'float getNoise(vec2 uv, float t){',
//
//            //generate multi-octave noise based on uv position and time
//            //move noise  over time
//
//            //scale noise position relative to center
//            'uv -= 0.5;',
//
//            //octave 1
//            'float scl = 4.0 * scale;',
//            'float noise = snoise( vec2(uv.x * scl ,uv.y * scl - t * speed ));',
//
//            //octave 2
//            'scl = 16.0 * scale;',
//            'noise += snoise( vec2(uv.x * scl + t* speed ,uv.y * scl )) * 0.2 ;',
//
//            //octave 3
//            'scl = 26.0 * scale;',
//            'noise += snoise( vec2(uv.x * scl + t* speed ,uv.y * scl )) * 0.2 ;',
//
//            'return noise;',
//
//        '}',
//
//
//        'void main() {',
//
//            'vec2 uv = vUv;',
//
//            'float noise = getNoise(uv, time * 24.0);',
//            'vec2 noiseUv = uv + amount * noise;',
//
//            //wrap
//            'noiseUv = fract(noiseUv);',
//
//            'gl_FragColor = texture2D(tDiffuse,noiseUv);',
//
//
//        '}'
//
//    ].join('\n')
//
//};
//
///**
// * @author felixturner / http://airtight.cc/
// *
// * Pixelate Shader
// * make into pixels
// *
// */
//
//THREE.PixelateShader = {
//
//    uniforms: {
//
//        "tDiffuse": { type: "t", value: null },
//        "pixelsX":     { type: "f", value: 10 }, //number of pixels on x
//        "pixelsY":     { type: "f", value: 10 } //number of pixels on  Y
//
//    },
//
//    vertexShader: [
//
//        "varying vec2 vUv;",
//
//        "void main() {",
//
//            "vUv = uv;",
//            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
//
//        "}"
//
//    ].join("\n"),
//
//    fragmentShader: [
//
//        "uniform sampler2D tDiffuse;",
//        "uniform float pixelsX;",
//        "uniform float pixelsY;",
//
//        "varying vec2 vUv;",
//
//        // "const float M_PI = 3.14159265358979323846;",
//
//        // "const mat2 rotation = mat2( cos(M_PI/4.0), sin(M_PI/4.0),",
//        //						"-sin(M_PI/4.0), cos(M_PI/4.0));",
//
//        "void main() {",
//
//            //"vec2 p = vUv * rotation;",
//            //roate (broken)
//            //"vec2 p = vUv * mat2(0.707, -0.707, 0.707, 0.707);",
//
//
//            "vec2 p = vUv;",
//
//            "p.x = floor(p.x * pixelsX)/pixelsX + 0.5/pixelsX;",
//            "p.y = floor(p.y * pixelsY)/pixelsY + 0.5/pixelsY;",
//
//            "gl_FragColor = texture2D(tDiffuse, p);",
//
//        "}"
//
//    ].join("\n")
//
//};
//
///**
// * @author felixturner / http://airtight.cc/
// *
// * Polar Pixelate Shader ported from GPUImage
// *
// */
//
//THREE.PolarPixelateShader = {
//
//    uniforms: {
//
//        "tDiffuse": { type: "t", value: null },
//        "pixelsX":     { type: "f", value: 0.05 }, //number of pixels on x
//        "pixelsY":     { type: "f", value: 0.05 } //number of pixels on  Y
//
//    },
//
//    vertexShader: [
//
//        "varying vec2 vUv;",
//
//        "void main() {",
//
//            "vUv = uv;",
//            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
//
//        "}"
//
//    ].join("\n"),
//
//    fragmentShader: [
//
//        "uniform sampler2D tDiffuse;",
//        "uniform float pixelsX;",
//        "uniform float pixelsY;",
//
//        "varying vec2 vUv;",
//
//        "void main() {",
//
//
//            "vec2 normCoord = 2.0 * vUv - 1.0;",
//            //"vec2 normCenter = 2.0 * center - 1.0;",
//
//            //"normCoord -= normCenter;",
//
//            "float r = length(normCoord);", // to polar coords
//            "float phi = atan(normCoord.y, normCoord.x);", // to polar coords
//
//            "r = r - mod(r, pixelsX) + 0.03;",
//            "phi = phi - mod(phi, pixelsY);",
//
//            "normCoord.x = r * cos(phi);",
//            "normCoord.y = r * sin(phi);",
//
//           // "normCoord += normCenter;",
//
//            "vec2 textureCoordinateToUse = normCoord / 2.0 + 0.5;",
//
//            "gl_FragColor = texture2D(tDiffuse, textureCoordinateToUse );",
//
//
//        "}"
//
//    ].join("\n")
//
//};
//
///**
// * @author felixturner. ported from GPUImage
// *
// */
//
//THREE.PosterizeShader = {
//
//    uniforms: {
//
//        "tDiffuse":   { type: "t", value: null },
//        "levels": { type: "f", value: 4.0 },
//
//    },
//
//    vertexShader: [
//
//        "varying vec2 vUv;",
//
//        "void main() {",
//
//            "vUv = uv;",
//
//            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
//
//        "}"
//
//    ].join("\n"),
//
//    fragmentShader: [
//
//        "uniform sampler2D tDiffuse;",
//        "uniform float levels;",
//
//        "varying vec2 vUv;",
//
//        "void main() {",
//            "vec4 col = texture2D( tDiffuse, vUv );",
//            "gl_FragColor.rgb = floor((col.rgb * levels) + vec3(0.5)) / levels;",
//        "}"
//
//    ].join("\n")
//
//};
//
///**
//
//    Rainbow shader
//
//    offset a rainbow gradient with rg channel
//
//    like: https://www.shadertoy.com/view/lljfzm
//
//    tDiffuse: 	base texture
//    flatten: amount to flatten into horiz stripes
//    offset: color sample offset position
//
//    based on: https://www.airtightinteractive.com/demos/smear/
//
//    @author felixturner / http://airtight.cc/
//
// */
//
//THREE.RainbowShader = {
//
//    uniforms: {
//
//        'tDiffuse': { type: 't', value: null },
//        'amount': { type: 'f', value: 0.5},
//        'offset': { type: 'f', value: 0.5},
//        'time': { type: 'f', value: 0.5},
//
//
//    },
//
//    vertexShader: [
//
//        'varying vec2 vUv;',
//        'void main() {',
//
//            'vUv = uv;',
//            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
//
//        '}'
//
//    ].join('\n'),
//
//    fragmentShader: [
//
//        'uniform sampler2D tDiffuse;',
//        'uniform float amount;',
//        'uniform float offset;',
//        'uniform float time;',
//
//        'varying vec2 vUv;',
//
//        'vec3 rainbow2( in float t ){',
//            'vec3 d = vec3(0.0,0.33,0.67);',
//            'return 0.5 + 0.5*cos( 6.28318*(t+d) );',
//        '}',
//
//
//        'void main() {',
//
//            'vec2 p = vUv;',
//            'vec3 origCol = texture2D( tDiffuse, p ).rgb;',
//
//            'vec2 off = texture2D( tDiffuse, p ).rg - 0.5;',
//            'p += off * offset;',
//             'vec3 rb = rainbow2( (p.x + p.y + time * 2.0) * 0.5);',
//
//             'vec3 col = mix(origCol,rb,amount);',
//
//             'gl_FragColor = vec4(col, 1.0);',
//
//        '}'
//
//    ].join('\n')
//
//};
//
///**
//
//    Simplified version of THREE.FilmShader
//    Seperate out noise and lines
//
//
// */
//
//THREE.ScanlinesShader = {
//
//    uniforms: {
//
//        "tDiffuse":   { value: null },
//        "time":       { value: 0.0 },
//        "noiseAmount": { value: 0.5 },
//        "linesAmount": { value: 0.05 },
//        "count":     { value: 4096 },
//        "height":     { value: 4096 },
//
//    },
//
//    vertexShader: [
//
//        "varying vec2 vUv;",
//
//        "void main() {",
//
//            "vUv = uv;",
//            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
//
//        "}"
//
//    ].join( "\n" ),
//
//    fragmentShader: [
//
//        "uniform sampler2D tDiffuse;",
//        "uniform float time;",
//        "uniform float count;",
//        "uniform float noiseAmount;",
//        "uniform float linesAmount;",
//        "uniform float height;",
//
//        "varying vec2 vUv;",
//
//        "#define PI 3.14159265359",
//
//        "highp float rand( const in vec2 uv ) {",
//            "const highp float a = 12.9898, b = 78.233, c = 43758.5453;",
//            "highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );",
//            "return fract(sin(sn) * c);",
//        "}",
//
//        "void main() {",
//
//            // sample the source
//            "vec4 cTextureScreen = texture2D( tDiffuse, vUv );",
//
//            // add noise
//            "float dx = rand( vUv + time );",
//            "vec3 cResult = cTextureScreen.rgb * dx * noiseAmount;",
//
//            // add scanlines
//            'float lineAmount = height * 1.8 * count;',
//            "vec2 sc = vec2( sin( vUv.y * lineAmount), cos( vUv.y * lineAmount) );",
//            "cResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * linesAmount;",
//
//            // interpolate between source and result by intensity
//            "cResult = cTextureScreen.rgb + ( cResult );",
//
//            "gl_FragColor =  vec4( cResult, cTextureScreen.a );",
//
//        "}"
//
//    ].join( "\n" )
//
//};
//
///**
// * @author felixturner / http://airtight.cc/
// *
// * Slices Shader
// * horizontal slices with random offsets
// */
//
//THREE.SlicesShader = {
//
//    uniforms: {
//
//        'tDiffuse': { type: 't', value: null },
//        'slices':     { type: 'f', value: 10 },
//        'offset':     { type: 'f', value: 0.3 }, //max offset
//        'speedH':     { type: 'f', value: 0.5 },
//        'speedV':     { type: 'f', value: 1.0 },
//        'time':     { type: 'f', value: 0.0 },
//
//    },
//
//    vertexShader: [
//
//        'varying vec2 vUv;',
//
//        'void main() {',
//
//            'vUv = uv;',
//            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
//
//        '}'
//
//    ].join('\n'),
//
//    fragmentShader: [
//
//        'uniform sampler2D tDiffuse;',
//        'uniform float slices;',
//        'uniform float offset;',
//        'uniform float time;',
//        'uniform float speedV;',
//        'uniform float speedH;',
//        'varying vec2 vUv;',
//
//        'float steppedVal(float v, float steps){',
//            'return floor(v*steps)/steps;',
//        '}',
//
//        //RANDOM
//        //1D
//        //returns 0 - 1
//        'float random1d(float n){',
//            'return fract(sin(n) * 43758.5453);',
//        '}',
//
//        //returns 0 - 1
//        'float noise1d(float p){',
//            'float fl = floor(p);',
//            'float fc = fract(p);',
//            'return mix(random1d(fl), random1d(fl + 1.0), fc);',
//        '}',
//
//        'const float TWO_PI = 6.283185307179586;',
//
//        'void main() {',
//
//            //offsets
//            'vec2 uv = vUv;',
//
//            //even strips
//            //'float ys = steppedVal(fract(uv.y + iTime* V_SPEED + SEED),COUNT);',
//            //'ys = steppedVal(uv.y + SEED,COUNT);',
//
//            //variable width strips
//            'float n = noise1d(uv.y * slices + time * speedV * 3.0);',
//            'float ns = steppedVal(fract(n  ),slices) + 2.0;',
//
//            'float nsr = random1d(ns);',
//            //'gl_FragColor = vec4(vec3(nsr),1.0);', //debug
//
//            'vec2 uvn = uv;',
//            'uvn.x += nsr * sin(time * TWO_PI + nsr * 20.0) * offset;',
//
//            'gl_FragColor = texture2D(tDiffuse, uvn);',
//
//
//        '}'
//
//    ].join('\n')
//
//};
//
///**
//
//    Smear shader
//
//    tDiffuse: 	base texture
//    flatten: amount to flatten into horiz stripes
//    amount: color sample amount position
//
//    based on: https://www.airtightinteractive.com/demos/smear/
//
//    @author felixturner / http://airtight.cc/
//
// */
//
//THREE.SmearShader = {
//
//    uniforms: {
//
//        'tDiffuse': { type: 't', value: null },
//        'amount': { type: 'f', value: 0.5},
//        'time': { type: 'f', value: 0.5},
//
//
//    },
//
//    vertexShader: [
//
//        'varying vec2 vUv;',
//        'void main() {',
//
//            'vUv = uv;',
//            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
//
//        '}'
//
//    ].join('\n'),
//
//    fragmentShader: [
//
//
//        'const float TWO_PI = 6.283185307179586;',
//
//        'uniform sampler2D tDiffuse;',
//        'uniform float amount;',
//        'uniform float time;',
//
//        'varying vec2 vUv;',
//
//        'vec2 rotate2D(vec2 position, float theta){',
//            'mat2 m = mat2( cos(theta), -sin(theta), sin(theta), cos(theta) );',
//            'return m * position;',
//        '}',
//
//        'void main() {',
//
//            'vec2 p = vUv;',
//
//            //Displace image by its own rg channel
//            'vec2 sPos = vUv;',
//            'vec2 off = texture2D( tDiffuse, sPos ).rg - 0.5;',
//
//            //rotate
//            'float ang = time * TWO_PI;',
//            'off = rotate2D(off,ang);',
//            'p += off * amount;',
//
//            'vec4 col = texture2D(tDiffuse,p);',
//            'gl_FragColor = col;',
//
//
//        '}'
//
//    ].join('\n')
//
//};
//
// /**
//
//    Solarize Shader
//    ported from https://www.interactiveshaderformat.com/sketches/390
//
// */
//
//THREE.SolarizeShader = {
//
//    uniforms: {
//
//        'tDiffuse': 	    { type: 't', value: null },
//        'centerBrightness': { type: 'f', value: 0.5 },
//        'powerCurve':       { type: 'f', value: 2.0 },
//        'colorize':         { type: 'f', value: 0.1 },
//
//    },
//
//    vertexShader: [
//
//        'varying vec2 vUv;',
//        'void main() {',
//            'vUv = uv;',
//            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
//        '}'
//
//    ].join('\n'),
//
//    fragmentShader: [
//
//        'uniform sampler2D tDiffuse;',
//
//        'uniform float centerBrightness;',
//        'uniform float powerCurve;',
//        'uniform float colorize;',
//
//        'varying vec2 vUv;',
//
//        'vec3 rgb2hsv(vec3 c)	{',
//            'vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);',
//            'vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);',
//            'vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);',
//            'float d = q.x - min(q.w, q.y);',
//            'float e = 1.0e-10;',
//            'return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);',
//        '}',
//
//        'vec3 hsv2rgb(vec3 c)	{',
//            'vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);',
//            'vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);',
//            'return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);',
//        '}',
//
//
//        'void main() {',
//
//            'vec3 origCol = texture2D( tDiffuse, vUv ).rgb;',
//
//            //	convert to HSV
//            'vec3 hslColor = rgb2hsv(origCol);',
//            'vec3 outColor = hslColor;',
//
//            //	adjust the brightness curve
//            'outColor.b = pow(outColor.b, powerCurve);',
//            'outColor.b = (outColor.b < centerBrightness) ? (1.0 - outColor.b / centerBrightness) : (outColor.b - centerBrightness) / centerBrightness;',
//            'outColor.g = outColor.g * hslColor.b * colorize;',
//
//            //	convert back to rgb
//            'outColor = hsv2rgb(outColor);',
//
//            //Additive Blend
//            'gl_FragColor = vec4(outColor, 1.0);',
//
//        '}'
//
//    ].join('\n')
//
//};
//
///**
// * @author felixturner / http://airtight.cc/
// * Radial sin /cos displacement
// *
// * Ported from http://uglyhack.appspot.com/videofx/
// */
//
//THREE.WobbleShader = {
//
//    uniforms: {
//
//        'tDiffuse': { type: 't', value: null },
//        'time':     { type: 'f', value: 0.0 },
//        'strength':  { type: 'f', value: 0.001 },
//        'size':  { type: 'f', value: 50.0 },
//        'speed':  { type: 'f', value: 1.0 }
//
//    },
//
//    vertexShader: [
//
//        'varying vec2 vUv;',
//
//        'void main() {',
//
//            'vUv = uv;',
//            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
//
//        '}'
//
//    ].join('\n'),
//
//    fragmentShader: [
//
//        'uniform sampler2D tDiffuse;',
//        'uniform float time;',
//
//        'uniform float strength;',
//        'uniform float size;',
//        'uniform float speed;',
//
//        'varying vec2 vUv;',
//
//        'const float TWO_PI = 6.283185307179586;',
//
//        'void main() {',
//
//            'vec2 p = -1.0 + 2.0 * vUv;',
//            'float pos = time * TWO_PI + length(p * size);',
//            'gl_FragColor = texture2D(tDiffuse, vUv + strength * vec2(cos(pos), sin(pos)));',
//        '}'
//
//    ].join('\n')
//
//};
