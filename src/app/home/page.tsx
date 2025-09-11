import Image from "next/image";

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
}

export default async function Home() {

  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  const photos: Photo[] = await response.json();
  const imagePhotos: Photo[] = photos.map((photo) => ({
    ...photo, url: "https://picsum.photos/seed/picsum/200/300"
  }));

  return (
    <div>
      <h1>Home Page</h1>
      <h2>Photos List</h2>
        {
          imagePhotos.map((imagePhoto) => (
            <div key={imagePhoto.id}>
              <Image src={imagePhoto.url} alt={imagePhoto.title} width={150} height={150} />
              <p>{imagePhoto.title}</p>
            </div>
          ))
        }
    </div>
  )
}