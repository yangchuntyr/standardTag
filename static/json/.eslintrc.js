module.exports = {
    "root":true,
    //环境
    "env": {
        "browser": true,
        "es6": true,
        "node":true
    },
    "parser": 'babel-eslint',//兼容es6插件
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,//jsx文件
        },
        "ecmaVersion": 2016,//检查版本
        "sourceType": "module"
    },
    "plugins": [
        "eslint-plugin-html",//检查html当中script标签
        "eslint-plugin-import",
        "eslint-plugin-promise",
        "eslint-plugin-vue"//vue自动格式化插件
      ],
    "settings": {
        "html/html-extensions": [".html",".vue"],  // 除js文件外，会去检查文件中script标签配置
    },
    "rules": {
        "no-debugger": process.env.NODE_ENV === "production" ? "off" : "error",
        "no-compare-neg-zero":"error",//禁止与-0比较
        "no-cond-assign":"error",//禁止条件语句出现赋值
        "no-constant-condition":"error",//禁止使用已知数判断
        "no-dupe-args":"error",//禁止出现同名参数
        "no-dupe-keys":"error",//禁止出现重复的key
        "no-duplicate-case":"error",//不允许出现重复的case
        "no-empty":"error",//禁止出现空语法块
        "no-ex-assign":"error",//禁止对catch参数重新赋值
        "no-extra-boolean-cast":"error",//禁止不必要的布尔转换
        "no-extra-semi":"error",//去除不必要的分号
        "no-func-assign":"error",//禁止函数重新赋值
        "no-inner-declarations":"error",//禁止在嵌套的快中出现函数声明
        "no-irregular-whitespace":"error",//禁止在字符串之外有多余的空白
        "no-obj-calls":"error",//禁止对全局对象进行直接赋值调用
        "no-prototype-builtins":"error",//禁止直接调用Object对象的属性
        "no-regex-spaces":"off",//禁止正则出现多个空格
        "no-sparse-arrays":"error",//禁止数组下标没有对应的值
        "no-template-curly-in-string":"error",//禁止使用单引号或者多引号对字符串解析,同时禁止使用反引号不解析
        "no-unreachable":"error",//禁止在return等之后编写代码
        "no-unsafe-finally":"error",//禁止在finally中直接返回一个参数
        "no-unsafe-negation":"error",//禁止对关系运算符的左操作数使用否定操作符。
        "use-isnan":"error",//只能使用isNAN()检查nan
        "array-callback-return":"error",//强制对数组筛选进行return
        "no-empty-function":"error",//禁止使用空函数
        "no-eval":"error",//禁止使用eval函数
        "no-floating-decimal":"error",//禁止数字出现前.或者.点而前后无数值
        "no-global-assign":"error",//禁止对只读的对象属性赋值
        "no-loop-func":"error",//禁止for循环中出现函数声明和函数表达式
        "no-param-reassign":"error",//禁止对函数内的参数进行重新赋值
        "no-redeclare":"error",//禁止声明多个相同的变量
        "no-delete-var":"error",//禁止删除变量
        "no-unused-vars":"error",//禁止出现未使用过的变量
        //空格为4个字符
        "indent": [
            "error",
            4
        ],
        //window换行符
        "linebreak-style": [
            "off",
            "windows"
        ],
        //js使用单引号
        "quotes": [
            "error",
            "single"
        ],
        //结尾需要分好
        "semi": [
            "error",
            "always"
        ],
        //禁止不必要的括号
        "no-extra-parens":[
            "error",
            "all"
        ]
    }
};