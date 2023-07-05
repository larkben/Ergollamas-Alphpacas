extends Node

var terrainSize = 100
var terrainResolution = 256
var terrainScale = 10.0
var terrainHeight = 10.0

func _ready():
	generateTerrain()

func generateTerrain():
	var noise = FastNoiseLite.new()
	noise.seed = randi()

	var surfaceTool = SurfaceTool.new()
	surfaceTool.begin(Mesh.PRIMITIVE_TRIANGLES)
	generateTerrainVertices(surfaceTool, noise)
	generateTerrainIndices(surfaceTool)
	var terrainMesh = surfaceTool.commit()
	
	var terrainInstance = MeshInstance3D.new()
	terrainInstance.mesh = terrainMesh
	
	var staticBody = StaticBody3D.new()
	var collisionShape = CollisionShape3D.new()
	collisionShape.shape = terrainMesh.create_trimesh_shape()
	
	staticBody.add_child(terrainInstance)
	staticBody.add_child(collisionShape)
	
	add_child(staticBody)

func generateTerrainVertices(surfaceTool, noise):
	for x in range(terrainResolution):
		for z in range(terrainResolution):
			var height = noise.get_noise_2d(x / terrainScale, z / terrainScale) * terrainHeight
			surfaceTool.add_vertex(Vector3(x, height, z))

func generateTerrainIndices(surfaceTool):
	for x in range(terrainResolution - 1):
		for z in range(terrainResolution - 1):
			var topLeft = z + x * terrainResolution
			var topRight = z + (x + 1) * terrainResolution
			var bottomLeft = (z + 1) + x * terrainResolution
			var bottomRight = (z + 1) + (x + 1) * terrainResolution
			
			surfaceTool.add_index(topLeft)
			surfaceTool.add_index(topRight)
			surfaceTool.add_index(bottomLeft)
			
			surfaceTool.add_index(topRight)
			surfaceTool.add_index(bottomRight)
			surfaceTool.add_index(bottomLeft)
