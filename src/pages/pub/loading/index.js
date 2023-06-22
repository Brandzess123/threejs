import { useEffect, useRef } from "react";
// import { Canvas } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

const ThreeScene = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const orbit = new OrbitControls(camera, renderer.domElement);
    camera.position.set(6, 8, 14);
    orbit.update();

    const gridHelper = new THREE.GridHelper(12, 12);
    scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(4);
    scene.add(axesHelper);

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={canvasRef} />;
};

const IndexPage = () => {
  return (
    <div>
      {/* <Canvas>
        <ThreeScene />
      </Canvas> */}
    </div>
  );
};

export default IndexPage;
