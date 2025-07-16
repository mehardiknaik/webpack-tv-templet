import {
  FocusableComponentLayout,
  FocusContext,
  FocusDetails,
  useFocusable,
  type UseFocusableConfig
} from '@noriginmedia/norigin-spatial-navigation';
import React, {
  ReactNode,
  useEffect,
  useMemo,
  JSX,
  useCallback,
  createElement,
  HTMLElementType
} from 'react';
import styles from './Focusable.module.css';
import { useScroll } from './ScrollProvider';
import clsx from 'clsx';

export interface FocusableProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children' | 'onFocus'> {
  children:
    | ReactNode
    | (({
        focused,
        hasFocusedChild
      }: {
        focused: boolean;
        hasFocusedChild: boolean;
      }) => JSX.Element);
  autoFocus?: boolean;
  className?:
    | string
    | (({ focused, hasFocusedChild }: { focused: boolean; hasFocusedChild: boolean }) => string);
  style?: React.CSSProperties;
  focusConfig?: UseFocusableConfig;
  trackChildren?: boolean;
  element?: HTMLElementType;
}

const Focusable: React.FC<FocusableProps> = ({
  autoFocus,
  children,
  className,
  trackChildren,
  style,
  focusConfig,
  element = 'div',
  ...rest
}) => {
  const { scroll } = useScroll();

  const onFocusHandler = (layout: FocusableComponentLayout, props: any, details: FocusDetails) => {
    if (details?.type !== 'mouse') scroll(layout);
    focusConfig?.onFocus?.(layout, props, details);
  };
  const { ref, focusSelf, focused, hasFocusedChild, focusKey } = useFocusable({
    ...focusConfig,
    trackChildren,
    onFocus: onFocusHandler
  });
  useEffect(() => {
    if (autoFocus) focusSelf();
  }, [focusSelf, autoFocus]);

  const userClass = useMemo(
    () => (typeof className === 'function' ? className({ focused, hasFocusedChild }) : className),
    [focused, className]
  );
  const onMouseEnter = useCallback(() => {
    if (focused || trackChildren) return;
    focusSelf({ type: 'mouse' });
  }, [focusSelf, focused]);

  const onClick = useCallback(() => {
    focusConfig?.onEnterPress?.(focusConfig?.extraProps as object, {
      pressedKeys: 'click' as any
    });
  }, [focusConfig?.onEnterPress, JSON.stringify(focusConfig?.extraProps)]);

  const renderElement = createElement(element, {
    ref,
    className: clsx(userClass ?? [styles.container, focused && styles.focused]),
    style,
    onMouseEnter,
    onClick,
    ...rest,
    children: typeof children === 'function' ? children({ focused, hasFocusedChild }) : children
  });

  return trackChildren ? (
    <FocusContext.Provider value={focusKey}>{renderElement}</FocusContext.Provider>
  ) : (
    renderElement
  );
};

export default Focusable;
