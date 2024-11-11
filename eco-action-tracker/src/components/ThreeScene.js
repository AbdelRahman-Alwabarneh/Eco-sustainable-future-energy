"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const ThreeScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let cleanup = () => {};

    const loadThree = async () => {
      const THREE = await import("three");
      let scene, camera, renderer, geometry, material, particles;

      const init = () => {
        scene = new THREE.Scene();

        // Set background color to #2d3134 for dark theme
        scene.background = new THREE.Color(0x2d3134); // Updated background color

        camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          alpha: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Create geometry and add particles
        geometry = new THREE.BufferGeometry();
        const vertices = [];

        for (let i = 0; i < 10000; i++) {
          const x = Math.random() * 2000 - 1000;
          const y = Math.random() * 2000 - 1000;
          const z = Math.random() * 2000 - 1000;
          vertices.push(x, y, z);
        }

        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(vertices, 3)
        );

        // Use white particles for contrast on #2d3134 background
        material = new THREE.PointsMaterial({
          color: 0xffffff, // White particles
          size: Math.random() * 2 + 1, // Random size between 1 and 3
          transparent: true,
          opacity: 0.8,
        });

        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        camera.position.z = 1000;

        // Add ambient light for better visibility
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
        scene.add(ambientLight);
      };

      const animate = () => {
        requestAnimationFrame(animate);

        // Enhance particle movement
        particles.rotation.x += 0.001; // Increase rotation speed
        particles.rotation.y += 0.001;

        // Optionally animate scaling for a pulsating effect
        particles.scale.set(
          1 + Math.sin(Date.now() * 0.001) * 0.1, // Pulsate scale
          1 + Math.sin(Date.now() * 0.001) * 0.1,
          1
        );

        renderer.render(scene, camera);
      };

      init();
      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", handleResize);

      cleanup = () => {
        window.removeEventListener("resize", handleResize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };

    loadThree();

    return () => cleanup();
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
};

export default dynamic(() => Promise.resolve(ThreeScene), { ssr: false });
