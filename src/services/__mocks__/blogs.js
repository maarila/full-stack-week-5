let token = null;

const blogs = [
  {
    id: "5a55031fbb9a4e635705bdc7",
    user: {
      _id: "5a550161038c146320df218f",
      username: "ounou",
      name: "Taichi Ounou"
    },
    likes: 10,
    author: "Who Ever",
    title: "How About This?",
    url: "http://www.hearthpwn.com"
  },
  {
    id: "5a550298bb9a4e635705bdc6",
    user: {
      _id: "5a550247038c146320df2192",
      username: "bond",
      name: "James Bond"
    },
    likes: 8,
    author: "Maxwell Smart",
    title: "Secret Agent - A Life Of",
    url: "http://www.helsinki.fi"
  },
  {
    id: "5a5501e7038c146320df2191",
    user: {
      _id: "5a550161038c146320df218f",
      username: "ounou",
      name: "Taichi Ounou"
    },
    likes: 6,
    author: "Dramatic Author",
    title: "Second Chances",
    url: "http://www.github.com"
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

export default {getAll, blogs};
