import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Image from "next/image";
const IndexPage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let renderer,
      scene,
      camera,
      orbit,
      ambient,
      directionalLight,
      flash = 15000,
      rainGeo = 15000,
      rainCount = 15000,
      rainMaterial,
      rain = 15000,
      cloudParticles = [],
      rainDrop;

    const init = () => {
      // Renderer
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
      renderer.setSize(window.innerWidth, window.innerHeight);
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x11111f, 0.002);
      renderer.setClearColor(scene.fog.color);
      // Scene

      // Camera
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.z = 1;
      camera.rotation.x = 1.16;
      camera.rotation.y = -0.12;
      camera.rotation.z = 0.27;

      // Orbit Controls (di chuyển)
      orbit = new OrbitControls(camera, renderer.domElement);
      orbit.update();

      // Ambient Light (đèn)
      ambient = new THREE.AmbientLight(0x555555);
      scene.add(ambient);

      directionalLight = new THREE.DirectionalLight(0xffeedd);
      directionalLight.position.set(0, 0, 1);
      scene.add(directionalLight);

      flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
      flash.position.set(200, 300, 100);
      scene.add(flash);

      // background (background)

      rainGeo = new THREE.BufferGeometry();
      const vertices = [];
      for (let i = 0; i < rainCount; i++) {
        rainDrop = new THREE.Vector3(
          Math.random() * 400 - 200,
          Math.random() * 500 - 250,
          Math.random() * 400 - 200
        );
        vertices.push(rainDrop.x, rainDrop.y, rainDrop.z);
        // velocity.push(0);
      }

      rainMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.1,
        transparent: true,
      });

      rain = new THREE.Points(rainGeo, rainMaterial);

      scene.add(rain);
      let loader = new THREE.TextureLoader();

      loader.load("smoke.png", function (texture) {
        cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
        cloudMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true,
        });

        for (let p = 0; p < 25; p++) {
          let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
          cloud.position.set(
            Math.random() * 800 - 400,
            500,
            Math.random() * 500 - 450
          );
          cloud.rotation.x = 1.16;
          cloud.rotation.y = -0.12;
          cloud.rotation.z = Math.random() * 360;
          cloud.material.opacity = 0.6;
          cloudParticles.push(cloud);
          scene.add(cloud);
        }
        animate();
      });

      // Animation Loop
      function animate() {
        cloudParticles.forEach((p) => {
          p.rotation.z -= 0.002;
        });
        rainGeo.vertices.forEach((p) => {
          p.velocity -= 0.1 + Math.random() * 0.1;
          p.y += p.velocity;
          if (p.y < -200) {
            p.y = 200;
            p.velocity = 0;
          }
        });
        rainGeo.verticesNeedUpdate = true;
        rain.rotation.y += 0.002;
        if (Math.random() > 0.93 || flash.power > 100) {
          if (flash.power < 100)
            flash.position.set(
              Math.random() * 400,
              300 + Math.random() * 200,
              100
            );
          flash.power = 50 + Math.random() * 500;
        }
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }

      animate();

      // Window Resize Event
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", handleResize);
    };

    init();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default IndexPage;
