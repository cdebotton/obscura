import * as React from 'react';

type Props = {
  children: React.ReactElement<any>;
  manifest: { [x: string]: string };
};

export const Html = ({ children, manifest }: Props) => (
  <html lang="en">
    <head>
      <title>Obscura</title>
    </head>
    <body>
      <main id="app">{children}</main>
      <script src={manifest['main.js']} />
    </body>
  </html>
);
