import { FC, useId, useMemo } from 'react';
import { Table } from 'antd';
import { LIST_INFO_MOCK } from 'constants/mock.constants';
import { convertEnglishPartToVietNam } from 'helpers/converter';

interface ProductListInfoDetailProps {
  id?: string;
}

const ProductListInfoDetail: FC<ProductListInfoDetailProps> = ({ id }) => {
  const uniqueId = useId();

  const columns = useMemo(
    () => [
      {
        title: 'Tên',
        dataIndex: 'label',
        key: `${id}label`
      },
      {
        title: 'Thông tin',
        dataIndex: 'value',
        key: `${id}value`
      }
    ],
    [id]
  );

  const dataSource = useMemo(
    () =>
      LIST_INFO_MOCK?.map((item, index) => ({
        key: `${item.label}at${index}with${id}`,
        label: convertEnglishPartToVietNam(item.label),
        value: item.value || 'Đang cập nhật'
      })) || [],
    [id]
  );

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      key={uniqueId}
      rowKey={`${uniqueId}row`}
      pagination={false}
    />
  );
};

export default ProductListInfoDetail;
