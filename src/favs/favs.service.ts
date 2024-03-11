import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Entity, Fav } from 'src/favs/entities/fav.entity';
import { Track } from 'src/track/entities/track.entity';
import { capitalizeFirstLetter } from '../helpers';

@Injectable()
export class FavsService {
  constructor(private dbService: DatabaseService) {}

  public findAll(): Fav {
    return this.dbService.favs;
  }

  public add(entityName: Entity, id: string): void {
    const entity: Artist | Album | Track = this.findEntity(entityName, id);

    const entityInFavs: Artist | Album | Track | undefined =
      this.findEntityInFavs(entityName, id);

    if (!entityInFavs) {
      this.dbService.favs[entityName].push(entity);
    }
  }

  public delete(entityName: Entity, id: string): void {
    const entityInFavs: Artist | Album | Track | undefined =
      this.findEntityInFavs(entityName, id);

    if (!entityInFavs) {
      throw new NotFoundException(
        `${capitalizeFirstLetter(entityName)} with this ID not found`,
      );
    }

    const entityIndex: number =
      this.dbService.favs[entityName].indexOf(entityInFavs);

    this.dbService.favs[entityName].splice(entityIndex, 1);
  }

  private findEntity(entityName: Entity, id: string): Artist | Album | Track {
    const entity: Artist | Album | Track | undefined = this.dbService[
      entityName
    ].find((entity: Artist | Album | Track): boolean => entity.id === id);

    if (!entity) {
      throw new UnprocessableEntityException(
        `${capitalizeFirstLetter(entityName)} with this ID doesn't exist`,
      );
    }

    return entity;
  }

  private findEntityInFavs(
    entityName: Entity,
    id: string,
  ): Artist | Album | Track | undefined {
    return this.dbService.favs[entityName].find(
      (entity: Artist | Album | Track): boolean => entity.id === id,
    );
  }
}
