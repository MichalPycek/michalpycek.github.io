import { useEffect, useRef } from "react";

const MIN_PARTICLES = 36;
const MAX_PARTICLES = 120;
const PARTICLE_DENSITY = 0.00003;
const FLASH_RADIUS = 260;

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      return;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const particles = [];

    const pointer = {
      x: 0,
      y: 0,
      active: false,
    };

    const cloudPath = new Path2D(
      "M25.5 12.5c-.7-3.4-3.7-6-7.4-6-2.5 0-4.8 1.2-6.2 3.1-1-.7-2.2-1.1-3.4-1.1-3.3 0-6 2.7-6 6 0 .3 0 .7.1 1-2.1 1.1-3.6 3.2-3.6 5.7 0 3.5 2.9 6.4 6.4 6.4h19.2c3.5 0 6.4-2.9 6.4-6.4 0-3.1-2.1-5.6-4.8-6.3"
    );

    const cloudCanvas = document.createElement("canvas");
    const cloudSize = 30;
    cloudCanvas.width = cloudSize;
    cloudCanvas.height = cloudSize;
    const cloudCtx = cloudCanvas.getContext("2d", { alpha: true });

    if (!cloudCtx) {
      return;
    }

    cloudCtx.imageSmoothingEnabled = true;
    cloudCtx.imageSmoothingQuality = "high";
    cloudCtx.translate(cloudSize / 2, cloudSize / 2);
    cloudCtx.scale(0.8, 0.8);
    cloudCtx.translate(-15, -15);
    cloudCtx.fillStyle = "#00A1E0";
    cloudCtx.fill(cloudPath);
    cloudCtx.strokeStyle = "#1AB0EE";
    cloudCtx.lineWidth = 0.5;
    cloudCtx.stroke(cloudPath);

    let layoutWidth = 0;
    let layoutHeight = 0;
    let deviceRatio = window.devicePixelRatio || 1;

    const computeParticleCount = (width, height) => {
      const target = Math.round(width * height * PARTICLE_DENSITY);
      return Math.max(MIN_PARTICLES, Math.min(MAX_PARTICLES, target));
    };

    const createParticle = (width, height) => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        x,
        y,
        size: Math.random() * 0.5 + 0.4,
        rotation: (Math.random() - 0.5) * 0.2,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        opacity: 0.4 + Math.random() * 0.3,
      };
    };

    const createParticles = (width, height, count) => {
      const newParticles = [];
      for (let i = 0; i < count; i += 1) {
        newParticles.push(createParticle(width, height));
      }
      return newParticles;
    };

    const adjustParticleCount = (targetCount, width, height) => {
      if (particles.length < targetCount) {
        particles.push(
          ...createParticles(width, height, targetCount - particles.length)
        );
        return;
      }

      if (particles.length > targetCount) {
        particles.length = targetCount;
      }
    };

    const applyCanvasSize = (width, height, dpr) => {
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
    };

    const getCanvasDimensions = () => {
      const parent = canvas.parentElement;
      const width =
        parent?.clientWidth ?? document.documentElement.clientWidth ?? window.innerWidth;
      const height = Math.max(
        parent?.scrollHeight ?? 0,
        parent?.clientHeight ?? 0,
        document.documentElement.scrollHeight,
        document.documentElement.clientHeight,
        document.body?.scrollHeight ?? 0,
        window.innerHeight
      );
      return { width, height };
    };

    const updateLayout = () => {
      const { width, height } = getCanvasDimensions();
      const dpr = window.devicePixelRatio || 1;

      const widthChanged = width !== layoutWidth;
      const heightChanged = height !== layoutHeight;
      const dprChanged = Math.abs(dpr - deviceRatio) > 0.01;

      if (!widthChanged && !heightChanged && !dprChanged) {
        return;
      }

      const prevWidth = layoutWidth || width;
      const prevHeight = layoutHeight || height;

      layoutWidth = width;
      layoutHeight = height;
      deviceRatio = dpr;

      applyCanvasSize(width, height, dpr);

      if (widthChanged || heightChanged) {
        particles.forEach((particle) => {
          particle.x = (particle.x / prevWidth) * width;
          particle.y = (particle.y / prevHeight) * height;
        });
      }

      const targetCount = computeParticleCount(width, height);
      adjustParticleCount(targetCount, width, height);
    };

    const scheduleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(updateLayout, 150);
    };

    const animate = () => {
      ctx.clearRect(0, 0, layoutWidth, layoutHeight);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -30) particle.x = layoutWidth + 30;
        if (particle.x > layoutWidth + 30) particle.x = -30;
        if (particle.y < -30) particle.y = layoutHeight + 30;
        if (particle.y > layoutHeight + 30) particle.y = -30;

        // subtle rotation ties to motion
        particle.rotation += (particle.vx + particle.vy) * 0.01;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.scale(particle.size, particle.size);
        ctx.globalAlpha = particle.opacity;
        ctx.drawImage(cloudCanvas, -15, -15);
        ctx.restore();
      });

      // flashlight glow over cursor
      if (pointer.active) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        const glow = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          FLASH_RADIUS
        );
        glow.addColorStop(0, "rgba(120, 200, 255, 0.32)");
        glow.addColorStop(0.35, "rgba(70, 160, 255, 0.18)");
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, layoutWidth, layoutHeight);
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    updateLayout();
    animate();

    const resizeListener = () => scheduleResize();
    window.addEventListener("resize", resizeListener, { passive: true });
    window.addEventListener("orientationchange", resizeListener);

    const pointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const pointerLeave = () => {
      pointer.active = false;
    };

    window.addEventListener("pointermove", pointerMove, { passive: true });
    window.addEventListener("pointerleave", pointerLeave, { passive: true });
    window.addEventListener("pointercancel", pointerLeave, { passive: true });

    let resizeObserver;
    if (window.ResizeObserver) {
      const parent = canvas.parentElement || document.body;
      resizeObserver = new ResizeObserver(() => scheduleResize());
      if (parent) {
        resizeObserver.observe(parent);
      }
    }

    return () => {
      window.removeEventListener("resize", resizeListener);
      window.removeEventListener("orientationchange", resizeListener);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerleave", pointerLeave);
      window.removeEventListener("pointercancel", pointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      style={{ backgroundColor: "transparent" }}
    />
  );
};

export default ParticlesBackground;
