import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Question, Prisma } from '@prisma/client';

@Injectable()
export class QuestionsService {
    constructor(private prisma: PrismaService) {}

    async questions(): Promise<Question[]> {
        return this.prisma.question.findMany();
    }

    async question(id: number): Promise<Question | null> {
        return this.prisma.question.findUnique({
            where: { id }
        });
    }
}
