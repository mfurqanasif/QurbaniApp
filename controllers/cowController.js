const db = require('../config/db');

// Get all cows
exports.getAllCows = (req, res) => {
  const query = 'SELECT * FROM COWS';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
};

exports.getCowCategories = (req, res) => {
  const query = 'SELECT DISTINCT(CATEGORY) FROM COWS';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
};


// Get a single cow by ID
exports.getCowById = (req, res) => {
  const query = 'SELECT * FROM COWS WHERE ID = ?';
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send('Cow not found');
    }
    res.status(200).json(result[0]);
  });
};

/*
exports.getCowCategories = (req, res) => {
  const query = 'SELECT DISTINCT(CATEGORY) FROM COWS';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send('Cow not found');
    }
    res.status(200).json(result);
  });
};
*/
exports.getCowByCategory = (req, res) => {
  const query = 'SELECT * FROM COWS WHERE CATEGORY = ?';
  db.query(query, [req.params.category], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send('Cow not found');
    }
    res.status(200).json(result);
  });
};

// Create a new cow
exports.createCow = (req, res) => {
  const { TotalParts,Category,HissaPrice } = req.body;
  const query = 'INSERT INTO COWS (TotalParts,AllocatedParts,Category,HissaPrice) VALUES (?,?,?,?)';
  db.query(query, [7,0,Category,HissaPrice], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ id: result.insertId, TotalParts, AllocatedParts: 0 });
  });
};

// Update a cow by ID
exports.updateCow = (req, res) => {
  const { TotalParts,AllocatedParts } = req.body;
  const query = 'UPDATE COWS SET TotalParts = ?, AllocatedParts = ? WHERE ID = ?';
  db.query(query, [TotalParts,AllocatedParts, req.params.id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Cow not found');
    }
    res.status(200).send('Cow updated successfully');
  });
};

// Delete a cow by ID
exports.deleteCow = (req, res) => {
  const query = 'DELETE FROM COWS WHERE ID = ?';
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Cow not found');
    }
    res.status(200).send('Cow deleted successfully');
  });
};
