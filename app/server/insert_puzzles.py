import pymongo
import json

PUZZLE_CONFIG = "puzzle-config.json"

client = pymongo.MongoClient('mongodb://127.0.0.1:27017/')
db = client.puzzles2021

puzzle_config = json.load(open(PUZZLE_CONFIG,'r'))
db.puzzles.insert_many(puzzle_config['puzzles'])

