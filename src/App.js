import React, {useEffect, useState} from 'react';
import'./App.css';
import Tmdb from './Tmdb';
import MovieRow from './Components/MovieRow';
import FeaturedMovie from './Components/FeaturedMovie'
import Header from './Components/Header'
//chamo todos os meus componentes a cima 


export default () => {

  const[movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
      const loadAll = async() =>{
        //pegando a lista total
        let list = await Tmdb.getHomeList();
        setMovieList(list);

        //pegando o filme em destaque 
        let originals = list.filter(i=>i.slug === 'originals');
        let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
        let chosen = originals[0].items.results[randomChosen];
        let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

        setFeaturedData(chosenInfo);
        

      };
      loadAll();
  }, []);

  useEffect(()=>{ 

    const scrollListerner = ()=>{
        if(window.scrollY > 10){
          setBlackHeader(true)
        }else{
          setBlackHeader(false)
        }
    }
    window.addEventListener('scroll', scrollListerner);
    return()=>{
      window.removeEventListener('scroll', scrollListerner)
    }

  },[]);

  return(
    <div className="page">

      <Header black={blackHeader} />

      {featuredData&&
        <FeaturedMovie item={featuredData}/>
      }
      

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        Feito por joão victor <br/>
        Direitos de imagem para a NetFlix<br/>
        Dados pegos do site Themovidb.org
      </footer>
      {movieList.length <=0 && 
        <div className="loading">
          <img src="https://media1.tenor.com/images/9a02aac51ed499e01518ac73dd954eb1/tenor.gif?itemid=6089689" alt="Carregando"/>
        </div>
      }
    </div>
  );
}
