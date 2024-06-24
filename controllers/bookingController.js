const db = require('../config/db');

// Helper function to update AllocatedParts
const updateAllocatedParts = (cow_id) => {
  const query = `
    UPDATE COWS
    SET AllocatedParts = (SELECT COUNT(*) FROM bookings WHERE cow_id = ?)
    WHERE id = ?;
  `;
  db.query(query, [cow_id, cow_id], (err, result) => {
    if (err) throw err;
    console.log('AllocatedParts updated for cow_id:', cow_id);
  });
};

exports.createBooking = (req, res) => {
  const { customer_name, phone_number, cow_id, part_number, category, booker_name, address, amount } = req.body;
  const disableSafeUpdates = `SET SQL_SAFE_UPDATES = 0;`;
  const enableSafeUpdates = `SET SQL_SAFE_UPDATES = 1;`;
  const query = `
    INSERT INTO bookings (customer_name, phone_number, cow_id, part_number, date_of_booking, category, booker_name, address, amount)
    VALUES (?, ?, ?, ?, CURDATE(), ?, ?, ?, ?);
  `;

  db.query(disableSafeUpdates, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    db.query(query, [customer_name, phone_number, cow_id, part_number, category, booker_name, address, amount], (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
  const newBookingId = result.insertId;
      updateAllocatedParts(cow_id);

      db.query(enableSafeUpdates, (err, result) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
  //      res.status(201).send('Booking created.');
	   res.status(201).json({ message: 'Booking created.', bookingId: newBookingId });
      });
    });
  });
};

exports.deleteBooking = (req, res) => {
  const booking_id = req.params.id;
  const getCowIdQuery = `SELECT cow_id FROM bookings WHERE booking_id = ?`;
  db.query(getCowIdQuery, [booking_id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const cow_id = results[0].cow_id;
      const disableSafeUpdates = `SET SQL_SAFE_UPDATES = 0;`;
      const enableSafeUpdates = `SET SQL_SAFE_UPDATES = 1;`;
      const query = `DELETE FROM bookings WHERE booking_id = ?`;

      db.query(disableSafeUpdates, (err, result) => {
        if (err) {
          res.status(500).send(err);
          return;
        }

        db.query(query, [booking_id], (err, result) => {
          if (err) {
            res.status(500).send(err);
            return;
          }

          updateAllocatedParts(cow_id);

          db.query(enableSafeUpdates, (err, result) => {
            if (err) {
              res.status(500).send(err);
              return;
            }
            res.status(200).send('Booking deleted.');
          });
        });
      });
    }
  });
};

exports.updateBooking = (req, res) => {
  const booking_id = req.params.id;
  const { customer_name, phone_number, cow_id, part_number, date_of_booking, category, booker_name, address, amount } = req.body;
  const disableSafeUpdates = `SET SQL_SAFE_UPDATES = 0;`;
  const enableSafeUpdates = `SET SQL_SAFE_UPDATES = 1;`;
  const query = `
    UPDATE bookings
    SET customer_name = ?, phone_number = ?, cow_id = ?, part_number = ?, date_of_booking = ?, category = ?, booker_name = ?, address = ?, amount = ?
    WHERE booking_id = ?;
  `;

  db.query(disableSafeUpdates, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    db.query(query, [customer_name, phone_number, cow_id, part_number, date_of_booking, category, booker_name, address, amount, booking_id], (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      updateAllocatedParts(cow_id);

      db.query(enableSafeUpdates, (err, result) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.status(200).send('Booking updated.');
      });
    });
  });
};

exports.getAllBookings = (req, res) => {
  const query = `SELECT * FROM bookings`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getBookingById = (req, res) => {
  const booking_id = req.params.id;
  const query = `SELECT * FROM bookings WHERE booking_id = ?`;
  db.query(query, [booking_id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};
