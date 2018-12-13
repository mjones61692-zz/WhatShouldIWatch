# What Should I Watch

This was a fun project I completed over the course of two days, where I built an MVP (minimum viable product) of a movie to-watch tracker. The emphasis of this project was on the functionality of the application and creating a lot of features, and not so much on the styling. The tech stack used was a React front-end, with an Express.js server and MongoDB database. Please follow this link to see the deployed version of the application (it is using the free-tier of Heroku, so please be patient as the server may need to "wake-up"): [What Should I Watch](http://whatshouldiwatch2018.herokuapp.com)

# Project Features

* Add movies to the list
    * API call to [The Open Movie Database](http://www.omdbapi.com/) grabs the information and updates state in React
* Displays movies in order of ranking
* Choose which ranking to sort movies by
* Click movie to display more information
* Clear movie list
* Create a username to save movie list (otherwise will only be saved in the session)
    * Uses bcrypt to hash the password when saving in MongoDB
    * Uses express-session to track of the user sessions
* Login to access movie list
