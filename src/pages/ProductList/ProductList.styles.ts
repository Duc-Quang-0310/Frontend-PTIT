import styled from 'styled-components';

export const ProductListSearchInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-inline: 80px;

  .search-res {
    font-size: 1.5rem;
    font-weight: 600;

    span {
      color: #40a9ff;
    }
  }
`;

export const ProductListSearchBar = styled.div`
  :hover {
    border-color: #40a9ff !important;
  }

  .ant-input-wrapper.ant-input-group {
    border-color: #40a9ff;

    .ant-input-affix-wrapper {
      height: 2.5rem;
      padding-block: 0.5rem;
      padding-inline: 1rem;
      border-top-left-radius: 0.375rem;
      border-bottom-left-radius: 0.375rem;

      :hover {
        border-color: #d9d9d9;
      }
    }

    .ant-input-group-addon {
      button {
        height: 2.5rem;
        width: 2.5rem;
        border-top-right-radius: 0.375rem !important;
        border-bottom-right-radius: 0.375rem !important;
      }
      button:hover {
        border-color: #40a9ff !important;
        color: #40a9ff !important;
      }
    }
  }
`;

export const ProductCardItem = styled.div`
  border: 1px solid #e5e9eb;
  background: #ffffff;
  padding-inline: 1.5rem;
  padding-block: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;

  img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    margin-bottom: 20px;
    display: block;
    margin-inline: auto;
  }

  .product-price {
    font-weight: 600;
    font-size: 18px;
    margin-top: auto;
  }

  .anticon-heart {
    position: absolute;
    top: 0;
    right: 0;
  }

  .anticon-shopping-cart {
  }
`;

export const BrandListContainer = styled.div`
  grid-column: span 1 / span 1;

  .title {
    font-weight: 600;
    margin-bottom: 6px;
    font-size: 1rem;
  }

  .ant-checkbox-wrapper {
    margin-bottom: 4px;

    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #1890ff;
      border-color: #1890ff;
    }
  }

  .ant-checkbox-group {
    display: flex;
    flex-direction: column;

    .ant-checkbox-group-item {
      margin-top: 4px;
    }
  }
`;

export const ProductListContainer = styled.div`
  margin-top: 1rem;

  .search-info {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-inline: 80px;

    .search-res {
      font-size: 1.5rem;
      font-weight: 600;

      span {
        color: #40a9ff;
      }
    }
  }

  .hidden {
    visibility: hidden;
  }
`;

export const ProductListContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-inline: 80px;

  .main-content {
    grid-column: span 3 / span 3;

    .ant-pagination {
      display: flex;
      justify-content: end;
    }

    .product-list {
      display: grid;
      gap: 8px;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      margin-top: 1rem;
      margin-bottom: 2rem;

      .spinner {
        grid-column: span 3 / span 3;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 500px;
      }
    }
  }
`;
