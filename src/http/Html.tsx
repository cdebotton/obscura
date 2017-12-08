import { normalize } from 'polished';
import * as React from 'react';
import {
  injectGlobal,
  ServerStyleSheet,
  SimpleInterpolation,
} from 'styled-components';

injectGlobal`
  ${normalize() as SimpleInterpolation}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

type Bundle = {
  id: string;
  name: string;
  file: string;
};

type Props = {
  children: React.ReactElement<any>;
  manifest: { [x: string]: string };
  state: { [x: string]: any };
  bundles: Bundle[];
};

export const Html = ({ bundles, children, manifest, state }: Props) => {
  const sheet = new ServerStyleSheet();
  sheet.collectStyles(children);

  return (
    <html lang="en">
      <head>
        <title>Obscura</title>
        {sheet.getStyleElement()}
      </head>
      <body>
        <main id="app">{children}</main>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              '\\u003c',
            )}`,
          }}
        />
        <script src={manifest['main.js']} />
        ${bundles.map(bundle => {
          return <script key={bundle.id} src={manifest[bundle.file]} />;
        })}
      </body>
    </html>
  );
};
