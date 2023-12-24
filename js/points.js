import { getEdgeBetPoints } from "./utils.js";

let labelIndex = 0;
let point1ID = null;

export function createPoint(x, y) {
    let point = document.createElement('div');

    point.style.left = `${x}px`;
    point.style.top = `${y}px`;

    point.innerText = labelIndex++;
    point.setAttribute("id", point.innerText);
    point.setAttribute("class", "point");
    return point;
}


export function createEdge(pointID) {
    let point1 = document.getElementById(point1ID || pointID);

    if (point1ID == pointID) {
        point1.classList.remove('selectedPoint');
        point1ID = null;
    }
    else if (point1ID) {
        let point2 = document.getElementById(pointID);
        point1.classList.remove('selectedPoint');
        point2.classList.remove('selectedPoint');

        let arc = 1 * getEdgeBetPoints(point1ID, pointID).length;
        let x1 = point1.offsetLeft + point1.offsetWidth / 2;
        let y1 = point1.offsetTop + point1.offsetHeight / 2;
        let x2 = point2.offsetLeft + point2.offsetWidth / 2;
        let y2 = point2.offsetTop + point2.offsetHeight / 2;

        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M ${x1} ${y1} ${x2} ${y2}`);
        path.setAttribute("stroke", "black");

        path.setAttribute("id", `edge${point1ID}_${pointID}`);
        path.setAttribute("class", "edge");
        document.querySelector("#svgBoard").appendChild(path);

        point1ID = null;
    } else {
        point1ID = pointID;
        point1.classList.add('selectedPoint');
    }
}

export function createLoop(pointID) {
    let point = document.getElementById(pointID);
    if (point.querySelector(".loop")) return;

    let loop = document.createElement('div');
    loop.setAttribute("class", "loop");
    loop.setAttribute('id', `loop${pointID}`)

    point.appendChild(loop);
}