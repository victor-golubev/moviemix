const tabs = [
  {
    id: "tab1",
    label: "Популярные фильмы",
    endpoint: "movie",
    query: "type=movie&rating.imdb=8-10",
  },
  {
    id: "tab2",
    label: "Популярные сериалы",
    endpoint: "movie",
    query: "type=tv-series&rating.imdb=8-10",
  },
  {
    id: "tab3",
    label: "Подборка фильмов",
    endpoint: "movie",
    query: "type=movie&lists=top250",
  },
];

export default tabs;
