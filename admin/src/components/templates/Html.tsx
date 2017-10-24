import { normalize } from 'polished';
import React from 'react';
import { injectGlobal, ServerStyleSheet } from 'styled-components';

injectGlobal`
  ${normalize() as any}
`;

type Props = {
  children: React.ReactElement<any>;
};

const Html = ({ children }: Props) => {
  const sheet = new ServerStyleSheet();
  sheet.collectStyles(children);

  return (
    <html lang="en">
      <head>
        <title>Obscura Admin</title>
        {sheet.getStyleElement()}
      </head>
      <body>
        <main id="app">{children}</main>
        <script src="/dist/bundle.js" />
      </body>
    </html>
  );
};

export default Html;
