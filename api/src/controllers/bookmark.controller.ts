import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Bookmark} from '../models';
import {BookmarkRepository} from '../repositories';

export class BookmarkController {
  constructor(
    @repository(BookmarkRepository)
    public bookmarkRepository : BookmarkRepository,
  ) {}

  @post('/bookmarks')
  @response(200, {
    description: 'Bookmark model instance',
    content: {'application/json': {schema: getModelSchemaRef(Bookmark)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bookmark, {
            title: 'NewBookmark',
            exclude: ['id'],
          }),
        },
      },
    })
    bookmark: Omit<Bookmark, 'id'>,
  ): Promise<Bookmark> {
    return this.bookmarkRepository.create(bookmark);
  }

  @get('/bookmarks/count')
  @response(200, {
    description: 'Bookmark model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Bookmark) where?: Where<Bookmark>,
  ): Promise<Count> {
    return this.bookmarkRepository.count(where);
  }

  @get('/bookmarks')
  @response(200, {
    description: 'Array of Bookmark model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Bookmark, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Bookmark) filter?: Filter<Bookmark>,
  ): Promise<Bookmark[]> {
    return this.bookmarkRepository.find(filter);
  }

  @patch('/bookmarks')
  @response(200, {
    description: 'Bookmark PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bookmark, {partial: true}),
        },
      },
    })
    bookmark: Bookmark,
    @param.where(Bookmark) where?: Where<Bookmark>,
  ): Promise<Count> {
    return this.bookmarkRepository.updateAll(bookmark, where);
  }

  @get('/bookmarks/{id}')
  @response(200, {
    description: 'Bookmark model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Bookmark, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Bookmark, {exclude: 'where'}) filter?: FilterExcludingWhere<Bookmark>
  ): Promise<Bookmark> {
    return this.bookmarkRepository.findById(id, filter);
  }

  @patch('/bookmarks/{id}')
  @response(204, {
    description: 'Bookmark PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bookmark, {partial: true}),
        },
      },
    })
    bookmark: Bookmark,
  ): Promise<void> {
    await this.bookmarkRepository.updateById(id, bookmark);
  }

  @put('/bookmarks/{id}')
  @response(204, {
    description: 'Bookmark PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bookmark: Bookmark,
  ): Promise<void> {
    await this.bookmarkRepository.replaceById(id, bookmark);
  }

  @del('/bookmarks/{id}')
  @response(204, {
    description: 'Bookmark DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bookmarkRepository.deleteById(id);
  }
}
