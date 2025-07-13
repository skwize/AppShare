import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddAppIssueDto } from './dto/add-app-issue.dto';
import { Issue } from 'generated/prisma';

@Injectable()
export class IssuesService {
    constructor (private prisma: PrismaService) {}

    async getAllAppIssues (app_id: string): Promise<Array<any>> {

        const issueList = await this.prisma.issue.findMany({
            where: {
                appId: app_id
            }
        });

        if(!issueList){
            return [];
        }

        return issueList;
    }

    async addAppIssue (app_id: string, sender: string, payload: AddAppIssueDto): Promise<Issue> {
        return await this.prisma.issue.create({
            data: {
                title: payload.title,
                content: payload.content,
                appId: app_id,
                senderId: sender
            }
        });
    }

    async markIssueAsSolved (issue_id: string, owner_id: string): Promise<Issue> {
        const issue = await this.prisma.issue.findUnique({
            where: {
                id: issue_id
            },
            select: {
                app: true
            }
        });

        if (issue?.app.ownerId !== owner_id){
            throw new ForbiddenException("Forbidden");
        }

        return await this.prisma.issue.update({
            where: {
                id: issue_id
            },
            data: {
                solved: true
            }
        });

    }

}
