http = require 'http'
pokemon = require 'D:\\git\\pokemon-battle'
server = http.createServer (req, res) ->
	#console.log req.method, req.url
	
	try
		key = req.url[1..]
		
		pokes = []
		for x in [1..2]
			p = []
			p['name'] = req.headers['p' + x + 'name']
			p['id'] = parseInt(req.headers['p' + x + 'id'], 10)
			
			temp = req.headers['p' + x + 'stats'].split(', ')
			p['stats'] = {}
			for i in temp
				v = i.split(': ')
				p['stats'][v[0]] = parseInt(v[1], 10)
			
			temp = req.headers['p' + x + 'types'].split(', ')
			p['types'] = []
			for i in temp
				p['types'].push(parseInt(i, 10))
		   
			temp = req.headers['p' + x + 'moves'].split(',')
			p['moves'] = []
			for i in temp
				p['moves'].push(parseInt(i, 10))
			
			pokes.push(p)
				
		contentType = 'application/json'
		fighter1 = req.headers['f1name']
		fighter2 = req.headers['f2name']
		f1id = req.headers['f1id']
		f2id = req.headers['f2id']
		#console.log(pokes[0])
		#console.log(pokes[1])
		value = pokemon.battle pokes[0], pokes[1], fighter1, f1id, fighter2, f2id
		code = 200
	catch error
		console.log(error)
		contentType = 'text/plain'
		value = error
		code = 404
 
	res.writeHead code,
		'Content-Type': contentType
		'Content-Length': value.length + 1
	res.write value + '\n'
	res.end()

server.listen 8000

#console.log pokemon.battle {name: 'bulbasaur', id: 1, types: [12, 4], stats: {hp: 45, attack: 49, defense: 49, spattack: 65, spdefense: 65, speed: 45}, moves: [14, 15]}, {name: 'bulbasaur', id: 1, types: [12, 4], stats: {hp: 45, attack: 49, defense: 49, spattack: 65, spdefense: 65, speed: 45}, moves: [14, 15]};
