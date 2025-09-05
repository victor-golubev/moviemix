const movies = [
  {
    id: 1,
    name: "В поисках Немо",
    poster: { previewUrl: "https://picsum.photos/600/900?random=1" },
    year: 2003,
    rating: { imdb: 8.1 },
    genres: [{ name: "Animation" }, { name: "Adventure" }, { name: "Comedy" }],
    description:
      "Рыбка-клоун Немо оказывается в опасном океанском путешествии, а его отец отправляется спасать его.",
  },
  {
    id: 2,
    name: "Интерстеллар",
    poster: { previewUrl: "https://picsum.photos/600/900?random=2" },
    year: 2014,
    rating: { imdb: 8.6 },
    genres: [{ name: "Sci-Fi" }, { name: "Adventure" }, { name: "Drama" }],
    description:
      "Группа исследователей путешествует через червоточину, чтобы найти новую планету для человечества.",
  },
  {
    id: 3,
    name: "Начало",
    poster: { previewUrl: "https://picsum.photos/600/900?random=3" },
    year: 2010,
    rating: { imdb: 8.8 },
    genres: [{ name: "Action" }, { name: "Sci-Fi" }, { name: "Thriller" }],
    description:
      "Профессиональный вор проникает в сознание людей через сны, чтобы украсть или внедрить идеи.",
  },
  {
    id: 4,
    name: "Тёмный рыцарь",
    poster: { previewUrl: "https://picsum.photos/600/900?random=4" },
    year: 2008,
    rating: { imdb: 9.0 },
    genres: [{ name: "Action" }, { name: "Crime" }, { name: "Drama" }],
    description:
      "Бэтмен сталкивается с новым противником — Джокером, который сеет хаос в Готэме.",
  },
  {
    id: 5,
    name: "Матрица",
    poster: { previewUrl: "https://picsum.photos/600/900?random=5" },
    year: 1999,
    rating: { imdb: 8.7 },
    genres: [{ name: "Action" }, { name: "Sci-Fi" }],
    description:
      "Нео узнаёт, что реальность — это симуляция, и присоединяется к сопротивлению против машин.",
  },
  {
    id: 6,
    name: "Гладиатор",
    poster: { previewUrl: "https://picsum.photos/600/900?random=6" },
    year: 2000,
    rating: { imdb: 8.5 },
    genres: [{ name: "Action" }, { name: "Drama" }],
    description:
      "Римский генерал становится гладиатором и ищет месть за убийство своей семьи.",
  },
  {
    id: 7,
    name: "Форрест Гамп",
    poster: { previewUrl: "https://picsum.photos/600/900?random=7" },
    year: 1994,
    rating: { imdb: 8.8 },
    genres: [{ name: "Drama" }, { name: "Romance" }],
    description:
      "Простодушный Форрест Гамп проходит через ключевые события истории США, не переставая удивлять всех.",
  },
  {
    id: 8,
    name: "Побег из Шоушенка",
    poster: { previewUrl: "https://picsum.photos/600/900?random=8" },
    year: 1994,
    rating: { imdb: 9.3 },
    genres: [{ name: "Drama" }, { name: "Crime" }],
    description:
      "Банкир Энди Дюфрейн оказывается в тюрьме и строит план побега, находя настоящую дружбу.",
  },
  {
    id: 9,
    name: "Титаник",
    poster: { previewUrl: "https://picsum.photos/600/900?random=9" },
    year: 1997,
    rating: { imdb: 7.8 },
    genres: [{ name: "Drama" }, { name: "Romance" }],
    description:
      "История любви между Джеком и Роуз на фоне трагедии затонувшего Титаника.",
  },
  {
    id: 10,
    name: "Властелин колец: Братство кольца",
    poster: { previewUrl: "https://picsum.photos/600/900?random=10" },
    year: 2001,
    rating: { imdb: 8.8 },
    genres: [{ name: "Adventure" }, { name: "Fantasy" }],
    description:
      "Фродо и его друзья отправляются в опасное путешествие, чтобы уничтожить Кольцо Всевластия.",
  },
];

export default movies;
