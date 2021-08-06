import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessGuard } from 'src/jwt-access/jwt-access.guard';
import { User } from 'src/users/entities/user.entity';
import { UserDec } from 'src/users/user.decorator';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { FindAllQueryDto } from './dto/find-all.query.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  async create(@Body() createDogDto: CreateDogDto) {
    await this.dogsService.create(createDogDto);
  }

  @UseGuards(JwtAccessGuard)
  @Get()
  async findAll(
    @UserDec() user: User,
    @Query() findAllQueryDto: FindAllQueryDto,
  ): Promise<Dog[]> {
    return await this.dogsService.findAll(user.id, findAllQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    return this.dogsService.update(+id, updateDogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dogsService.remove(+id);
  }
}
