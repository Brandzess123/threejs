import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
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

    // Tạo một renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Tạo các đối tượng geometry
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

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
