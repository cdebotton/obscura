import { rem } from 'polished';
import styled from 'styled-components';

export const BreadcrumbBar = styled.div`
  background-color: #fff;
  padding: ${rem(20)} ${rem(10)};
  height: ${rem(60)};
  display: flex;
  align-items: center;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
  z-index: 1;
`;
