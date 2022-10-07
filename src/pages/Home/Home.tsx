import { useMemo } from 'react';
import BestSeller from './Components/BestSeller';
import CompanyFeature from './Components/CompanyFeature';
import UserFeedback from './Components/UserFeedback';
import UserSuggestProduct from './Components/UserSuggestProduct';

const Home = () => {
  const layoutMemo = useMemo(
    () => (
      <>
        <CompanyFeature />
        <UserFeedback />
        <BestSeller />
        <UserSuggestProduct />
      </>
    ),
    []
  );

  return layoutMemo;
};

export default Home;
