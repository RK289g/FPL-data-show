export interface Player {
  id: number;
  player_first_name: string;
  player_last_name: string;
  summary_overall_points: number;
  summary_overall_rank: number;
  name: string;
  current_event: number;
}

export interface PlayerPick {
  element: number;
  position: number;
  multiplier: number;
}

export interface PlayerData {
  id: number;
  web_name: string;
  event_points: number;
  total_points: number;
  code: number;
}

export interface TeamData {
  name: string;
  player_first_name: string;
  player_last_name: string;
  summary_event_points: number;
}
