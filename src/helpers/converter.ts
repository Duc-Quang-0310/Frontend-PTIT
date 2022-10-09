export const convertEnglishPartToVietNam = (word: string) => {
  switch (word) {
    case 'brand':
      return 'Hãng sản xuất';
    case 'type':
      return 'Chủng loại';
    case 'partNumber':
      return 'Part Number';
    case 'color':
      return 'Mầu sắc';
    case 'chip':
      return 'Bộ vi xử lý';
    case 'chipSet':
      return 'Chipset';
    case 'rom':
      return 'Bộ nhớ trong';
    case 'connector':
      return 'Số khe cắm';
    case 'ram':
      return 'Dung lượng tối đa';
    case 'vga':
      return 'VGA';
    case 'disk':
      return 'Ổ cứng';
    case 'lightDisk':
      return 'Ổ quang';
    case 'cardReader':
      return 'Đầu đọc thẻ';
    case 'technology':
      return 'Bảo mật, công nghệ';
    case 'screen':
      return 'Màn hình';
    case 'webcam':
      return 'Webcam';
    case 'audio':
      return 'Âm thanh';
    case 'internet':
      return 'Giao tiếp mạng';
    case 'noWires':
      return 'Giao tiếp không dây';
    case 'connectionPort':
      return 'Cổng giao tiếp';
    case 'battery':
      return 'Pin';
    case 'size':
      return 'Kích thước (rộng x dài x cao)';
    case 'weight':
      return 'Cân nặng';
    case 'window':
      return 'Hệ điều hành';
    case 'accessory':
      return 'Phụ kiện đi kèm';
    case 'cpu':
      return 'CPU';
    case 'keyboard':
      return 'Bàn phím';
    default:
      return word;
  }
};
