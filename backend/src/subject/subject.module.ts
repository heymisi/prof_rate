import { SubjectController } from "./subject.controller";
import { SubjectService } from "./subject.service";
import { SubjectSchema } from "./subject.model";
import { MongooseModule } from "@nestjs/mongoose";
import { Module, forwardRef } from "@nestjs/common";
import { ProfModule } from "src/prof/prof.module";
@Module({
    imports:[
        MongooseModule.forFeature([{name: 'subject', schema: SubjectSchema}]),
        forwardRef(() => ProfModule)
    ],
    controllers: [SubjectController],
    providers: [SubjectService],
})
export class SubjectModule{}