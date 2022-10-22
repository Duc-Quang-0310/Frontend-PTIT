import { FC, useId, useMemo, memo } from 'react';
import { Table } from 'antd';
import { UPDATE } from 'constants/mock.constants';
import { convertEnglishPartToVietNam } from 'helpers/converter';
import { useAppSelector } from 'hooks/redux';

interface ProductListInfoDetailProps {
  id?: string;
}

const ProductListInfoDetail: FC<ProductListInfoDetailProps> = ({ id }) => {
  const uniqueId = useId();
  const { laptopDetail } = useAppSelector((state) => state.laptop);

  const infoMemo = useMemo(
    () =>
      laptopDetail
        ? [
            { label: 'brand', value: laptopDetail?.brand || UPDATE },
            { label: 'type', value: laptopDetail?.type || UPDATE },
            { label: 'partNumber', value: laptopDetail?.partNumber || UPDATE },
            { label: 'color', value: laptopDetail?.color || UPDATE },
            {
              label: 'chip',
              value: laptopDetail?.chip || UPDATE
            },
            { label: 'chipSet', value: laptopDetail?.chipSet || UPDATE },
            { label: 'rom', value: laptopDetail?.rom || UPDATE },
            { label: 'connector', value: laptopDetail?.connector || UPDATE },
            { label: 'ram', value: laptopDetail?.ram || UPDATE },
            { label: 'vga', value: laptopDetail?.vga || UPDATE },
            {
              label: 'disk',
              value: laptopDetail?.disk || UPDATE
            },
            { label: 'lightDisk', value: laptopDetail?.lightDisk || UPDATE },
            { label: 'cardReader', value: laptopDetail?.cardReader || UPDATE },
            {
              label: 'technology',
              value: laptopDetail?.technology || UPDATE
            },
            {
              label: 'screen',
              value: laptopDetail?.screen || UPDATE
            },
            { label: 'webcam', value: laptopDetail?.webcam || UPDATE },
            {
              label: 'audio',
              value: laptopDetail?.audio || UPDATE
            },
            { label: 'internet', value: laptopDetail?.internet || UPDATE },
            { label: 'noWires', value: laptopDetail?.noWires || UPDATE },
            {
              label: 'connectionPort',
              value: laptopDetail?.connectionPort || UPDATE
            },
            { label: 'battery', value: laptopDetail?.battery || UPDATE },
            { label: 'size', value: laptopDetail?.size || UPDATE },
            { label: 'weight', value: laptopDetail?.weight || UPDATE },
            { label: 'window', value: laptopDetail?.window || UPDATE },
            { label: 'accessory', value: laptopDetail?.accessory || UPDATE }
          ]
        : [],
    [laptopDetail]
  );

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
      infoMemo?.map((item, index) => ({
        key: `${item.label}at${index}with${id}`,
        label: convertEnglishPartToVietNam(item.label),
        value: item.value || 'Đang cập nhật'
      })) || [],
    [id, infoMemo]
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

export default memo(ProductListInfoDetail);
