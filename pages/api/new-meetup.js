import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://unns4321:unns4321@cluster0.oo4sf.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();
    
    //Database Name -> meetups
    //Collection -> Tables
    //Documents within Collection -> Entries or Records within Tables
    //Single Meetup -> Single Document
    //Overall collection would hold multiple collection which means multiple meetup documents.
    //Get hold of the collection by using db.collection() method.
    //This database will be created on the fly if not created.
    const meetupsCollection = db.collection('meetups');

    //insertOne() method is used to insert 1 new document into this collection.
    //A document is just an object in the end. (Javascript Object)
    const result = await meetupsCollection.insertOne(data);

    //result will contain the automatically generated ID of the object that was inserted into the collection.
    console.log(result);

    client.close();
    //201 - Inserted successfully status code can be added using status() method.
    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;