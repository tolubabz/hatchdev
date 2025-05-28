import type { Book, BookInfo } from "../book";
import type { Member, MemberInfo } from "../member";

export interface ILibrary {
  addBooks(bookInfos: BookInfo[]): string;
  removeBooks(books: Book[]): string;

  registerMember(memberInfo: MemberInfo): string;
  removeMember(member: Member): string;

  findBook(title: string): Book[];
  findAllBooks(): Book[];

  loanBook(book: Book, member: Member): string;
  receiveBook(book: Book, member: Member): string;
}
