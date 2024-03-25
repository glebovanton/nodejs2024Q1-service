import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto/create-artist.dto';
import { UpdateDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  public async findOne(id: string): Promise<Artist> {
    return await this.findArtist(id);
  }

  public async create(dto: CreateDto): Promise<Artist> {
    return await this.prisma.artist.create({
      data: dto,
    });
  }

  public async update(id: string, dto: UpdateDto): Promise<Artist> {
    await this.findArtist(id);

    return await this.prisma.artist.update({
      where: { id },
      data: dto,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.findArtist(id);

    await this.prisma.artist.delete({
      where: { id },
    });
  }

  private async findArtist(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException('Artist with this ID not found');
    }

    return artist;
  }
}
