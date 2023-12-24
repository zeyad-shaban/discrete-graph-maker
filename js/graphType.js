import { degOfPoint } from './utils.js';
const typeHeader = document.querySelector("#type");
const shapeHeader = document.querySelector('#shape');

function getType() {
    let type = "simple";

    let loops = document.querySelectorAll(".loop");
    let edges = [...document.querySelectorAll(".edge")];

    let multiEdges = 0;
    for (let i = 0; i < edges.length - 1; i++) {
        const edge1 = edges[i];
        const edge1ID = edge1.getAttribute("id").replace('edge', '').split('_');

        for (let j = i + 1; j < edges.length; j++) {
            const edge2 = edges[j];
            const edge2ID = edge2.getAttribute("id").replace('edge', '').split('_');

            if (edge1ID.sort().join() == edge2ID.sort().join()) {
                multiEdges++;
                edges.splice(j, 1);
                j--;
            }
        }
    }

    if (loops.length == 0 && multiEdges == 0) type = 'Simple';
    else if (loops.length == 0 && multiEdges > 0) type = 'Simple Multigraph';
    else if (loops.length > 0 && multiEdges > 0) type = 'Pseudograph';

    return type;
}

function getShape() {
    let shape = "Simple";

    let points = document.querySelectorAll(".point");
    let edges = document.querySelectorAll(".edge");
    ``;
    let isCycle = points.length == edges.length;
    let isWheel = true;
    let wheelCenter = null;
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        let deg = degOfPoint(point.getAttribute('id'));

        // Simple check
        isCycle = isCycle && deg == 2;

        // wheel check
        isWheel = isWheel && deg == 3;
        if (!isWheel && !wheelCenter && deg == points.length - 1) { wheelCenter = point.getAttribute("id"); isWheel = true; };
    }

    ``;
    if (isCycle) shape = "Simple Cycle";
    else if (isWheel && (wheelCenter || points.length == 4 && edges.length == 6)) shape = `Simple wheel, Center: ${wheelCenter}`;

    return shape;
}

export function displayInfo() {
    let type = getType();
    let shape = getShape();

    typeHeader.innerHTML = `Type: ${type}`;
    shapeHeader.innerHTML = `Shape: ${shape}`;
}
