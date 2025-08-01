declare global {
  interface Window {
    lenis?: {
      scroll: number;
      on: (event: string, callback: (e: any) => void) => void;
      off: (event: string, callback: (e: any) => void) => void;
      raf: (time: number) => void;
      destroy: () => void;
    } | undefined;
  }
}

export {}