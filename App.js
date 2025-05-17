import axios from 'axios';
import React, { useState, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';

export default function App() {
  const [code, setCode] = useState(`# Write your Python code here\nprint("Hello, world!")`);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const editorRef = useRef(null);

  // Handle editor mount to get editor instance
  function handleEditorDidMount(editor) {
    editorRef.current = editor;
    editor.focus();
  }

  const handleRun = async () => {
    setOutput('Running code...');
    try {
      const response = await axios.post('http://localhost:5000/run', {
        code,
        input,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput('Error running code: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleClearOutput = () => {
    setOutput('');
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: 'auto',
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Mini Coding Editor & Terminal</h1>

      {/* Editor with font size and line number toggle */}
      <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <label>
            Font size:{' '}
            <input
              type="number"
              min="10"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              style={{ width: 50 }}
            />
          </label>
          <label style={{ marginLeft: 20 }}>
            <input
              type="checkbox"
              checked={showLineNumbers}
              onChange={() => setShowLineNumbers(!showLineNumbers)}
            />{' '}
            Show line numbers
          </label>
        </div>
      </div>

      <div style={{ height: 300, border: '1px solid #ccc', borderRadius: 4 }}>
        <MonacoEditor
          language="python"
          value={code}
          onChange={(value) => setCode(value)}
          onMount={handleEditorDidMount}
          options={{
            fontSize,
            minimap: { enabled: false },
            lineNumbers: showLineNumbers ? 'on' : 'off',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            tabSize: 4,
            wordWrap: 'on',
          }}
          theme="vs-dark"
        />
      </div>

      {/* Input box for stdin */}
      <div style={{ marginTop: 12 }}>
        <label>
          Input (stdin):
          <textarea
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter input for your program here"
            style={{ width: '100%', fontFamily: 'monospace', fontSize: 14, marginTop: 4, borderRadius: 4 }}
          />
        </label>
      </div>

      {/* Buttons */}
      <div style={{ marginTop: 10 }}>
        <button onClick={handleRun} style={{ marginRight: 10, padding: '8px 16px', cursor: 'pointer' }}>
          Run Code
        </button>
        <button onClick={handleClearOutput} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Clear Output
        </button>
      </div>

      {/* Output terminal */}
      <div
        style={{
          marginTop: 20,
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          padding: 12,
          minHeight: 160,
          fontFamily: "'Courier New', Courier, monospace",
          whiteSpace: 'pre-wrap',
          borderRadius: 4,
          boxShadow: 'inset 0 0 8px #000',
          overflowY: 'auto',
        }}
        tabIndex={0}
        aria-label="Program output terminal"
      >
        {output || 'Program output will appear here...'}
      </div>
    </div>
  );
}
