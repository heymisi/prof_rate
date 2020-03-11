import { ProfController } from "./prof.controller";
import { ProfService } from "./prof.service";
import { ProfSchema } from "./prof.model";
import { MongooseModule } from "@nestjs/mongoose";
import { Module, forwardRef } from "@nestjs/common";
import { SubjectModule } from "src/subject/subject.module";
@Module({
    imports:[
        MongooseModule.forFeature([{name: 'Prof',schema: ProfSchema}]),
        forwardRef(() => SubjectModule)],
    controllers: [ProfController],
    providers: [ProfService],
})
export class ProfModule{}