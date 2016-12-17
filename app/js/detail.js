/**
 * Created by Rundong Zou
 * version: 1.1
 * time: 2016/12/17 14:48
 */
var full = false;
var detailPage = {
	goodsID: fnBase.request("goodsID"),
	init: function () {
		//获取数据
		this.addData();
		//绑定事件
		this.bindEvent();
		//显示蒙层
        $("#loading").show();
        // 弹框
        fnBase.myalert();
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
			//loading蒙层隐藏
            $("#loading").fadeOut();
			
		//调用js
	    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        loop: true
//      slidesPerView: 3
    });
    
	    $("img").on("click", function () {
	    	full = !full;
		    //$(this).style.width = "100%";
//		    $(this).style.height = "100%";
//          console.log($(this));
if (full) {
	$(this).addClass("full_img");
	$(".swiper_btns").hide();
} else {
	$(this).removeClass("full_img");
	$(".swiper_btns").show();
}
            
	    })
        
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
			console.log(send_data);
			$.get("http://datainfo.duapp.com/shopdata/updatecar.php",send_data,function(data){
				//console.log(data);
				if (data === 1) {
					alert("加入购物车成功")
				}
			},"json")
		}.bind(this))
	}
}
//页面初始化
detailPage.init();

	