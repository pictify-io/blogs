const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const blogStatus = require('./blog-status.json');
const { MongoClient } = require('mongodb');

dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri);


const blogDirectory = path.join(__dirname, 'blogs');

const blogsToPublish = blogStatus.filter(blog => blog.status === 'draft');

const randomString = (length) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}


const publishBlog = async () => {
  await client.connect();
  const db = client.db(dbName);
  const blogsCollection = db.collection('blogs');
  for (const blog of blogsToPublish) {
    const blogPath = path.join(blogDirectory, blog.file_name);
    const blogContent = fs.readFileSync(blogPath, 'utf8');
    const blogData = {
      _id: randomString(24),
      uid: randomString(12),
      actice: true,
      title: blog.title,
      content: blogContent,
      status: 'published',
      tags: blog.tags,
      heroImage: blog.hero_image,
      author: blog.author,
      createdAt: new Date(),
    };

    blog.status = 'published';

    try {
      await blogsCollection.insertOne(blogData);
      fs.writeFileSync(path.join(__dirname, 'blog-status.json'), JSON.stringify(blogStatus, null, 2));
      console.log(`Blog published: ${blog.title}`);
    } catch (err) {
      console.error(`Error publishing blog: ${blog.title}`);
      console.error(err);
    }
  }

}

const main = async () => {
  await publishBlog();
  client.close();
  process.exit(0);
}

main();
