import * as React from 'react';

export interface LoadingComponentProps {
  isLoading: boolean;
  pastDelay: boolean;
  timedOut: boolean;
  error: any;
}

export type Options<Props, Exports extends object> =
  | OptionsWithoutRender<Props>
  | OptionsWithRender<Props, Exports>;

export interface CommonOptions {
  loading: React.ComponentType<LoadingComponentProps> | (() => null);
  delay?: number | false | null;
  timeout?: number | false | null;
  modules?: string[];
  webpack?: () => number[];
}

export interface OptionsWithoutRender<Props> extends CommonOptions {
  loader(): Promise<
    React.ComponentType<Props> | { default: React.ComponentType<Props> }
  >;
}

export interface OptionsWithRender<Props, Exports extends object>
  extends CommonOptions {
  loader(): Promise<Exports>;
  render(loaded: Exports, props: Props): React.ReactNode;
}

export interface OptionsWithMap<Props, Exports extends { [key: string]: any }>
  extends CommonOptions {
  loader: { [P in keyof Exports]: () => Promise<Exports[P]> };
  render(loaded: Exports, props: Props): React.ReactNode;
}

export interface LoadableComponent {
  preload(): void;
}

export interface LoadableCaptureProps {
  report: (moduleName: string) => void;
}

export interface Loadable {
  <Props, Exports extends object>(
    options: Options<Props, Exports>,
  ): React.ComponentType<Props> & LoadableComponent;
  Map<Props, Exports extends { [key: string]: any }>(
    options: OptionsWithMap<Props, Exports>,
  ): React.ComponentType<Props> & LoadableComponent;
  preloadAll(): Promise<void>;
  preloadReady(): Promise<void>;

  Capture: React.ComponentType<LoadableCaptureProps>;
}

export const Loadable = require('react-loadable') as Loadable;
