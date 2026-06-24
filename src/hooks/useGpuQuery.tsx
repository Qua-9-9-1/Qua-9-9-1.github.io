import { useState } from 'react';

export function useGpuTier() {
  const [gpuInfo] = useState(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return null;
    }

    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      if (gl && gl instanceof WebGLRenderingContext) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');

        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          const isLowEnd = /(mali|adreno|powervr|intel)/i.test(
            renderer + vendor
          );

          return { renderer, vendor, isLowEnd };
        }
      }
    } catch {
      return null;
    }

    return null;
  });

  return gpuInfo;
}
