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
  plas char(5) not null,
  seats int(4) default 0
);

create table seat(
  runId int(12) not null,
  seat char(3) not null,
  email varchar(256) not null,
  kind int(1) not null,
  `when` datetime not null,
  primary key(runId,seat)
);

create table kind(
  kind int(1) not null,
  `name` varchar(20) not null,
  `value` int(4) not null
);

insert into kind values(0,"大人",2000);
insert into kind values(1,"小・中学生",1500);
insert into kind values(2,"高齢者",1200);

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