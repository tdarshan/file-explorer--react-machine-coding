/* eslint-disable no-unused-vars */
import { useState } from 'react'
import explorer from './data/folderData'
import './App.css'

import Folder from './components/Folder'
import useTraverseTree from './hooks/use-traverse-tree'

const App = () => {

  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();
  

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);

    setExplorerData(finalTree);
  }

  return (
    <div className="App">
      <Folder explorer={explorerData} handleInsertNode={handleInsertNode} />
    </div>
  )
}

export default App