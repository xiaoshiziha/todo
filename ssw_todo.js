/**
 * @Date:   2018-03-26T17:41:05+08:00
 * @Last modified time: 2018-03-27T11:54:34+08:00
 */
var log = function() {
    console.log.apply(console, arguments)
}
var e = function(selector) {
    return document.querySelector(selector)
}

// 给 add button 绑定添加 todo 事件
var addButton = e('#id-button-add')
addButton.addEventListener('click', function(){
    // 获得 input.value
    var todoInput = e('#id-input-todo')
    //.value可获取input框中的值
    var todo = todoInput.value
    // 添加到 container 中
    insertTodo(todo, false)
    // 添加之后 保存 todos
    saveTodos()
})

var insertTodo = function(todo, done) {
    // 添加到 container 中
    var todoContainer = e('.task-list')
    var t = templateTodo(todo, done)
    // 这个方法用来添加元素
    // 第一个参数 'beforeend' 是放在最后
    todoContainer.insertAdjacentHTML('beforeend', t);
}

var templateTodo = function(todo, done) {
    var status = ''
    if(done) {
        status = 'done'
    }
    var t = `
        <div class='task-item ${status}'>
            <input class="todo-done" type="checkbox">
            <span class='todo-content' contenteditable='false'>${todo}</span>
            <span class='fr'>
                <span class='todo-delete'>删除</span>
                <span class='todo-bianji'>编辑</span>
            </span>
        </div>
    `
    return t
}
var todoContainer = e('.task-list')

// 通过 event.target 的 class 来检查点击的是什么
todoContainer.addEventListener('click', function(event){
    log('container click', event, event.target)
    var target = event.target
    // classList.contains 可以检查元素是否有一个 class
    if(target.classList.contains('todo-done')) {
        log('done')
        // target.parentElement 用来获取按钮的父节点
        // 给 todo div 开关一个状态 class
        var todoDiv = target.parentElement
        toggleClass(todoDiv, 'done')
        // 改变 todo 完成状态之后，保存 todos
        saveTodos()
    } else if (target.classList.contains('todo-delete')) {
        log('delete')
        // 找到按钮的父节点并且删除
        var todoDiv = target.parentElement.parentElement
        todoDiv.remove()
        // 删除之后 保存 todos
        saveTodos()
    } else if (target.classList.contains('todo-bianji')) {
        log('bianji')
        var todoDiv = target.parentElement.parentElement
        log(todoDiv)
        var span = todoDiv.children[1] //父元素的第四个子元素
        span.setAttribute('contenteditable', 'true')
        span.focus()
    }
})
todoContainer.addEventListener('blur', function(event){
    log('container blur', event, event.target)
    var target = event.target.parentElement
    // classList.contains 可以检查元素是否有一个 class
    if(target.classList.contains('todo-content')) {
        log('done')
        saveTodos()
        //让span不可编辑
        target.setAttribute('contenteditable', 'false')
    }
}, true)

// 这个函数用来开关一个元素的某个 class
var toggleClass = function(element, className) {
    // 检查元素是否拥有某个 classs
    if (element.classList.contains(className)) {
        // 拥有则删除
        element.classList.remove(className)
    } else {
        // 没有则加上
        element.classList.add(className)
    }
}
// 用于把 数组 写入 localStorage
var save = function(array) {
    var s = JSON.stringify(array)
    localStorage.todos = s
}
// 读取 localStorage 中的数据并解析返回
var load = function() {
    var s = localStorage.todos
    return JSON.parse(s)
}
// 把页面上所有的 todo 用 save 保存
var saveTodos = function() {
    log('save todos')
    var contents = document.querySelectorAll('.todo-content')
    var todos = []
    for (var i = 0; i < contents.length; i++) {
        var c = contents[i]
        var done = c.parentElement.classList.contains('done')
        var todo = {
            done: done,
            content: c.innerHTML,
        }
        // 添加到数组中
        todos.push(todo)
    }
    // 保存数组
    save(todos)
}
var loadTodos = function() {
    var todos = load()
    log('load todos', todos)
    // 添加到页面中
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        insertTodo(todo.content, todo.done)
    }
}
loadTodos()
// 时间标准库
// 常用用法如下
// var d = new Date()
// d.getFullYear()
// 年份, 2016
// d.getMonth()
// 月份, 0-11
// d.getDate()
// 日期, 1-31
// d.getHours()
// 小时, 0-23
// d.getMinutes()
// 分钟, 0-59
// d.getSeconds()
// 秒数, 0-59
// d.getMilliseconds()
// 毫秒, 0-999
// d.getDay()
// 星期几, 0-6
var now = function() {
    var d = new Date()
    var nm = d.getFullYear()
    var yt = d.getMonth() + 1
    var ri = d.getDate()
    var ui = d.getHours()
    var ff = d.getMinutes()
    var mc = d.getSeconds()

    return `${nm}/${yt}/${ri} ${ui}:${ff}:${mc}`
    // return nm + '/' + yt + '/' + ri + ' ' + ui + ':' + ff + ':' + mc
}
