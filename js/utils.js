function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)", "i"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function lerp(start, end, t) {
    t = Math.max(0, Math.min(1, t));
    return (end - start) * t + start;
}

function randomInt(min, max) {
    return Math.floor(Math.min(0.9999, Math.random()) * (max - min)) + min;
}

