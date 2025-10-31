import { useState } from "react";

export default function usePopularMoviesTabs() {
  const tabs = [
    {
      id: "popular",
      label: "Популярное",
      endpoint: "movie",
      query: "sortField=votes.kp&sortType=-1&rating.kp=7-10&year=2015-2025",
    },
    {
      id: "top250",
      label: "Топ 250",
      endpoint: "movie",
      query: "type=movie&lists=top250",
    },
    {
      id: "new",
      label: "Новинки",
      endpoint: "movie",
      query: "year=2024-2025&sortField=year&sortType=-1",
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return { tabs, activeTab, setActiveTab };
}
