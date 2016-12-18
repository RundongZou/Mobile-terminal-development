var regPage = {
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
			"status": "register",
			"userID": $(".username").val(),
			"password": $(".password").val()
		}
		console.log(send_data)
		$.get("http://datainfo.duapp.com/shopdata/userinfo.php", send_data, function (data) {			
			//console.log(data);
			if (data === 1) {
				alert("注册成功")
			} else {
				alert("注册失败")
			}
		})
	}
};
$(".reg_btn").on("click", function () {
	regPage.init();
})

