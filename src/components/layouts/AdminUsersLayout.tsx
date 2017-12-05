import { Heading } from '../atoms/Heading';
import { AdminPageLayout } from './AdminPageLayout';

export const AdminUsersLayout = AdminPageLayout.extend`
  display: grid;
  width: 100%;
  min-height: 100%;
  grid:
    [row1-start] 'header' min-content [row1-end]
    [row2-start] 'form' min-content [row2-end]
    [row3-start] 'content' [row3-end]
    / 100%;

  ${Heading} {
    grid-area: header;
  }

  div[data-grid-area='content'] {
    grid-area: content;
  }
`;
