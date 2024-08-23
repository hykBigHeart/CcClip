import { axiosInstance } from '@/plugins/installAxios';
// 列表
export function getData(type: number | string) {
  // return axiosInstance.get(`/mock/getdata?type=${type}`);
  if (type === 'video') return axiosInstance.get(`/mock/video.json?type=${type}`)
  else if (type === 'text') return axiosInstance.get(`/mock/text.json?type=${type}`)
  else if (type === 'audio') return axiosInstance.get(`/mock/audio.json?type=${type}`)
  else if (type === 'transition') return axiosInstance.get(`/mock/video.json?type=${type}`)
  else return axiosInstance.get(`/mock/image.json?type=${type}`)
}