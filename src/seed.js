const knex = require('knex')
const axios = require('axios')
const database = knex({
    client:'pg',
    connection : {
        host: '127.0.0.1',
        user: 'postgres',
        password:'test',
        database:'manga'
    },
    });

        database.schema.hasTable('manga').then(function(exists){
            if(!exists){
               return database.schema.createTable('manga', function (table) {
        
                    table.increments('id').primary();
                    table.integer('id_manga');
                    table.text('synopsis');
                    table.text('description');
                    table.integer('coverImageTopOffset');
                    table.string('tittles_en');
                    table.string('tittles_jap');

                    table.float('averageRating');
                    table.date('startDate');
                    table.date('endDate');
                    table.integer('popularityRank');
                    table.integer('ratingRank');
                    table.string('ageRating');
                    table.string('ageRatingGuide');

                    table.string('posterImageTiny');
                    table.string('posterImageSmall');
                    table.string('posterImageMedium');
                    table.string('posterImageLarge');
                    table.string('posterImageOriginal');

                    table.string('CoverImageTiny');
                    table.string('CoverImageSmall');
                  
                    table.string('CoverImageLarge');
                    table.string('CoverImageOriginal');

                    table.integer('episodeCount');
                    table.integer('episodeLength');
                    table.string('ShowType');
   
              }).then(
                console.log("table ok")
              )
            }
        })

        let i = 0;

        while (i<1000){

          axios.get(`https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${i}`).then((data_manga)=>{
        
            if(data_manga.data.data[1].id != "")
            database.insert({
                  
              id_manga:data_manga.data.data[1].id,
              synopsis:data_manga.data.data[1].attributes.synopsis,
              description:data_manga.data.data[1].attributes.description,
              coverImageTopOffset:data_manga.data.data[1].attributes.coverImageTopOffset,
              tittles_en:data_manga.data.data[1].attributes.titles.en,
              tittles_jap:data_manga.data.data[1].attributes.titles.en_jp,

              averageRating:data_manga.data.data[1].attributes.averageRating,
              startDate:data_manga.data.data[1].attributes.startDate,
              endDate:data_manga.data.data[1].attributes.endDate,
              popularityRank:data_manga.data.data[1].attributes.popularityRank,
              ratingRank:data_manga.data.data[1].attributes.ratingRank,
              ageRating:data_manga.data.data[1].attributes.ageRating,
              ageRatingGuide: data_manga.data.data[1].attributes.ageRatingGuide,

              posterImageTiny:data_manga.data.data[1].attributes.posterImage.tiny,
              posterImageSmall:data_manga.data.data[1].attributes.posterImage.small,
              posterImageMedium:data_manga.data.data[1].attributes.posterImage.medium,
              posterImageLarge:data_manga.data.data[1].attributes.posterImage.large,
              posterImageOriginal:data_manga.data.data[1].attributes.posterImage.original,

               
              CoverImageTiny:data_manga.data.data[1].attributes.coverImage.tiny,
              CoverImageSmall:data_manga.data.data[1].attributes.coverImage.small,
              CoverImageLarge:data_manga.data.data[1].attributes.coverImage.large,
              CoverImageOriginal:data_manga.data.data[1].attributes.coverImage.original,
              episodeCount:data_manga.data.data[1].attributes.episodeCount,
              episodeLength:data_manga.data.data[1].attributes.episodeLength,
              ShowType:data_manga.data.data[1].attributes.showType

        })
        .into('manga')
        .then(function (id) {
            // use id here
        });
        }).catch(console.error)
            i++;
          }
        