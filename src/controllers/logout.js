exports.get = (req, res) => {
  res.setHeader('Set-Cookie', ['logged_in=; Max-Age=0', 'token=;Max-Age=0']);
  res.redirect('/');
};
