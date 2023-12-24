import { getEdgeBetPoints, getLoopsForPoint, getEdgesAtPoint } from "./utils.js";

export function adjMatrix() {
    let matrix = [];
    let points = document.querySelectorAll('.point');

    for (let i = 0; i < points.length; i++) {
        matrix[i] = [];
        for (let j = 0; j < points.length; j++) {
            matrix[i][j] = getEdgeBetPoints(i, j).length + (i == j && getLoopsForPoint(i).length);
        }
    }
    console.log("matrix: ");
    console.log(matrix);
}

export function adjList() {
    let connectedPoints = [];
    let points = document.querySelectorAll('.point');

    for (let i = 0; i < points.length; i++) {
        connectedPoints[i] = [];
        let edges = getEdgesAtPoint(i);

        edges.forEach(edge => {
            connectedPoints[i].push(edge.id.replace('edge', '').replace(i, '').replace('_', ''));
        });
    }

    console.log("Adjacency list: ", connectedPoints);
}
