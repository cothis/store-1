import { EntityRepository, Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {
  async findAll(): Promise<Review[] | null> {
    return await this.find();
  }

  async findById(id: string): Promise<Review> {
    return await this.findOneOrFail({ where: { id } });
  }

  async createEntity(createReviewDto: CreateReviewDto): Promise<Review> {
    return await this.save(createReviewDto);
  }

  async updateEntity(id: string, review: Review): Promise<Review> {
    const entity = this.findById(id);
    return await this.save({ ...entity, ...review });
  }

  async deleteEntity(id: string): Promise<boolean> {
    return (await this.delete(id)).affected > 0;
  }
}
