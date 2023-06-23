import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Image from "next/image";
const IndexPage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, orbit;

    const init = () => {
      // Renderer
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
      renderer.setSize(window.innerWidth, window.innerHeight);
      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(
        45, //độ gần của camera
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(-90, 140, 140); //vị trí của camera
      camera.lookAt(scene.position);

      // Orbit Controls (di chuyển)
      orbit = new OrbitControls(camera, renderer.domElement);
      orbit.update();

      // Ambient Light (đèn)
      const ambientLight = new THREE.AmbientLight(0x333333);
      scene.add(ambientLight);

      // background (background)

      const cubeTextureLoader = new THREE.CubeTextureLoader();
      scene.background = cubeTextureLoader.load([
        "/img2/yonder_ft.jpg",
        "/img2/yonder_bk.jpg",
        "/img2/yonder_up.jpg",
        "/img2/yonder_dn.jpg",
        "/img2/yonder_rt.jpg",
        "/img2/yonder_lf.jpg",

        // "/papercut.png",
        // "/papercut.png",
        // "/papercut.png",
        // "/papercut.png",
        // "/papercut.png",
        // "/papercut.png",
      ]);

      // Texture Loader -> dùng để tạo object\
      //   scene.background.repeat.set(1, 1);
      //   scene.background.wrapS = THREE.RepeatWrapping; // Lặp lại ảnh theo chiều ngang (S)
      //   scene.background.wrapT = THREE.RepeatWrapping; // Lặp lại ảnh theo chiều dọc (T)

      const textureLoader = new THREE.TextureLoader();

      // Sun
      const sunGeo = new THREE.SphereGeometry(16, 30, 30);
      const sunMat = new THREE.MeshBasicMaterial({
        map: textureLoader.load("/2.jpg"),
      });
      const sun = new THREE.Mesh(sunGeo, sunMat);
      scene.add(sun);

      // Create Planete Function
      const createPlanete = (size, texture, position, ring) => {
        const geo = new THREE.SphereGeometry(size, 30, 30);
        const mat = new THREE.MeshStandardMaterial({
          map: textureLoader.load(texture),
        });
        const mesh = new THREE.Mesh(geo, mat); //tạo hình cầu

        //tạo circle
        const obj = new THREE.Object3D(); //
        obj.add(mesh);
        if (ring) {
          const ringGeo = new THREE.RingGeometry( //tạo 1 ring
            ring.innerRadius,
            ring.outerRadius,
            32
          );
          const ringMat = new THREE.MeshBasicMaterial({
            //chèn ảnh ring vào
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide,
          });
          const ringMesh = new THREE.Mesh(ringGeo, ringMat);

          obj.add(ringMesh);
          ringMesh.position.x = position; //set vị trí của các hành tinh khác
          ringMesh.rotation.x = -0.5 * Math.PI;
        }
        scene.add(obj);
        mesh.position.x = position;
        return { mesh, obj };
      };

      // Planets
      const mercury = createPlanete(3.2, "/mercury.jpg", 28);
      const venus = createPlanete(5.8, "/venus.jpg", 44);
      const earth = createPlanete(6, "/earth.jpg", 62);
      const mars = createPlanete(4, "/mars.jpg", 78);
      const jupiter = createPlanete(12, "/jupiter.jpg", 100);
      const saturn = createPlanete(10, "/saturn.jpg", 138, {
        innerRadius: 10,
        outerRadius: 20,
        texture: "/saturn ring.png",
      });
      const uranus = createPlanete(7, "/uranus.jpg", 176, {
        innerRadius: 7,
        outerRadius: 12,
        texture: "/uranus ring.png",
      });
      const neptune = createPlanete(7, "/neptune.jpg", 200);
      const pluto = createPlanete(2.8, "/pluto.jpg", 216);

      // Point Light
      const pointLight = new THREE.PointLight(0xffffff, 2, 300);
      scene.add(pointLight);

      // Animation Loop
      const animate = () => {
        // Self-rotation
        sun.rotateY(0.004);
        mercury.mesh.rotateY(0.004);
        venus.mesh.rotateY(0.002);
        earth.mesh.rotateY(0.02);
        mars.mesh.rotateY(0.018);
        jupiter.mesh.rotateY(0.04);
        saturn.mesh.rotateY(0.038);
        uranus.mesh.rotateY(0.03);
        neptune.mesh.rotateY(0.032);
        pluto.mesh.rotateY(0.008);

        // Around-sun-rotation
        mercury.obj.rotateY(0.04);
        venus.obj.rotateY(0.015);
        earth.obj.rotateY(0.01);
        mars.obj.rotateY(0.008);
        jupiter.obj.rotateY(0.002);
        saturn.obj.rotateY(0.0009);
        uranus.obj.rotateY(0.0004);
        neptune.obj.rotateY(0.0001);
        pluto.obj.rotateY(0.00007);

        renderer.render(scene, camera);

        requestAnimationFrame(animate);
      };

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
