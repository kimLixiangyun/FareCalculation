var subwayData = {
	"1号线": ["升仙湖", "火车北站", "人民北路", "文殊院", "骡马市", "天府广场", "锦江宾馆", "华西坝", "省体育馆", "倪家桥", "桐梓林", "火车南站", "高新", "金融城", "孵化园", "锦城广场", "世纪城", "天府三街", "天府五街", "华府大道", "四河", "广都"],
	"2号线": ["龙泉驿", "龙平路", "书房", "界牌", "连山坡", "大面铺", "成都行政学院", "洪河", "惠王陵", "成渝立交", "成都东客站", "塔子山公园", "东大路", "牛市口", "牛王庙", "东门大桥", "春熙路", "天府广场", "人民公园", "通惠门", "中医大省医院", "白果林", "蜀汉路东", "一品天下", "羊犀立交", "茶店子客运站", "迎宾大道", "金科北路", "金周路", "百草路", "天河路", "犀浦"],
	"3号线": ["军区总医院", "熊猫大道", "动物园", "昭觉寺南路", "驷马桥", "李家沱", "前锋路", "红星桥", "市二医院", "春熙路", "新南门", "磨子桥", "省体育馆", "衣冠庙", "高升桥", "红牌楼", "太平园"],
	"4号线": ["西河", "明蜀王陵", "成都大学", "十陵", "来龙", "槐树店", "万年场", "双桥路", "玉双路", "市二医院", "太升南路", "骡马市", "宽窄巷子", "中医大省医院", "草堂北路", "西南财大", "文化宫", "清江西路", "成都西站", "中坝", "蔡桥", "非遗博览园", "马厂坝", "凤凰大街", "涌泉", "光华公园", "南熏大道", "凤溪河", "杨柳河", "万盛"],
	"7号线": ["火车北站", "驷马桥", "府青路", "八里庄", "二仙桥", "理工大学", "崔家店", "双店路", "槐树店", "迎晖路", "成都东客站", "大观", "狮子山", "四川师大", "琉璃场", "三瓦窑", "火车南站", "神仙树", "高朋大道", "太平园", "武侯大道", "龙爪堰", "东坡路", "文化宫", "金沙博物馆", "一品天下", "茶店子", "花照壁", "西南交大", "九里堤", "北站西二路"],
	"10号线": ["太平园", "簇锦", "华兴", "金花", "双流机场1航站楼", "双流机场2航站楼"]
}

var edgesData = [["升仙湖", "火车北站", 1.2], ["火车北站", "人民北路", 1.2], ["人民北路", "文殊院", 1.3], ["文殊院", "骡马市", 1.2], ["骡马市", "天府广场", 1.0], ["天府广场", "锦江宾馆", 1.0], ["锦江宾馆", "华西坝", 1.4], ["华西坝", "省体育馆", 1.2], ["省体育馆", "倪家桥", 1.3], ["倪家桥", "桐梓林", 1.5], ["桐梓林", "火车南站", 1.3], ["火车南站", "高新", 1.3], ["高新", "金融城", 1.2], ["金融城", "孵化园", 1.1], ["孵化园", "锦城广场", 2.3], ["锦城广场", "世纪城", 1.4], ["世纪城", "天府三街", 2.3], ["天府三街", "天府五街", 1.2], ["天府五街", "华府大道", 2.1], ["华府大道", "四河", 2.1], ["四河", "广都", 2.1]];


var $j = jQuery.noConflict();

function init() {
	initSubwayBox();
	initSubwayClick();
	initCalcFare();
	initeDijkstra();
}
//获取当前线路
function getSunwayLineHtml() {
	var htmls = [];
	i = -1;
	className = ["xy-subway-one", "xy-subway-two", "xy-subway-three", "xy-subway-four", "xy-subway-seven", "xy-subway-ten"];
	for (var lineName in subwayData) {
		i++,
			htmls.push("<li><span class='" + className[i] + "'></span>" + lineName + "</li>");
	}
	return htmls.join("");
}
//获取当前线路的所有站点
function getSubwayStationHtml(lineName) {
	for (var stations = subwayData[lineName], htmls = [], i = 0; i < stations.length; i++) {
		htmls.push("<li>" + stations[i] + "</li>");
	}
	return htmls.join("");
}
//改变查询按钮
function tryActiveButton() {
	var start = $j(".xy-subway-station-start .xy-subway-station em").text(),
		end = $j(".xy-subway-box-end .xy-subway-station-end em").text();
	if ("选择车站" != start && "选择车站" != end) {
		$j(".xy-subway-cale-false").addClass("xy-subway-cale-fare").remove("xy-subway-cale-false");
	}

}

//初始化下拉菜单
function initSubwayBox() {
	var lineHtml = getSunwayLineHtml();
	$j(".xy-subway-line .xy-subway-ul").html(lineHtml);
	$j(".xy-subway-line .xy-subway-ul").on("click", "li", function () {
		var lineName = $j(this).text();
		console.log($j(this).parent().parent());
		$j(this).parent().parent().parent().find(".xy-subway-line em").css({
			padding: "0px 5px 0px 20px"
		}), $j(this).parent().parent().parent().find(".xy-subway-station").css({
			background: "#fff"
		}), $j(this).parent().parent().parent().find(".xy-subway-station em").css({
			color: "#333"
		});
		var stationHtml = getSubwayStationHtml(lineName);
		$box = $j(this).parent().parent().parent();
		$box.find(".xy-subway-ulk").html(stationHtml);
		var firstStation = subwayData[lineName][0];
		$box.find(".xy-subway-station em").text(firstStation);
		tryActiveButton();
	});
}

//处理点击事件
function initSubwayClick() {
	$j(".xy-subway-line,.xy-subway-station").on("click", function (even) {

		if (even.stopPropagation(), $j(".xy-subway-ts").hide, $j(".xy-subway-box ul").hide(), $j(this).find("ul").children().length) {
			$j(this).find("ul").show();
		}
		$j(document).on("click", function () {
			$j(".xy-subway-box ul").hide();
		})
		$j(".xy-subway-ul,.xy-subway-ulk").on("click", "li", function (event) {
			event.stopPropagation(), $j(this).parent().parent().find("em").html($j(this).html()), $j(this).parent().parent().find("ul").hide();
		})
	})
}

function initCalcFare() {
	$j(".xy-subway-main").on("click", ".xy-subway-cale-fare", function () {
		var start = $j(".xy-subway-box-start .xy-subway-station em").html();
		var end = $j(".xy-subway-box-end .xy-subway-station em").html();
		if (start == end) {
			return $j(".xy-subway-ts").html("您真的需要坐地铁吗？").show();
		}
		false;
		$j(".xy-subway-tab,.xy-subway-footer").show(), $j($j(".xy-subway-tab li")).show();
		var distance = Dijkstra.shortestPath(start, end), fare = caleFare(distance);
		$j(".xy-subway-content2 .xy-subway-text .xy-subway-fareinfo").html(getText(distance, fare));
	})
}
//计费方式
function caleFare(distance) {
	if (distance <= 4) return 2;
	if (distance <= 12) return 2 + Math.ceil((distance - 4) / 4);
	if (distance <= 24) return 4 + Math.ceil((distance - 12) / 6);
	if (distance <= 40) return 6 + Math.ceil((distance - 24) / 8);
	if (distance <= 50) return 8 + Math.ceil((distance - 24) / 10);
	else return 9 + Math.ceil((distance - 50) / 20);
}

//计算格式
function format(distance) {
	var s = distance + "", index = s.indexOf(".");
	if (index >= 0) {
		if (s.length > index + 2) {
			s = s.substr(0, index + 2);
		}
	}
	return s;
}
//获取需要填入的数据
function getText(distance, fare) {
	if (distance = format(distance));
	return '<p class="xy-subway-span">单程<em class="xy-subway-increase">' + distance + '</em>公里，票价<em class="xy-subway-increase">' + fare + '</em>元！'
}

//初始化算法
function initeDijkstra() {
	Dijkstra.addEdges(edgesData);
}
init();