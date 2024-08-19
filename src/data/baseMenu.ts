interface MenuItem {
  title: string,
  key: string,
  active?: boolean,
  icon: string
}
const menuData: MenuItem[] = [
  {
    title: '素材库',
    key: 'video',
    icon: 'VideoIcon'
  },
  {
    title: '文本',
    key: 'text',
    icon: 'TextIcon'
  },
  {
    title: '音乐',
    key: 'audio',
    icon: 'AudioIcon'
  },
  
  {
    title: '配音',
    key: 'effect',
    icon: 'EffectsIcon'
  },
  {
    title: '视频',
    key: 'transition',
    icon: 'TransitionIcon'
  },
  {
    title: '图片',
    key: 'image',
    icon: 'ImageIcon'
  },
  // {
  //   title: '滤镜',
  //   key: 'filter',
  //   icon: 'FilterIcon'
  // }
];

export { menuData };
export type { MenuItem };