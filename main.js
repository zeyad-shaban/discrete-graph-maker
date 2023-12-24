import { displayInfo } from './js/graphType.js';
import { createLoop, createEdge, createPoint } from './js/points.js';
import { checkBipartite, getBipartiteGroups } from './js/checkBipartite.js';
import { adjList, adjMatrix } from './js/represent.js';

const board = document.querySelector("#board");
const bipartiteForm = document.querySelector('#bipartiteForm');
const representGraphBtn = document.querySelector('#representGraphBtn');
const group1Inp = document.querySelector('#group1');
const group2Inp = document.querySelector('#group2');

board.onclick = e => {
    e.preventDefault();
    let point = createPoint(e.offsetX, e.offsetY);
    board.appendChild(point);

    displayInfo();

    point.onclick = e => {
        e.stopPropagation();
        createEdge(point.getAttribute("id"));

        displayInfo();
    };

    point.oncontextmenu = e => {
        e.stopPropagation();
        e.preventDefault();
        createLoop(point.getAttribute("id"));

        displayInfo();
    };
};

board.oncontextmenu = e => e.preventDefault();



bipartiteForm.onsubmit = e => {
    e.preventDefault();
    if (group1Inp.value && group2Inp.value) {
        checkBipartite(group1Inp.value, group2Inp.value);
    } else {
        let [group1, group2] = getBipartiteGroups();
        group1Inp.value = group1;
        group2Inp.value = group2;
    }
};

representGraphBtn.onclick = e => {
    e.preventDefault();

    adjMatrix();
    adjList();
};