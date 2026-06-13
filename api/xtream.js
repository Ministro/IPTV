export default async function handler(req, res) {
  const { servidor, usuario, senha, action } = req.query;

  let url = `${servidor}/player_api.php?username=${usuario}&password=${senha}`;

  if (action) {
    url += `&action=${action}`;
  }

  return res.status(200).json({
    url_gerada: url
  });
}
