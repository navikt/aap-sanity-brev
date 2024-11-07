import { ReactNode } from 'react';
import { Button } from '@navikt/ds-react';

interface ToolbarButtonProps {
  onClick: () => void;
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
}

export const ToolbarButton = ({ onClick, active = false, children, disabled = false }: ToolbarButtonProps) => {
  const classNames = `aap-brev-toolbar-toolbarbutton ${active ? 'aap-brev-toolbar-toolbarbutton-active' : ''}`;
  return (
    <Button
      type={'button'}
      variant={'tertiary-neutral'}
      onClick={() => onClick()}
      className={classNames}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
