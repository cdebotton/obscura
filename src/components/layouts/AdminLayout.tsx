import { rem } from 'polished';
import styled from 'styled-components';
import { BreadcrumbBar } from '../atoms/BreadcrumbBar';
import { Header } from '../atoms/Header';
import { Outlet } from '../atoms/Outlet';
import { Sidebar } from '../atoms/Sidebar';
import { Layout } from './Layout';

export const AdminLayout = styled(Layout)`
  justify-content: flex-start;
  align-content: flex-start;
  align-items: stretch;

  ${Header}, ${BreadcrumbBar} {
    flex: 0 0 100%;
  }

  ${Sidebar} {
    flex: 0 0 ${rem(212)};
  }

  ${Outlet} {
    flex: 1 1 auto;
  }
`;
