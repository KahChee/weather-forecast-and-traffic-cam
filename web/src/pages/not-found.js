import Layout from '../components/layout';
import './styles/not-found.css';

const NotFound = () => {
  return (
    <Layout>
      <div className="not-found-container">
        <strong>404</strong>
        Page Not Found!
      </div>
    </Layout>
  );
}

export default NotFound;
