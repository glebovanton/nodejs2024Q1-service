import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Artist } from 'src/artist/entities/artist.entity';
import { CreateDto } from './dto/create-artist.dto';
import { UpdateDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private dbService: DatabaseService) {}

  public findAll(): Artist[] {
    return this.dbService.artists;
  }

  public findOne(id: string): Artist {
    return this.findArtist(id);
  }

  public create(dto: CreateDto): Artist {
    const artist: Artist = {
      id: uuidv4(),
      ...dto,
    };

    this.dbService.artists.push(artist);

    return artist;
  }

  public update(id: string, dto: UpdateDto): Artist {
    const artist = this.findArtist(id);

    return Object.assign(artist, dto);
  }

  public delete(id: string): void {
    const artist = this.findArtist(id);
    const artistIndex = this.dbService.artists.indexOf(artist);

    this.dbService.artists.splice(artistIndex, 1);
    this.dbService.tracks
      .filter((track) => track.artistId === artist.id)
      .forEach((track) => (track.artistId = null));
    this.dbService.albums
      .filter((album) => album.artistId === artist.id)
      .forEach((album) => (album.artistId = null));

    const artistInFavorites: Artist | undefined =
      this.dbService.favs.artists.find(
        (artist: Artist): boolean => artist.id === id,
      );

    if (artistInFavorites) {
      const artistIndex: number =
        this.dbService.favs.artists.indexOf(artistInFavorites);
      this.dbService.favs.artists.splice(artistIndex, 1);
    }
  }

  private findArtist(id: string): Artist {
    const artist: Artist | undefined = this.dbService.artists.find(
      (artist: Artist): boolean => artist.id === id,
    );

    if (!artist) {
      throw new NotFoundException('Artist with this ID not found');
    }

    return artist;
  }
}
