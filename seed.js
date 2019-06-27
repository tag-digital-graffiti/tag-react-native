const db = require('./server/db/db')
const User = require('./server/db/models/users')
const Tag = require('./server/db/models/tags')
const {green, red} = require('chalk')

const seed = async () => {
  await db.sync({ force: true });

  // seed your database here!
  const userOne = await User.create({
    username: 'tagger',
    password: '1234'
  })

  const tagOne = await Tag.create({
    imageUrl: '75 Wall St',
    location: [-74.01394, 40.705137]
  });


  console.log(green('Seeding success!'));
  db.close();
};

seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'));
  console.error(err);
  db.close();
});