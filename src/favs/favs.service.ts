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
    const entity = this.findEntity(entityName, id);

    const entityInFavs = this.dbService.favs[entityName].find(
      (entity: Artist | Album | Track) => entity.id === id,
    );

    if (!entityInFavs) {
      this.dbService.favs[entityName].push(entity);
    }
  }

  public delete(entityName: Entity, id: string): void {
    const entity = this.dbService.favs[entityName].find(
      (entity: Artist | Album | Track) => entity.id === id,
    );

    if (!entity) {
      throw new NotFoundException(
        `${capitalizeFirstLetter(entityName)} with this ID not found`,
      );
    }

    const entityIndex = this.dbService.favs[entityName].indexOf(entity);

    this.dbService.favs[entityName].splice(entityIndex, 1);
  }

  private findEntity(entityName: Entity, id: string): Artist | Album | Track {
    const entity = this.dbService[entityName].find(
      (entity: Artist | Album | Track) => entity.id === id,
    );

    if (!entity) {
      throw new UnprocessableEntityException(
        `${capitalizeFirstLetter(entityName)} with this ID doesn't exist`,
      );
    }

    return entity;
  }
}
