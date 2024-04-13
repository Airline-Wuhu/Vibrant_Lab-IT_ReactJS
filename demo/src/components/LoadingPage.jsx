import { Spin, Alert } from 'antd';

const LoadingPage = ({message, description}) => (
  <Spin tip="Fetching data..." size='large'>
    <Alert
      message={message}
      description={description}
      type="info"
    />
  </Spin>
);

export default LoadingPage;
