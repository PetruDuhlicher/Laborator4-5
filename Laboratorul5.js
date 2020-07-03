
//Explorari BFS folosind MapReduce
// n = nod
// m = nod adiacent pentru n
// d = distanta

const fs = require('fs')
const lines = fs.readFileSync('./Wiki-Vote.txt')
.toString().split('\n').slice(4, -1)

const edges = lines.map(line => line.trim().split('\t').map(x => parseInt(x)))
const N = edges.flat().reduce((a, b) => a > b ? a : b) + 1

const adjacency = Array(N).fill(0).map(x => Array(N).fill(0))

//Algoritm 1 - construim matricea de adiacenta
for(const edge of edges) {
    const [y, x] = edge
    adjacency[y][x]++
    adjacency[x][y]++
}

//Algoritm 2 - gasirea a cea mai scurta cale pentru un nod dat
//pentru toate componentele sale conectate    

const bfsDistances = nodeID => 
    adjacency[nodeID].map((connectivity, adjacentNodeID) =>
        ({connectivity, nodeID: adjacentNodeID}))
        .filter(node => node.connectivity && node.nodeID != nodeID)
        .sort((a, b) => a.connectivity - b.connectivity)

console.log(bfsDistances(3)[0].nodeID)
