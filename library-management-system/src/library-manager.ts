import { Book, BookInfo } from "./book";
import { Library } from "./library";
import { Member, MemberInfo } from "./member";

const library = Library.getLibraryInstance();

export type LibraryManagerInfo = {
  id: number;
  name: string;
};

export class LibraryManager {
  id: number;
  name: string;

  constructor(libraryManagerInfo: LibraryManagerInfo) {
    this.id = libraryManagerInfo.id;
    this.name = libraryManagerInfo.name;
  }

  addBooks(bookInfos: BookInfo[]): string {
    return library.addBooks(bookInfos);
  }

  removeBooks(books: Book[]): string {
    return library.removeBooks(books);
  }

  registerMember(memberInfo: MemberInfo): string {
    return library.registerMember(memberInfo);
  }

  removeMember(member: Member): string {
    return library.removeMember(member);
  }

  findBook(title: string): Book[] {
    return library.findBook(title);
  }

  findAllBooks(): Book[] {
    return library.findAllBooks();
  }
}
