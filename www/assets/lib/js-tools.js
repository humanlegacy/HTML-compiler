
/*
快速获取与设置对象key对应的value

@param {string} key 对象对应的key
@return key的值

@param {任何类型} val 设置key对应的值
@return {object} 返回一个新对象
*/
Object.prototype.fastKey = function(key, val){
	var result, o = this,_o = this;
	function fn(key,o){
		for(var k in o){
			if(k === key){
				if(val !== undefined){
					o[k] = val;
					result = _o;
				}else{
					result = o[k];
				}
				return result;
			}
			if(typeof o[k] === 'object'){
				fn(key,o[k]);
			}
		}
		return result;
	}
	return fn(key,this);
};

/*
删除数组中指定元素

@param {number|string} ele 需要删除的元素

@return {array} 返回删除元素后的数组
*/
Array.prototype.remove = function(ele){
	this.splice(this.indexOf(ele), 1);
	return this;
}


/*
修改数组中指定的值

@param {number|string} target 数组中含有的项
@param {number|string} val 设置对饮的值
@param {boolean} global 是否开启全局替换

@return {array} 返回一个新数组
*/
Array.prototype.fastArray = function(target,val,global){
	var that = this.slice(0);
	if(global === true){
		that.forEach(function(val,idx){
			if(val === target){
				that[idx] = val;
			}
		});
	}else{
		var idx = that.findIndex(function(){
			return target;
		});
		that[idx] = val;
	};
	return that;
};

/*
对数组中的数值进行排序

@param {boolean} reverse 是否反排数组
@return {array} 返回排序后的新数组
*/
Array.prototype.fastSort = function(reverse){
	var minArr = [], 
		maxArr = [],
		that = this.slice(0),
		length = Math.ceil(that.length/2);

	for(var k=0;k<length;k++){
		var max = Math.max.apply({},that), min = Math.min.apply({},that);
		if(that.length != 1){
			minArr.push(min);
		}
		maxArr.unshift(max);
		that.splice(that.indexOf(max), 1);
		that.splice(that.indexOf(min), 1);
	}
	return reverse ? minArr.concat(maxArr).reverse() : minArr.concat(maxArr);
};


(function(){
	if(typeof _$ !== 'undefined'){
		return;
	}
	window._$ = {
		//判断客户端是否为PC
		isPc:function(){
			var userAgentInfo = navigator.userAgent;  
			var Agents = ["Android", "iPhone","Windows Phone", "iPad", "iPod"];  
			var flag = true;  
			for (var v = 0; v < Agents.length; v++) {  
				if (userAgentInfo.indexOf(Agents[v]) > 0) { 
					flag = false; 
					break; 
				}  
			}  
			return flag;  
		},

		//随机获取数组中某一项
		oneOfArray:function(a){
			return a[Math.floor(Math.random() * a.length)];
		},

		//生成指定范围内的随机数
		rand:function(a){
			return Math.floor(Math.random() * (a[0] - a[1] + 1)) + a[1]; 
		},

		//返回数组中的最大值和最小值
		maxin:function(a){
			return {
				max : Math.max.apply(Math, a), 
				min : Math.min.apply(Math, a)
			};
		},		

		//返回随机生成指定长度的数字字母组合
		getString:function(num){
			var rdmStr = "";  
			if(rdmStr.length < num) rdmStr  += Math.random().toString(36).substr(2);
			return  rdmStr.substr(0, num);  
		},

		//返回16进制随机色
		randColor:function(){
			return "#"+((Math.random()*(0xFFFFFF).toString(10)).toString(16)).slice(-6); 
		},

		//格式化时间："今天是{year}年{month}月{day}日,周{week},第{quarter}季度 {hour}:{minute}:{second}:{ms} 时间戳:{ts}"
		formatDate:function(str){
			var D=new Date(),
				item = {
					"{year}": D.getFullYear(),
					"{month}": D.getMonth() + 1,
					"{day}": D.getDate(),
					"{hour}": D.getHours(),
					"{minute}": D.getMinutes(),
					"{second}": D.getSeconds(),
					"{quarter}": Math.floor((D.getMonth() + 3) / 3), 
					"{ms}": D.getMilliseconds(), 
					"{week}":"日一二三四五六".charAt(D.getDay()), 
					"{ts}":D.getTime()
				};
			for (var k in item){
				new RegExp("(" + k + ")").test(str) ? str = str.replace(RegExp.$1, item[k]) : null;
			}
			return str;
		}
	};
})();





