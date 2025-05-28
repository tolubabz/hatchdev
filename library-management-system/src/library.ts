import { Book, BookInfo } from "./book";
import { ILibrary } from "./interfaces/library-interface";
import { Member, MemberInfo } from "./member";

export class Library implements ILibrary {
  private books: Book[] = [];
  private members: Member[] = [];
  private activeBookLoans = new Map<Book, Member>();
  private readonly LOAN_LIMIT: number = 3;

  private static libraryInstance: Library;

  private constructor() {}

  public static getLibraryInstance(): Library {
    if (this.libraryInstance) return this.libraryInstance;

    this.libraryInstance = new Library();
    return this.libraryInstance;
  }

  addBooks(bookInfos: BookInfo[]): string {
    bookInfos.forEach((bookInfo) => this.books.push(new Book(bookInfo)));

    return `${bookInfos.length} book(s) have been added to the library.`;
  }

  removeBooks(books: Book[]): string {
    books.forEach((book) => {
      const index = this.books.findIndex((b) => b.bookId === book.bookId);
      if (index !== -1) this.books.splice(index, 1);
    });

    return `${books.length} books have been removed from the library.`;
  }

  registerMember(memberInfo: MemberInfo): string {
    if (this.members.find((m) => m.memberId === memberInfo.memberId))
      return "Member already registered.";

    this.members.push(new Member(memberInfo));
    return "Registration Successful!";
  }

  removeMember(member: Member): string {
    const index = this.members.findIndex((m) => m.memberId === member.memberId);
    if (index !== -1) this.members.splice(index, 1);

    return `${member.name} is no longer a member of the library.`;
  }

  findBook(title: string): Book[] {
    return this.books.filter((book) => book.title === title);
  }

  findAllBooks(): Book[] {
    return this.books;
  }

  loanBook(book: Book, member: Member): string {
    if (!book.isAvailable) return "This book is currently not available.";
    if (member.borrowedBooks.length === this.LOAN_LIMIT)
      return "You've exceeded the maximum limit of books you can borrow at a time.";

    this.activeBookLoans.set(book, member);
    member.borrowedBooks.push(book);
    book.isAvailable = false;

    return "Successful!";
  }

  receiveBook(book: Book, member: Member): string {
    if (this.activeBookLoans.get(book) !== member)
      return "This book wasn't borrowed by this member.";

    this.activeBookLoans.delete(book);
    const index = member.borrowedBooks.findIndex(
      (b) => b.bookId === book.bookId
    );
    member.borrowedBooks.splice(index, 1);
    book.isAvailable = true;

    return "Successful!";
  }
}
