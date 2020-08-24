SET character_set_results = sjis;
SET character_set_client = sjis;

create table movie_info(
  movieId int(10) primary key auto_increment not null,
  movieName varchar(50) not null,
  director varchar(30) not null,
  `explain` varchar(400),
  `cast` varchar(100) not null,
  rating int(2) not null,
  runs char(5) not null,
  releaseDay date not null,
  isRelease int(1) not null,
  poster varchar(256) 
);


create table schedule(
  runId int(12) auto_increment not null primary key,
  cinemaId int(1) not null,
  movieId int(10) not null,
  runday date not null,
  screen int(2) not null,
  plas char(5) not null
);

create table user(
  email varchar(256) primary key not null,
  pass varchar(256) not null,
  gender int(1) not null,
  birth date not null,
  created_at date not null,
  `role` char(5) not null
);

insert into user values("admin","admin",0,"1999/12/07","2020/08/20","admin");


create table `admin`(
  `name` varchar(20) primary key not null,
  cinemaId int(1) not null
);

insert into `admin` values("admin",2);


create table cinema(
  cinemaId int(1) primary key not null,
  cinemaName varchar(5) not null
);

insert into cinema values(0,"東京");
insert into cinema values(1,"大阪");
insert into cinema values(2,"名古屋");