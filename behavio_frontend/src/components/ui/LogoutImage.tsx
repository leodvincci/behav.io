import logoutImage from '../../images/Bye-cuate.png';

interface LogoutImageProps {
  width: number;
}
const LogoutImage: React.FC<LogoutImageProps> = ({ width }) => {
  return <img src={logoutImage} alt="Logout" width={width} />;
};

export default LogoutImage;
