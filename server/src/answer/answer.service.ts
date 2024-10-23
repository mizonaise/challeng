import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAnswerDto) {
    const answer = await this.prisma.answer.create({
      data: dto,
    });
    return answer;
  }

  async findAll() {
    const answers = await this.prisma.answer.findMany({});
    return answers;
  }

  async findOne(id: number) {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      },
    });

    return answer;
  }

  async update(id: number, dto: UpdateAnswerDto) {
    const answer = await this.prisma.answer.update({
      where: {
        id,
      },
      data: dto,
    });

    return answer;
  }

  async remove(id: number) {
    const answer = await this.prisma.answer.delete({
      where: {
        id,
      },
    });

    return answer;
  }
}
