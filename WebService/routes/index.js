/*
 * Author: Brandon Radosevich
 * Date: January 4, 2016
 * file: index.js
 * Description: Index Page for serving different node js functions for API Calls
 */
module.exports = function(app){
    require('./main')(app);
    require('./test')(app);
    require('./temp')(app);
};
