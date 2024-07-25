export interface Book {
  id: number,
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
  category:
  {
    id: number,
    name: string
  }
  ,
  tags: [
    {
      id: number,
      name: string
    }
  ],
  averageRating: number,
  ratingCount: number,
  createdAt: Date,
  updatedAt: Date
}
