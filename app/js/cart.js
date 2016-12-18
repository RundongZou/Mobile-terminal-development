var cartPage = {
	sub_header: $("#cart_page .sub_header"),
	list: $("#cart_page .cart_list"),
	init: function () {
		this.addData();
		this.bindEvent();
		//显示蒙层
        $("#loading").show();
         
	},
	addData: function () {
		$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?", {"userID": "zourundong"}, function (data) {
			var str = "";
			var sub_str = "";
			
			for (var i = 0; i < data.length; i ++) {
				
				
				sub_str += '<p>商品数量: <span class="total_num">0</span>&nbsp;总金额: <em>¥ <span class="total_price">0</span></em></p>'
				
				str += '<li class="cart_item" data_id="'+data[i].goodsID+'">'+
                    '<a href="###" class="pic"><img src="'+data[i].goodsListImg+'"></a>'+
                    '<div class="pro_info">'+
                         '<p class="pro_name">'+data[i].goodsName+'</p>'+
                        '<p class="price">单价：<em>'+data[i].price+'</em></p>'+
                        '<div class="num_wrap">'+
                            '<span class="num_tit">数量：</span>'+
                            '<div class="num_box">'+
                                '<span class="num_btn dec cart_btn">-</span>'+
                                '<input class="num_val" type="text" value="'+data[i].number+'" />'+
                                '<span class="num_btn inc cart_btn">+</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<a href="javascript:;" class="delete_btn cart_btn"><i class="iconfont icon-shanchu"></i></a>'+'</li>';                    
			}
			this.sub_header.html(sub_str);
			this.list.html(str);
			//loading蒙层隐藏
            $("#loading").fadeOut();
			//获取数量和金额总和
			this.getSum();
		}.bind(this))
	},
	bindEvent: function () {
		var that = this;
		this.list.on("click", ".cart_btn", function () {
			
			var cart_item = $(this).parents(".cart_item");
			var id = cart_item.attr("data_id");
			var num_input = cart_item.find(".num_val");
			var num = parseInt(num_input.val());
			//console.log(id);
			//console.log(num);
			//console.log(this.price);
			if ($(this).hasClass("dec")) {
				num --;
				num_input.val(num);
				
				//console.log("-");
			} else if ($(this).hasClass("inc")) {
				num ++;
				num_input.val(num);
				//console.log("+");
			} else {
				num = 0;
				cart_item.remove();
				//console.log("delete");
			}
			if (num === 0) {
				cart_item.remove();
			}
			that.getSum();
			
			// 更新购物车
			var send_data = {
				"userID": "zourundong",
				"goodsID": id,
				"number": num
			};
			$.get("http://datainfo.duapp.com/shopdata/updatecar.php", send_data, function (data) {
				//console.log(data);
			}, "json")
		})
	},
	getSum: function () {
		//获取数量和金额总和
		var total_num = 0;
		var total_price = 0;	
		//把所有的商品循环，数量和金额累加
		var num_item = $("#cart_page .num_val");
		var price_item = $("#cart_page .pro_info .price em"); 
		//console.log(num);
		for (var i = 0; i < num_item.length; i ++) {
			total_num += parseInt(num_item[i].value);
			total_price += parseInt(num_item[i].value) * parseInt($(price_item[i]).html());
		}
		//console.log(total_num);
		//console.log(total_price);
		//$("#cart_page .pro_info .price em").eq($(this)).html(price);
		$("#cart_page .total_num").html(total_num);
		$("#cart_page .total_price").html(total_price);
	}
}
//页面初始化
cartPage.init();	
