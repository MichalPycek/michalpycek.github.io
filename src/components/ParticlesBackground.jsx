import { useEffect, useRef } from "react";

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    const particles = [];
    
    // Salesforce cloud path (simplified)
    const cloudPath = new Path2D("M25.5 12.5c-.7-3.4-3.7-6-7.4-6-2.5 0-4.8 1.2-6.2 3.1-1-.7-2.2-1.1-3.4-1.1-3.3 0-6 2.7-6 6 0 .3 0 .7.1 1-2.1 1.1-3.6 3.2-3.6 5.7 0 3.5 2.9 6.4 6.4 6.4h19.2c3.5 0 6.4-2.9 6.4-6.4 0-3.1-2.1-5.6-4.8-6.3");
    
    // Pre-render cloud to an offscreen canvas for better performance
    const cloudCanvas = document.createElement('canvas');
    const cloudSize = 30; // Base size for the cloud
    cloudCanvas.width = cloudSize;
    cloudCanvas.height = cloudSize;
    const cloudCtx = cloudCanvas.getContext('2d', { alpha: true });
    
    // Enable crisp rendering
    cloudCtx.imageSmoothingEnabled = true;
    cloudCtx.imageSmoothingQuality = 'high';
    
    // Scale and center the cloud path
    cloudCtx.translate(cloudSize/2, cloudSize/2);
    cloudCtx.scale(0.8, 0.8); // Scale to fit
    cloudCtx.translate(-15, -15); // Center the path
    
    // Draw the cloud with Salesforce blue
    cloudCtx.fillStyle = "#00A1E0"; // Salesforce blue
    cloudCtx.fill(cloudPath);
    
    // Add subtle highlight for better definition
    cloudCtx.strokeStyle = "#1AB0EE";
    cloudCtx.lineWidth = 0.5;
    cloudCtx.stroke(cloudPath);

    // Create initial particles
    const createParticles = (width, height) => {
      const newParticles = [];
      for (let i = 0; i < 40; i++) {
        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 0.5 + 0.4,
          rotation: (Math.random() - 0.5) * 0.2,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          opacity: 0.4 + Math.random() * 0.3
        });
      }
      return newParticles;
    };

    // Setup with debounced resize
    let resizeTimeout;
    const resize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const dpr = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const oldWidth = canvas.width / dpr;
        const oldHeight = canvas.height / dpr;
        
        // Update canvas size
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        // Adjust existing particle positions to new dimensions
        if (particles.length === 0) {
          particles.push(...createParticles(width, height));
        } else {
          particles.forEach(p => {
            p.x = (p.x / oldWidth) * width;
            p.y = (p.y / oldHeight) * height;
          });
        }
      }, 250); // Debounce delay
    };

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = window.innerWidth;
      const height = window.innerHeight;

      particles.forEach(p => {
        // Update
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        // Draw cloud
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(p.size, p.size);
        ctx.globalAlpha = p.opacity;
        ctx.drawImage(cloudCanvas, -15, -15);
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

      // Batch similar operations
    // Initialize
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    
    // Initial canvas setup
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Create initial particles
    particles.push(...createParticles(width, height));
    animate();

    // Event listeners
    window.addEventListener("resize", resize);

    // Prevent mobile pull-to-refresh and other touch interactions
    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
    }, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ backgroundColor: "transparent" }}
    />
  );
};

export default ParticlesBackground;
