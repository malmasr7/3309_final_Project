const express = require('express');
const app = express();
const morgan= require ('morgan');
//const cors= require("cors");
const bodyParser= require('body-parser');
// app.use(express.static('./static'));

var router = express.Router(); // instance of express router 
//app.use("/api", router);

app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));
//app.use(cors);

const mysql= require('mysql');

const pool = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    port:3306,
        user: 'root',
        database: 'HAM'
})

function getConnection(){
    return pool;
    
}


app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, OPTIONS, PUT, DELETE");
    console.log("server is working ");
    next();
}); 

app.get('/song/:songName', (req,res)=>{
const connection= getConnection();

var song_Name= req.params.songName;
var queryString = 'SELECT * FROM song WHERE songName ="' + song_Name.toString() +'"';
connection.query(queryString, (err, rows, fields)=>{

    
    console.log("I think this is working..");
    res.json(rows);

    if (err){
        res.sendStatus(500);
        throw err;
    }
});

}

);

app.get('/playlist/:userID/:playlistName', (req, res) =>
{
    
   
     var MyuserID= req.params.userID;
     var MyplaylistName= req.params.playlistName;
    
    console.log(req.body.playlistID);

    var queryString= 'INSERT into playlist  (dataCreated, userID , playlistName) VALUES( '  +  ' curdate(),' + MyuserID.toString() + ',"'+ MyplaylistName.toString()+'")';

    getConnection().query(queryString, (err, rows, fields)=>{
        
         res.json({Playlist: "Sucessfully added new playlist"});


        if (err){
            res.sendStatus(500);
            throw err;
        }    

    }
 
        );
}
)

app.get('/userplaylists/:id', (req,res)=> {
    console.log("This Playlist Is working");
    var userID= req.params.id
    console.log(userID);
    var queryString= "Select distinct * from playlist where userID=" + userID.toString();
    getConnection().query(queryString, (err, rows, fields)=>{

        res.json(rows);

        if (err){
            throw err; 
        }    

    });})

    app.get('/number/:id', (req,res)=> {
        console.log("boom");
        var playlistID= req.params.id 
        console.log(playlistID);
        var queryString= "Select count(songID) numberOfSongs from playlist p join playlistInformation pi on p.playlistID=pi.playlistID where pi.playlistID= " + playlistID.toString();
        getConnection().query(queryString, (err, rows, fields)=>{

            res.json(rows);
    
            if (err){
                throw err; 
            }    
    
        })
    }
    )
    
    app.get('/playlistsongs/:id', (req,res)=> {
        console.log("boom");
        var playlistID= req.params.id 
        console.log(playlistID);
        var queryString= "select s.songID, s.albumID, s.hitCounter, s.songName from song s join playlistinformation pi on s.songID=pi.songID join playlist p on p.playlistID=pi.playlistID where p.playlistID=" + playlistID.toString();
        getConnection().query(queryString, (err, rows, fields)=>{

            res.json(rows);
    
            if (err){
                throw err; 
            }    
    
        })
    }
    )
    
    app.get('/album/:albumName', (req,res)=> {
        console.log("boom");
        var album_Name= req.params.albumName ;
        console.log(album_Name);
       
        var queryString= 'Select songID, s.albumID, hitCounter, songName from album a join song s on a.albumID=s.albumID where albumName= "' + album_Name.toString()+'"';
        getConnection().query(queryString, (err, rows, fields)=>{

            res.json(rows);
    
            if (err){
                throw err; 
            }    
    
        })
    }
    )
    
    
    app.get('/addsong/:songID/:playlistID', (req,res)=> {
        console.log("boom2");
        
        var song_ID= req.params.songID;
        var playlist_ID= req.params.playlistID;
        
       
        var queryString= "insert into playlistinformation VALUES (" + playlist_ID.toString()+ "," + song_ID.toString() + ")";
        getConnection().query(queryString, (err, rows, fields)=>{
            
           res.json({Song: "Sucessfully added to playlist"});

    
            if (err){
                throw err; 
            }    
    
        })
    }
    )
    
    app.get('/album', (req,res)=> {
        
        var queryString= 'Select albumID from album where albumID >120 and albumID <150'; 
        getConnection().query(queryString, (err, rows, fields)=>{

            res.json(rows);
    
            if (err){
                throw err; 
            }    
    
        })
    }
    )
    
    app.get('/addnewsong/:songName/:albumID', (req,res)=> {
        console.log("boom3");
        
        var song_name= req.params.songName;
        var album_ID= req.params.albumID;
        
       
        var queryString= 'insert into song (albumID, hitCounter, songName) VALUES (' + album_ID.toString() + ',1,"' + song_name.toString() + '")'; 
        getConnection().query(queryString, (err, rows, fields)=>{

            res.json({song: "Sucessfully added"});
    
            if (err){
                throw err; 
            }    
    
        })
    }
    )
    
    app.get('/topcharts/:genreName', (req,res)=> {
        console.log("boom4");
        
    var genre_Name= req.params.genreName;
        
       
        var queryString= 'select s.songID, s.albumID, hitCounter, songName, genre from song s join album a on s.albumID=a.albumID where genre = "'+ genre_Name +'" order by hitCounter DESC limit 10' ;
        getConnection().query(queryString, (err, rows, fields)=>{

            res.json(rows);
    
            if (err){
                throw err; 
            }    
    
        })
    }
    )
    
    
    app.get('/beforedate/:year', (req,res)=> {
        console.log("boom4");
        
    var _year= req.params.year;
        
       
        var queryString= "select s.songID, s.albumID, hitCounter, songName, date from song s join album a on s.albumID=a.albumID  where year(date)<" + _year.toString();
        getConnection().query(queryString, (err, rows, fields)=>{

            res.json(rows);
    
            if (err){
                throw err; 
            }    
    
        })
    }
    )
    
    
    app.get('/afterdate/:year', (req,res)=> {
        console.log("boom4");
        
    var _year= req.params.year;
        
       
        var queryString= "select s.songID, s.albumID, hitCounter, songName, date from song s join album a on s.albumID=a.albumID  where year(date)>" + _year.toString();
        getConnection().query(queryString, (err, rows, fields)=>{

            res.json(rows);
    
            if (err){
                throw err; 
            }    
    
        })
    }
    )
    


app.get('/retrievePlaylistSongs', (req,res)=> {
    
      
        var queryString= " select songName, songID from song where songID >100 AND songID <111;";
        getConnection().query(queryString, (err, rows, fields)=>{

            res.json(rows);
    
            if (err){
                throw err; 
            }    
    
        })
    }
    )



app.get('/searchretrieve/:name', (req,res)=> {
    
    var _songName= req.params.name;
      
        var queryString= " select songName, songID, hitCounter from song where songName= '"+_songName+"';";
        getConnection().query(queryString, (err, rows, fields)=>{

            res.json(rows);
    
            if (err){
                throw err; 
            }    
    
        })
    }
    )

app.get('/searchplaylist/:playlist', (req,res)=> {
    
    let _playlistName= req.params.playlist;
      
        var queryString= " select playlistID, dataCreated, playlistName from playlist where playlistName= '"+_playlistName+"';";
        getConnection().query(queryString, (err, rows, fields)=>{

            res.json(rows);
    
            if (err){
                throw err; 
            }    
    
        })
    }
    )


app.get('/searchalbum/:album', (req,res)=> {
    
    let _albumName= req.params.album;
      
        var queryString= " select albumID, date, albumName, genre from album where albumName= '"+_albumName+"';";
        getConnection().query(queryString, (err, rows, fields)=>{

            res.json(rows);
    
            if (err){
                throw err; 
            }    
    
        });
    }
    );
    
    
        app.get('/topchart', (req,res)=> {
    //     console.log("boom4");
        
    let genre_Name= 'rock';
        
       
        var queryString= 'select s.songID, s.albumID, hitCounter, songName, genre from song s join album a on s.albumID=a.albumID where genre = "'+ genre_Name +'" order by hitCounter DESC limit 25' ;
        getConnection().query(queryString, (err, rows, fields)=>{

            res.json(rows);
    
            if (err){
                throw err; 
            }    
    
        });
    }
    );
    
     
        app.get('/newaddedsong', (req,res)=> {
  
        var queryString= 'select songID, s.albumID, hitCounter, songName,genre from song s join album a on s.albumID=a.albumID order by songID DESC limit 10' ;
        getConnection().query(queryString, (err, rows, fields)=>{

            return res.json(rows);
    
            if (err){
                throw err; 
            }    
    
        });
    }
    );
    
    


app.listen(8081, ()=> {
  
    console.log("Server Is Listening on port 8081");
})