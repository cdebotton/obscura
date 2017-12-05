import { rem } from 'polished';
import styled from 'styled-components';
import { BreadcrumbBar } from '../atoms/BreadcrumbBar';
import { Header } from '../atoms/Header';
import { Sidebar } from '../atoms/Sidebar';
import { AdminPageLayout } from './AdminPageLayout';
import { Layout } from './Layout';

export const AdminLayout = styled(Layout)`
  grid:
    [row1-start] 'header header' min-content [row1-end]
    [row2-start] 'sidebar breadcrumb-bar' min-content [row2-end]
    [row3-start] 'sidebar admin-page-layout' auto [row3-end]
    / ${rem(60)} auto;

  ${Header} {
    grid-area: header;
  }

  ${BreadcrumbBar} {
    grid-area: breadcrumb-bar;
  }

  ${Sidebar} {
    grid-area: sidebar;
  }

  ${AdminPageLayout} {
    border-left: 1px solid #efefef;
  }
`;
