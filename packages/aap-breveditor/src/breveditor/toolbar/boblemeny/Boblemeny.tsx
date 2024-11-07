import { Editor } from '@tiptap/react';
import { Button } from '@navikt/ds-react';

import { BulletListIcon } from '@navikt/aksel-icons';

interface BubbleMenuProps {
  editor: Editor | null;
}

export const Boblemeny = ({ editor }: BubbleMenuProps) => {
  if (!editor) {
    return;
  }
  return (
    <div className="aap-brev-boblemeny">
      <Button
        type={'button'}
        variant={'tertiary-neutral'}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? `aap-brev-boblemeny-active` : ''}
      >
        H3
      </Button>
      <Button
        type={'button'}
        variant={'tertiary-neutral'}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? `aap-brev-boblemeny-active` : ''}
      >
        <b>B</b>
      </Button>
      <Button
        type={'button'}
        variant={'tertiary-neutral'}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? `aap-brev-boblemeny-active` : ''}
      >
        <i>I</i>
      </Button>
      <Button
        type={'button'}
        variant={'tertiary-neutral'}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? `aap-brev-boblemeny-active` : ''}
      >
        <s>S</s>
      </Button>
      <Button
        type={'button'}
        variant={'tertiary-neutral'}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? `aap-brev-boblemeny-active` : ''}
      >
        <span className="aap-brev-boblemeny-underline">U</span>
      </Button>
      <Button
        type={'button'}
        variant={'tertiary-neutral'}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletlist') ? `aap-brev-boblemeny-active` : ''}
      >
        <BulletListIcon title={'Punktliste'} />
      </Button>
    </div>
  );
};
