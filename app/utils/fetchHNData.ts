import { get } from "./fetch";

export interface IStoryData {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface IStory {
  url: string;
  title: string;
  id: number;
  by: string;
  descendants: number;
}

export async function fetchHNStories(page = 1): Promise<IStory[]> {
  try {
    const res = await get<number[]>(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    const items = res.filter((item, i) => {
      if (page > 1 && page <= 16) {
        if (i > (page - 1) * 30 && i < page * 30) {
          return item;
        }
      } else if (page <= 16) {
        return i < 30 && item;
      } else {
        return [];
      }
    });
    const stories = await Promise.all(
      items.map(async (i) => {
        const res = await get<IStoryData>(
          `https://hacker-news.firebaseio.com/v0/item/${i}.json`
        );
        return {
          url: res.url,
          title: res.title,
          id: res.id,
          by: res.by,
          descendants: res.descendants,
        };
      })
    );
    return stories;
  } catch (error) {
    throw error;
  }
}
