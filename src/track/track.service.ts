import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './entities/track.entity';
import { CreateDto } from './dto/create-track.dto';
import { UpdateDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  public async findOne(id: string): Promise<Track> {
    return await this.findTrack(id);
  }

  public async create(dto: CreateDto): Promise<Track> {
    const { artistId, albumId, ...rest } = dto;

    return await this.prisma.track.create({
      data: {
        ...rest,
        artistId: artistId || null,
        albumId: albumId || null,
      },
    });
  }

  public async update(id: string, dto: UpdateDto): Promise<Track> {
    await this.findTrack(id);
    const { artistId, albumId, ...rest } = dto;

    return await this.prisma.track.update({
      where: { id },
      data: {
        ...rest,
        artistId: artistId || null,
        albumId: albumId || null,
      },
    });
  }

  public async delete(id: string): Promise<void> {
    await this.findTrack(id);
    await this.prisma.track.delete({
      where: { id },
    });
  }

  private async findTrack(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException('Track with this ID not found');
    }

    return track;
  }
}
