import { Injectable } from '@nestjs/common';
import { QueryDto } from './dto/query.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateQuestionDto) {
    const question = await this.prisma.question.create({
      data: dto,
    });
    return question;
  }

  async findAll(q: QueryDto) {
    console.log(q);
    const questions = await this.prisma.question.findMany({
      where: {
        OR: [
          {
            title: {
              contains: q.search ?? "",
            },
          },
          {
            description: {
              contains: q.search ?? "",
            },
          },
          {
            answers: {
              some: {
                description: {
                  contains: q.search ?? "",
                },
              },
            },
          },
        ],
      },
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
