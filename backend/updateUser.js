require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function updateUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    
    const result = await User.findOneAndUpdate(
      { email: 'kavin200212@gmail.com' },
      { name: 'Kavinilavn' },
      { new: true }
    );
    
    console.log('User updated:', result);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateUser();
