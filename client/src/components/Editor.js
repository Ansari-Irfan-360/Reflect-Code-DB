import React, { useEffect, useRef, useState } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import { ACTIONS } from "../Actions";
import { toast } from "react-hot-toast";
import axios from "axios";

const BackendUrl = "https://reflect-code.onrender.com";

function Editor({ socketRef, roomId, onCodeChange }) {
  const [codeData, setCodeData] = useState({ Code: "", roomID: roomId });
  const [savedStatus, setSavedStatus] = useState(false);
  const [saveUpdate, setSaveUpdate] = useState("Save");

  const lastSavedRef = useRef("");
  const passRef = useRef(false);
  const editorRef = useRef(null);

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
        const { origin } = changes;
        const code = instance.getValue();
        setCodeData((prevCodeData) => ({
          ...prevCodeData,
          Code: code,
        }));

        setSavedStatus(false);
        if (lastSavedRef.current === code) {
          setSavedStatus(true);
        } else {
          setSavedStatus(false);
        }

        onCodeChange(code);
        
        if (origin !== "setValue" || passRef.current) {
          passRef.current = false;
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    };

    init();
    handleGet();
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
      await navigator.clipboard.writeText(codeData.Code);
      toast.success("Code copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy the code");
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(`${BackendUrl}/save`, codeData);
      lastSavedRef.current = codeData.Code;
      setSavedStatus(true);
      toast.success("Code saved successfully");
      setSaveUpdate("Update Saved");
    } catch (error) {
      toast.error("Failed to save the code");
    }
  };

  const handleGet = async (showToast = false) => {
    try {
      const res = await axios.get(`${BackendUrl}/get/${codeData.roomID}`);
      if (res.status === 200) {
        passRef.current = true;
        lastSavedRef.current = res.data.code;
        editorRef.current.setValue(res.data.code);
        setSavedStatus(true);
        if (showToast) {
          toast.success("Code retrieved successfully");
        }
        setSaveUpdate("Update");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        const message = `No Code found for Room ID ${codeData.roomID}`;
        if (showToast) {
          toast.error(message);
        } else {
          console.log(message);
        }
      } else {
        console.log("Failed to retrieve the code");
      }
    }
  };

  const handleDelete = async () => {
    const confirmClearEditor = window.confirm(
      "Are you sure you want to delete this code from the database and the editor?"
    );

    if (confirmClearEditor) {
      passRef.current = true;
      editorRef.current.setValue("");

      try {
        const res = await axios.delete(
          `${BackendUrl}/delete/${codeData.roomID}`
        );
        toast.success("Code deleted successfully");
        setSaveUpdate("Save");
      } catch (error) {
        toast.error("Failed to delete the code");
      }
    }
  };

  const handleClear = async () => {
    const confirmClearEditor = window.confirm(
      "Are you sure you want to clear the editor?"
    );

    if (confirmClearEditor) {
      passRef.current = true;
      editorRef.current.setValue("");
      toast.success("Editor cleared");
    }
  };

  return (
    <div
      style={{
        marginTop: "12px",
        height: "640px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <textarea
        value={'console.log("Hello World!");'}
        id="realtimeEditor"
      ></textarea>

      <p style={{ color: savedStatus ? "green" : "red" }}>
        {savedStatus ? "Saved" : "Not Saved"}
      </p>
      <div style={{ alignSelf: "center", marginBottom: "5px" }}>
        <button
          className="btn btn-success"
          style={{ margin: "10px", alignSelf: "center" }}
          onClick={handleSave}
        >
          {saveUpdate} Code
        </button>
        <button
          className="btn btn-warning"
          style={{ margin: "10px", alignSelf: "center" }}
          onClick={handleClear}
        >
          Clear Editor
        </button>
        <button
          className="btn btn-danger"
          style={{ margin: "10px", alignSelf: "center" }}
          onClick={handleDelete}
        >
          Delete Code
        </button>
        <button
          className="btn btn-primary"
          style={{ margin: "10px", alignSelf: "center" }}
          onClick={() => {
            const confirmClearEditor = window.confirm(
              "Are you sure you want to retrieve the saved code and clear the editor?"
            );
            if (confirmClearEditor) {
              handleGet(true);
            }
          }}
        >
          Get Saved Code
        </button>
        <button
          className="btn btn-secondary"
          style={{ margin: "10px", alignSelf: "center" }}
          onClick={handleCopy}
        >
          Copy Code
        </button>
      </div>
    </div>
  );
}

export default Editor;
