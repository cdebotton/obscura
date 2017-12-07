import { rem } from 'polished';
import { styled } from '../../../../utils/styled-components';

export const BreadcrumbBar = styled.div`
  z-index: 1;
  display: flex;
  height: ${rem(60)};
  align-items: center;
  padding: ${rem(20)} ${rem(10)};
  background-color: #fff;
  box-shadow: 1px 3px 6px 0 rgba(0, 0, 0, 0.08);
`;
