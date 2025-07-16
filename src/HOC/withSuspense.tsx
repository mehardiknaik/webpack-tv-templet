// withSuspense.tsx
import React, { Suspense, ComponentType, ReactNode } from 'react';

function withSuspense<T extends object>(
  LazyComponent: React.LazyExoticComponent<ComponentType<T>>,
  fallback: ReactNode = <div>Loading...</div>
): React.FC<T> {
  return (props: T) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

export default withSuspense;
