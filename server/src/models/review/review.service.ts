import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(ReviewRepository) private readonly reviewRepository: ReviewRepository) {}

  async findAll(): Promise<Review[]> {
    return await this.reviewRepository.findAll();
  }

  async findById(id: string): Promise<Review> {
    return await this.reviewRepository.findById(id);
  }

  async createEntity(createReviewDto: CreateReviewDto): Promise<Review> {
    return await this.reviewRepository.createEntity(createReviewDto);
  }

  async updateEntity(id: string, review: Review): Promise<Review> {
    return await this.reviewRepository.updateEntity(id, review);
  }

  async deleteEntity(id: string): Promise<boolean> {
    return await this.reviewRepository.deleteEntity(id);
  }
}
