import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: "xhzTkUi2Nt",
    firstname: "Roma",
    lastname: "Bulani",
    content: "Nice Weather Today!!",
    mediaURL: "",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "okzxcf",
        username: "janedoe",
        commentData: "I agree!! Feels like we should go for outing. What say?",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        createdAt: "2023-05-22T21:33:01+05:30",
      },
    ],
    username: "romabulani",
    createdAt: "2022-01-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "siFFxfYI1s",
    firstname: "Carl",
    lastname: "Smith",
    content: "Started my Baking journey! Look what I made.",
    mediaURL:
      "https://res.cloudinary.com/dtrjdcrme/video/upload/v1652188886/upload-socialmedia/oikev6eomsgahnvxcijd.mp4",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "carlsmith",
    createdAt: "2022-05-21T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "3XHvLP1fg",
    firstname: "Jane",
    lastname: "Doe",
    content: "I made this cake for my friend's birthday. Check it out",
    mediaURL:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1652188492/upload-socialmedia/cakegif_q11mfm.webp",
    likes: {
      likeCount: 1,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "6nImWvImxo",
        username: "johndoe",
        commentData:
          "That's mouth watering! Could you make one for my Birthday as well?",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        createdAt: "2023-06-22T21:33:01+05:30",
      },
    ],
    username: "janedoe",
    createdAt: "2022-02-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "MTYtVhecCj",
    firstname: "Adarsh",
    lastname: "Kumar",
    content:
      "You are never too old to set another goal or to dream a new dream.",
    mediaURL: "",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "adarsh",
    createdAt: "2022-03-06T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "3XHvLP9kC",
    firstname: "Adarsh",
    lastname: "Kumar",
    content: "Yayy! Its my Birthday Today. Made this cake for myself!",
    mediaURL:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1647014336/ecommerce/chocolatecake4.webp",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "EO7iOPN9n8",
        username: "carlsmith",
        commentData: "Happy Birthday! Enjoy your Day!!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        createdAt: "2023-07-22T21:33:01+05:30",
      },
      {
        _id: "QK52wf6HI1",
        username: "janedoe",
        commentData: "Wow! Looks Amazzing! Happy Birthday!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        createdAt: "2023-03-22T21:33:01+05:30",
      },
    ],
    username: "adarsh",
    createdAt: "2022-03-15T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "tHaThLyFQh",
    firstname: "Adarsh",
    lastname: "Kumar",
    content:
      "Life has got all those twists and turns. You’ve got to hold on tight and off you go.",
    mediaURL: "",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "adarsh",
    createdAt: "2022-04-06T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "G-Gi3lSZP9",
    firstname: "Adarsh",
    lastname: "Kumar",
    content: "When you have a dream, you’ve got to grab it and never let go.",
    mediaURL: "",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "adarsh",
    createdAt: "2022-05-06T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "GeMUAdi9mh",
    firstname: "Adarsh",
    lastname: "Kumar",
    content:
      "No matter what people tell you, words and ideas can change the world.",
    mediaURL: "",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "adarsh",
    createdAt: "2022-03-06T12:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "IyUlYXTrzZ",
    firstname: "Roma",
    lastname: "Bulani",
    content: "Who's up for Pineapple Pastry?",
    mediaURL:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1647014828/ecommerce/pineapplemuffin1.webp",
    likes: {
      likeCount: 10,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "6nIffvImxo",
        username: "sophiajones",
        commentData: "Oh! That looks Delicious!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        createdAt: "2023-02-28T21:33:01+05:30",
      },
    ],
    username: "romabulani",
    createdAt: "2022-04-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "Ie92xOSVeU",
    firstname: "Alex",
    lastname: "Maxwell Jones",
    content:
      "Check out this amazing video from BakinZone https://bakinzone.netlify.app/videos/qtlhdIfojmc",
    mediaURL: "",
    likes: {
      likeCount: 1,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "6fgd534s",
        username: "janedoe",
        commentData: "Yes! I am also learning from there!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        createdAt: "2023-01-22T21:33:01+05:30",
      },
    ],
    username: "alexmaxwell",
    createdAt: "2022-04-12T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "xhzTkUyfNt",
    firstname: "Sophia",
    lastname: "Jones",
    content: "Believe in yourself! Rest all will fall in place.",
    mediaURL: "",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "unImWvIzbf",
        username: "romabulani",
        commentData: "So True!!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        createdAt: "2023-05-12T21:33:01+05:30",
      },
    ],
    username: "sophiajones",
    createdAt: "2022-05-15T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "CCmJpDnnQQ",
    firstname: "Roma",
    lastname: "Bulani",
    content:
      "You can get everything in life you want if you will just help enough other people get what they want.",
    mediaURL: "",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "romabulani",
    createdAt: "2022-02-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "Z_TZT_3EAw",
    firstname: "John",
    lastname: "Doe",
    content:
      "If you believe something needs to exist, if it's something you want to use yourself, don't let anyone ever stop you from doing it.",
    mediaURL: "",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "johndoe",
    createdAt: "2022-01-12T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "e-knMEsoLq",
    firstname: "Alex",
    lastname: "Maxwell Jones",
    content: "More is lost by indecision than wrong decision.",
    mediaURL: "",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "alexmaxwell",
    createdAt: "2022-01-26T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "VY14RsXC7G",
    firstname: "Carl",
    lastname: "Smith",
    content:
      "The reason we struggle with insecurity is because we compare our behind-the-scenes with everyone else’s highlight reel.",
    mediaURL: "",
    likes: {
      likeCount: 7,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "carlsmith",
    createdAt: "2022-03-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "l9pedEMjZS",
    firstname: "Sophia",
    lastname: "Jones",
    content: "If you don’t risk anything, you risk even more.",
    mediaURL: "",
    likes: {
      likeCount: 6,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "sophiajones",
    createdAt: "2022-04-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "lbW4dlCpNC",
    firstname: "Roma",
    lastname: "Bulani",
    content: "If it makes you nervous, you’re doing it right.",
    mediaURL: "",
    likes: {
      likeCount: 12,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "romabulani",
    createdAt: "2022-04-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "k-Vwd2d7Vt",
    firstname: "Carl",
    lastname: "Smith",
    content:
      "I learned a long time ago that there is something worse than missing the goal, and that’s not pulling the trigger.",
    mediaURL: "",
    likes: {
      likeCount: 9,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "carlsmith",
    createdAt: "2022-01-14T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "R2lAuXvK7V",
    firstname: "Jane",
    lastname: "Doe",
    content:
      "Success is stumbling from failure to failure with no loss of enthusiasm. Love this quote by Winston Churchill.",
    mediaURL: "",
    likes: {
      likeCount: 12,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "janedoe",
    createdAt: "2022-05-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "G5xd30tMCR",
    firstname: "Alex",
    lastname: "Maxwell Jones",
    content:
      "Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence.",
    mediaURL: "",
    likes: {
      likeCount: 8,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "alexmaxwell",
    createdAt: "2022-02-14T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "lF8cnfPAe9",
    firstname: "Roma",
    lastname: "Bulani",
    content:
      "Life is like riding a bicycle. To keep your balance you must keep moving.",
    mediaURL: "",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "romabulani",
    createdAt: "2022-01-15T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "stfTkUi2Nt",
    firstname: "Sophia",
    lastname: "Jones",
    content:
      "“Do not wait for the perfect time and place to enter, for you are already onstage.",
    mediaURL: "",
    likes: {
      likeCount: 25,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "sophiajones",
    createdAt: "2022-05-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "quiTkUi2Nt",
    firstname: "Jane",
    lastname: "Doe",
    content: "It is a rough road that leads to the heights of greatness.",
    mediaURL: "",
    likes: {
      likeCount: 8,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "janedoe",
    createdAt: "2022-02-10T10:55:07+05:30",
    updatedAt: formatDate(),
  },
];
