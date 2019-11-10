class Graph {
    count : number;

    Adj : Array<Array<Graph.Edge>>; /*private*/

    public constructor(cnt : number) {
        if(this.count===undefined) 
            this.count = 0;
        if(this.Adj===undefined) 
            this.Adj = null;
        this.count = cnt;
        this.Adj = <any>([]);
        for(let i : number = 0; i < cnt; i++) {
            this.Adj.push([]);
        };
    }

    public addDirectedEdge(source : number, dest : number, cost : number) {
        if (cost === undefined)
            cost = 1
        let edge : Graph.Edge = new Graph.Edge(dest, cost);
        this.Adj[source].push(edge);
    }

    public addUndirectedEdge(source : number, dest : number, cost : number) {
        this.addDirectedEdge(source, dest, cost);
        this.addDirectedEdge(dest, source, cost);
    }

    public print() {
        for(let i : number = 0; i < this.count; i++) {
            let ad : Array<Graph.Edge> = this.Adj[i];
            console.info("\n Vertex " + i + " is connected to : ");
            for(let index=0; index < ad.length; index++) {
                let adn = ad[index];
                console.info("(" + adn.dest + ", " + adn.cost + ") ");
            }
        };
    }

    public static dfsStack(gph : Graph, source : number, target : number) : boolean {
        let count : number = gph.count;
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(count);
        let stk : Array<number> = <any>([]);
        stk.push(source)>0;
        visited[source] = true;
        while(stk.length !== 0) {
            let curr : number = stk.pop();
            let adl : Array<Graph.Edge> = gph.Adj[curr];
            for(let index=0; index < adl.length; index++) {
                let adn = adl[index];
                if(visited[adn.dest] === false) {
                    visited[adn.dest] = true;
                    stk.push(adn.dest);
                }
            }
        };
        return visited[target];
    }

    public static dfs(gph : Graph, source : number, target : number) : boolean {
        let count : number = gph.count;
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(count);
        Graph.dfsUtil(gph, source, visited);
        return visited[target];
    }

    public static dfsUtil(gph : Graph, index : number, visited : boolean[]) {
        visited[index] = true;
        let adl : Array<Graph.Edge> = gph.Adj[index];
        for(let index=0; index < adl.length; index++) {
            let adn = adl[index];
            if(visited[adn.dest] === false) 
                Graph.dfsUtil(gph, adn.dest, visited);
        }
    }

    public static dfsUtil2(gph : Graph, index : number, visited : boolean[], stk : Array<number>) {
        visited[index] = true;
        let adl : Array<Graph.Edge> = gph.Adj[index];
        for(let index=0; index < adl.length; index++) {
            let adn = adl[index];
            if(visited[adn.dest] === false) {
                Graph.dfsUtil2(gph, adn.dest, visited, stk);
            }
        }
        stk.push(index);
    }

    public static bfs(gph : Graph, source : number, target : number) : boolean {
        let count : number = gph.count;
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(count);
        let que : Array<number> = <any>([]);
        que.push(source);
        visited[source] = true;
        while(que.length !== 0) {
            let curr = que.remove();
            let adl : Array<Graph.Edge> = gph.Adj[curr];
            for(let index=0; index < adl.length; index++) {
                let adn = adl[index];       
                if(visited[adn.dest] === false) {
                    visited[adn.dest] = true;
                    que.push(adn.dest);
                }
            }
        };
        return visited[target];
    }

    public static main$() {
        let gph : Graph = new Graph(5);
        gph.addDirectedEdge(0, 1, 3);
        gph.addDirectedEdge(0, 4, 2);
        gph.addDirectedEdge(1, 2, 1);
        gph.addDirectedEdge(2, 3, 1);
        gph.addDirectedEdge(4, 1, -2);
        gph.addDirectedEdge(4, 3, 1);
        gph.print();
        console.info(Graph.dfs(gph, 0, 2));
        console.info(Graph.bfs(gph, 0, 2));
        console.info(Graph.dfsStack(gph, 0, 2));
    }

    public static topologicalSort(gph : Graph) {
        let stk : Array<number> = <any>([]);
        let count : number = gph.count;
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(count);
        for(let i : number = 0; i < count; i++) {
            if(visited[i] === false) {
                Graph.dfsUtil2(gph, i, visited, stk);
            }
        };
        console.info("topologicalSort :: ");
        while(stk.length !== 0) {
            console.info(" " + stk.pop());
        };
    }

    public static main5() {
        let gph : Graph = new Graph(6);
        gph.addDirectedEdge(5, 2, 1);
        gph.addDirectedEdge(5, 0, 1);
        gph.addDirectedEdge(4, 0, 1);
        gph.addDirectedEdge(4, 1, 1);
        gph.addDirectedEdge(2, 3, 1);
        gph.addDirectedEdge(3, 1, 1);
        gph.print();
        Graph.topologicalSort(gph);
    }

    public static pathExist(gph : Graph, source : number, dest : number) : boolean {
        let count : number = gph.count;
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(count);
        Graph.dfsUtil(gph, source, visited);
        return visited[dest];
    }

    public static countAllPathDFS(gph : Graph, visited : boolean[], source : number, dest : number) : number {
        if(source === dest) {
            return 1;
        }
        let count : number = 0;
        visited[source] = true;
        let adl : Array<Graph.Edge> = gph.Adj[source];
        for(let index=0; index < adl.length; index++) {
            let adn = adl[index];
            if(visited[adn.dest] === false) {
                count += Graph.countAllPathDFS(gph, visited, adn.dest, dest);
            }
            visited[source] = false;
        }
        return count;
    }

    public static countAllPath(gph : Graph, src : number, dest : number) : number {
        let count : number = gph.count;
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(count);
        return Graph.countAllPathDFS(gph, visited, src, dest);
    }

    public static printAllPathDFS(gph : Graph, visited : boolean[], source : number, dest : number, path : Array<number>) {
        path.push(source);
        if(source === dest) {
            console.info(path);
            path.pop();
            return;
        }
        visited[source] = true;
        let adl : Array<Graph.Edge> = gph.Adj[source];
        for(let index=0; index < adl.length; index++) {
            let adn = adl[index];
            if(visited[adn.dest] === false) {
                Graph.printAllPathDFS(gph, visited, adn.dest, dest, path);
            }
        }
        visited[source] = false;
        path.pop();
    }

    public static printAllPath(gph : Graph, src : number, dest : number) {
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(gph.count);
        let path : Array<number> = <any>([]);
        Graph.printAllPathDFS(gph, visited, src, dest, path);
    }

    public static main11() {
        let gph : Graph = new Graph(5);
        gph.addDirectedEdge(0, 1, 1);
        gph.addDirectedEdge(0, 2, 1);
        gph.addDirectedEdge(2, 3, 1);
        gph.addDirectedEdge(1, 3, 1);
        gph.addDirectedEdge(3, 4, 1);
        gph.addDirectedEdge(1, 4, 1);
        gph.print();
        console.info("PathExist :: " + Graph.pathExist(gph, 0, 4));
        console.info();
        console.info(Graph.countAllPath(gph, 0, 4));
        Graph.printAllPath(gph, 0, 4);
    }

    public static rootVertex(gph : Graph) : number {
        let count : number = gph.count;
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(count);
        let retVal : number = -1;
        for(let i : number = 0; i < count; i++) {
            if(visited[i] === false) {
                Graph.dfsUtil(gph, i, visited);
                retVal = i;
            }
        };
        console.info("Root vertex is :: " + retVal);
        return retVal;
    }

    public static main4() {
        let gph : Graph = new Graph(7);
        gph.addDirectedEdge(0, 1, 1);
        gph.addDirectedEdge(0, 2, 1);
        gph.addDirectedEdge(1, 3, 1);
        gph.addDirectedEdge(4, 1, 1);
        gph.addDirectedEdge(6, 4, 1);
        gph.addDirectedEdge(5, 6, 1);
        gph.addDirectedEdge(5, 2, 1);
        gph.addDirectedEdge(6, 0, 1);
        gph.print();
        Graph.rootVertex(gph);
    }

    public static transitiveClosureUtil(gph : Graph, source : number, dest : number, tc : number[][]) {
        tc[source][dest] = 1;
        let adl : Array<Graph.Edge> = gph.Adj[dest];
        for(let index=0; index < adl.length; index++) {
            let adn = adl[index];
            if(tc[source][adn.dest] === 0) 
                Graph.transitiveClosureUtil(gph, source, adn.dest, tc);           
        }
    }

    public static transitiveClosure(gph : Graph) : number[][] {
        let count : number = gph.count;
        let tc : number[][] = <any> (function(dims) { let allocate = function(dims) { if(dims.length==0) { return 0; } else { let array = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([count, count]);
        for(let i : number = 0; i < count; i++) {
            Graph.transitiveClosureUtil(gph, i, i, tc);
        };
        return tc;
    }

    public static main10() {
        let gph : Graph = new Graph(4);
        gph.addDirectedEdge(0, 1, 1);
        gph.addDirectedEdge(0, 2, 1);
        gph.addDirectedEdge(1, 2, 1);
        gph.addDirectedEdge(2, 0, 1);
        gph.addDirectedEdge(2, 3, 1);
        gph.addDirectedEdge(3, 3, 1);
        let tc : number[][] = Graph.transitiveClosure(gph);
        for(let i : number = 0; i < 4; i++) {
            for(let j : number = 0; j < 4; j++) {
                console.info(tc[i][j] + " ");
            };
            console.info();
        };
    }

    public static bfsLevelNode(gph : Graph, source : number) {
        let count : number = gph.count;
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(count);
        let level : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(count);
        visited[source] = true;
        let que : Array<number> = <any>([]);
        que.push(source);
        level[source] = 0;
        console.info("\nNode  - Level");
        while(que.length !== 0) {
            let curr = que.remove();
            let depth : number = level[curr];
            let adl : Array<Graph.Edge> = gph.Adj[curr];
            console.info(curr + " - " + depth);
            for(let index=0; index < adl.length; index++) {
                let adn = adl[index];
                
                if(visited[adn.dest] === false) {
                    visited[adn.dest] = true;
                    que.push(adn.dest);
                    level[adn.dest] = depth + 1;
                }
            
            }
        };
    }

    public static bfsDistance(gph : Graph, source : number, dest : number) : number {
        let count : number = gph.count;
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(count);
        let que : Array<number> = <any>([]);
        que.push(source);
        visited[source] = true;
        let level : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(count);
        level[source] = 0;
        while(que.length !== 0) {
            let curr = que.remove();
            let depth : number = level[curr];
            let adl : Array<Graph.Edge> = gph.Adj[curr];
            for(let index=0; index < adl.length; index++) {
                let adn = adl[index];
                if(adn.dest === dest) {
                    return depth + 1;
                }
                if(visited[adn.dest] === false) {
                    visited[adn.dest] = true;
                    que.push(adn.dest);
                    level[adn.dest] = depth + 1;
                }
            }
        };
        return -1;
    }

    public static main1() {
        let gph : Graph = new Graph(7);
        gph.addUndirectedEdge(0, 1, 1);
        gph.addUndirectedEdge(0, 2, 1);
        gph.addUndirectedEdge(0, 4, 1);
        gph.addUndirectedEdge(1, 2, 1);
        gph.addUndirectedEdge(2, 5, 1);
        gph.addUndirectedEdge(3, 4, 1);
        gph.addUndirectedEdge(4, 5, 1);
        gph.addUndirectedEdge(4, 6, 1);
        gph.print();
        Graph.bfsLevelNode(gph, 1);
        console.info(Graph.bfsDistance(gph, 1, 6));
    }

    public static isCyclePresentUndirectedDFS(graph : Graph, index : number, parentIndex : number, visited : boolean[]) : boolean {
        visited[index] = true;
        let dest : number;
        let adl : Array<Graph.Edge> = graph.Adj[index];
        for(let index=0; index < adl.length; index++) {
            let adn = adl[index];
            dest = adn.dest;
            if(visited[dest] === false) {
                if(Graph.isCyclePresentUndirectedDFS(graph, dest, index, visited)) return true;
            } else if(parentIndex !== dest) return true;
        }
        return false;
    }

    public static isCyclePresentUndirected(graph : Graph) : boolean {
        let count : number = graph.count;
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(count);
        for(let i : number = 0; i < count; i++) 
        {
            if(visited[i] === false) 
                if(Graph.isCyclePresentUndirectedDFS(graph, i, -1, visited)) 
                    return true;;
        }
        return false;
    }

    public static main14() {
        let gph : Graph = new Graph(6);
        gph.addUndirectedEdge(0, 1, 1);
        gph.addUndirectedEdge(1, 2, 1);
        gph.addUndirectedEdge(3, 4, 1);
        gph.addUndirectedEdge(4, 2, 1);
        gph.addUndirectedEdge(2, 5, 1);
        console.info(Graph.isCyclePresentUndirected(gph));
    }

    public static isCyclePresentDFS(graph : Graph, index : number, visited : boolean[], marked : number[]) : boolean {
        visited[index] = true;
        marked[index] = 1;
        let adl : Array<Graph.Edge> = graph.Adj[index];
        for(let index=0; index < adl.length; index++) {
            let adn = adl[index];
            let dest : number = adn.dest;
            if(marked[dest] === 1) return true;
            if(visited[dest] === false) 
                if(Graph.isCyclePresentDFS(graph, dest, visited, marked)) 
                    return true;
        
        }
        marked[index] = 0;
        return false;
    }

    public static isCyclePresent(graph : Graph) : boolean {
        let count : number = graph.count;
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(count);
        let marked : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(count);
        for(let index : number = 0; index < count; index++) {
            if(visited[index] === false) 
                if(Graph.isCyclePresentDFS(graph, index, visited, marked)) 
                    return true;
        };
        return false;
    }

    public static isCyclePresentDFSColor(graph : Graph, index : number, visited : number[]) : boolean {
        visited[index] = 1;
        let dest : number;
        let adl : Array<Graph.Edge> = graph.Adj[index];
        for(let index=0; index < adl.length; index++) {
            let adn = adl[index];
            dest = adn.dest;
            if(visited[dest] === 1) return true;
            if(visited[dest] === 0) 
                if(Graph.isCyclePresentDFSColor(graph, dest, visited)) 
                    return true;
        }
        visited[index] = 2;
        return false;
    }

    public static isCyclePresentColor(graph : Graph) : boolean {
        let count : number = graph.count;
        let visited : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(count);
        for(let i : number = 0; i < count; i++) {
            if(visited[i] === 0) 
                if(Graph.isCyclePresentDFSColor(graph, i, visited)) 
                    return true;
        };
        return false;
    }

    public static main13() {
        let gph : Graph = new Graph(5);
        gph.addDirectedEdge(0, 1, 1);
        gph.addDirectedEdge(0, 2, 1);
        gph.addDirectedEdge(2, 3, 1);
        gph.addDirectedEdge(1, 3, 1);
        gph.addDirectedEdge(3, 4, 1);
        gph.addDirectedEdge(4, 1, 1);
        console.info(Graph.isCyclePresentColor(gph));
    }

    public static transposeGraph(gph : Graph) : Graph {
        let count : number = gph.count;
        let g : Graph = new Graph(count);
        for(let i : number = 0; i < count; i++) {
            let adl : Array<Graph.Edge> = gph.Adj[i];
            for(let index=0; index < adl.length; index++) {
                let adn = adl[index];
                
                    let dest : number = adn.dest;
                    g.addDirectedEdge(dest, i, 1);
            }
        };
        return g;
    }

    public static isConnectedUndirected(gph : Graph) : boolean {
        let count : number = gph.count;
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(count);
        Graph.dfsUtil(gph, 0, visited);
        for(let i : number = 0; i < count; i++) {
            if(visited[i] === false) {
                return false;
            }
        };
        return true;
    }

    public static isStronglyConnected(gph : Graph) : boolean {
        let count : number = gph.count;
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(count);
        Graph.dfsUtil(gph, 0, visited);
        for(let i : number = 0; i < count; i++) {
            if(visited[i] === false) {
                return false;
            }
        };
        let gReversed : Graph = Graph.transposeGraph(gph);
        for(let i : number = 0; i < count; i++) {
            visited[i] = false;
        };
        Graph.dfsUtil(gReversed, 0, visited);
        for(let i : number = 0; i < count; i++) {
            if(visited[i] === false) {
                return false;
            }
        };
        return true;
    }

    public static main6() {
        let gph : Graph = new Graph(5);
        gph.addDirectedEdge(0, 1, 1);
        gph.addDirectedEdge(1, 2, 1);
        gph.addDirectedEdge(2, 3, 1);
        gph.addDirectedEdge(3, 0, 1);
        gph.addDirectedEdge(2, 4, 1);
        gph.addDirectedEdge(4, 2, 1);
        console.info(" IsStronglyConnected:: " + Graph.isStronglyConnected(gph));
    }

    public static stronglyConnectedComponent(gph : Graph) {
        let count : number = gph.count;
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(count);
        let stk : Array<number> = <any>([]);
        for(let i : number = 0; i < count; i++) {
            if(visited[i] === false) {
                Graph.dfsUtil2(gph, i, visited, stk);
            }
        };
        let gReversed : Graph = Graph.transposeGraph(gph);
        for(let i : number = 0; i < count; i++) {
            visited[i] = false;
        };
        let stk2 : Array<number> = <any>([]);
        while(stk.length !== 0) {
            let index : number = stk.pop();
            if(visited[index] === false) {
                stk2.length = 0;
                Graph.dfsUtil2(gReversed, index, visited, stk2);
                console.info(stk2);
            }
        };
    }

    public static main7() {
        let gph : Graph = new Graph(7);
        gph.addDirectedEdge(0, 1, 1);
        gph.addDirectedEdge(1, 2, 1);
        gph.addDirectedEdge(2, 0, 1);
        gph.addDirectedEdge(2, 3, 1);
        gph.addDirectedEdge(3, 4, 1);
        gph.addDirectedEdge(4, 5, 1);
        gph.addDirectedEdge(5, 3, 1);
        gph.addDirectedEdge(5, 6, 1);
        Graph.stronglyConnectedComponent(gph);
    }

    public static prims(gph : Graph) {
        let previous : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(gph.count);
        let dist : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(gph.count);
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(gph.count);
        let source : number = 1;
        for(let i : number = 0; i < gph.count; i++) {
            previous[i] = -1;
            dist[i] = 999999;
        };
        dist[source] = 0;
        previous[source] = -1;
        let comp : Graph.EdgeComparator = new Graph.EdgeComparator();
        let queue : PriorityQueue<Graph.Edge> = <any>(new PriorityQueue<Graph.Edge>(100, <any>(comp)));
        let node : Graph.Edge = new Graph.Edge(source, 0);
        queue.add(node);
        while(queue.isEmpty() === false) {
            node = queue.peek();
            queue.remove();
            visited[source] = true;
            source = node.dest;
            let adl : Array<Graph.Edge> = gph.Adj[source];
            for(let index=0; index < adl.length; index++) {
                let adn = adl[index];
                let dest : number = adn.dest;
                let alt : number = adn.cost;
                if(dist[dest] > alt && visited[dest] === false) {
                    dist[dest] = alt;
                    previous[dest] = source;
                    node = new Graph.Edge(dest, alt);
                    queue.add(node);
                }
            }
        };
        let count : number = gph.count;
        for(let i : number = 0; i < count; i++) {
            if(dist[i] === 2147483647) {
                console.info(" node id " + i + "  prev " + previous[i] + " distance : Unreachable");
            } else {
                console.info(" node id " + i + "  prev " + previous[i] + " distance : " + dist[i]);
            }
        };
    }

    public static main3() {
        let gph : Graph = new Graph(9);
        gph.addUndirectedEdge(0, 1, 4);
        gph.addUndirectedEdge(0, 7, 8);
        gph.addUndirectedEdge(1, 2, 8);
        gph.addUndirectedEdge(1, 7, 11);
        gph.addUndirectedEdge(2, 3, 7);
        gph.addUndirectedEdge(2, 8, 2);
        gph.addUndirectedEdge(2, 5, 4);
        gph.addUndirectedEdge(3, 4, 9);
        gph.addUndirectedEdge(3, 5, 14);
        gph.addUndirectedEdge(4, 5, 10);
        gph.addUndirectedEdge(5, 6, 2);
        gph.addUndirectedEdge(6, 7, 1);
        gph.addUndirectedEdge(6, 8, 6);
        gph.addUndirectedEdge(7, 8, 7);
        gph.print();
        console.info();
        Graph.prims(gph);
        console.info();
        Graph.dijkstra(gph, 0);
    }

    public static shortestPath(gph : Graph, source : number) {
        let curr : number;
        let count : number = gph.count;
        let distance : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(count);
        let path : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(count);
        for(let i : number = 0; i < count; i++) {
            distance[i] = -1;
        };
        let que : Array<number> = <any>([]);
        que.push(source);
        distance[source] = 0;
        while(que.length !== 0) {
            curr = que.remove();
            let adl : Array<Graph.Edge> = gph.Adj[curr];
            for(let index=0; index < adl.length; index++) {
                let adn = adl[index];
                if(distance[adn.dest] === -1) {
                    distance[adn.dest] = distance[curr] + 1;
                    path[adn.dest] = curr;
                    que.push(adn.dest);
                }
            }
        };
        for(let i : number = 0; i < count; i++) {
            console.info(path[i] + " to " + i + " weight " + distance[i]);
        };
    }

    public static main9() {
        let gph : Graph = new Graph(9);
        gph.addUndirectedEdge(0, 2, 1);
        gph.addUndirectedEdge(1, 2, 5);
        gph.addUndirectedEdge(1, 3, 7);
        gph.addUndirectedEdge(1, 4, 9);
        gph.addUndirectedEdge(3, 2, 2);
        gph.addUndirectedEdge(3, 5, 4);
        gph.addUndirectedEdge(4, 5, 6);
        gph.addUndirectedEdge(4, 6, 3);
        gph.addUndirectedEdge(5, 7, 1);
        gph.addUndirectedEdge(6, 7, 7);
        gph.addUndirectedEdge(7, 8, 17);
        Graph.bellmanFordshortestPath(gph, 1);
        console.info("isConnectedUndirected :: " + Graph.isConnectedUndirected(gph));
    }

    public static dijkstra(gph : Graph, source : number) {
        let previous : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(gph.count);
        let dist : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(gph.count);
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(gph.count);
        for(let i : number = 0; i < gph.count; i++) {
            previous[i] = -1;
            dist[i] = 999999;
        };
        dist[source] = 0;
        previous[source] = -1;
        let comp : Graph.EdgeComparator = new Graph.EdgeComparator();
        let queue : PriorityQueue<Graph.Edge> = <any>(new PriorityQueue<Graph.Edge>(100, <any>(comp)));
        let node : Graph.Edge = new Graph.Edge(source, 0);
        queue.add(node);
        while(queue.isEmpty() === false) {
            node = queue.peek();
            queue.remove();
            source = node.dest;
            visited[source] = true;
            let adl : Array<Graph.Edge> = gph.Adj[source];
            for(let index=0; index < adl.length; index++) {
                let adn = adl[index];       
                let dest : number = adn.dest;
                let alt : number = adn.cost + dist[source];
                if(dist[dest] > alt && visited[dest] === false) {
                    dist[dest] = alt;
                    previous[dest] = source;
                    node = new Graph.Edge(dest, alt);
                    queue.add(node);
                }
            }
        };
        let count : number = gph.count;
        for(let i : number = 0; i < count; i++) {
            if(dist[i] === 2147483647) {
                console.info(" \n node id " + i + "  prev " + previous[i] + " distance : Unreachable");
            } else {
                console.info(" node id " + i + "  prev " + previous[i] + " distance : " + dist[i]);
            }
        };
    }

    public static bellmanFordshortestPath(gph : Graph, source : number) {
        let count : number = gph.count;
        let distance : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(count);
        let path : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(count);
        for(let i : number = 0; i < count; i++) {
            distance[i] = 999999;
            path[i] = -1;
        };
        distance[source] = 0;
        for(let i : number = 0; i < count - 1; i++) {
            for(let j : number = 0; j < count; j++) {
                let adl : Array<Graph.Edge> = gph.Adj[j];
                for(let index=0; index < adl.length; index++) {
                    let adn = adl[index];
                    let newDistance : number = distance[j] + adn.cost;
                    if(distance[adn.dest] > newDistance) {
                        distance[adn.dest] = newDistance;
                        path[adn.dest] = j;
                    }
                }
            };
        };
        for(let i : number = 0; i < count; i++) {
            console.info(path[i] + " to " + i + " weight " + distance[i]);
        };
    }

    public static main2() {
        let gph : Graph = new Graph(5);
        gph.addDirectedEdge(0, 1, 3);
        gph.addDirectedEdge(0, 4, 2);
        gph.addDirectedEdge(1, 2, 1);
        gph.addDirectedEdge(2, 3, 1);
        gph.addDirectedEdge(4, 1, -2);
        gph.addDirectedEdge(4, 3, 1);
        gph.print();
        console.info();
        Graph.bellmanFordshortestPath(gph, 0);
    }

    public static heightTreeParentArr(arr : number[]) : number {
        let count : number = arr.length;
        let heightArr : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(count);
        let gph : Graph = new Graph(count);
        let source : number = 0;
        for(let i : number = 0; i < count; i++) {
            if(arr[i] !== -1) {
                gph.addDirectedEdge(arr[i], i, 1);
            } else {
                source = i;
            }
        };
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(count);
        visited[source] = true;
        let que : Array<number> = <any>([]);
        que.push(source);
        heightArr[source] = 0;
        let maxHight : number = 0;
        while(que.length !== 0) {
            let curr  = que.remove();
            let height : number = heightArr[curr];
            if(height > maxHight) {
                maxHight = height;
            }
            let adl : Array<Graph.Edge> = gph.Adj[curr];
            for(let index=0; index < adl.length; index++) {
                let adn = adl[index];
                if(visited[adn.dest] === false) {
                    visited[adn.dest] = true;
                    que.push(adn.dest);
                    heightArr[adn.dest] = height + 1;
                }
            }
        };
        return maxHight;
    }

    public static getHeight(arr : number[], height : number[], index : number) : number {
        if(arr[index] === -1) {
            return 0;
        } else {
            return Graph.getHeight(arr, height, arr[index]) + 1;
        }
    }

    public static heightTreeParentArr2(arr : number[]) : number {
        let count : number = arr.length;
        let height : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(count);
        let maxHeight : number = -1;
        for(let i : number = 0; i < count; i++) {
            height[i] = Graph.getHeight(arr, height, i);
            maxHeight = Math.max(maxHeight, height[i]);
        };
        return maxHeight;
    }

    public static main12() {
        let parentArray : number[] = [-1, 0, 1, 2, 3];
        console.info(Graph.heightTreeParentArr(parentArray));
        console.info(Graph.heightTreeParentArr2(parentArray));
    }

    public static bestFirstSearchPQ(gph : Graph, source : number, dest : number) : number {
        let previous : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(gph.count);
        let dist : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(gph.count);
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(gph.count);
        for(let i : number = 0; i < gph.count; i++) {
            previous[i] = -1;
            dist[i] = 999999;
        };
        let comp : Graph.EdgeComparator = new Graph.EdgeComparator();
        let pq : PriorityQueue<Graph.Edge> = <any>(new PriorityQueue<Graph.Edge>(100, <any>(comp)));
        dist[source] = 0;
        previous[source] = -1;
        let node : Graph.Edge = new Graph.Edge(source, 0);
        pq.add(node);
        while(pq.isEmpty() === false) {
            node = pq.peek();
            pq.remove();
            source = node.dest;
            if(source === dest) {
                return node.cost;
            }
            visited[source] = true;
            let adl : Array<Graph.Edge> = gph.Adj[source];
            for(let index=0; index < adl.length; index++) {
                let adn = adl[index];
                {
                    let curr : number = adn.dest;
                    let cost : number = adn.cost;
                    let alt : number = cost + dist[source];
                    if(dist[curr] > alt && visited[curr] === false) {
                        dist[curr] = alt;
                        previous[curr] = source;
                        node = new Graph.Edge(curr, alt);
                        pq.add(node);
                    }
                }
            }
        };
        return -1;
    }

    public static isConnected(graph : Graph) : boolean {
        let count : number = graph.count;
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(count);
        let adl : Array<Graph.Edge>;
        for(let i : number = 0; i < count; i++) {
            adl = graph.Adj[i];
            if((<number>adl.length) > 0) {
                Graph.dfsUtil(graph, i, visited);
                break;
            }
        };
        for(let i : number = 0; i < count; i++) {
            adl = graph.Adj[i];
            if((<number>adl.length) > 0) if(visited[i] === false) return false;
        };
        return true;
    }

    public static isEulerian(graph : Graph) : number {
        let count : number = graph.count;
        let odd : number;
        let inDegree : number[];
        let outDegree : number[];
        let adl : Array<Graph.Edge>;
        if(Graph.isConnected(graph) === false) {
            console.info("graph is not Eulerian");
            return 0;
        } else {
            odd = 0;
            inDegree = (s => { let a=[]; while(s-->0) a.push(0); return a; })(count);
            outDegree = (s => { let a=[]; while(s-->0) a.push(0); return a; })(count);
            for(let i : number = 0; i < count; i++) {
                adl = graph.Adj[i];
                for(let index=0; index < adl.length; index++) {
                    let adn = adl[index];
                    outDegree[i] += 1;
                    inDegree[adn.dest] += 1;
                }
            };
            for(let i : number = 0; i < count; i++) {
                if((inDegree[i] + outDegree[i]) % 2 !== 0) {
                    odd += 1;
                }
            };
        }
        if(odd === 0) {
            console.info("graph is Eulerian");
            return 2;
        } else if(odd === 2) {
            console.info("graph is Semi-Eulerian");
            return 1;
        } else {
            console.info("graph is not Eulerian");
            return 0;
        }
    }

    public static main15() {
        let gph : Graph = new Graph(5);
        gph.addDirectedEdge(1, 0, 1);
        gph.addDirectedEdge(0, 2, 1);
        gph.addDirectedEdge(2, 1, 1);
        gph.addDirectedEdge(0, 3, 1);
        gph.addDirectedEdge(3, 4, 1);
        console.info(Graph.isEulerian(gph));
    }

    public static isStronglyConnected2(graph : Graph) : boolean {
        let count : number = graph.count;
        let visited : boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(count);
        let gReversed : Graph;
        let index : number;
        let adl : Array<Graph.Edge>;
        for(index = 0; index < count; index++) {
            adl = graph.Adj[index];
            if((<number>adl.length) > 0) break;
        };
        Graph.dfsUtil(graph, index, visited);
        for(let i : number = 0; i < count; i++) {
            adl = graph.Adj[i];
            if(visited[i] === false && (<number>adl.length) > 0) return false;
        };
        gReversed = Graph.transposeGraph(graph);
        for(let i : number = 0; i < count; i++) {visited[i] = false;}
        Graph.dfsUtil(gReversed, index, visited);
        for(let i : number = 0; i < count; i++) {
            adl = graph.Adj[i];
            if(visited[i] === false && (<number>adl.length) > 0) return false;
        };
        return true;
    }

    public static isEulerianCycle(graph : Graph) : boolean {
        let count : number = graph.count;
        let inDegree : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(count);
        let outDegree : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(count);
        if(!Graph.isStronglyConnected2(graph)) return false;
        for(let i : number = 0; i < count; i++) {
            let adl : Array<Graph.Edge> = graph.Adj[i];
            for(let index=0; index < adl.length; index++) {
                let adn = adl[index];
                {
                    outDegree[i] += 1;
                    inDegree[adn.dest] += 1;
                }
            }
        };
        for(let i : number = 0; i < count; i++) {if(inDegree[i] !== outDegree[i]) return false;;}
        return true;
    }

    public static main16() {
        let gph : Graph = new Graph(5);
        gph.addDirectedEdge(0, 1, 1);
        gph.addDirectedEdge(1, 2, 1);
        gph.addDirectedEdge(2, 0, 1);
        gph.addDirectedEdge(0, 4, 1);
        gph.addDirectedEdge(4, 3, 1);
        gph.addDirectedEdge(3, 0, 1);
        console.info(Graph.isEulerianCycle(gph));
    }

    public static main$java_lang_String_A(args : string[]) {
        Graph.main();
        Graph.main10();
    }

    public static main(args? : any) : any {
        if(((args != null && args instanceof <any>Array && (args.length==0 || args[0] == null ||(typeof args[0] === 'string'))) || args === null)) {
            return <any>Graph.main$java_lang_String_A(args);
        } else if(args === undefined) {
            return <any>Graph.main$();
        } else throw new Error('invalid overload');
    }
}
Graph["__class"] = "Graph";


namespace Graph {

    export class Edge {
        dest : number;

        cost : number;

        public constructor(dst : number, cst : number) {
            if(this.dest===undefined) this.dest = 0;
            if(this.cost===undefined) this.cost = 0;
            this.dest = dst;
            this.cost = cst;
        }
    }
    Edge["__class"] = "Graph.Edge";


    export class EdgeComparator {
        public compare(x : Graph.Edge, y : Graph.Edge) : number {
            if(x.cost < y.cost) {
                return -1;
            }
            if(x.cost > y.cost) {
                return 1;
            }
            return 0;
        }

        constructor() {
        }
    }
    EdgeComparator["__class"] = "Graph.EdgeComparator";
    EdgeComparator["__interfaces"] = ["java.util.Comparator"];
}




Graph.main(null);
