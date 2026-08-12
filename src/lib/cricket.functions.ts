import { createServerFn } from "@tanstack/react-start";
import { parseLiveScores, parseNews, type LiveMatch, type NewsItem } from "./cricket-parse";

const UA = { "User-Agent": "Mozilla/5.0 (compatible; PitchsideBot/1.0)" };

export const fetchLiveMatches = createServerFn({ method: "GET" }).handler(
  async (): Promise<LiveMatch[]> => {
    try {
      const res = await fetch("https://static.cricinfo.com/rss/livescores.xml", { headers: UA });
      if (!res.ok) return [];
      return parseLiveScores(await res.text());
    } catch {
      return [];
    }
  },
);

export const fetchNews = createServerFn({ method: "GET" }).handler(
  async (): Promise<NewsItem[]> => {
    try {
      const res = await fetch("https://www.espncricinfo.com/rss/content/story/feeds/0.xml", {
        headers: UA,
      });
      if (!res.ok) return [];
      return parseNews(await res.text()).slice(0, 40);
    } catch {
      return [];
    }
  },
);
