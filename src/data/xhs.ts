// The team's own Xiaohongshu (小红书) account and a few of its notes.
// Titles are exactly as posted. Like and follower counts were read on 14 Oct 2026.
// A link to a single note needs a session token, so every card links to the profile.

export const xhsProfileUrl = 'https://www.xiaohongshu.com/user/profile/67bc12d6000000000e01f09a';

export const xhsFollowers = { count: 995, year: 2026, month: 10 };

export interface XhsNote {
  /** File name without extension; the cover image is public/xhs/<cover>.jpg when it exists. */
  cover: string;
  title: string;
  likes: number;
}

export const xhsNotes: XhsNote[] = [
  { cover: 'cover-testers', title: '有没有ADHD宝宝想来测试我们的产品呀', likes: 393 },
  { cover: 'cover-steamer', title: '包子头像已出笼，请及时认领', likes: 7 },
  { cover: 'cover-daily', title: '包子铺的日常 vol.1', likes: 11 },
  { cover: 'cover-gashapon', title: '为了治adhd的拖延症，我们做了个扭蛋机', likes: 13 },
  { cover: 'cover-voice', title: '语音输入简直是 ADHD 奇怪脑洞的救星', likes: 12 },
  { cover: 'cover-review', title: '我们更新啦，快来分享你的专属月度回顾吧～', likes: 4 },
];
