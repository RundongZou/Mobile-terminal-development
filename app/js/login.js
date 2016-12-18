var loginPage = {
	reg_list: $("#reg_page .reg_list"),
	//username: $("#reg_page .reg_list .username").val(),
	//password: $("#reg_page .reg_list .password").val(),
	init: function () {
		//this.addData();
		this.bindEvent();
		// 弹框
        fnBase.myalert();
	},
	addData: function () {},
	bindEvent: function () {
		var that = this;
		var send_data = {
			"status": "login",
			"userID": $(".username").val(),
			"password": $(".password").val()
		}
		//console.log(send_data)
		$.getJSON("http://datainfo.duapp.com/shopdata/userinfo.php", send_data, function (data) {			
			console.log(data);
            if (data == 0) {
				alert("用户名不存在")
			}else if (data == 2) {
				alert("用户名密码不符")
			} else {
				alert(data.userID);
				//alert("登陆成功")
				setTimeout(function(){
					window.location.href = "list.html?userID="+data.userID+"";
				},1000)				
			}
		})
	}
};
$(".login_btn").on("click", function () {
	loginPage.init();
})

