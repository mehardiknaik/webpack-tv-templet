const scrollHandler = (element: HTMLElement, v: number, dir: 'y' | 'x') => {
  if (!element) return;
  if (dir === 'y') element.style.transform = `translateY(-${v}px)`;
  else if (dir === 'x') element.style.transform = `translateX(-${v}px)`;
};

export default scrollHandler;
