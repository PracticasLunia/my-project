import { Tag } from "./tag";

export interface Book {
  title: string,
  author: string,
  isbn: string,
  genre: string,
  publicationDate: Date,
  publisher: string,
  language: string,
  description: string,
  pageCount: number,
  coverImage: string,
  format: string,
  availability: string,
  category: number | null,
  Tags: Tag[] | any[],
  averageRating: number,
  ratingCount: number,
}
