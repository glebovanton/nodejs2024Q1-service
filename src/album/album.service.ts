import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto/create-album.dto';
import { UpdateDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  public async findAll() {
    return await this.prisma.album.findMany();
  }

  public async findOne(id: string) {
    return await this.findAlbum(id);
  }

  public async create(dto: CreateDto) {
    const { artistId, ...rest } = dto;

    return await this.prisma.album.create({
      data: {
        ...rest,
        artistId: artistId || null,
      },
    });
  }

  public async update(id: string, dto: UpdateDto) {
    await this.findAlbum(id);
    const { artistId, ...rest } = dto;

    return await this.prisma.album.update({
      where: { id },
      data: {
        ...rest,
        artistId: artistId || null,
      },
    });
  }

  public async delete(id: string): Promise<void> {
    await this.findAlbum(id);
    await this.prisma.album.delete({
      where: { id },
    });
  }

  private async findAlbum(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException('Album with this ID not found');
    }

    return album;
  }
}
