'use client';

import React from 'react';

import { StarterKit } from '@tiptap/starter-kit';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';

import { JSONContent } from '@tiptap/core';
import { Dispatch } from 'react';
import { Boblemeny } from './toolbar/boblemeny/Boblemeny';
import { Loader } from '@navikt/ds-react';
import { Underline } from '@tiptap/extension-underline';
import { PencilIcon } from '@navikt/aksel-icons';

interface Props {
  initialValue?: JSONContent;
  className?: string;
  setContent: Dispatch<JSONContent>;
  brukEditor: boolean;
  readOnly: boolean;
}

const extensions = [StarterKit, Underline];

export const Breveditor = ({ initialValue, brukEditor, setContent, readOnly }: Props) => {
  const editor = useEditor({
    extensions,
    content: initialValue,
    immediatelyRender: false,
    onUpdate({ editor }) {
      setContent(editor.getJSON());
    },
    editable: !readOnly,
  });

  if (!editor) {
    return (
      <div className="aap-brev-centerLoader">
        <Loader size={'2xlarge'} title={'Laster breveditor...'} />
      </div>
    );
  }

  return (
    <div className="aap-brev-editor">
      {editor && (
        <BubbleMenu editor={editor}>
          <Boblemeny editor={editor} />
        </BubbleMenu>
      )}
      <div className="aap-brev-editorContainer">
        <EditorContent
          editor={editor}
          className={brukEditor ? 'aap-brev-editorContent' : 'aap-brev-disabledEditor'}
          data-testid={'breveditor'}
        />
        <div className="aap-brev-redigerIkon">
          {brukEditor && !editor.isFocused && !readOnly && <PencilIcon title={'Rediger tekst'} />}
        </div>
      </div>
    </div>
  );
};
