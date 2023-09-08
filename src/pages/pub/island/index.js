import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeScene = () => {
  let orbit;
  const containerRef = useRef();

  useEffect(() => {
    // Tạo một scene
    const scene = new THREE.Scene();

    // Tạo một camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    // camera.position.set(10, 10, 10);

    // Tạo một renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    renderer.setClearColor(0xc4ec74); //đặt màu background

    // Tạo các đối tượng geometry
    const grid = new THREE.GridHelper(30, 30);
    scene.add(grid);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 1, 10);
    scene.add(cube);

    /*=========================================================================*/
    //loading blender file
    const assetLoader = new GLTFLoader();
    let mixer;
    assetLoader.load(
      "/blenderfile/doggo.glb",
      function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        mixer = new THREE.AnimationMixer(model);
        const clips = gltf.animations;

        // Play all animations at the same time
        clips.forEach(function (clip) {
          const action = mixer.clipAction(clip);
          action.play();
        });
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    assetLoader.load(
      "/blenderfile/Mountain.glb",
      function (gltf) {
        const model = gltf.scene;
        model.position.set(0, 20, 0);
        scene.add(model);
        mixer = new THREE.AnimationMixer(model);
        const clips = gltf.animations;

        // Play all animations at the same time
        clips.forEach(function (clip) {
          const action = mixer.clipAction(clip);
          action.play();
        });
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    //=========================adding some animation to doggo =========================
    const clock = new THREE.Clock();
    function animate1() {
      if (mixer) mixer.update(clock.getDelta());
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate1);
    /*=========================================================================*/

    //di chuyển
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.update();
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Render scene with camera
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      containerRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef}></div>;
};

export default ThreeScene;
