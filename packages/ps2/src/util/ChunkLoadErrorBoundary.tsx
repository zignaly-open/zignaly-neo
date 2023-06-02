import React from 'react';
import { junkyard } from './junkyard';
import { zigSuspenseFallback } from './suspense';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const LAST_CHUNK_LOAD_ERROR = 'lastChunkLoadError';

export class ChunkLoadErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasChunkLoadError: boolean }
> {
  state = {
    hasChunkLoadError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      hasChunkLoadError: error?.toString().includes('ChunkLoadError'),
    };
  }

  shouldReloadOnChunkLoadError() {
    return (
      Date.now() - +(junkyard.getSession(LAST_CHUNK_LOAD_ERROR) || 0) > 60_000
    );
  }

  storeLastChunkErrorRefresh() {
    junkyard.setSession(LAST_CHUNK_LOAD_ERROR, Date.now().toString());
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  componentDidUpdate(_, prevState: Readonly<{ hasChunkLoadError: boolean }>) {
    const { hasChunkLoadError } = this.state;
    if (
      !prevState.hasChunkLoadError &&
      hasChunkLoadError &&
      this.shouldReloadOnChunkLoadError()
    ) {
      this.storeLastChunkErrorRefresh();
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasChunkLoadError) {
      return zigSuspenseFallback;
    }
    return this.props.children;
  }
}
