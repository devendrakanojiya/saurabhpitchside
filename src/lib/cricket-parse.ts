export interface LiveMatch {
  id: string;
  title: string;
  teamA: { name: string; score: string };
  teamB: { name: string; score: string };
  battingFirstLive: "a" | "b" | null;
  link: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  image: string | null;
  link: string;
  publishedAt: string;
}

const tag = (block: string, name: string) => {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decode(m[1]!.trim()) : "";
};

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .trim();

const items = (xml: string) => xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];

function parseSide(raw: string) {
  const live = raw.trim().endsWith("*");
  const text = raw.replace(/\*/g, "").trim();
  const scoreMatch = text.match(/(\d+\/\d+(?:\s*\([^)]*\))?|\d+\s*&\s*\d+\/\d+)\s*$/);
  const score = scoreMatch ? scoreMatch[1]!.trim() : "";
  const name = (score ? text.slice(0, text.length - score.length) : text).trim();
  return { name: name || text, score, live };
}

export function parseLiveScores(xml: string): LiveMatch[] {
  return items(xml)
    .map((block) => {
      const title = tag(block, "title");
      const link = tag(block, "link").replace(/\?.*$/, "");
      const id = link.match(/match\/(\d+)/)?.[1] ?? link;
      const parts = title.split(/\sv\s/);
      if (parts.length < 2) return null;
      const a = parseSide(parts[0]!);
      const b = parseSide(parts.slice(1).join(" v "));
      return {
        id,
        title,
        teamA: { name: a.name, score: a.score },
        teamB: { name: b.name, score: b.score },
        battingFirstLive: a.live ? ("a" as const) : b.live ? ("b" as const) : null,
        link,
      };
    })
    .filter((m): m is LiveMatch => m !== null);
}

export function parseNews(xml: string): NewsItem[] {
  return items(xml)
    .map((block) => {
      const link = tag(block, "url") || tag(block, "link").replace(/\?.*$/, "");
      const guid = tag(block, "guid");
      const id = (guid.match(/(\d+)\.html/) ?? link.match(/(\d+)\s*$/))?.[1] ?? "";
      const image =
        block.match(/<media:content[^>]*url="([^"]+)"/i)?.[1] ??
        tag(block, "coverImages") ??
        null;
      return {
        id,
        title: tag(block, "title"),
        summary: tag(block, "description"),
        image: image ? image.replace(/^http:/, "https:") : null,
        link,
        publishedAt: tag(block, "pubDate"),
      };
    })
    .filter((n) => n.id && n.title);
}
