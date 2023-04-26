import { Spin } from 'antd';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import router from './router';
import './style/common.less';
const LoadingPage = () => {
  return (
    <div className="flex-center" style={{ height: '80vh' }}>
      <Spin size="large" />
    </div>
  );
};
function App() {
  return <Suspense fallback={<LoadingPage />}>{useRoutes(router)}</Suspense>;
}

export default App;
