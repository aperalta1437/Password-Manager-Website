document.getElementById("btn-sign-in").onclick = function () {
    location.href = "/";
};
document.getElementById('txtbox-username').addEventListener('scroll', function(e){
    document.getElementById('txtbox-username').scrollLeft=0;
    console.log('Prevented scrolling');
});