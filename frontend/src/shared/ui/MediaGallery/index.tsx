import React from 'react'
import Gallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { Attachment } from 'shared/types'

type MediaGalleryProps = {
  mediaItems: Attachment[];
};

const MediaGallery: React.FC<MediaGalleryProps> = ({ mediaItems }) => {
  if (mediaItems.length === 0) return null;

  const galleryItems = mediaItems.map((media) => ({
    original: media.attachment_link,
    thumbnail: media.attachment_link,
    description: media.attachment_type === 'photo' ? 'Изображение' : 'Видео',
    renderItem: () => {
      const itemStyle: React.CSSProperties = {
        width: '100%',
        height: '200px',
        borderRadius: '10px',
        objectFit: 'cover',
      };

      return media.attachment_type === 'video' ? (
        <video width="100%" height="100%" controls style={itemStyle}>
          <source src={media.attachment_link} type="video/mp4" />
          Ваш браузер не поддерживает тег video.
        </video>
      ) : (
        <img src={media.attachment_link} alt="media" style={itemStyle} />
      );
    },
  }));

  return (
    <div>
      <Gallery
        items={galleryItems}
        showFullscreenButton={false}
      />
    </div>
  );
};

export default MediaGallery;
