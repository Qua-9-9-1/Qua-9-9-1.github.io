import { useEffect, useState } from 'react';

export function useGpuTier() {
  const [gpuInfo, setGpuInfo] = useState<{
    renderer: string;
    vendor: string;
    isLowEnd: boolean;
  } | null>(null);

  useEffect(() => {
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
          setGpuInfo({ renderer, vendor, isLowEnd });
        }
      }
    } catch {
      setGpuInfo(null);
    }
  }, []);

  return gpuInfo;
}
