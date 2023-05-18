import { useState } from 'react';

interface YouTubeEmbedProps {
  embedLink: string | undefined;
  width?: number;
}
const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ embedLink, width }) => {
  return (
    <div className="video-responsive">
      <iframe
        className="w-full h-[250px] md:h-[375px] lg:h-[500px] bg-primary-light shadow-lg hover:shadow-xl active:shadow-lg"
        src={embedLink}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YouTubeEmbed;
