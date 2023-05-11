const usernames = [
  "husain3012",
  "sparsh_mahajan",
  "Sarfraz-droid",
  "amoddeshmukh844",
  "GeekErra",
  "Aman_Raj_Sinha",
  "devanshupatel",
  "James781",
  "algoguygh",
  "rahulbnair",
  "MenaiAla",
  "uwi",
  "wifiii",
  "lucifer1004",
  "fan_of_emptyhope",
  "Minori",
  "sserxhs",
  "dnialh",
  "vibrant-mayerhct",
  "chiro_11",
  "AQT",
  "oldyan",
  "zqy1018",
  "nhho",
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
    name: "Group One",
    description: "This is Group One",
    createdByEmail: "user1@gmail.com",
    inviteID: "123_group1",
  },
  {
    name: "Group Two",
    description: "This is Group Two",
    createdByEmail: "user2@gmail.com",
    inviteID: "123_group2",
  },
];

module.exports = { users, groups };
