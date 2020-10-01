const API_KEY = '3983af9e31ebd25090f37fb8a751473a';
const API_BASE = 'https://api.themoviedb.org/3';
//passando as informaçoes para requisição no site 


/*
    -originais da netflix
    -recomendados(trending)
    -em alta (top rated)
    -ação
    -comedia
    -terror
    -romance
    -documentario
*/
//await usado quando faz requisição para fora do codigo sendo assim ele espera a resposta antes de continuar
const basicFatch = async (endpoint)=>{
    const req = await fetch(`${API_BASE}${endpoint}`)
    const json = await req.json()
    return json
}

export default{
    getHomeList: async () =>{
        return[
            {
                slug: 'originals',
                title: 'Originais da Netflix',
                items: await basicFatch(`/discover/tv?with_network=213&language=pt-br&api_key=${API_KEY}`)//link para requisição o numero e referente ai netflix 
            },
            {
                slug: 'trending',
                title: 'Recomendados',
                items: await basicFatch (`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFatch (`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'action',
                title:'Ação',
                items:await basicFatch (`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFatch (`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFatch (`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFatch (`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentario',
                items:await basicFatch (`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ]
    },
    getMovieInfo: async (movieId, type)=>{//requisição para pegar mais informações dos filmes no site,pelo fato que a pesquisa anterior não tras todas as informaçãoes
        let info = {};

        if(movieId){
            switch(type){
                case'movie':
                    info = await basicFatch(`/movie/${movieId}?language=pt-br&api_key=${API_KEY}`)
                    break;
                case 'tv':
                    info = await basicFatch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                    break;
                default:
                    info = null;
                    break
            }
        }
        return info;
    }
}
    
