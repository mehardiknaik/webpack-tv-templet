const scrollHandler = (element: HTMLElement, v: number, dir: 'y' | 'x') => {
  if (!element) return;
  if (dir === 'y') element.scrollTo({ top: v, behavior: 'smooth' });
  else if (dir === 'x') element.scrollTo({ left: v, behavior: 'smooth' });
};

export default scrollHandler;
