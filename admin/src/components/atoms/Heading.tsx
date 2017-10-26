import React from 'react';
import styled from 'styled-components';

type Props = React.HTMLProps<HTMLHeadingElement> & {
  level?: number;
};

const Heading = ({ level = 1, ...props }: Props) => {
  if (level < 1 || level > 6) {
    throw new Error('Invalid heading level, must be: h1, h2, h3, h4, h5, or h6');
  }

  const element = `h${level}`;

  return React.createElement(element, props);
};

export default styled(Heading)`
  position: relative;
`;
