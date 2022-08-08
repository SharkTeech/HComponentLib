module.exports = {
    //强制单引号
    singleQuote: true,
    //强制分号
    semi: false,
    //四空格缩进
    tabWidth: 4,
    //不使用tab而用空格缩进
    useTabs: false,
    //一行最多80字符
    printWidth: 80,
    //对象的key仅在需要时使用引号
    quoteProps: 'as-needed',
    //末尾使用逗号
    trailingComma: 'all',
    //大括号内的首尾需要空格 { foo: bar }
    bracketSpacing: true,
    //jsx 标签的反尖括号需要换行
    bracketSameLine: false,
    //箭头函数单参数使用括号
    arrwoParens: 'always',
    //每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Infinity,
    //不需要写文件开头的 @prettier
    requirePragma: false,
    //不需要自动在文件开头插入 @prettier
    insertPragma: false,
    //使用默认的折行标准
    proseWrap: 'preserve',
    //根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'css',
    //换行符使用 lf
    endOfLine: 'auto',
};
