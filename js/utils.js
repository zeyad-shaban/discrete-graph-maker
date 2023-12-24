export function degOfPoint(pointID) {
    let edges = document.querySelectorAll('.edge');
    let deg = 0;

    edges.forEach(edge => {
        if (edge.getAttribute("id").includes(pointID)) deg++;
    });

    return deg;
}

export function getEdgeBetPoints(p1, p2) { return [...document.querySelectorAll(`#edge${p1}_${p2}`), ...document.querySelectorAll(`#edge${p2}_${p1}`)]; }
export function getLoopsForPoint(pID) { return document.querySelectorAll(`#loop${pID}`); }
export function getEdgesAtPoint(pointID) { return [...document.querySelectorAll('[id^="edge"]')].filter(el => new RegExp(`e${pointID}($|_)`).test(el.id) || el.id.endsWith(`_${pointID}`)); }
export function getOtherConnectedPoint(edgeID = "", pointID) {
    let points = edgeID.split('_');
    points[0] = points[0].replace("edge", "");
    return points[0] == pointID && points[1] || points[0];
}

export function alertErr(msg) {
    alert(msg);
}
