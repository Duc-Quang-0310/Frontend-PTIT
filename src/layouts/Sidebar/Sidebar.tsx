import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Content, Resizer, SidebarWrapper } from './Sidebar.style';

const Sidebar: FC = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(150);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, [setIsResizing]);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, [setIsResizing]);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        setSidebarWidth(mouseMoveEvent.clientX);
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <SidebarWrapper itemProp={String(sidebarWidth)} ref={sidebarRef}>
      <Content>Dark side</Content>
      <Resizer onMouseDown={startResizing} />
    </SidebarWrapper>
  );
};

export default Sidebar;
