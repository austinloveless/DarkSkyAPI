// Update with your config settings.
// adding comment to push to change branch name 

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/darksky'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};


