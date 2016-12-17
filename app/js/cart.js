var cartPage = {
	list: $("#cart_page .cart-list"),
	init: function () {
		this.addData();
		this.bindEvent();
	},
	addData: function () {
		$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?", {"userID": "zourundong"}, function (data) {
			var str = "";
			for (var i = 0; i < data.length; i ++) {
				str += '<li class="cart_item" "data-id='+data[i].goodsID+'">'+
                    '<a href="###" class="pic"><img src="'+data[i].goodsListImg+'"></a>'+
                    '<div class="pro_info">'+
                         '<p class="pro_name">'+data[i].goodsName+'</p>'+
                        '<p class="price">金额：<em>'+data[i].price+'</em></p>'+
                        '<div class="num_wrap">'+
                            '<span class="num_tit">数量：</span>'+
                            '<div class="num_box">'+
                                '<span class="num_btn dec cart_btn">-</span>'+
                                '<input class="num_val" type="text" value="'+data[i].number+'" />'+
                                '<span class="num_btn inc cart_btn">+</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+

                    '<a href="javascript:;" class="delete_btn cart_btn">x</a>'+'</li>';
                    
			}
			this.list.html(str);
			//获取数量和金额总和
			this.getSum();
		}.bind(this))
	},
	bindEvent: function () {
		var that = this;
		this.list.on("click", ".cart_btn", function () {
			var cart_item = $(this).parents(".cart_item");
			var id = cart_item.attr("data-id");
			var num_input = cart_item.find(".num_val");
			var num = parseInt(num_input.val());
			if ($()) {}
		})
	}
}
cartPage.init();
