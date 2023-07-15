const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const types = ["SUCCESS", "INFO", "WARNING", "ERROR"];
const priorities = ["LOW", "MEDIUM", "HIGH", "VERY_HIGH"];

const printAnnouncement = ({ type, priority, title, content }) => {
  console.log("=========================Announcement=========================");
  console.log(`Type: ${types[type]}`);
  console.log(`Priority: ${priorities[priority]}`);
  console.log(`Title: ${title}`);
  console.log(`Content: ${content}`);
  console.log("==============================================================");
};
const postAnnouncement = async ({ type, priority, title, content }) => {
  try {
    const announcement = await prisma.announcement.create({
      data: {
        title: title,
        content: content,
        priority: priorities[priority],
        type: types[type],
        createdOn: new Date().toISOString(),
      },
    });
    console.log("Created Announcement Successfully:");
    console.log(announcement);
  } catch (error) {
    console.log(error);
  }
};
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const createAnnouncement = async () => {
  readline.question(
    `Type (0-${types.length - 1}):\n${types
      .map((t, i) => `${i}: ${t}`)
      .join("\n")}\n=> `,
    (type) => {
      readline.question(
        `Priority (0-${priorities.length - 1}):\n${priorities
          .map((t, i) => `${i}: ${t}`)
          .join("\n")}\n=> `,
        (priority) => {
          readline.question("Enter Title:\n=> ", (title) => {
            readline.question("Enter Content:\n=> ", (content) => {
              printAnnouncement({ type, title, priority, content });
              readline.question(
                'Enter "yes" to post the announcement => ',
                async (confirmation) => {
                  if (confirmation == "yes") {
                    await postAnnouncement({ type, title, priority, content });
                  } else {
                    console.log("Post cancelled");
                  }
                  readline.close()
                }
              );
            });
          });
        }
      );
    }
  );
};

createAnnouncement();
