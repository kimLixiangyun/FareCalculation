//Dijkstra(迪杰斯特拉)算法是典型的单源最短路径算法，用于计算一个节点到其他所有节点的最短路径。主要特点是以起始点为中心向外层层扩展，直到扩展到终点为止。
Dijkstra = function () {
	var graph = {};
	function addEdge(source, target, weight) {
		if (!(source in graph)) graph[source] = {};
		if (!(target in graph)) graph[target] = {};
		if ("number" != typeof weight) weight = 1;
		graph[source][target] = weight, graph[target][source] = weight;
	}

	function addEdges(edges) {
		for (var i = 0; i < edges.length; ++i) {
			var edge = edges[i];
			addEdge(edge[0], edge[1], edge[2]);
		}
	}
	//计算最短路径
	function shortestPath(source, target) {
		if (!(source in graph) || !(target in graph)) return 1 / 0;
		var dist = {}, visited = {}, numVertex = 0;
		for (var v in graph) dist[v] = 1 / 0, numVertex++;
		dist[source] = 0;
		for (var i = 0; i < numVertex; ++i) {
			var minDist = 1 / 0, minV = void 0;
			for (var v in dist) {
				if (!(v in visited)) {
					if (minDist > dist[v]) {
						minDist = dist[v], minV = v;
					}
				} else;
			}
			if (void 0 === minV) break;
			if (minV === target) return minDist;
			visited[minV] = true;
			var edges = graph[minV];
			for (var v in edges) {
				if (!(v in visited)) {
					var newDist = minDist + edges[v];
					if (dist[v] > newDist) dist[v] = newDist;
				} else;
			}
		}
		return 1 / 0;
	}

	return {
		addEdge: addEdge,
		addEdges: addEdges,
		shortestPath: shortestPath
	}
}();
