import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export type Fav = {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
};

export type Entity = 'track' | 'album' | 'artist';
