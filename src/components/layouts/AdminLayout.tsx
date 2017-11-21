import { rem } from 'polished';
import styled from 'styled-components';
import { BreadcrumbBar } from '../atoms/BreadcrumbBar';
import { Header } from '../atoms/Header';
import { Outlet } from '../atoms/Outlet';
import { Row } from '../atoms/Row';
import { Sidebar } from '../atoms/Sidebar';
import { Layout } from './Layout';

export const AdminLayout = styled(Layout)`
  flex-flow: column nowrap;
  align-content: stretch;
  justify-content: flex-start;

  ${Header}, ${BreadcrumbBar} {
    flex: 0 0 auto;
  }

  ${Row} {
    flex: 1 0 auto;
  }

  ${Sidebar} {
    flex: 0 0 ${rem(212)};
  }

  ${Outlet} {
    flex: 1 1 auto;
  }
`;
