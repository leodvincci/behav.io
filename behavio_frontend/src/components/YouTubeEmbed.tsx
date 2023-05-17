interface YouTubeEmbedProps {
  embedLink: string;
  width?: number;
}
const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ embedLink, width }) => {
  return (
    <div className="video-responsive">
      <iframe
        // width={width || 560}
        height="480"
        className="w-full"
        src={embedLink}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YouTubeEmbed;
