/* eslint-disable no-unused-vars */
import { useState } from "react";

/* eslint-disable react/prop-types */
const Folder = ({ explorer, handleInsertNode = () => { } }) => {

    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: false
    });

    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput({
            visible: true,
            isFolder
        })
    }

    const onAddFolder = (e) => {
        if (e.keyCode == 13 && e.target.value) {
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder);

            setShowInput({ ...showInput, visible: false });
        }
    }


    if (explorer.isFolder) {
        return (
            <div style={{ marginTop: 8 }}>
                <div className="folder" onClick={() => setExpand(!expand)} style={{ cursor: "pointer" }}>
                    <span> 📂 {explorer.name} </span>

                    <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
                        <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
                    </div>
                </div>

                <div style={{ display: expand ? 'block' : 'none', paddingLeft: 24 }} >
                    {
                        showInput.visible && (
                            <div className="inputContainer">
                                <span> {showInput.isFolder ? "📂" : "📜"} </span>
                                <input
                                    type="text"
                                    onKeyDown={onAddFolder}
                                    onBlur={() => setShowInput({ ...showInput, visible: false })}
                                    className="inputContainer__input"
                                    autoFocus
                                />
                            </div>
                        )
                    }

                    {explorer.items.map((exp) => {
                        return (
                            <Folder explorer={exp} key={exp.id} handleInsertNode={handleInsertNode} />
                        );
                    })}
                </div>
            </div>
        );
    }
    else {
        return (
            <span className="file"> 📜 {explorer.name} </span>
        );
    }
    // 📜 📂
}

export default Folder;