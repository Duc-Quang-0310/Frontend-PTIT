import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { FC, memo, ReactNode, useState } from 'react';
import { CollapseUIWrapper } from './CollapseUI.styles';

interface CollapseUIProps {
  title: string | ReactNode;
  contentCollapse: ReactNode;
}

const CollapseUI: FC<CollapseUIProps> = ({ title, contentCollapse }) => {
  const [viewMore, setViewMore] = useState(false);

  return (
    <CollapseUIWrapper
      onClick={() => setViewMore((prev) => !prev)}
      itemProp={String(viewMore)}
    >
      <header className="header">
        <div>{title}</div>
        {viewMore ? (
          <CaretUpOutlined style={{ fontSize: 18, color: 'white' }} />
        ) : (
          <CaretDownOutlined style={{ fontSize: 18 }} />
        )}
      </header>
      <body className={`${viewMore ? 'display' : 'hide'} transition`}>
        {contentCollapse}
      </body>
    </CollapseUIWrapper>
  );
};

export default memo(CollapseUI);
