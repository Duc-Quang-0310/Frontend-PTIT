import { useMemo } from 'react';
import BestSeller from './Components/BestSeller';
import CompanyFeature from './Components/CompanyFeature';
import UserFeedback from './Components/UserFeedback';
import UserSuggestProduct from './Components/UserSuggestProduct';
import WhyChooseUs from './Components/WhyChooseUs';

const Home = () => {
  const layoutMemo = useMemo(
    () => (
      <>
        <CompanyFeature />
        <UserFeedback />
        <BestSeller />
        <UserSuggestProduct />
        <WhyChooseUs />
      </>
    ),
    []
  );

  return layoutMemo;
};

export default Home;
