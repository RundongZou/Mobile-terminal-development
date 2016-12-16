/**
 * Created by hasee on 2016/12/15.
 */
var listPage = {
    myScroll :null,
    list: $("#list_page .pro_list"),
    classList: $("#list_page .class_list"),
    refresh_text: $(".refresh_text"),
    page: 0,
    classID: undefined,
    canreload: false,   
    init:function () {

        //创建一个iscroll
        this.myScroll = new IScroll("#wraper_scroll",{
            scrollbars:true,
            fadeScrollbars:true,
            shrinkScrollbars:"scale",
            bounce: true,
            probeType: 2
        });
        //获取商品的分类数据
        this.getClass();
        //先给页面填充数据
        this.addData();
        //给页面元素绑定事件
        this.bindEvent();

    },
    //获取商品分类
    getClass: function () {
    	$.get("http://datainfo.duapp.com/shopdata/getclass.php", function (data) {
    		console.log(data);
    		var str = ''; //分类的内容
    		for (var i = 0; i < data.length; i ++) {
    			str += '<li class="iconfont" data-id="'+data[i].classID+'">'+data[i].className+'</li>'
    		}
    		this.classList.html(str);
    	}.bind(this),"json")
    },
    
    addData:function (reload) {
        if (reload) {
        	this.page = 0; 
        }
        //显示蒙层
        $("#loading").show();
        //通过jsonp添加数据
        var sendData = {"classID":this.classID,"pageCode":this.page++,"linenumber":6};
 
 //获取商品列表
 $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",sendData,function (data) {
            console.log(data);
            var  str = "";
            for(var i=0;i<data.length;i++){
                str+='<li class="pro_item">' +
                        '<a href="detail.html?goodsID='+ data[i].goodsID +'" class="pic"><img src="'+data[i].goodsListImg+'"></a>' +
                        '<p class="pro_name">'+data[i].goodsName+'</p>' +
                        '<p class="price"><em>￥'+data[i].price+'</em> <del>￥668</del></p>' +
                    '</li>'
            }          
            if (reload) {
            	this.list.html(str);
            } else {            	   this.list.html(this.list.html()+str);
            }         
            //当添加完数据以后，内容的高度就改变了，需要更新滚动条
            this.myScroll.refresh()//更新滚动条
            console.log("加载完成")
            //loading蒙层隐藏
            $("#loading").fadeOut();
        }.bind(this));
    },
    bindEvent:function () {
    	var that = this;   	
    	this.myScroll.on("scroll", function () {
    		if (this.y > 50) {
    			//console.log("刷新");
    			that.canreload = true;
    			that.refresh_text.html("松开刷新");
    		}
    	})
    	
        //给页面元素绑定事件
        this.myScroll.on("scrollEnd",function () {
            //当滚动结束的时候判断是否到，底部
            if(this.y - this.maxScrollY < 50){
                console.log("加载更多");
                listPage.addData();
            }
            if (that.canreload) {            	
                listPage.addData(true);
                that.refresh_text.html("下拉刷新");
                that.canreload = false;
            }
        });
        
        //切换商品分类
        this.classList.on("click", "li", function () {
        	//console.log($(this).attr("data-id"));
        	that.classID = $(this).attr("data-id");
        	that.addData(true)   //重新给页面添加数据
        })
    }
};

//让页面初始化
listPage.init();