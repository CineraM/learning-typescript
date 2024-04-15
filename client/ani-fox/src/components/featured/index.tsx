import { PlayArrow } from "@mui/icons-material"
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./index.scss"

interface AnimeObj {
  _id: string;
  genres: string;
  id: string;
  images: string;
  links: string;
  synopsis: string;
  title: string;
}

const Featured = () => {

  

    let navigate = useNavigate();
    const [featured, setFeatured] = useState<any[]>([])
    const [index, setIndex] = useState(0)
    const [animeData, setAnimeData] = useState<AnimeObj[] | null>(null);

    async function fetchAnime() {
      try {

        const response = await fetch('https://ani-fox-db.onrender.com/api/featured'); // Replace with your API URL
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
    
        const data = await response.json();
        setAnimeData(data as AnimeObj[]); // Cast to the expected array of Anime
      } catch (error) {
        console.error('Error fetching anime:', error);
        // Handle errors gracefully (e.g., display an error message)
      }
    }
    
    useEffect(() => {
      fetchAnime();
    }, []);


    return (
      <div className="anime-list">
        {animeData ? (
          <div className="featured">
          <div className="category">
            <span>Genres</span>
            <select className="genres" onChange={e => {
              setIndex(parseInt(e.target.value))
            }}>
              <option value="0">Action</option>
              <option value="1">Drama</option>
              <option value="2">Adventure</option>
              <option value="3">Comedy</option>
              <option value="4">Sports</option>
              <option value="5">Movies</option>
            </select>
          </div>
      
          <video 
            autoPlay
            loop
            muted
            src= {animeData[index].links} 
          />
      
          <div className="info">
            <div className="left">
              <img className="poster"
              src={animeData[index].images} alt="" />
            </div>
            <div className='right'>
                <h3 className="title">
                  {animeData[index].title}
                </h3>
                <br />
                <p className="desc">{animeData[index].synopsis}</p>
                
                <div className="buttons">
      
                  <button className="play-btn"
                          onClick={() => {
                            localStorage.setItem('LS_ID', animeData[index].id)
                            navigate("/anime")
                          }} >
                    <PlayArrow/>
                    <span>Play</span>
                  </button>
      
                </div>
            </div>
      
            </div>
        </div>
        ) : (    
            <div className="loader"></div>
        )}
      </div>
    );
}

export default Featured



// return (
//   <div className="anime-list">
//     {animeData ? (
//       animeData.map((anime) => (
//         <div key={anime._id} className="anime-item">
//           <img src={anime.images} alt={anime.title} />
//           <h3>{anime.title}</h3>
//           <p>{anime.genres}</p>
//           {/* Add more details or links if desired */}
//         </div>
//       ))
//     ) : (
//       <p>Loading anime data...</p> // Or display a loading indicator
//     )}
//   </div>
// );