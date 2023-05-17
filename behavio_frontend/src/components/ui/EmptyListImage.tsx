import emptyListImage from '../../images/empty.svg';

interface EmptyListImageProps {
  width: number;
}

const EmptyListImage: React.FC<EmptyListImageProps> = ({ width }) => {
  return <img src={emptyListImage} width={width} alt="" />;
};

export default EmptyListImage;
