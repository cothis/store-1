import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Controller('api/v1/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/')
  async findAll(): Promise<Review[]> {
    return await this.reviewService.findAll();
  }

  @Get('/:id')
  async findById(@Param() id: string): Promise<Review> {
    return await this.reviewService.findById(id);
  }

  @Post('/')
  async create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return await this.reviewService.createEntity(createReviewDto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() review: Review): Promise<Review> {
    return await this.reviewService.updateEntity(id, review);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.reviewService.deleteEntity(id);
  }
}
