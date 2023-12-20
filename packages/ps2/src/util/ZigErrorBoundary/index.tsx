import React from 'react';
import ErrorStub from './components/ErorStub';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ZigErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { error: Error }
> {
  state = {
    error: undefined as Error,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      error,
    };
  }

  render() {
    if (this.state.error) {
      return <ErrorStub />;
    }
    return this.props.children;
  }
}
