import React, { ComponentType, ReactNode } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary'; // Make sure path is correct

interface WithErrorBoundaryOptions {
  fallback?: (error: Error, resetErrorBoundary: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

function withErrorBoundary<P extends object>(
  WrappedComponent: ComponentType<P>,
  options?: WithErrorBoundaryOptions
): ComponentType<P> {
  const { fallback, onError } = options || {};

  return function ErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary fallback={fallback} onError={onError}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}
export default withErrorBoundary;
