import { alertErr, getEdgeBetPoints, getEdgesAtPoint, getOtherConnectedPoint } from './utils.js';

export function checkBipartite(group1, group2) {
    group1 = group1.split(' ');
    group2 = group2.split(' ');

    let isComplete = true, isBipartite = true;

    for (let i = 0; i < group1.length; i++) {
        const point1 = group1[i];
        if (!document.getElementById(point1)) { isComplete = isBipartite = false; return alertErr('Point does not exist'); }
        for (let j = i + 1; j < group1.length; j++) {
            const point2 = group1[j];
            if (!document.getElementById(point2)) { isComplete = isBipartite = false; return alertErr('Point does not exist'); }

            if (getEdgeBetPoints(point1, point2).length > 0) {
                isBipartite = false;
                isComplete = false;
                break;
            }
        }
        if (!isBipartite) break;

        for (let j = 0; j < group2.length && isComplete; j++) {
            const point2 = group2[j];
            isComplete = getEdgeBetPoints(point1, point2).length > 0;
        }
    }

    document.querySelector('#isBipartite').innerHTML = `${isComplete && 'Complete' || (isBipartite && 'Incomplete' || '')} ${isBipartite && 'Bipartite' || 'Not Bipartite'}`;
}

export function getBipartiteGroups() {
    let points = document.querySelectorAll('.point');
    let colors = new Array(points.length).fill(-1);
    let isBipartite = true;

    for (let i = 0; i < points.length && isBipartite; ++i) {
        if (colors[i] === -1) {
            let queue = [];
            queue.push(i);
            colors[i] = 0;

            while (queue.length > 0 && isBipartite) {
                let node = queue.shift();
                let edges = getEdgesAtPoint(node);

                edges.forEach(edge => {
                    let otherPntID = getOtherConnectedPoint(edge.id, node);
                    if (colors[otherPntID] === -1) {
                        queue.push(otherPntID);
                        colors[otherPntID] = colors[node] ^ 1;
                    } else if (colors[otherPntID] === colors[node]) {
                        isBipartite = false;
                    }
                });
            }
        }
    }

    if (!isBipartite) {
        return ['not possible', 'not possible'];
    } else {
        let group1 = [], group2 = [];
        for (let i = 0; i < points.length; ++i) {
            if (colors[i] === 0) {
                group1.push(points[i].id);
            } else {
                group2.push(points[i].id);
            }
        }
        return [group1.join(' '), group2.join(' ')];
    }
}
