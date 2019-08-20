
window.addEventListener("load",function(){

    document.getElementById("sync").addEventListener("click",syncDemo);

    document.getElementById("async").addEventListener("click",asyncDemo);

    function syncDemo(){
        let x = undefined;
        function functionOne(){
            x = 1;
            alert("B: " + x);
            functionTwo();
            alert("D: " + x);
        }
        function functionTwo(){
            x = 2;
            alert("C: " + x);
        }
        alert("A: " + x);
        functionOne();
        alert("E: " + x);
    }

    function asyncDemo(){
        let x = undefined;
        function functionOne(){
            x = 1;
            alert("B: " + x);
            functionTwo();
            alert("D: " + x);
        }
        async function functionTwo(){
            let articleResponseObj = await fetch(`https://sporadic.nz/ajax/articles?id=1`);
            x = 2;
            alert("C: " + x);
        }
        alert("A: " + x);
        functionOne();
        alert("E: " + x);
    }




});