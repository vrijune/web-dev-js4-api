<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
        <title>signInsignUp</title>
        {/*<style type="text/css">*/}
        {/*    span{color: red;font-size: 12px;display: none;}*/}
        {/*</style>*/}
        <script type="text/javascript">
        </script>
</head>

<body>
<form action="../../Login.html" method="post" onSubmit="Form()">
    username:<input type="text" id="txt-name"><span id="tip-name">Username have to be require 8-12</span><br>
    password：<input type="password" id="pwd"><span id="tip-pwd">Password have to be require </span><br>
    <input type="submit" value="submit">
</form>

<script type="text/javascript">
    var userName = document.getElementById('txt-name');
    var userPwd = document.getElementById('pwd');

    function valForm(){
    return valUserName()&&valPwd();
}

    //checkuserName
    function valUserName() {
    var p=/^\w\w{7,11}$/;// userName have to be 8-12 number or letter
    var r=p.test(iptName.value);//check
    if(!r){
    //not pass
    tipName.style.display='inline-block';//show
    iptName.focus();
    return false;
}
    return true;
}


{/*//check userName  Complited*/}
    function checkUsweName(){
    alert("checkname");
    var f=false;
//get the input username
    var name = document.getElementById("usernameRe").value;
    //get rid of the space
    name=name.trim();

    // check null or not

    if(name==""){
    document.getElementById("username_span").innerHTML="username cannot be empty";
}else if(name.length<8||name.length>12){
    document.getElementById("username_span").innerHTML="user name should be in 8-12 length";
}
    else{
    document.getElementById("username_span").innerHTML="";

    .ajax({
    url:"/oldbookweb_1/checkName",
    type:"post",
    data:{"username":name},
    dataType:"json",
    async:false,
    success:function(data){
    if(data.msg=="false"){
//alert("false");
    document.getElementById("username_span").innerHTML="username existed";
}else{

    document.getElementById("username_span").innerHTML="username avaliable";
    f=true;

}
    return f;
}


    //check password
    function valPwd(){
    var p=/^\d\d{5}$/;//sixNumber
    var r=p.test(iptPwd.value);//check
    if(!r){
    tipPwd.style.display='inline-block';
    iptPwd.focus();//focus
    return false;
}
    return true;
}

//check password twice

    var password=document.getElementById("passwordRe").value;
    var repassword=document.getElementById("repassword").value;
    if(password==repassword){
    document.getElementById("repassword_span").innerHTML="";
    return true;
}else{
    document.getElementById("repassword_span").innerHTML="Not match";
    return false;
}
}







</script>
</body>
</html>