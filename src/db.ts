import { connect } from 'mongoose';

connect(
  (process.env.MONGODB_URI as string).replace(
    '<password>',
    process.env.MONGODB_PASSWORD!
  ),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => console.log('Database connected')
);
