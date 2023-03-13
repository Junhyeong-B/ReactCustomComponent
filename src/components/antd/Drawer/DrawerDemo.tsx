import React, { useState } from 'react';
import Drawer from './Drawer';

const DrawerDemo = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const onClose = () => {
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
  };
  return (
    <div>
      <button onClick={() => setOpen(true)}>Top</button>
      <button onClick={() => setOpen2(true)}>Right</button>
      <button onClick={() => setOpen3(true)}>Bottom</button>
      <button onClick={() => setOpen4(true)}>Left</button>
      <Drawer title="Title" placement="top" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <Drawer title="Title" placement="right" onClose={onClose} open={open2}>
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
    </div>
  );
};

export default DrawerDemo;
