interface ImageResponseInterface {
  data: ImageInterface[]
}

export interface ImageInterface {
  id: number,
  url: string
}

export default function getImageRequest(): Promise<ImageResponseInterface> {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve({
      data: [
        {
          id: 1,
          url: "https://plus.unsplash.com/premium_photo-1695635984593-a69326d8f5bb?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          id: 2,
          url: "https://plus.unsplash.com/premium_photo-1695635984593-a69326d8f5bb?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          id: 3,
          url: "https://plus.unsplash.com/premium_photo-1695635984593-a69326d8f5bb?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          id: 4,
          url: "https://plus.unsplash.com/premium_photo-1695635984593-a69326d8f5bb?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          id: 5,
          url: "https://plus.unsplash.com/premium_photo-1695635984593-a69326d8f5bb?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          id: 6,
          url: "https://plus.unsplash.com/premium_photo-1695635984593-a69326d8f5bb?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          id: 7,
          url: "https://plus.unsplash.com/premium_photo-1695635984593-a69326d8f5bb?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      ]
    }), 3000)
  })
}