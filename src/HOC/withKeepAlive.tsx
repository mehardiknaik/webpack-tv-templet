import React, {
  ComponentType,
  FC,
  JSX,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useState
} from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import KeepAlive, { useActivate, useUnactivate } from 'react-activation';
import { Location, useLocation } from 'react-router';

// Props injected into wrapped components
export interface KeepAliveProps {
  ref: RefObject<any>;
}

// Page context interface
export interface PageContextProps extends Location {
  pageInView: boolean;
  focusKey: string;
}

// Default context values
const defaultContext: PageContextProps = {
  pageInView: true,
  focusKey: '',
  hash: '',
  key: '',
  pathname: '',
  state: undefined,
  search: ''
};

// Create the context
const PageContext = React.createContext<PageContextProps>(defaultContext);

// Hook to access page context
export const usePageContext = (): PageContextProps => {
  return useContext(PageContext) || defaultContext;
};

// Higher-Order Component with KeepAlive logic
const withKeepAlive = <P extends object>(
  WrappedComponent: ComponentType<P & KeepAliveProps>
): FC<P> => {
  return (props: P) => {
    const location = useLocation();

    return (
      <KeepAlive
        key={location.pathname}
        name={location.pathname}
        //@ts-ignore
        contentProps={{ 'data-page-key': location.pathname }}>
        <AliveWithState Component={WrappedComponent} props={props} location={location} />
      </KeepAlive>
    );
  };
};

// Props for internal AliveWithState component
interface AliveWithStateProps {
  Component: ComponentType<any>;
  props: any;
  location: Location;
}

// Internal component handling focus and activation state
const AliveWithState: FC<AliveWithStateProps> = ({ Component, props, location }) => {
  const [pageInView, setPageInView] = useState(true);

  const { ref, focusKey, focusSelf } = useFocusable({
    trackChildren: true,
    focusable: pageInView
  });

  // Initial mount
  useEffect(() => {
    setPageInView(true);
    focusSelf();
  }, []);

  // When component is activated
  useActivate(() => {
    setPageInView(true);
    focusSelf();
  });

  // When component is unmounted from view (deactivated)
  useUnactivate(() => {
    setPageInView(false);
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <PageContext.Provider value={{ pageInView, focusKey, ...location }}>
        <Component {...props} ref={ref} />
      </PageContext.Provider>
    </FocusContext.Provider>
  );
};

export default withKeepAlive;
