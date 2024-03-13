import React, { useEffect, useRef, useState } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import { ACTIONS } from "../Actions";
import { toast } from "react-hot-toast";

function Editor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);
  const [entierCode,setEntierCode] = useState("")
  useEffect(() => {
    const init = async () => {
      const editor = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      // for sync the code
      editorRef.current = editor;

      editor.setSize(null, "100%");
      editorRef.current.on("change", (instance, changes) => {
        // console.log("changes", instance ,  changes );
        const { origin } = changes;
        const code = instance.getValue(); // code has value which we write
        setEntierCode(code)
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    };

    init();
  }, []);

  // data receive from server
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(entierCode);
      toast.success(`Code is copied`);
    } catch (error) {
      console.log(error);
      toast.error("unable to copy the Code");
    }
  };

  return (
    
    <div style={{ height: "640px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <textarea id="realtimeEditor"></textarea>
      <button className="btn btn-success" style={{ marginTop: "10px", alignSelf: "center" }} onClick={handleCopy}>Copy Code</button>
    </div>
  );
}

export default Editor;
