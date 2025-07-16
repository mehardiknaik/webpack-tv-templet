import {
  FocusContext,
  FocusDetails,
  useFocusable,
  type FocusableComponentLayout,
  type FocusHandler
} from '@noriginmedia/norigin-spatial-navigation';
import React, { Children, cloneElement, useCallback, useEffect } from 'react';
import styles from './Curosel.module.css';
import screen from '../../util/Screen';
import { ScrollContext, useScroll } from './ScrollProvider';

interface CuroselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onFocus'> {
  onFocus?: FocusHandler;
  autoFocus?: boolean;
  className?: string;
  animation?: boolean;
  style?: React.CSSProperties;
}

const Curosel: React.FC<CuroselProps> = ({
  onFocus,
  autoFocus,
  className = '',
  children,
  animation = true,
  style,
  ...props
}) => {
  const { scroll } = useScroll();
  const onFocusHandler = (layout: FocusableComponentLayout, props: any, details: FocusDetails) => {
    if (details.event?.type === 'keydown') scroll(layout);
    onFocus?.(layout, props, details);
  };
  const { ref, focusKey, focusSelf } = useFocusable({
    trackChildren: true,
    onFocus: onFocusHandler
  });
  const onScroll = useCallback(
    ({ x, width }: FocusableComponentLayout) => {
      if (!ref.current) return;
      const dom = ref.current.getBoundingClientRect();
      const h = Math.max(x + width - dom?.width / screen.pixelRatio, 0);
      ref.current.style.transform = `translateX(-${h}px)`;
    },
    [ref]
  );
  useEffect(() => {
    if (autoFocus) focusSelf();
  }, [focusSelf, autoFocus]);
  return (
    <FocusContext.Provider value={focusKey}>
      <ScrollContext.Provider value={{ scroll: onScroll }}>
        <div
          className={`${styles.container} ${animation ? 'animation' : ''} ${className}`}
          ref={ref}
          style={style}
          {...props}>
          {Children.map(children, (child: any, index: number) => {
            return cloneElement(child, {
              index
            });
          })}
        </div>
      </ScrollContext.Provider>
    </FocusContext.Provider>
  );
};

export default Curosel;
