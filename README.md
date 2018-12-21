# role
### 功能
+ 管理系统的角色界面创建
+ 原生创建，不需要引用其他插件
+ 支持移动端和PC端
+ 调用简单

### 界面
![Image text](https://github.com/zyTheGit/role/blob/master/img/role.jpg)
![Image text](https://github.com/zyTheGit/role/blob/master/img/rolepage.png)


### 使用三步骤
+ 引用`./css/roleStyle.css`css文件
+ 引用`./script/createRole.js`
+ 添加`<div class="permissionsOfDetails"></div>`

```
var json = {
  parent: ".permissionsOfDetails",
  Value: [{
      "elementChieseName": "基本设置",
      "jurisdictionName": [
          {
              "englishNa": "setMeal-edit",
              "chineseNa": "套餐编辑"
          },
          {
              "englishNa": "setMeal-del",
              "chineseNa": "套餐删除"
          }
      ]
  },
  {
      "elementChieseName": "权限",
      "jurisdictionName": [
          {
              "englishNa": "role-edit",
              "chineseNa": "权限编辑"
          },
          {
              "englishNa": "role-del",
              "chineseNa": "权限删除"
          }
      ]
  }]}
 addAccessLabels(JSON.stringify(json));
```
