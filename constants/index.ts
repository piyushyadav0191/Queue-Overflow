export const themes = [
  { value: "light", label: "Light", icon: "/images/sun.svg" },
  { value: "dark", label: "Dark", icon: "/images/moon.svg" },
  { value: "system", label: "System", icon: "/images/desktop.svg" },
];

export const sidebbarLinks = [
  {
    imgUrl: "/images/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgUrl: "/images/boxes.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgUrl: "/images/star.svg",
    route: "/collections",
    label: "Collections",
  },
  {
    imgUrl: "/images/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgUrl: "/images/users.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgUrl: "/images/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];

export const BADGE_CRITERA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
};
