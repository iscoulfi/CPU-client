import ContentLoader from 'react-content-loader';

const MyLoader = () => (
  <ContentLoader
    speed={2}
    width={315}
    height={100}
    viewBox="0 0 315 100"
    backgroundColor="#e5e1e1"
    foregroundColor="#addcff"
  >
    <rect x="5" y="10" rx="3" ry="3" width="40" height="16" />
    <rect x="125" y="8" rx="2" ry="2" width="50" height="18" />
    <rect x="55" y="7" rx="2" ry="2" width="60" height="20" />
    <rect x="275" y="9" rx="2" ry="2" width="40" height="16" />
    <rect x="185" y="5" rx="2" ry="2" width="80" height="24" />
    <rect x="5" y="42" rx="3" ry="3" width="50" height="18" />
    <rect x="125" y="40" rx="2" ry="2" width="70" height="20" />
    <rect x="65" y="43" rx="2" ry="2" width="50" height="16" />
    <rect x="205" y="43" rx="2" ry="2" width="100" height="16" />
    <rect x="5" y="73" rx="3" ry="3" width="40" height="22" />
    <rect x="125" y="76" rx="2" ry="2" width="50" height="18" />
    <rect x="55" y="75" rx="2" ry="2" width="60" height="18" />
    <rect x="275" y="73" rx="2" ry="2" width="40" height="18" />
    <rect x="185" y="72" rx="2" ry="2" width="80" height="22" />
  </ContentLoader>
);

export default MyLoader;
