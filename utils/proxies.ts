interface IProxy {
  protocol: "http" | "https";
  host: string;
  port: number;
}

const proxy_list : IProxy[]= [
  {
      protocol: 'https',
      host: '116.203.32.107',
      port: 8080,
  },

//   {
//       protocol: 'http',
//       host: '121.43.52.44',
//       port: 3128,
//   },

]

export const getRandomProxy = ()=>{
    return proxy_list[Math.floor(proxy_list.length*Math.random())];
}