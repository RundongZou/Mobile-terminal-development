/**
 * Created by Rundong Zou
 * version: 1.0
 * time: 2016/12/16 21:05
 */
var detailPage = {
	goodsID: fnBase.request("goodsID"),
	init: function () {
		//获取数据
		this.addData();
		//绑定事件
		this.bindEvent();
	},	
	addData: function () {
		$.get("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{goodsID: this.goodsID}, function (data) {
			console.log(data);
			var goodsListImg = JSON.parse(data[0].imgsUrl);
			var str_img = "";
			for (var i = 0; i < goodsListImg.length; i ++) {
				str_img += '<div class="swiper-slide"><img src="'+goodsListImg[i]+'"></div>'
			}
			$("#detail_page .swiper-wrapper").html(str_img);
			
			//调用js
			 var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        loop: true,
        slidesPerView: 3
    });
        
        var str_info = "";
        str_info += '<li class="pro_name">'+data[0].goodsName+'</li>'+
        '<li class="pro_price"><em>¥'+data[0].price+'</em><del>¥888</del></li>'+
            	'<li class="pro_num">购买人数： '+data[0].buynumber+'</li>';
        $("#detail_page .pro_info").html(str_info);
    
    
		}, "json")
	},
	bindEvent: function () {
		$("#detail_page .add_cart").on("click", function () {
			var send_data = {
				"userID": "zourundong",
				"goodsID": this.goodsID,
				"number": 1
			};
			$.get(" http://datainfo.duapp.com/shopdata/updatecar.php", send_data, function (data) {}, "json")
		}.bind(this))
	}
}
detailPage.init();
	