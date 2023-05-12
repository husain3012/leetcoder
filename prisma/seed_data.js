const usernames = [
  "husain3012",
  "sparsh_mahajan",
  "Sarfraz-droid",
  "mdsaquibshakeel",

];

const users = usernames.map((username, idx) => ({
  email: username + "@" + "gmail.com",
  name: idx + "_" + username,
  leetcodeUsername: username,
  lastAccessed: new Date(),
  lastUpdated: new Date(),
}));

const groups = [
  {
    name: "Test Group 1 ",
    description: "This is ",
    createdByEmail: "user1@gmail.com",
    inviteID: "123_group1",
  },
  {
    name: "Test group 2",
    description: "This is Group Two",
    createdByEmail: "user2@gmail.com",
    inviteID: "123_group2",
  },
];

module.exports = { users, groups };
