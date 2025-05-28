import { BookInfo, Genre, Book } from "./book";
import booksJson from "./seeds/books.json";
import membersJson from "./seeds/members.json";
import { toGenreEnum } from "./genre-mapper";
import { LibraryManager } from "./library-manager";
import { Member, MemberInfo } from "./member";
import inquirer from "inquirer";

const libraryManager = new LibraryManager({ id: 1, name: "admin" });

// Load initial data
const parsedBooks: BookInfo[] = booksJson.map((book) => ({
  ...book,
  genre: toGenreEnum(book.genre),
}));
libraryManager.addBooks(parsedBooks);
membersJson.forEach((member) => libraryManager.registerMember(member));

// Entry Point
async function mainMenu() {
  const { role } = await inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "Please select your role:",
      choices: ["Library Manager", "Visitor (Non-member)", "Library Member"],
    },
  ]);

  if (role === "Library Manager") return libraryManagerMenu();
  if (role === "Library Member") return memberMenu();
  if (role === "Visitor (Non-member)") return visitorMenu();
}

// Library Manager Menu
async function libraryManagerMenu() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Library Manager Menu - Choose an action:",
        choices: [
          "Add Book",
          "List All Books",
          "Register Member",
          "Remove Member",
          "Exit",
        ],
      },
    ]);

    switch (action) {
      case "Add Book":
        await addBook();
        break;
      case "List All Books":
        listAllBooks();
        break;
      case "Register Member":
        await registerMember();
        break;
      case "Remove Member":
        await removeMember();
        break;
      case "Exit":
        console.log("Goodbye!");
        return;
    }
  }
}

// Library Member Menu
async function memberMenu() {
  const { memberId } = await inquirer.prompt([
    {
      type: "number",
      name: "memberId",
      message: "Enter your member ID:",
    },
  ]);

  const member = membersJson.find((m) => m.memberId === memberId);
  if (!member) {
    console.log("Member not found.");
    return;
  }

  const memberInstance = new Member(member);

  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Library Member Menu - Choose an action:",
        choices: ["List All Books", "Borrow Book", "Return Book", "Exit"],
      },
    ]);

    if (action === "List All Books") {
      listAllBooks();
    } else if (action === "Borrow Book") {
      await borrowBook(memberInstance);
    } else if (action === "Return Book") {
      await returnBook(memberInstance);
    } else {
      break;
    }
  }
}

// Visitor Menu
async function visitorMenu() {
  console.log("Welcome! As a visitor, you can only browse books.\n");
  listAllBooks();
}

// ========== ACTION HANDLERS ==========

async function addBook() {
  const answers = await inquirer.prompt([
    { type: "input", name: "title", message: "Book Title:" },
    { type: "input", name: "author", message: "Author:" },
    { type: "input", name: "isbn", message: "ISBN:" },
    {
      type: "list",
      name: "genre",
      message: "Genre:",
      choices: Object.keys(Genre).map(
        (key) => Genre[key as keyof typeof Genre]
      ),
    },
  ]);

  const bookInfo: BookInfo = {
    ...answers,
    genre: toGenreEnum(answers.genre),
    isAvailable: true,
  };

  const message = libraryManager.addBooks([bookInfo]);
  console.log(message);
}

function listAllBooks() {
  const books = libraryManager.findAllBooks();
  if (books.length === 0) {
    console.log("No books in the library.");
    return;
  }

  books.forEach((book, i) => {
    console.log(
      `${i + 1}. ${book.title} by ${book.author} (${book.genre}) - ${
        book.isAvailable ? "Available" : "Checked Out"
      }`
    );
  });
}

async function registerMember() {
  const answers = await inquirer.prompt([
    { type: "input", name: "name", message: "Member name:" },
    { type: "number", name: "memberId", message: "Member ID:" },
  ]);

  const memberInfo: MemberInfo = {
    name: answers.name,
    memberId: answers.memberId,
  };

  const message = libraryManager.registerMember(memberInfo);
  console.log(message);
}

async function removeMember() {
  const { memberId } = await inquirer.prompt([
    {
      type: "number",
      name: "memberId",
      message: "Enter ID of member to remove:",
    },
  ]);

  const member = membersJson.find((m) => m.memberId === memberId);
  if (!member) {
    console.log("Member not found.");
    return;
  }

  const memberInstance = new Member(member);
  const message = libraryManager.removeMember(memberInstance);
  console.log(message);
}

async function borrowBook(member: Member) {
  const availableBooks = libraryManager
    .findAllBooks()
    .filter((b) => b.isAvailable);

  if (availableBooks.length === 0) {
    console.log("No books available to borrow.");
    return;
  }

  const { selectedTitle } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedTitle",
      message: "Choose a book to borrow:",
      choices: availableBooks.map((b) => b.title),
    },
  ]);

  const book = availableBooks.find((b) => b.title === selectedTitle);
  if (!book) return;

  const message = member.borrowBook(book);
  console.log(message);
}

async function returnBook(member: Member) {
  if (member.borrowedBooks.length === 0) {
    console.log("You have no borrowed books.");
    return;
  }

  const { titleToReturn } = await inquirer.prompt([
    {
      type: "list",
      name: "titleToReturn",
      message: "Choose a book to return:",
      choices: member.borrowedBooks.map((b) => b.title),
    },
  ]);

  const book = member.borrowedBooks.find((b) => b.title === titleToReturn);
  if (!book) return;

  const message = member.returnBook(book);
  console.log(message);
}

// Start
mainMenu();
