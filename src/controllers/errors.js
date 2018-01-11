exports.client = (req, res) => {
  res.status(404).render('404', { style: 'false-action', layout: 'errors' });
};

exports.server = (err, req, res) => {
  res.status(500).render('500', { style: 'false-action', layout: 'errors' });
};
