import './styles/index.css';

const Layout = ({ children }) => {
  return (
    <>
      <div className="main-container">
        { children }
      </div>
    </>
  );
}

export default Layout;
