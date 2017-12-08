import { rem } from 'polished';
import { Layout } from '../../../Root/components/atoms/Layout';
import { AdminPageLayout } from './AdminPageLayout';
import { BreadcrumbBar } from './BreadcrumbBar';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const AdminLayout = Layout.extend`
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
