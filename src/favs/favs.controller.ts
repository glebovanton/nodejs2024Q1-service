import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { Entity, Fav } from './entities/fav.entity';
import { FavsService } from './favs.service';
import { capitalizeFirstLetter } from '../helpers';

@Controller('favs')
export class FavsController {
  private entities = ['track', 'album', 'artist'];

  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll(): Fav {
    return this.favsService.findAll();
  }

  @Post(':entity/:id')
  add(
    @Param('entity') entity: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): string {
    if (this.entities.includes(entity)) {
      this.favsService.add(this.convertToPlural(entity), id);

      return `${capitalizeFirstLetter(entity)} successfully added to favorites`;
    } else {
      throw new BadRequestException('Invalid entity');
    }
  }

  @Delete(':entity/:id')
  @HttpCode(204)
  delete(
    @Param('entity') entity: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): string {
    if (this.entities.includes(entity)) {
      this.favsService.delete(this.convertToPlural(entity), id);

      return `${capitalizeFirstLetter(
        entity,
      )} successfully deleted from favorites`;
    } else {
      throw new BadRequestException('Invalid entity');
    }
  }

  private convertToPlural(entityName: string): Entity {
    return `${entityName}s` as Entity;
  }
}
