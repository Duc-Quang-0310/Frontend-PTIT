import Toggler from 'components/Toggler/Toggler';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Content, Resizer, SidebarWrapper } from './Sidebar.style';

const Sidebar: FC = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(100);
  const [toggle, setToggle] = useState(false);

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

  useEffect(() => {
    if (toggle) {
      setSidebarWidth(120);
    } else {
      setSidebarWidth(70);
    }
  }, [toggle]);

  return (
    <SidebarWrapper
      itemProp={String(sidebarWidth)}
      ref={sidebarRef}
      itemRef={String(isResizing)}
    >
      <Content>
        {!isResizing && (
          <Toggler
            isOpen={toggle}
            setIsOpen={setToggle}
            position={{ top: 10, right: -15 }}
          />
        )}
        Dark side
      </Content>
      <Resizer onMouseDown={startResizing} />
    </SidebarWrapper>
  );
};

export default Sidebar;
