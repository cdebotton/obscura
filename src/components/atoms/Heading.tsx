import { modularScale } from 'polished';
import * as React from 'react';
import styled from 'styled-components';

type Props = React.HTMLProps<HTMLHeadingElement> & {
  className?: string;
  level?: number;
};

const HeadingBase: React.SFC<Props> = ({ level = 1, ...rest }) =>
  React.createElement(`h${level}`, rest);

export const Heading = styled<Props>(HeadingBase)`
  padding: 0;
  margin: 0;
  font-size: ${props => modularScale(6 - (props.level || 1))};
`;
