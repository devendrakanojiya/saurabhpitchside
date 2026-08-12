export interface Player {
  id: string;
  name: string;
  country: string;
  role: string;
  batting: string;
  bowling: string;
  born: string;
  bio: string;
  stats: { format: string; matches: number; runs: number; average: number; strikeRate: number; wickets: number }[];
}

export const players: Player[] = [
  {
    id: "virat-kohli",
    name: "Virat Kohli",
    country: "India",
    role: "Top-order batter",
    batting: "Right-hand bat",
    bowling: "Right-arm medium",
    born: "5 November 1988, Delhi",
    bio: "One of the most prolific run-scorers in the modern game, Kohli built his reputation on relentless chasing in ODIs and an insatiable appetite for hundreds across formats.",
    stats: [
      { format: "Test", matches: 123, runs: 9230, average: 47.8, strikeRate: 55.6, wickets: 0 },
      { format: "ODI", matches: 302, runs: 14181, average: 57.9, strikeRate: 93.5, wickets: 5 },
      { format: "T20I", matches: 125, runs: 4188, average: 48.7, strikeRate: 137.0, wickets: 4 },
    ],
  },
  {
    id: "jasprit-bumrah",
    name: "Jasprit Bumrah",
    country: "India",
    role: "Bowler",
    batting: "Right-hand bat",
    bowling: "Right-arm fast",
    born: "6 December 1993, Ahmedabad",
    bio: "An unorthodox slingy action and a yorker on demand make Bumrah the most feared death bowler of his generation, and an equally destructive new-ball threat in Tests.",
    stats: [
      { format: "Test", matches: 47, runs: 401, average: 6.7, strikeRate: 43.2, wickets: 213 },
      { format: "ODI", matches: 89, runs: 68, average: 4.2, strikeRate: 52.1, wickets: 149 },
      { format: "T20I", matches: 74, runs: 12, average: 3.0, strikeRate: 66.0, wickets: 96 },
    ],
  },
  {
    id: "kane-williamson",
    name: "Kane Williamson",
    country: "New Zealand",
    role: "Top-order batter",
    batting: "Right-hand bat",
    bowling: "Right-arm off break",
    born: "8 August 1990, Tauranga",
    bio: "Unflappable, technically immaculate and New Zealand's greatest run-scorer, Williamson thrives in conditions that unsettle everyone else.",
    stats: [
      { format: "Test", matches: 106, runs: 9276, average: 54.9, strikeRate: 51.4, wickets: 32 },
      { format: "ODI", matches: 172, runs: 7079, average: 48.1, strikeRate: 81.3, wickets: 37 },
      { format: "T20I", matches: 93, runs: 2575, average: 33.4, strikeRate: 122.6, wickets: 0 },
    ],
  },
  {
    id: "pat-cummins",
    name: "Pat Cummins",
    country: "Australia",
    role: "Bowling all-rounder",
    batting: "Right-hand bat",
    bowling: "Right-arm fast",
    born: "8 May 1993, Sydney",
    bio: "A captain who leads from the front with the ball, Cummins pairs relentless accuracy with steep bounce and a knack for breaking partnerships.",
    stats: [
      { format: "Test", matches: 68, runs: 1189, average: 16.5, strikeRate: 51.9, wickets: 294 },
      { format: "ODI", matches: 96, runs: 553, average: 14.9, strikeRate: 86.0, wickets: 152 },
      { format: "T20I", matches: 56, runs: 132, average: 11.0, strikeRate: 128.1, wickets: 62 },
    ],
  },
  {
    id: "joe-root",
    name: "Joe Root",
    country: "England",
    role: "Top-order batter",
    batting: "Right-hand bat",
    bowling: "Right-arm off break",
    born: "30 December 1990, Sheffield",
    bio: "England's leading Test run-scorer, Root combines classical off-side play with an improvised reverse-scoop that rewrote the modern batting manual.",
    stats: [
      { format: "Test", matches: 152, runs: 12972, average: 50.8, strikeRate: 56.0, wickets: 71 },
      { format: "ODI", matches: 171, runs: 6522, average: 47.6, strikeRate: 86.8, wickets: 27 },
      { format: "T20I", matches: 32, runs: 893, average: 35.7, strikeRate: 126.3, wickets: 6 },
    ],
  },
  {
    id: "babar-azam",
    name: "Babar Azam",
    country: "Pakistan",
    role: "Top-order batter",
    batting: "Right-hand bat",
    bowling: "Right-arm off break",
    born: "15 October 1994, Lahore",
    bio: "The purest cover drive in world cricket. Babar's white-ball consistency has anchored Pakistan through a decade of transition.",
    stats: [
      { format: "Test", matches: 58, runs: 4048, average: 43.5, strikeRate: 55.1, wickets: 0 },
      { format: "ODI", matches: 128, runs: 6156, average: 55.9, strikeRate: 88.5, wickets: 0 },
      { format: "T20I", matches: 128, runs: 4223, average: 39.8, strikeRate: 129.2, wickets: 0 },
    ],
  },
  {
    id: "rashid-khan",
    name: "Rashid Khan",
    country: "Afghanistan",
    role: "Bowling all-rounder",
    batting: "Right-hand bat",
    bowling: "Legbreak googly",
    born: "20 September 1998, Nangarhar",
    bio: "Quick through the air, near-impossible to pick, Rashid turned Afghanistan into a T20 force and became the format's benchmark spinner.",
    stats: [
      { format: "Test", matches: 5, runs: 279, average: 34.9, strikeRate: 89.4, wickets: 34 },
      { format: "ODI", matches: 109, runs: 1349, average: 18.0, strikeRate: 105.2, wickets: 197 },
      { format: "T20I", matches: 94, runs: 528, average: 13.5, strikeRate: 141.9, wickets: 161 },
    ],
  },
  {
    id: "kagiso-rabada",
    name: "Kagiso Rabada",
    country: "South Africa",
    role: "Bowler",
    batting: "Left-hand bat",
    bowling: "Right-arm fast",
    born: "25 May 1995, Johannesburg",
    bio: "Raw pace with control. Rabada reached 300 Test wickets faster than almost anyone and remains South Africa's strike weapon in every format.",
    stats: [
      { format: "Test", matches: 71, runs: 1080, average: 12.7, strikeRate: 58.6, wickets: 327 },
      { format: "ODI", matches: 105, runs: 264, average: 9.1, strikeRate: 82.2, wickets: 166 },
      { format: "T20I", matches: 68, runs: 68, average: 7.5, strikeRate: 110.0, wickets: 84 },
    ],
  },
];

export const getPlayer = (id: string) => players.find((p) => p.id === id);
