import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const containerRef = useRef();

  useEffect(() => {
    // Tạo một scene
    const scene = new THREE.Scene();

    // Tạo một camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    // Tạo một renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //================================================================
    //create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    //animate chuyển động
    const line = new THREE.Line(geometry, material);

    scene.add(line);
    renderer.render(scene, camera);

    // Cleanup
    // return () => {
    //   containerRef.current.removeChild(renderer.domElement);
    //   renderer.dispose();
    // };
  }, []);

  return <div ref={containerRef}></div>;
};

export default ThreeScene;
