import CheckCircleOutlined from '@ant-design/icons/lib/icons/CheckCircleOutlined';
import { images } from 'assets/image';
import { FC, memo, useId } from 'react';
import {
  CompanyFeatureContainer,
  LeftBlock,
  PromoteText,
  RightBlock,
  AdditionalContent
} from '../style/CompanyFeature';

const CompanyFeature: FC = () => {
  const id = useId();

  return (
    <CompanyFeatureContainer key={id}>
      <LeftBlock>
        <span>Tăng năng suất làm việc của bạn</span>
        <PromoteText>
          Work from home dễ dàng
          <br /> với công cụ tốt hơn
        </PromoteText>
        <AdditionalContent>
          <div>
            <CheckCircleOutlined style={{ fontSize: 20 }} />
            <p>
              Hãy tìm kiếm trợ thủ đắc lực.
              <br /> Nâng cao chất lượng công việc
            </p>
          </div>
          <div>
            <CheckCircleOutlined style={{ fontSize: 20 }} />
            <p>
              200+ Chiếc laptop đang ở đây để
              <br /> phục vụ theo nhu cầu của bạn
            </p>
          </div>
        </AdditionalContent>
      </LeftBlock>
      <RightBlock>
        <img src={images.MAN_IN_CHAIR} alt="Man in chair" />
      </RightBlock>
    </CompanyFeatureContainer>
  );
};

export default memo(CompanyFeature);
