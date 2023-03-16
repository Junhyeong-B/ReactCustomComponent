import { css } from '@emotion/css';
import React, { useState } from 'react';
import Drawer from './Drawer';

const DrawerDemo = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const onClose = () => {
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
  };
  return (
    <div>
      <button onClick={() => setOpen(true)}>Top</button>
      <button onClick={() => setOpen2(true)}>Right</button>
      <button onClick={() => setOpen3(true)}>Bottom</button>
      <button onClick={() => setOpen4(true)}>Left</button>
      <Drawer
        title="Title"
        placement="top"
        onClose={onClose}
        open={open}
        closable={false}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <Drawer
        title="Title"
        placement="right"
        onClose={onClose}
        open={open2}
        width={500}
        extra={
          <div>
            <button onClick={onClose}>Cancel</button>
            <button onClick={onClose}>OK</button>
          </div>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <Drawer title="Title" placement="bottom" onClose={onClose} open={open3}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <Drawer title="Title" placement="left" onClose={onClose} open={open4}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>

      <div className={containerCss} style={{ position: 'relative' }}>
        <button onClick={() => setOpen5(true)}>Render in this</button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={onClose}
          open={open5}
          getContainer={false}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    </div>
  );
};

export default DrawerDemo;

const containerCss = css`
  width: 600px;
  height: 600px;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
`;
