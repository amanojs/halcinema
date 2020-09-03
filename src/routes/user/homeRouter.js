const express = require("express")
const debug = require("debug")("app:homeRoutes")
const db = require("../../config/mysql")()

const getMovies = require("../../middleware/getMovies")
const isCinema = require("../../middleware/isCinema")
const homeRouter = express.Router()

module.exports = () => {

  homeRouter.route("/today_schedule").all((req, res, next) => {
    if (req.query.cinemaId) {
      const sql = "SELECT cinemaName FROM cinema WHERE cinemaId = ?;"
      db.query(sql, [req.query.cinemaId], (err, result) => {
        if (err) {
          res.redirect("/")
          throw err
        }
        if (!result.length) return res.redirect("/")
        req.session.cinemaId = req.query.cinemaId
        req.session.cinemaName = result[0].cinemaName
        next()
      })
    } else {
      next()
    }
  })
    .get(isCinema, (req, res) => {
      res.render("user/home/today_schedule", { cinemaName: req.session.cinemaName, cinemaId: req.session.cinemaId })
    })

  homeRouter.route("/release_list").get((req, res) => {
    const sql = "SELECT * FROM movie_info;"
    db.query(sql, (err, result) => {
      if (err) {
        throw err
      }
      debug(result)
      res.render("user/home/release_list", { movieList: result })
    })
  })

  homeRouter.route("/production_list").get(getMovies, (req, res) => {
    res.render("user/home/production_list", { movieList: req.movies })
  })

  return homeRouter
}


const movieList = [
  {
    movieId: 1,
    movieName: 'キセキ',
    director: '桒畑天',
    explain: 'いい映画',
    cast: '俺',
    rating: 12,
    runs: '140',
    releaseDay: '2020 - 08 - 17T15: 00: 00.000Z',
    isRelease: 1,
    poster: '/uploaded/posters/キセキ.jpg'
  },
  {
    movieId: 2,
    movieName: 'キセキ',
    director: '桒畑天',
    explain: 'いい映画',
    cast: '俺',
    rating: 12,
    runs: '140',
    releaseDay: '2020 - 08 - 17T15: 00: 00.000Z',
    isRelease: 1,
    poster: '/uploaded/posters/キセキ.jpg'
  }
]