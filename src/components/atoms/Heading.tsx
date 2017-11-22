import { modularScale } from 'polished';
import * as React from 'react';
import { styled } from '../../utils/styled-components';

type Props = React.HTMLProps<HTMLHeadingElement> & {
  className?: string;
  level?: number;
};

const HeadingBase: React.SFC<Props> = ({ level = 1, ...rest }) =>
  React.createElement(`h${level}`, rest);

const getFontScale = ({ level = 1 }: Props): string => {
  const value = Math.max(3 - (level - 1), 0);
  return modularScale(value);
};

const getFontWeight = ({ level = 1 }: Props) => {
  if (level === 1 || level > 4) {
    return 400;
  }

  return 800;
};

export const Heading = styled<Props>(HeadingBase)`
  width: 100%;
  padding: 0;
  margin: 0;
  font-family: ${props => props.theme.typography.heading};
  font-weight: ${getFontWeight};
  font-size: ${getFontScale};
`;
