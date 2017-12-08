import { Heading } from '../../../../modules/ui';
import { AdminPageLayout } from '../../../Admin/components/atoms/AdminPageLayout';

export const AdminUsersLayout = AdminPageLayout.extend`
  display: grid;
  width: 100%;
  min-height: 100%;
  grid:
    [row1-start] 'header' min-content [row1-end]
    [row2-start] 'form' min-content [row2-end]
    [row3-start] 'content' [row3-end]
    / auto;

  ${Heading} {
    grid-area: header;
  }

  div[data-grid-area='content'] {
    grid-area: content;
  }
`;
