import { PlayArrow } from "@mui/icons-material"
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./featured.scss"


const Featured = () => {

    let navigate = useNavigate();
    // usestate from react, use a bool variable in the css file
    const [isVertical, setIsVertical] = useState(false);
    const [featured, setFeatured] = useState<any[]>([])
    const [index, setIndex] = useState(0)
    
    
    // if the page offset is larger than 0, unblur the navbar
    window.onresize = () =>{
      // let aspectRatio = window.innerWidth/window.innerHeight;
      setIsVertical(window.innerWidth/window.innerHeight < 1 ? true : false);
      return() => (window.onresize = null);
    };

    async function getFeatured() 
    {
      // Fetch the DB, return all featured
      async function fetchFeatured() 
      {
          try {
              const response = await fetch(`https://ani-fox-db.onrender.com/api/featured`, {
                method: 'GET',
                
              });
              const mylist = await response.json();
              return mylist;
          } 
          catch (error) {console.error(error);}
      }
        const featuredList = await fetchFeatured();
        setFeatured(featuredList);
    }
    
    useEffect(() => {
        // proper aspect ratio of content
        setIsVertical(window.innerWidth/window.innerHeight < 1 ? true : false);
        getFeatured()
    
      }, [])


      try {
        return (
    
          <div className={isVertical ? "featured vertical" : "featured"}>
      
          <div className={isVertical ? "category vertical" : "category"}>
            <span>Genres</span>
            <select className={isVertical ? "genres vertical" : "genres"} onChange={e => {
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
            src= {featured[index].links} 
          />
      
          <div className="info">
            <div className="left">
              <img className={isVertical ? "poster vertical" : "poster"}
              src={featured[index].images} alt="" />
            </div>
            <div className='right'>
                <h3 className={isVertical ? "title vertical" : "title"}>
                  {featured[index].title}
                </h3>
                <br />
                <p className={isVertical ? "desc vertical" : "desc"}>{featured[index].synopsis}</p>
                
                <div className="buttons">
      
                  <button className={isVertical ? "play-btn vertical" : "play-btn"}
                          onClick={() => {
                            localStorage.setItem('LS_ID', featured[index].id)
                            navigate("/anime")
                          }} >
                    <PlayArrow/>
                    <span>Play</span>
                  </button>
      
                </div>
            </div>
      
            </div>
        </div>
      
        )
      } catch (error) {
        <div className={isVertical ? "featured vertical" : "featured"}>
          meh
        </div>
      }
}

export default Featured