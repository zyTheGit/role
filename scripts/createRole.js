/*
     var valueArry=[{
            elementChieseName："角色",
	        jurisdictionName:"[{"englishNa":"AAA-XX","chineseNa":"角色新增"},{"englishNa":"AAA-XX","chineseNa":"角色新增"},...]"
     }]
     var json = {
        parent: parentDiv,
        Value: valueArry
    }
    
    //valueArry和jurisdictionName的列子start
    var valueArry=[{
            elementChieseName:"角色",
	        jurisdictionName:[
			{
				"englishNa":"role-add",
				"chineseNa":"角色新增"
			},
			{
				"englishNa":"role-modify",
				"chineseNa":"角色修改"
		    },
			{
				"englishNa":"role-delete",
				"chineseNa":"角色删除"
			}]
        },
		{
            elementChieseName:"客户",
	        jurisdictionName:[
			{
				"englishNa":"customer-add",
				"chineseNa":"客户新增"
			},
			{
				"englishNa":"customer-modify",
				"chineseNa":"客户修改"
		    },
			{
				"englishNa":"customer-delete",
				"chineseNa":"客户删除"
			}]
        }];
        //valueArry和jurisdictionName的列子end
*/

//json必须用是用JSON.Stringify传过来
//parentDiv是最外层的div的class或者id(以.div或者#div传过来)
//Value是无数个对象组成的数组
//elementChieseName是每个页面的中文名
//nameArry是页面对应的权限名字，是一组数组（格式：页面名- + 对应的权限功能，eg:role-add    代表角色添加权限）;
//englishNa对应权限英文名
//chineseNa对应权限中文名
(function () {

    //添加权限布局
    function addAccessLabels(json) {
        var doc = document,
            jsonParent = JSON.parse(json),
            parentDiv = jsonParent.parent, //外层div
            parentDivDom = doc.querySelector(parentDiv);
        if (!!parentDivDom) {
            var valueData = jsonParent.Value, //所有权限集合
                table = doc.createElement("table"),
                dataLen = valueData.length;
            table.setAttribute("onselectstart", "return false");
            var tbody = doc.createElement("tbody");
            for (var i = 0; i < dataLen; i++) {
                var elementNa = valueData[i].elementChieseName; //每个页面对应的名称
                var jurisdictionNa = valueData[i].jurisdictionName; //每个页面对应的权限（数组）
                if (!!elementNa && !!jurisdictionNa) {
                    var lastName = "",
                        tr = doc.createElement("tr"),
                        th = doc.createElement("th"),
                        td = doc.createElement("td"),
                        divFirst = doc.createElement("div"),
                        divParent = doc.createElement("div"),
                        divTwo = doc.createElement("div"),
                        htmlRegion = "", //为了储存regionDiv的html
                        inxRegion = 0; //为了确认regionDiv自定义属性data-region的值
                    divTwo.className = "clearFloatDiv";
                    td.setAttribute("data-floor", i + 1);

                    for (var j = 0, jurisdictionNaLen = jurisdictionNa.length; j < jurisdictionNaLen; j++) {
                        var p = doc.createElement("p");
                        th.style.width = "110px";
                        p.className = "marginBottom";
                        var englishName = jurisdictionNa[j].englishNa,
                            chineseName = jurisdictionNa[j].chineseNa;
                        if (!!englishName && !!chineseName) {
                            var htmlName = '<div class ="floatDiv"><span><label class ="ant-checkbox-wrapper"><span class ="ant-checkbox ant-checkbox-checked ant-checkbox-checked-1"><span class ="ant-checkbox-inner ant-choice-checkbox" id=' + englishName + '></span><input type="checkbox" class="ant-checkbox-input"></span></label></span><span>' + chineseName + '</span></div>';
                            var name = englishName.split("-")[0];
                            if (lastName == "") {
                                lastName = name;
                            }
                            if (lastName != name) {
                                inxRegion++;
                                var regionDiv = doc.createElement("div");
                                regionDiv.className = "regionDiv";
                                regionDiv.setAttribute("data-region", inxRegion);
                                regionDiv.innerHTML = htmlRegion;
                                appendFrag(divTwo, regionDiv);
                                lastName = name;
                                divTwo.appendChild(p);
                                divFirst.appendChild(divTwo);
                                th.innerHTML = elementNa + '<div class="selectDiv"><span><label class="ant-checkbox-wrapper"><span class="ant-selectDiv"><span class="ant-selectDivSpan" style="border: 1px solid rgb(19, 193, 159); cursor: pointer;"></span><input type="checkbox" class="ant-checkbox-input" spellcheck="false" style="cursor: pointer;"></span></label></span></div>';
                                tr.appendChild(th);
                                td.appendChild(divFirst);
                                tr.appendChild(td);
                                htmlRegion = htmlName;
                            } else {
                                //divTwo.appendChild(htmlName);
                                htmlRegion += htmlName;
                                //appendFrag(divTwo, htmlName);
                            }
                            if (j + 1 == jurisdictionNaLen) {
                                inxRegion++;
                                var regionDiv = doc.createElement("div");
                                regionDiv.className = "regionDiv";
                                regionDiv.setAttribute("data-region", inxRegion);
                                regionDiv.innerHTML = htmlRegion;
                                appendFrag(divTwo, regionDiv);
                                lastName = name;
                                divFirst.appendChild(divTwo);
                                th.innerHTML = elementNa + '<div class="selectDiv"><span><label class="ant-checkbox-wrapper"><span class="ant-selectDiv"><span class="ant-selectDivSpan" style="border: 1px solid rgb(19, 193, 159); cursor: pointer;"></span><input type="checkbox" class="ant-checkbox-input" spellcheck="false" style="cursor: pointer;"></span></label></span></div>';
                                tr.appendChild(th);
                                td.appendChild(divFirst);
                                tr.appendChild(td);
                            }
                        } else {}
                    }
                    tbody.appendChild(tr);
                } else {}
            }
            table.appendChild(tbody);
            parentDivDom.appendChild(table);
            //全选和取消全选
            (function () {
                var thParent = doc.querySelectorAll(parentDiv + ' th');
                for (var i = 0, thParentLen = thParent.length; i < thParentLen; i++) {
                    (function (i) {
                        var floatDiv = thParent[i].children;
                        floatDiv[0].addEventListener("click", function (e) {
                            var th = this.offsetParent;
                            var td = th.nextSibling,
                                innerInput = td.querySelectorAll(".ant-checkbox-inner"),
                                seleSpan = th.querySelector(".ant-selectDivSpan"),
                                innerInLen = innerInput.length;
                            if (hasClass(seleSpan, "selectDivSpanBack")) {
                                removeClass(seleSpan, "selectDivSpanBack");
                                for (var k = 0; k < innerInLen; k++) {
                                    removeClass(innerInput[k], "choice");
                                }
                                if (k == innerInLen) return false;
                            } else {
                                addClass(seleSpan, "selectDivSpanBack");
                                for (var k = 0; k < innerInLen; k++) {
                                    addClass(innerInput[k], "choice");
                                }
                                if (k == innerInLen) return false;
                            }
                        })
                    })(i)
                }
            })()
            //选择权限
            var floatDiv = doc.querySelectorAll(parentDiv + " .floatDiv");
            for (var i = 0, floatDivLen = floatDiv.length; i < floatDivLen; i++) {
                (function (i) {
                    floatDiv[i].addEventListener("click", function (e) {
                        var e = e || window.e;
                        var target = e.target || e.srcElement;
                        var floatThis = this;
                        if (hasClass(floatThis, "floatDiv1")) {

                        } else {
                            var choice = floatThis.querySelectorAll(".choice");
                            var tr = floatThis.offsetParent.parentNode;
                            var th = tr.firstChild;
                            var seleSpan = th.querySelector(".ant-selectDivSpan");
                            if (choice.length > 0) {
                                removeClass(choice[0], "choice");
                                removeClass(seleSpan, "selectDivSpanBack");
                                return;
                            } else {
                                var olbCheckboxLen = tr.querySelectorAll(".ant-checkbox-inner").length;
                                var checkboxInner = floatThis.querySelector(".ant-checkbox-inner");
                                addClass(checkboxInner, "choice");
                                var newChoiceLen = tr.querySelectorAll(".choice").length;
                                if (olbCheckboxLen == newChoiceLen) {
                                    addClass(seleSpan, "selectDivSpanBack");
                                }
                                return;
                            }
                        }
                    })

                })(i)
            }
        } else {
            alert("parent传入的格式不对");
        }
    }

    function appendFrag(parent, text) {
        if (typeof text === 'string') {
            var temp = document.createElement('div');
            temp.innerHTML = text;
            // 防止元素太多 进行提速
            var frag = document.createDocumentFragment();
            while (temp.firstChild) {
                frag.appendChild(temp.firstChild);
            }
            parent.appendChild(frag);
        } else {
            parent.appendChild(text);
        }
    }

    function hasClass(ele, cls) {
        return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    function addClass(elements, cName) {
        if (elements.className == "") {
            elements.className += cName;
        } else {
            elements.className += " " + cName;
        }
    }

    function removeClass(elements, cName) {
        elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), "")
    }
    window.addAccessLabels = addAccessLabels;
})();