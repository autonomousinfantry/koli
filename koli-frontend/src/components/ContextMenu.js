import React from 'react';
import { Menu, Item, contextMenu, Submenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

const ContextMenu = ({ onNewFolder, onNewPrivateFolder, onDownloadAll, onRecentlyDeleted, onProjectSettings, onShare, onRename, onMoveTo, onCopyTo, onDuplicate, onMakePrivate, onDownload, onDelete }) => {
  return (
    <Menu id="context-menu">
      <Item onClick={onNewFolder}>New Folder</Item>
      <Item onClick={onNewPrivateFolder}>New Private Folder</Item>
      <Item onClick={onDownloadAll}>Download All</Item>
      <Item onClick={onRecentlyDeleted}>Recently Deleted</Item>
      <Item onClick={onProjectSettings}>Projects Settings</Item>
      <Submenu label="Folder Options">
        <Item onClick={onShare}>Share</Item>
        <Item onClick={onRename}>Rename</Item>
        <Item onClick={onMoveTo}>Move to...</Item>
        <Item onClick={onCopyTo}>Copy to...</Item>
        <Item onClick={onDuplicate}>Duplicate</Item>
        <Item onClick={onMakePrivate}>Make Private</Item>
        <Item onClick={onDownload}>Download</Item>
        <Item onClick={onDelete}>Delete</Item>
      </Submenu>
    </Menu>
  );
};

export const showContextMenu = (e) => {
  e.preventDefault();
  contextMenu.show({
    id: 'context-menu',
    event: e,
  });
};

export default ContextMenu;
