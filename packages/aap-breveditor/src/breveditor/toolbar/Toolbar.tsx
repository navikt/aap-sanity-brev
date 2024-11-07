import React from 'react';

import { Editor } from '@tiptap/react';

import { ArrowUndoIcon, BulletListIcon, NumberListIcon } from '@navikt/aksel-icons';
import { ToolbarButton } from './toolbarbutton/ToolbarButton';

interface Props {
  editor: Editor | null;
}

export const Toolbar = ({ editor }: Props) => {
  if (!editor) {
    return;
  }
  const markIsActive = (mark: string, attributes?: object) => {
    return editor?.isActive(mark, attributes);
  };

  return (
    <div className={`aap-brev-toolbar`} role={'toolbar'}>
      <ToolbarButton onClick={() => editor?.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        <ArrowUndoIcon className="aap-brev-toolbar-icon" title={'Angre'} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        active={markIsActive('heading', { level: 1 })}
      >
        H1
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        active={markIsActive('heading', { level: 2 })}
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        active={markIsActive('heading', { level: 3 })}
      >
        H3
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
        active={markIsActive('heading', { level: 4 })}
      >
        H4
      </ToolbarButton>
      <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} active={markIsActive('bold')}>
        B
      </ToolbarButton>
      <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} active={markIsActive('italic')}>
        I
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        active={markIsActive('bulletList')}
      >
        <BulletListIcon className="aap-brev-toolbar-icon" title={'Punktliste'} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        active={markIsActive('orderedList')}
      >
        <NumberListIcon className="aap-brev-toolbar-icon" title={'Nummerert liste'} />
      </ToolbarButton>
    </div>
  );
};
