interface YouTubeEmbedProps {
  embedId: string;
  width?: number;
}
const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ embedId, width }) => {
  return (
    <div className="video-responsive">
      <iframe
        width={width || 560}
        height="480"
        className="w-full"
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YouTubeEmbed;
