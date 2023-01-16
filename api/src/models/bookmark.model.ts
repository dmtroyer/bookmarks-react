import {Entity, model, property} from '@loopback/repository';

@model()
export class Bookmark extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'uri'
    }
  })
  url: string;

  @property({
    type: 'date',
    defaultFn: 'now'
  })
  created_at?: Date

  constructor(data?: Partial<Bookmark>) {
    super(data);
  }
}

export interface BookmarkRelations {
  // describe navigational properties here
}

export type BookmarkWithRelations = Bookmark & BookmarkRelations;
