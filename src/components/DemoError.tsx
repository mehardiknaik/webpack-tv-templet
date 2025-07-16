import withErrorBoundary from '../HOC/withErrorBoundary';

const DemoError = () => {
  throw new Error('This is a demo error to test the ErrorBoundary component.');
};

export default withErrorBoundary(DemoError);
