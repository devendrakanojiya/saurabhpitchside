export type MatchStatus = "live" | "upcoming" | "recent";

export interface Innings {
  team: string;
  short: string;
  runs: number;
  wickets: number;
  overs: string;
}

export interface Batter {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  out?: string;
}

export interface Bowler {
  name: string;
  overs: string;
  maidens: number;
  runs: number;
  wickets: number;
}

export interface Match {
  id: string;
  status: MatchStatus;
  series: string;
  format: "T20" | "ODI" | "TEST";
  venue: string;
  startsAt: string;
  teamA: Innings;
  teamB: Innings;
  note: string;
  batters?: Batter[];
  bowlers?: Bowler[];
  commentary?: { over: string; text: string }[];
}

export const matches: Match[] = [
  {
    id: "ind-aus-t20-3",
    status: "live",
    series: "Australia tour of India, 3rd T20I",
    format: "T20",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    startsAt: "Today, 7:00 PM",
    teamA: { team: "India", short: "IND", runs: 186, wickets: 4, overs: "18.2" },
    teamB: { team: "Australia", short: "AUS", runs: 201, wickets: 6, overs: "20.0" },
    note: "India need 16 runs in 10 balls",
    batters: [
      { name: "Suryakumar Yadav", runs: 74, balls: 39, fours: 6, sixes: 5 },
      { name: "Rinku Singh", runs: 28, balls: 14, fours: 2, sixes: 2 },
      { name: "Shubman Gill", runs: 41, balls: 30, fours: 5, sixes: 1, out: "c Maxwell b Zampa" },
      { name: "Yashasvi Jaiswal", runs: 22, balls: 15, fours: 4, sixes: 0, out: "b Hazlewood" },
    ],
    bowlers: [
      { name: "Josh Hazlewood", overs: "4", maidens: 0, runs: 31, wickets: 2 },
      { name: "Adam Zampa", overs: "4", maidens: 0, runs: 38, wickets: 1 },
      { name: "Pat Cummins", overs: "3.2", maidens: 0, runs: 44, wickets: 1 },
    ],
    commentary: [
      { over: "18.2", text: "Cummins to Suryakumar, FOUR! Slashed hard past backward point." },
      { over: "18.1", text: "Cummins to Suryakumar, 1 wide down leg side." },
      { over: "17.6", text: "Zampa to Rinku, SIX! Slog swept into the stands." },
      { over: "17.5", text: "Zampa to Rinku, no run, beaten outside off." },
    ],
  },
  {
    id: "eng-nz-odi-1",
    status: "live",
    series: "New Zealand tour of England, 1st ODI",
    format: "ODI",
    venue: "Lord's, London",
    startsAt: "Today, 3:30 PM",
    teamA: { team: "England", short: "ENG", runs: 274, wickets: 8, overs: "50.0" },
    teamB: { team: "New Zealand", short: "NZ", runs: 158, wickets: 3, overs: "31.4" },
    note: "New Zealand need 117 runs in 110 balls",
    batters: [
      { name: "Kane Williamson", runs: 68, balls: 79, fours: 6, sixes: 0 },
      { name: "Daryl Mitchell", runs: 34, balls: 27, fours: 3, sixes: 1 },
    ],
    bowlers: [
      { name: "Jofra Archer", overs: "7", maidens: 1, runs: 29, wickets: 2 },
      { name: "Adil Rashid", overs: "6.4", maidens: 0, runs: 34, wickets: 1 },
    ],
    commentary: [
      { over: "31.4", text: "Rashid to Williamson, single tucked to midwicket." },
      { over: "31.3", text: "Rashid to Mitchell, FOUR! Swept fine." },
    ],
  },
  {
    id: "sa-pak-test-2",
    status: "upcoming",
    series: "Pakistan tour of South Africa, 2nd Test",
    format: "TEST",
    venue: "Newlands, Cape Town",
    startsAt: "Tomorrow, 1:30 PM",
    teamA: { team: "South Africa", short: "SA", runs: 0, wickets: 0, overs: "0.0" },
    teamB: { team: "Pakistan", short: "PAK", runs: 0, wickets: 0, overs: "0.0" },
    note: "Match starts tomorrow at 1:30 PM",
  },
  {
    id: "wi-slt20",
    status: "upcoming",
    series: "Sri Lanka tour of West Indies, 1st T20I",
    format: "T20",
    venue: "Kensington Oval, Bridgetown",
    startsAt: "Fri, 11:00 PM",
    teamA: { team: "West Indies", short: "WI", runs: 0, wickets: 0, overs: "0.0" },
    teamB: { team: "Sri Lanka", short: "SL", runs: 0, wickets: 0, overs: "0.0" },
    note: "Toss at 10:30 PM",
  },
  {
    id: "ban-afg-odi-3",
    status: "recent",
    series: "Afghanistan tour of Bangladesh, 3rd ODI",
    format: "ODI",
    venue: "Sher-e-Bangla Stadium, Dhaka",
    startsAt: "Yesterday",
    teamA: { team: "Bangladesh", short: "BAN", runs: 245, wickets: 9, overs: "50.0" },
    teamB: { team: "Afghanistan", short: "AFG", runs: 249, wickets: 5, overs: "47.3" },
    note: "Afghanistan won by 5 wickets",
    batters: [
      { name: "Rahmanullah Gurbaz", runs: 92, balls: 88, fours: 11, sixes: 2, out: "c Shanto b Miraz" },
      { name: "Hashmatullah Shahidi", runs: 61, balls: 74, fours: 4, sixes: 0 },
    ],
    bowlers: [
      { name: "Mehidy Hasan Miraz", overs: "10", maidens: 0, runs: 45, wickets: 2 },
      { name: "Taskin Ahmed", overs: "9.3", maidens: 1, runs: 52, wickets: 2 },
    ],
    commentary: [{ over: "47.3", text: "Winning runs! Omarzai punches through covers for four." }],
  },
  {
    id: "ind-eng-test-4",
    status: "recent",
    series: "England tour of India, 4th Test",
    format: "TEST",
    venue: "JSCA Stadium, Ranchi",
    startsAt: "2 days ago",
    teamA: { team: "India", short: "IND", runs: 307, wickets: 10, overs: "103.2" },
    teamB: { team: "England", short: "ENG", runs: 353, wickets: 10, overs: "111.0" },
    note: "India won by 5 wickets",
  },
];

export const getMatch = (id: string) => matches.find((m) => m.id === id);
