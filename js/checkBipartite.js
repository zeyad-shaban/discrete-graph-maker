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
    let group1 = [];
    let group2 = [];

    let points = document.querySelectorAll('.point');
    points.forEach((point, i) => {
        group1.push(point.id);
        getEdgesAtPoint(point.id).forEach(edge => {
            let otherPntID = getOtherConnectedPoint(edge.id, i)
            group2.push(otherPntID);
        });
    });



    return [group1.join(' '), group2.join(' ')];
}