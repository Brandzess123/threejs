import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const SolarSystem = () => {
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
    camera.position.z = 20;

    // Tạo một renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Tạo mặt trời
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Tạo mặt trăng
    const moonGeometry = new THREE.SphereGeometry(1, 32, 32);
    const moonMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moon);

    // Tạo các vị trí ban đầu và bán kính quỹ đạo
    const orbitRadius = 10;
    let sunRotation = 0;
    let moonRotation = 0;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate sun
      sun.rotation.y += 0.01;

      // Rotate moon around sun
      moonRotation += 0.02;
      moon.position.x = Math.cos(moonRotation) * orbitRadius;
      moon.position.z = Math.sin(moonRotation) * orbitRadius;

      // Rotate moon around its axis
      moon.rotation.y += 0.01;

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

export default SolarSystem;
