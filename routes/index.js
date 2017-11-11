/**
 * Created by atulr on 05/07/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
const Pool = require('pg-pool');
const url = require('url');

 var bodyParser = require('body-parser');
 var session = require('express-session');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var users = [{"id":111, "username":"amy", "password":"amy"}];
 
// passport needs ability to serialize and unserialize users out of session
passport.serializeUser(function (user, done) {
    done(null, users[0].id);
});
passport.deserializeUser(function (id, done) {
    done(null, users[0]);
});
 
// passport local strategy for local-login, local refers to this app
passport.use('local-login', new LocalStrategy(
    function (username, password, done) {
        if (username === users[0].username && password === users[0].password) {
            return done(null, users[0]);
        } else {
            return done(null, false, {"message": "User not found."});
        }
    })
);
 
// body-parser for retrieving form data
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true }));
 
// initialize passposrt and and session for persistent login sessions
router.use(session({
    secret: "tHiSiSasEcRetStr",
    resave: true,
    saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());
 
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
 
    res.sendStatus(401);
}
 
router.post("/login", 
    passport.authenticate("local-login", { failureRedirect: "/login.html"}),
    function (req, res) {
        res.redirect("/#/");
});

var connectionString = require(path.join(__dirname, '../', 'config'));
const params = url.parse(connectionString);
const auth = params.auth.split(':');

const config = {
  user: process.env.POSTGRESQL_USER||auth[0],
  password: process.env.POSTGRESQL_PASSWORD||auth[1],
  host: process.env.POSTGRESQL_SERVICE_HOST||params.hostname,
  port: process.env.POSTGRESQL_SERVICE_PORT||params.port,
  database: params.pathname.split('/')[1]//,
  //ssl: true
};
var pool = new pg.Pool(config);


router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'client', 'views', 'index.html'));
});

router.get("/logout", function (req, res) {
    req.logout();
    res.send("logout success!");
});

router.get('/login.html', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../','client', 'views', 'login.html'));
});

router.get('/reedling.html', isLoggedIn,function(req, res, next) {
  res.sendFile(path.join(__dirname, '../','client', 'views', 'reedling.html'));
});

router.get('/info.html',isLoggedIn, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../','client', 'views', 'info.html'));
});
router.get('/info.tag', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../','client', 'views', 'info.tag'));
});


router.get('/info/gen', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo[url.slice(6)]()));
});


router.get('/info/poll', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo[url.slice(6)]()));
});

router.get('/location.html',isLoggedIn, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'client', 'views', 'location.html'));
});

router.get('/locationEdit.html',isLoggedIn, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'client', 'views', 'locationEdit.html'));
});

router.get('/geo.html', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'client', 'views', 'geo.html'));
});

router.get('/country.html',isLoggedIn, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'client', 'views', 'country.html'));
});

router.get('/reportQuery.html', isLoggedIn,function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'client', 'views', 'reportQuery.html'));
});

router.get('/checklistname.html',isLoggedIn, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'client', 'views', 'checklistname.html'));
});

router.get('/checklistDetail.html',isLoggedIn, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'client', 'views', 'checklistDetail.html'));
});

router.get('/siteVisitList.html',isLoggedIn, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'client', 'views', 'siteVisitList.html'));
});
router.get('/userList.html',isLoggedIn, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'client', 'views', 'userList.html'));
});
router.get('/user.html',isLoggedIn, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'client', 'views', 'user.html'));
});
router.get('/observation.html',isLoggedIn, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'client', 'views', 'observation.html'));
});



router.post('/api/v1/checklistitems', function(req, res) {
    var taxon=req.body.taxon;
    var checklistId = req.body.checklist.id;
    //var checklistId = req.body.selectedChecklist.id;
    var localName = req.body.localName;
    if(typeof localName === 'undefined'){
        console.log('local name is undefined');
        localName=taxon;
    }
    console.log(taxon);
    console.log(checklistId);
    console.log(localName);
    var queryStr = "insert into checklistitem(id,name,checklist_id,taxon_id) values ( "+
           " (select nextval('hibernate_sequence')), "+
           " ($1),($2), (select id from taxon where commonname=($3))) ";
    var result = pool.query(queryStr,[localName,checklistId,taxon],function (err, result) {
        return res.json(result.rows);
    });
});

router.put('/api/v1/user/:user_id', function(req, res) {
    var id = req.params.user_id;
    console.log("id:"+id);
    console.log("defaultchecklistname_id:"+req.body.defaultchecklistname_id);
    console.log("selectedId="+req.body.selectedId);

    var user = {email: req.body.email,
            fullname: req.body.fullname,
            isadmin:req.body.isadmin,
            password:req.body.password,
            defaultchecklistname_id:req.body.defaultchecklistname_id,
            id:req.body.id};
    console.log("user:"+user);

    var result = pool.query("UPDATE userdetail SET email=($1), fullname=($2),isadmin=($3),password=($4),defaultchecklistname_id=($5) WHERE id=($6)",
             [user.email, user.fullname,user.isadmin,user.password,user.defaultchecklistname_id,user.id],function (err, result) {
        return res.json(result.rows);
    });
});


router.post('/api/v1/sitevisit', function(req, res) {
    var data = {text: req.body, complete: false};
    console.log(req.body.location);
    console.log(req.body.date);
//    Get a Postgres client from the connection pool
    var query = pool.query("insert into sitevisit(id,location_id,date) values ("+
            "(select nextval('hibernate_sequence')),"+
            "(SELECT id FROM location where name=($1) ORDER BY id ASC),($2)) RETURNING id ",[req.body.location,req.body.date],
            function (err, result) {
        return res.json(result.rows);
    });
});

router.post('/api/v1/location', function(req, res) {
    var data = {text: req.body, complete: false};
    console.log('MN 5 Test'+req.body);
    console.log(req.body.locname);
    console.log(req.body.cname);
    console.log(req.body.parent);
    // // Get a Postgres client from the connection pool
    var result = pool.query("insert into location (id,name,country_id,parent_id) values ("+
         "(select nextval('hibernate_sequence')),"+ 
         "($1),(select id from country where name=($2)),(select id from location where name=($3)))",
         [req.body.locname,req.body.cname,req.body.parent],function (err, result) {
        return res.json(result.rows);
    });
});



router.put('/api/v1/location/:location_id', function(req, res) {
    console.log("in location put");
    var id = req.params.location_id;
    console.log(req.body);
    var locationName = req.body.locName;
    var countryName = req.body.cname;
    var parentName = req.body.pname;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var mapzoom = req.body.mapzoom;
    console.log("id:"+id);
    console.log("locationName:"+locationName);
    console.log("countryName="+countryName);
    console.log("parentName="+parentName);
    console.log("latitude="+latitude);
    console.log("longitude="+longitude);
    console.log("mapzoom="+mapzoom);


    var result = pool.query("UPDATE location "+
        "SET name=($1), "+
        "parent_id=(select id from location where name =$2), "+
        "country_id=(select id from country where name= $3), "+
        "latitude=($4), "+
        "longitude=($5), "+
        "mapzoom=($6) "+
        " WHERE id=($7)",
             [locationName, parentName,countryName,latitude,longitude,mapzoom,id],function (err, result) {
             if (err) {
                return console.error('query error', err.message, err.stack)
            }
        return res.json(result.rows);
    });
});



router.post('/api/v1/observation', function(req, res) {
    var date = null;
    var notes = null;
    var location_id=null;
    var taxon_id=null;
    var user_id=null;
    var heardOnly=null;
    var sitevisit_id=null;

    // Grab data from http request
    var data = {text: req.body, complete: false};
    console.log('MN 5 Test'+req.body);
    console.log(req.body.date);
    console.log(req.body.location);
    console.log(req.body.visitId);
    var current =req.body.sightings.species.pop(); 
    console.log(current.speciesname);
    heardOnly = req.body.heardOnly;
    console.log(heardOnly);
     var result = pool.query("insert into observation(id,date,notes,location_id,taxon_id,user_id,heardonly,sitevisit_id) values "+
         "((select nextval('hibernate_sequence')),($1), ($2),"+
         "(select id from location where name=($3)),"+
    "(select id from taxon where commonname=($4)),"+
    "(select id from userdetail where fullname='mn'),"+
    "($5),($6))",
         [req.body.date,null,req.body.location,current.speciesname,heardOnly,req.body.visitId],function (err, result) {
            if(err) {
                return console.error('query error', err.message, err.stack)
            }
        return res.json(result.rows);
    });
});



router.post('/api/v1/report', function(req, res) {
    var params = [];
    // Grab data from http request
    var data = {text: req.body, complete: false};
    console.log('MN 5 Test'+req.body);
    var startDate = req.body.fromDate;//new Date(req.body.fromDate);
    var endDate = req.body.toDate;//new Date(req.body.toDate);
    var location = req.body.location;
    var country = req.body.country;
    var taxon = req.body.taxon;
    var option = req.body.option;
    console.log(startDate);
    console.log(endDate);
    console.log(location);
    console.log(country);
    console.log(taxon);
    console.log(option);
    params.push(startDate);
    params.push(endDate);

    var locationStr = "";
    var countryStr = "";
    var queryText = "";
 
    if(option=="All Observations") {
        console.log("All Observations");
        if(typeof country!=='undefined'&&country.length>0) {
            locationStr = "";
            countryStr="  and c.name=($4) ";
        } else {
            countryStr=" and c.name is not null ";
        }

        queryText = "select t.id,t.commonname,date_trunc('day',o.date) date,l.name ,o.date,t.position,o.heardonly, o.id, "+
            " t.breedingrange brange,t.detailedbreedingrange dbr, t.nonbreadingrange nbr, t.note note "+
            " from observation o "+
            " join taxon t on o.taxon_id=t.id "+
            " join location l on o.location_id=l.id "+
            " join country c on l.country_id=c.id "+
            " where "+
            " o.date>=($1) and o.date<=($2) "+
            " and t.commonname=($3) "
            " and concat(countryStr) "
//            " concat(" and +
            " order by o.date";

        params.push(taxon);

         if(typeof country!=='undefined'&&country.length>0) {
            params.push(country);
        }
    }
    else
    {
    if(typeof location!=='undefined'&&location.length>0) {
        locationStr=" and l.name=($3) or p.name=($3) ";
        params.push(location);
    }

    if(typeof country!=='undefined'&&country.length>0){
        locationStr = "";
        countryStr="  and l.country_id=(select id from country where name=($3))  ";
        params.push(country);
    }

queryText = "select ob.taxon_id,taxon.commonname,l.name ,date_trunc('day',ob.date) date,taxon.position, ob.heardonly, ob.id, "+
"taxon.breedingrange brange,taxon.detailedbreedingrange dbr, taxon.nonbreadingrange nbr, taxon.note note "+

"from(select min(o.id) as moid from  ("+
"select taxon_id,min(date) as firstDate from observation left join location l on location_id=l.id "+
" left outer join location p on l.parent_id=p.id "+
 "where observation.date>=($1) and observation.date<=($2) "+      
locationStr+
countryStr+
 " group by taxon_id ) "+
 " as x inner join observation as o on o.taxon_id=x.taxon_id   and o.date=x.firstDate group by o.taxon_id) as y "+
 " inner join observation as ob on y.moid=ob.id "+
 " inner join taxon on ob.taxon_id=taxon.id "+
 " inner join location as l on ob.location_id=l.id   order by position";
}
console.log(queryText);
 var result = pool.query(queryText,params,function (err, result) {
                if (err) {
                return console.error('query error', err.message, err.stack)
            }
        return res.json(result.rows);
    });
});




router.post('/api/v1/country', function(req, res) {
    var result = pool.query("insert into country (id,name) values ((select nextval('hibernate_sequence')),($1))",
         [req.body.name],function (err, result) {
        return res.json(result.rows);
    });
});

router.post('/api/v1/checklist', function(req, res) {
    var data = {text: req.body, complete: false};
    var result = pool.query("insert into checklistname (id,checklistname) values ((select nextval('hibernate_sequence')),($1))",
         [req.body.checklistname],function (err, result) {
        return res.json(result.rows);
    });
});

router.get('/api/v1/user', function(req, res) {
    var result = pool.query('select ud.id,fullname,checklistname from userdetail ud join checklistname cl on cl.id=ud.defaultchecklistname_id'
        ,[],function (err, result) {
        return res.json(result.rows);
    });
});

// " t.breedingrange brange,t.detailedbreedingrange dbr, t.nonbreadingrange nbr, t.note note "+


router.get('/api/v1/checklistitems', function(req, res) {
    var id = req.params.checklist_id;
    var result = pool.query(
            "select cli.id,cli.name,cli.positioninlist,cli.checklist_id,cli.taxon_id, "+

            "tax.commonname,tax.position,tax.breedingrange brange,tax.detailedbreedingrange dbr,tax.nonbreadingrange nbr,tax.note note "+
            " from checklistitem as cli join taxon as tax on taxon_id=tax.id join userdetail ud on cli.checklist_id=ud.defaultchecklistname_id where ud.fullname='mn' order by tax.position nulls first",
            [],function (err, result) {
        return res.json(result.rows);
    });
});

router.get('/api/v1/checklistitems/:checklist_id', function(req, res) {
    var id = req.params.checklist_id;
    var result  = pool.query("select cli.id,cli.name,cli.positioninlist,cli.checklist_id,cli.taxon_id, "+
        "tax.commonname,tax.position,tax.breedingrange brange,tax.detailedbreedingrange dbr,tax.nonbreadingrange nbr,tax.note note from checklistitem as cli join taxon as tax on taxon_id=tax.id where checklist_id=($1) order by tax.position nulls first",
            [id],function (err, result) {
        return res.json(result.rows);
    });
});

router.get('/api/v1/checklist', function(req, res) {
    var result = pool.query("select id,checklistname from checklistname order by checklistname nulls first;",
            [],function (err, result) {
                return res.json(result.rows);
    });
});

router.get('/api/v1/userchecklist', function(req, res) {
    var result = pool.query("select cln.id,cln.checklistname from userdetail ud join checklistname cln on cln.id=ud.defaultchecklistname_id where ud.fullname='mn';",
            [],function (err, result) {
                if (err) {
                return console.error('query error', err.message, err.stack)
            }
                return res.json(result.rows[0]);
    });
});


router.get('/api/v1/countries', function(req, res) {
    var result = pool.query("select name from country order by name nulls first;",
            [],function (err, result) {
                return res.json(result.rows);
    });
});

router.get('/api/v1/locations', function(req, res) {
    var result = pool.query("select l.id as id, l.name as locname,c.name as cname  from location l join country c on country_id=c.id order by l.name nulls first;",
            [],function (err, result) {
                if (err){
                    return console.error ('query locations error'+err.message,err.stack)
                }
                return res.json(result.rows);
    });
});


router.get('/api/v1/location/:location_id', function(req, res) {
    var id = req.params.location_id;
    console.log('Location id:'+id);
//    var result = pool.query("select l.name as locname,c.name as cname from location as l where us.id=($1) ",
    var result = pool.query("select l.name as locname,c.name as cname, l.parent_id,p.name as pname,l.latitude,l.longitude,l.mapzoom from location as l "+
        "join country as c on c.id=l.country_id "+
        "left join location as p on p.id=l.parent_id "+
        "where l.id=($1)",
        [id],function (err, result) {
            if (err) {
                return console.error('query error', err.message, err.stack)
            }
            return res.json(result.rows);
    });
});




router.get('/api/v1/parents', function(req, res) {
    var result = pool.query("select l.name as locname,c.name as cname  from location l join country c on country_id=c.id  where l.parent_id is null order by l.name nulls first;",
            [],function (err, result) {
            if (err) {
                return console.error('query error', err.message, err.stack)
            }
            return res.json(result.rows);
    });
});

router.get('/api/v1/taxon', function(req, res) {
    var result = pool.query("select tax.id,tax.commonname,tax.position,tax.detailedbreedingrange,tax.nonbreadingrange,tax.note from taxon as tax order by tax.position nulls first;",
            [],function (err, result) {
            if (err) {
                return console.error('query error', err.message, err.stack)
            }
            return res.json(result.rows);
    });
});



router.get('/api/v1/sitevisit/:sitevisit_id', function(req, res) {
    var id = req.params.sitevisit_id;

    var queryStr = "select s.date,l.name locname,t.commonname speciesname,o.heardonly heardonly, "+
        "t.breedingrange brange,t.detailedbreedingrange dbr, t.nonbreadingrange nbr, t.note note from sitevisit s "+
        "left outer join observation o on s.id=o.sitevisit_id "+
        "left outer join taxon t on t.id=o.taxon_id "+
        "join location l on l.id=s.location_id "+
        "where s.id =($1) "+
        "order by t.position nulls first";
    var result = pool.query(queryStr,
        [id],function (err, result) {
            if (err) {
                return console.error('query error', err.message, err.stack)
            }
            return res.json(result.rows);
    });
});


router.delete('/api/v1/sitevisit/:sitevisit_id', function(req, res) {
    var id = req.params.sitevisit_id;
    console.log("SiteVisit id ="+id);

    var queryStr = "delete from sitevisit "+
        "where id =($1) ";
    var result = pool.query(queryStr,
        [id],function (err, result) {
            if (err) {
                return console.error('query error', err.message, err.stack)
            }
            return res.json(result.rows);
    });
});



router.get('/api/v1/sitevisit', function(req, res) {
    var queryStr = "select sitevisit.id,date_trunc('day',sitevisit.date) date,sitevisit.location_id, location.name from sitevisit "+
        "left  join location on sitevisit.location_id=location.id "+
        "where location.name like '%' "+
        "order by 2 desc nulls last "+
        "limit 200 offset 0 ";
    var query = pool.query(queryStr,
        [],function (err, result) {
            return res.json(result.rows);
    });
});

router.get('/api/v1/user/:user_id', function(req, res) {
    var id = req.params.user_id;
    console.log('User id:'+id);
    var result = pool.query("select us.id,us.email,us.fullname,us.isadmin,us.password,us.defaultchecklistname_id from userdetail as us where us.id=($1) order by us.email nulls first",
        [id],function (err, result) {
            return res.json(result.rows);
    });
});

router.delete('/api/v1/observation/:observation_id', function(req, res) {
    var id = req.params.observation_id;
    console.log('Observation id:'+id);
    var result = pool.query('delete from observation where id=$1',
        [id],function (err, result) {
            return res.json(result.rows);
    });
});

router.get('/api/v1/observation/:observation_id', function(req, res) {
    var id = req.params.observation_id;
    console.log('Observation id:'+id);
    var result = pool.query("select date_trunc('day',o.date) date ,o.notes,l.name,t.commonname,o.heardonly "+
                            "from observation o "+
                            "join location l on l.id=o.location_id "+
                            "join taxon t on t.id=o.taxon_id "+
                            "join userdetail u on u.id=o.user_id "+
                            "where o.id=$1",
        [id],function (err, result) {
            return res.json(result.rows);
    });
});

router.put('/api/v1/observation/:observation_id', function(req, res) {
    console.log("in put");
    var id = req.params.observation_id;
    console.log(req.body);
    var date = req.body.date;
    var notes = req.body.notes;
    var name = req.body.name;
    var commonname = req.body.commonname;
    var heardonly = req.body.heardonly;
    console.log("id:"+id);
    console.log("date:"+date);
    console.log("notes="+notes);
    console.log("name="+name);
    console.log("commonname="+commonname);
    console.log("heardonly="+heardonly);

    var result = pool.query("UPDATE observation "+
        "SET date=($1), "+
//        "notes=($2), "+
        "location_id=(select id from location where name =$2), "+
        "taxon_id=(select id from taxon where commonname= $3), "+
        "heardonly=($4) WHERE id=($5)",
             [date, /*notes,*/name,commonname,heardonly,id],function (err, result) {
             if (err) {
                return console.error('query error', err.message, err.stack)
            }
        return res.json(result.rows);
    });
});




module.exports = router;