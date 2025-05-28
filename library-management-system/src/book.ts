export enum Genre {
  HistoricalFiction = "Historical Fiction",
  Romance = "Romance",
  Fantasy = "Fantasy",
  ScienceFiction = "Science Fiction",
  Dystopian = "Dystopian",
  ThrillerAndSuspense = "Thriller & Suspense",
  Mystery = "Mystery",
  Horror = "Horror",
  ActionAndAdventure = "Action & Adventure",
}

export type BookInfo = {
  bookId: number;
  title: string;
  author: string;
  isbn: string;
  genre: Genre;
};

export class Book {
  bookId: number;
  title: string;
  author: string;
  isbn: string;
  genre: Genre;
  isAvailable: boolean = true;

  constructor(bookInfo: BookInfo) {
    this.bookId = bookInfo.bookId;
    this.title = bookInfo.title;
    this.author = bookInfo.author;
    this.isbn = bookInfo.isbn;
    this.genre = bookInfo.genre;
  }
}
