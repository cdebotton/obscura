import { normalize } from 'polished';
import * as React from 'react';
import {
  injectGlobal,
  ServerStyleSheet,
  SimpleInterpolation,
} from 'styled-components';

injectGlobal`
  ${normalize() as SimpleInterpolation}
`;

type Props = {
  children: React.ReactElement<any>;
  manifest: { [x: string]: string };
};

export const Html = ({ children, manifest }: Props) => {
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
        <script src={manifest['main.js']} />
      </body>
    </html>
  );
};
