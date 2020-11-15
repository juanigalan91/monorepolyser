class Comment {
  body: string;

  constructor() {
    this.body = '';
  }

  addTitle({ title, level = 1 }: { title: string; level?: number }) {
    this.body = `${this.body}${'#'.repeat(level)} ${title}`;
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
    this.body = `${this.body}${columns.map((column) => `| ${column} |`).join('')}`;
    this.addBreakline();
    this.body = `${this.body}${'|:----------:|'.repeat(columns.length)}`;
    this.addBreakline();

    rows.forEach((row) => {
      if (row && row.length > 0) {
        row.forEach((value) => {
          this.body = `${this.body}| ${value} |`;
        });

        this.addBreakline();
      }
    });
  }

  getBody() {
    return this.body;
  }
}

export { Comment };
