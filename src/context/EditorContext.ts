import { createContext, useContext } from 'react'
import { Editor } from '@tiptap/react'

export const EditorContext = createContext<Editor | null>(null);
export const useEditorContext = () => useContext(EditorContext);
