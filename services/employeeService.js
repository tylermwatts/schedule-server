const dotenv = require('dotenv');
dotenv.config();
const mongo = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = process.env.DB_URI;
const assert = require('assert');

module.exports = {
  getAllEmployees(req, res) {
    mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
      assert.equal(null, err);
      const db = client.db('fcc-training');
      db.collection('employee')
        .find({})
        .toArray()
        .then(response => res.json(response))
        .catch(err => console.log(err));
    });
  },

  getEmployeeById(req, res) {
    mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
      assert.equal(null, err);
      const db = client.db('fcc-training');
      db.collection('employee')
        .findOne({ _id: new ObjectID(req.params.id) })
        .then(response => res.json(response));
    });
  },

  addEmployee(req, res) {
    const employee = {
      _id: new ObjectID(),
      name: req.body.name,
      schedule: req.body.schedule
    };
    mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
      assert.equal(null, err);
      const db = client.db('fcc-training');
      db.collection('employee')
        .insertOne(employee)
        .then(res.json({ employee }));
      client.close();
    });
  },

  editEmployee(req, res) {
    const name = req.body.name;
    const schedule = req.body.schedule;
    mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
      assert.equal(null, err);
      const db = client.db('fcc-training');
      db.collection('employee')
        .findOneAndUpdate(
          { _id: new ObjectID(req.params.id) },
          { $set: { name, schedule } },
          { returnOriginal: false }
        )
        .then(response => res.json(response));
      client.close();
    });
  },

  deleteEmployee(req, res) {
    const employeeId = new ObjectID(req.params.id);
    mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
      assert.equal(null, err);
      const db = client.db('fcc-training');
      db.collection('employee')
        .findOneAndDelete({ _id: employeeId })
        .then(foundEmployee => {
          res.json(foundEmployee);
        })
        .catch(err => console.log(err));
      client.close();
    });
  }
};
