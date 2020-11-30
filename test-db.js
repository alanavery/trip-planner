let db = require('./models');

let submittedEmail = 'delayedaa@gmail.com';

let findOne = async username => {
  let user = await db.user.findOne({ where: { email: username } });
  console.log(user);
};

findOne(submittedEmail);