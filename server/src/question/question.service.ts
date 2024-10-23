import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateQuestionDto) {
    const question = await this.prisma.question.create({
      data: dto,
    });
    return question;
  }

  async findAll() {
    const questions = await this.prisma.question.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          title: 'desc',
        },
      ],
      select: {
        id: true,
        title: true,
        createdAt: true,
        description: true,
        answers: {
          orderBy: [
            {
              createdAt: 'desc',
            },
          ],
          select: {
            id: true,
            createdAt: true,
            description: true,
          },
        },
      },
    });
    return questions;
  }

  async findOne(id: number) {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });

    return question;
  }

  async update(id: number, dto: UpdateQuestionDto) {
    const question = await this.prisma.question.update({
      where: {
        id,
      },
      data: dto,
    });

    return question;
  }

  async remove(id: number) {
    const question = await this.prisma.question.delete({
      where: {
        id,
      },
    });

    return question;
  }
}
