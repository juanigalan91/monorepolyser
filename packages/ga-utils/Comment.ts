class Comment {
  body: string;

  title: string;

  constructor() {
    this.body = '';
    this.title = '';
  }

  addTitle({ title, level = 1 }: { title: string; level?: number }) {
    const commentTitle = `${'#'.repeat(level)} ${title}`;
    this.body = `${this.body}${commentTitle}`;
    this.title = commentTitle;
    this.addBreakline();
  }

  addBreakline() {
    this.body = `${this.body}\n`;
  }

  addText({ text }: { text: string }) {
    this.body = `${this.body}${text}`;
    this.addBreakline();
  }

  addTable({ columns = [], rows = [] }: { columns: string[]; rows: string[][] }) {
    this.body = `${this.body}| ${columns.map((column) => ` ${column} |`).join('')}`;
    this.addBreakline();
    this.body = `${this.body}| ${':----------:|'.repeat(columns.length)}`;
    this.addBreakline();

    rows.forEach((row) => {
      if (row && row.length > 0) {
        this.body = `${this.body} |`;

        row.forEach((value) => {
          this.body = `${this.body} ${value} |`;
        });

        this.addBreakline();
      }
    });
  }

  getBody() {
    return this.body;
  }

  getTitle() {
    return this.title;
  }
}

export { Comment };
