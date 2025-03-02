import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { useEffect, useState } from "react";

import EditorToolbar from "@repo/ui/components/rich-text/toolbar/editor-toolbar";

interface EditorProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Editor = ({ value, placeholder, onChange }: EditorProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,
      Underline,
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: "inline-sticker",
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert focus:outline-none max-w-full",
      },
      transformPastedHTML: (html) => html,
    },
    onUpdate: ({ editor }) => {
      onChange(editor.storage.markdown.getMarkdown());
    },
  });
  if (!isMounted) return null;

  if (!editor) return <></>;

  return (
    <div className="w-full border border-input bg-background dark:bg-background-dark">
      <EditorToolbar editor={editor} />
      <div className="editor-content-wrapper h-64 overflow-auto p-4">
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
    </div>
  );
};

export default Editor;
