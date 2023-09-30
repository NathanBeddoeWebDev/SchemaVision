import React, { useEffect } from 'react';
import { basicSetup, EditorView } from 'codemirror';
import { EditorState, Compartment } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { sql } from '@codemirror/lang-sql';
import { indentWithTab } from '@codemirror/commands';

const CodeEditor: React.FC = () => {
    const language = new Compartment(),
        tabSize = new Compartment();

    useEffect(() => {
        const codeMirrorContainer = document.getElementById('editor'); // Replace with the actual element ID or referenc
        const state = EditorState.create({
            extensions: [
                basicSetup,
                language.of(sql()),
                keymap.of([indentWithTab]),
                tabSize.of(EditorState.tabSize.of(8)),
            ],
        });

        const view = new EditorView({
            state,
            parent: codeMirrorContainer as Element,
        });

        return () => {
            // Cleanup editor when the component unmounts
            view.destroy();
        };
    }, []); // Empty dependency array ensures useEffect runs only once

    return <div aria-label="Code Editor" id="editor" className="flex-1 overflow-auto"></div>;
};

export default CodeEditor;
