const express = require("express")
const db = require("../config/mysql")()
const debug = require("debug")("app:api")
const Schedule = require("../models/Schedule")
const { json } = require("body-parser")

const apiRouter = express.Router()

module.exports = () => {

  apiRouter.route("/delMovie/:movieId").post((req, res) => {
    if (!req.isAuthenticated || !req.user.role === "admin") {
      res.send("permission denined.")
    }
    const id = req.param("movieId")
    debug(id)
    const sql = "DELETE FROM movie_info WHERE movieId = ?;"
    db.query(sql, [id], (err, result) => {
      debug(result)
      if (err) {
        return res.status("504").json()
        throw err
      }
      res.json(result)
    })
  })

  apiRouter.route("/getSchedule/:date").get((req, res) => {
    const date = req.param("date")
    debug(date)
    const cinemaId = req.query.cinemaId
    const sql = "SELECT * FROM schedule INNER JOIN movie_info on schedule.movieId = movie_info.movieId WHERE runday = ? AND cinemaId = ? ORDER BY plas;"
    db.query(sql, [date, cinemaId], (err, result) => {
      if (err) {
        throw err
      }
      const resData = new Schedule(result)
      res.json(resData.schedule)
    })
  })

  apiRouter.route("/delSchedule/:runId").post((req, res) => {
    if (!req.isAuthenticated || !req.user.role === "admin") {
      res.send("permission denined.")
    }
    const id = req.param("runId")
    debug(id)
    const sql = "DELETE FROM schedule WHERE runId = ?"
    db.query(sql, [id], (err, result) => {
      if (err) {
        res.redirect("/admin/")
        throw err
      }
      res.json(result[0])
    })
  })

  apiRouter.route("/getCalendar").get((req, res) => {
    const year = req.query.year
    const month = req.query.month
    const min = `${year}-${month}-1`
    const max = `${year}-${month}-31`
    const sql = "SELECT runDay FROM schedule WHERE runday >= ? AND runday <= ? GROUP BY runDay;"
    db.query(sql, [min, max], (err, result) => {
      if (err) {
        res.status(504), json()
        throw err
      }
      let resData = []
      for (let i = 0; i < result.length; i++) {
        const format = new Date(result[i].runDay).toLocaleDateString()
        resData = [...resData, format.replace(/-/g, '/')]
      }
      debug(resData)
      res.json(resData)
    })
  })

  return apiRouter
}