import { Book } from "./book";
import { ILibrary } from "./interfaces/library-interface";

export type MemberInfo = {
  name: string;
  memberId: number;
};

export class Member {
  name: string;
  memberId: number;
  borrowedBooks: Book[] = [];

  constructor(memberInfo: MemberInfo) {
    this.name = memberInfo.name;
    this.memberId = memberInfo.memberId;
  }

  findBook(title: string, library: ILibrary): Book[] {
    return library.findBook(title);
  }

  findAllBooks(library: ILibrary): Book[] {
    return library.findAllBooks();
  }

  borrowBook(book: Book, library: ILibrary): string {
    return library.loanBook(book, this);
  }

  returnBook(book: Book, library: ILibrary): string {
    return library.receiveBook(book, this);
  }
}
