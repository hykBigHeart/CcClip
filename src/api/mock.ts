import { axiosInstance } from '@/plugins/installAxios';
// 列表
export function getData(type: number | string) {
  // return axiosInstance.get(`/mock/getdata?type=${type}`);
  if (type === 'video') return axiosInstance.get(`/mock/data.json?type=${type}`)
  else return axiosInstance.get(`/mock/audio.json?type=${type}`)
}