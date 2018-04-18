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
    var todoInput = e('#id-input-todo')
    var todo = todoInput.value
    //ssw//默认false，代表未完成，这是个套路
    insertTodo(todo, false)
    saveTodos()
})

var insertTodo = function(todo, done) {
    var todoContainer = e('.task-list')
    var t = templateTodo(todo, done)
    todoContainer.insertAdjacentHTML('beforeend', t);
}

var templateTodo = function(todo, done) {
    var status = ''
    var b = 'check'
    //如果事项已完成，done为true，则将默认css（未完成）的class更改为完成状态
    if(done) {
        status = 'done'
        b = 'checked'
    }
    var t = `
        <div class='task-item ${status}'>
            <span class='${b} '></span>
            <span class='todo-content' contenteditable='false'>${todo}</span>
            <span class='fr'>
                <span class='todo-bianji'></span>
                <span class='todo-delete'></span>
            </span>
        </div>
    `
    return t
}
var todoContainer = e('.task-list')


todoContainer.addEventListener('click', function(event){
    var target = event.target
    if(target.classList.contains('check')) {
        var todoDiv = target.parentElement
        toggleClass(todoDiv, 'done')
        var todoDiv1 = target
        toggleClass(todoDiv1, 'checked')
        saveTodos()
    } else if (target.classList.contains('todo-delete')) {
        // log('delete')
        var todoDiv = target.parentElement.parentElement
        todoDiv.remove()
        saveTodos()
    } else if (target.classList.contains('todo-bianji')) {
        // log('bianji')
        var todoDiv = target.parentElement.parentElement
        // log(todoDiv)
        var span = todoDiv.children[1]
        span.setAttribute('contenteditable', 'true')
        span.focus()
    }
})
todoContainer.addEventListener('blur', function(event){
    var target = event.target
    if(target.classList.contains('todo-content')) {
        saveTodos()
        //让span不可编辑
        target.setAttribute('contenteditable', 'false')
        log
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
// 把 数组 写入 localStorage
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
    // log('load todos', todos)
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
// 星期几, 0-6//功能待添加
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
