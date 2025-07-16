import {
  FocusContext,
  useFocusable,
  type FocusableComponentLayout,
  type FocusHandler
} from '@noriginmedia/norigin-spatial-navigation';
import React from 'react';
import { Children, cloneElement, useCallback, useEffect } from 'react';
import screen from '../../util/Screen';
import { ScrollContext } from './ScrollProvider';
import platform from '../../util/platform';

let styles: any = {};
styles = platform({
  web: require('./Vertical.web.module.css').default,
  default: require('./Vertical.module.css').default
});
interface VerticalProps extends React.PropsWithChildren {
  onFocus?: FocusHandler;
  autoFocus?: boolean;
  className?: string;
  animation?: boolean;
  style?: React.CSSProperties;
}

const Vertical: React.FC<VerticalProps> = ({
  onFocus,
  autoFocus,
  className = '',
  children,
  animation = true,
  style
}) => {
  const { ref, focusKey, focusSelf } = useFocusable({
    trackChildren: true,
    onFocus
  });
  const onScroll = useCallback(
    ({ y, height }: FocusableComponentLayout) => {
      if (!ref.current) return;
      const dom = ref.current?.getBoundingClientRect();
      const v = Math.max(y + height - dom?.height / screen.pixelRatio, 0);
      ref.current.style.transform = `translateY(-${v}px)`;
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
          style={style}>
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

export default Vertical;
