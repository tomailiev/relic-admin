import { useCurrentEditor } from "@tiptap/react"
import TipTapAlignmentButtons from "./TipTapAlignmentButtons";
import TipTapFontButtons from "./TipTapFontButtons";
import BlockTypeSelect from "./TipTapBlockTypeSelect";

const MenuBar = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor.chain().extendMarkRange('link').unsetLink()
                .run()

            return
        }

        // update link
        try {
            editor.chain().extendMarkRange('link').setLink({ href: url.includes(':') ? url : `https://${url}` })
                .run()
        } catch (e) {
            console.log(e);

        }
    }


    return (
        <div className="control-group">
            <div className="button-group">
                <TipTapFontButtons />
                {/* <TipTapTextBlockSelect /> */}
                <BlockTypeSelect />
                <button
                    onClick={() => editor.chain().toggleCode().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            
                            .toggleCode()
                            .run()
                    }
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                    Code
                </button>
                <button onClick={() => editor.chain().unsetAllMarks().run()}>
                    Clear marks
                </button>
                <button onClick={() => editor.chain().clearNodes().run()}>
                    Clear nodes
                </button>
                {/* <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                >
                    Paragraph
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    H1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                >
                    H3
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                >
                    H4
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                >
                    H5
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
                >
                    H6
                </button> */}
                <button
                    onClick={() => editor.chain().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    Bullet list
                </button>
                <button
                    onClick={() => editor.chain().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    Ordered list
                </button>
                <button
                    onClick={() => editor.chain().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    Code block
                </button>
                <button
                    onClick={() => editor.chain().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                    Blockquote
                </button>
                <button onClick={() => editor.chain().setHorizontalRule().run()}>
                    Horizontal rule
                </button>
                <button onClick={() => editor.chain().setHardBreak().run()}>
                    Hard break
                </button>
                <button
                    onClick={() => editor.chain().undo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            
                            .undo()
                            .run()
                    }
                >
                    Undo
                </button>
                <button
                    onClick={() => editor.chain().redo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            
                            .redo()
                            .run()
                    }
                >
                    Redo
                </button>
                <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
                    Set link
                </button>
                <button
                    onClick={() => editor.chain().unsetLink().run()}
                    disabled={!editor.isActive('link')}
                >
                    Unset link
                </button>
                <TipTapAlignmentButtons />
            </div>
        </div>
    )
};

export default MenuBar